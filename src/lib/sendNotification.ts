// src/lib/sendNotification.ts
// Admin utility — send push notification to all subscribed users

import { collection, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

export interface NotifPayload {
  title:  string;
  body:   string;
  url?:   string;
  icon?:  string;
  image?: string;
  badge?: string;
  tag?:   string;
}

export interface SendResult {
  sent:        number;
  failed:      number;
  cleaned:     number; // Dead subscriptions removed from Firestore
  total:       number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// How many subscriptions to send in one API call.
// Vercel has a 10s timeout on hobby plan — batching prevents timeouts
// when you have thousands of subscribers.
const BATCH_SIZE = 100;

// ─── Main export ──────────────────────────────────────────────────────────────

export async function sendNotification(
  payload: NotifPayload
): Promise<SendResult> {

  // 1. Fetch all subscriptions from Firestore
  const snap = await getDocs(collection(db, "pushSubscriptions"));

  if (snap.empty) return { sent: 0, failed: 0, cleaned: 0, total: 0 };

  // Map docs to { deviceId, subscription } so we can delete dead ones later
  const entries: { deviceId: string; subscription: any }[] = snap.docs.map((d) => ({
    deviceId:     d.id,
    subscription: d.data().subscription,
  }));

  const total = entries.length;

  // 2. Split into batches and send
  const chunks = chunkArray(entries, BATCH_SIZE);

  let sent    = 0;
  let failed  = 0;
  const deadDeviceIds: string[] = []; // Subscriptions the server says are gone

  for (const chunk of chunks) {
    try {
      const res = await fetch("/api/send-notification", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptions: chunk.map((e) => ({
            deviceId:     e.deviceId,
            subscription: e.subscription,
          })),
          payload: {
            title:  payload.title,
            body:   payload.body,
            url:    payload.url   ?? "/",
            icon:   payload.icon  ?? "/icon-192.png",
            badge:  payload.badge ?? "/icon-72.png",
            image:  payload.image,
            tag:    payload.tag   ?? `realhubb-${Date.now()}`,
          },
        }),
      });

      if (!res.ok) {
        // Entire batch failed (server error) — count all as failed
        console.error(`[Push] Batch failed: HTTP ${res.status}`);
        failed += chunk.length;
        continue;
      }

      const result: {
        sent:         number;
        failed:       number;
        expiredIds:   string[]; // Device IDs the server flagged as 410/404
      } = await res.json();

      sent   += result.sent   ?? 0;
      failed += result.failed ?? 0;

      // Collect device IDs the server says are expired/invalid
      if (Array.isArray(result.expiredIds)) {
        deadDeviceIds.push(...result.expiredIds);
      }

    } catch (err) {
      // Network error hitting our own API — count batch as failed
      console.error("[Push] Batch network error:", err);
      failed += chunk.length;
    }
  }

  // 3. Clean up dead subscriptions from Firestore in one write batch
  const cleaned = await cleanDeadSubscriptions(deadDeviceIds);

  return { sent, failed, cleaned, total };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function cleanDeadSubscriptions(deviceIds: string[]): Promise<number> {
  if (deviceIds.length === 0) return 0;

  // Firestore writeBatch limit is 500 ops
  const chunks = chunkArray(deviceIds, 500);
  let deleted  = 0;

  for (const chunk of chunks) {
    try {
      const batch = writeBatch(db);
      for (const id of chunk) {
        batch.delete(doc(collection(db, "pushSubscriptions"), id));
      }
      await batch.commit();
      deleted += chunk.length;
    } catch (err) {
      console.warn("[Push] Cleanup batch failed:", err);
    }
  }

  return deleted;
}