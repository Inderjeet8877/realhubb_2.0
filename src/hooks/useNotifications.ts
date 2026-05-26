import { useState, useEffect } from "react";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || "";

// Key to track if we've already prompted this device
const PROMPT_KEY = "rh_notif_prompted";

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + pad).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(b64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

function getDeviceId(): string {
  let id = localStorage.getItem("rh_device_id");
  if (!id) {
    id = `device_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("rh_device_id", id);
  }
  return id;
}

export type NotifStatus = "default" | "granted" | "denied" | "unsupported" | "loading";

export function useNotifications() {
  const [status, setStatus] = useState<NotifStatus>("loading");

  const isSupported =
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window;

  // ── On mount: set status + auto-prompt if never asked before ──
  useEffect(() => {
    if (!isSupported) {
      setStatus("unsupported");
      return;
    }

    const currentPermission = Notification.permission;
    setStatus(currentPermission as NotifStatus);

    // If browser already granted — silently re-register the SW subscription
    // so push still works after page refresh without asking again
    if (currentPermission === "granted") {
      silentlyResubscribe();
      return;
    }

    // If never asked before on this device — auto-prompt after a short delay
    // (delay improves UX: let the page load first)
    if (currentPermission === "default") {
      const alreadyPrompted = localStorage.getItem(PROMPT_KEY);
      if (!alreadyPrompted) {
        const timer = setTimeout(() => {
          subscribe(); // Will trigger browser's native permission dialog
        }, 3000); // 3s delay so page loads first
        return () => clearTimeout(timer);
      }
    }
  }, [isSupported]);

  // Re-subscribe silently: if user already granted permission before,
  // make sure Firestore still has a valid subscription (handles SW re-register)
  async function silentlyResubscribe() {
    try {
      const sw = await getSW();
      const existingSub = await sw.pushManager.getSubscription();
      if (existingSub) return; // Already subscribed, nothing to do

      // SW lost subscription (e.g. browser updated) — re-subscribe silently
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as unknown as BufferSource,
      });
      const deviceId = getDeviceId();
      await setDoc(doc(collection(db, "pushSubscriptions"), deviceId), {
        subscription: subscription.toJSON(),
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Silent resubscribe failed:", err);
    }
  }

  async function getSW(): Promise<ServiceWorkerRegistration> {
    const existing = await navigator.serviceWorker.getRegistration("/sw.js");
    if (existing) return existing;
    return navigator.serviceWorker.register("/sw.js");
  }

  async function subscribe() {
    if (!isSupported) return;
    setStatus("loading");

    // Mark that we've prompted this device — won't auto-prompt again
    localStorage.setItem(PROMPT_KEY, "true");

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission as NotifStatus); // "denied" or "default"
        return;
      }

      const sw = await getSW();
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as unknown as BufferSource,
      });

      const deviceId = getDeviceId();
      await setDoc(doc(collection(db, "pushSubscriptions"), deviceId), {
        subscription: subscription.toJSON(),
        createdAt: new Date().toISOString(),
      });

      setStatus("granted");
    } catch (err) {
      console.error(err);
      setStatus("default");
    }
  }

  async function unsubscribe() {
    try {
      const sw = await navigator.serviceWorker.getRegistration("/sw.js");
      const sub = await sw?.pushManager.getSubscription();
      await sub?.unsubscribe();

      const deviceId = getDeviceId();
      await deleteDoc(doc(collection(db, "pushSubscriptions"), deviceId));

      // Clear the prompt flag so they can be asked again if they re-allow
      localStorage.removeItem(PROMPT_KEY);

      setStatus("default");
    } catch (err) {
      console.error(err);
    }
  }

  return { status, isSupported, subscribe, unsubscribe };
}