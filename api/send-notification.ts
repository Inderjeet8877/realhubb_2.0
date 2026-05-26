// api/send-notification.ts  (Vercel serverless function)
import webpush, { WebPushError } from "web-push";
import type { VercelRequest, VercelResponse } from "@vercel/node";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.VITE_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { subscriptions, payload } = req.body as {
    subscriptions: { deviceId: string; subscription: any }[];
    payload:       Record<string, any>;
  };

  if (!subscriptions?.length) {
    return res.json({ sent: 0, failed: 0, expiredIds: [] });
  }

  let sent    = 0;
  let failed  = 0;
  const expiredIds: string[] = [];

  await Promise.allSettled(
    subscriptions.map(async ({ deviceId, subscription }) => {
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify(payload),
          {
            TTL:     60 * 60 * 24, // 24h queue for offline users
            urgency: "normal",
          }
        );
        sent++;
      } catch (err) {
        const pushErr = err as WebPushError;
        failed++;

        // 404 = subscription not found, 410 = subscription expired/unsubscribed
        // Both mean the device is gone — safe to delete from Firestore
        if (pushErr.statusCode === 404 || pushErr.statusCode === 410) {
          expiredIds.push(deviceId);
        } else {
          console.error(
            `[Push] Failed for ${deviceId}: ${pushErr.statusCode}`,
            pushErr.body
          );
        }
      }
    })
  );

  return res.json({ sent, failed, expiredIds });
}