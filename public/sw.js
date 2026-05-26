// public/sw.js — RealHubb Service Worker
// Cross-browser compatible: Chrome, Firefox, Safari 16.4+, Samsung Internet, Edge

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));

// ─── Push received ────────────────────────────────────────────────────────────
self.addEventListener("push", (event) => {
  // Default payload — used if data is missing or unparseable
  let payload = {
    title: "🏠 RealHubb",
    body:  "New update from RealHubb",
    icon:  "/icon-192.png",
    badge: "/icon-72.png",
    tag:   "realhubb-notification",
    url:   "/",
  };

  // Parse push data safely (Firefox & Safari can fail silently if not wrapped)
  if (event.data) {
    try {
      const parsed = event.data.json();
      payload = { ...payload, ...parsed };
    } catch {
      try { payload.body = event.data.text(); } catch { /* use defaults */ }
    }
  }

  const options = {
    body:    payload.body,
    icon:    payload.icon,
    badge:   payload.badge,
    tag:     payload.tag,
    renotify: true,           // Re-alert even if same tag exists (Firefox needs this)
    data:    { url: payload.url },
    requireInteraction: false,
    vibrate: [200, 100, 200],

    // ⚠️ Actions & image: Chrome-only features
    // Wrapped to avoid Firefox/Safari console warnings
    ...(self.registration.showNotification.length > 1 && {
      actions: [
        { action: "view",    title: "View Now" },
        { action: "dismiss", title: "Dismiss"  },
      ],
    }),

    // Only add image if it's a real URL — Firefox warns on undefined
    ...(payload.image ? { image: payload.image } : {}),
  };

  // event.waitUntil is REQUIRED — Firefox silently drops notification without it
  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// ─── Notification click ───────────────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Dismiss action — do nothing
  if (event.action === "dismiss") return;

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Try to find and focus an already-open matching tab
        for (const client of clientList) {
          try {
            const clientPath  = new URL(client.url).pathname;
            const targetPath  = new URL(targetUrl, self.location.origin).pathname;

            if (clientPath === targetPath && "focus" in client) {
              // client.navigate() is not supported in Firefox/Safari — use focus only
              return client.focus();
            }
          } catch { /* URL parse failed — skip this client */ }
        }

        // No matching tab found — focus any open tab and navigate,
        // or open a new one if none exist
        for (const client of clientList) {
          if ("focus" in client) {
            // navigate() is Chrome-only — guard it
            if ("navigate" in client) {
              client.navigate(targetUrl);
            }
            return client.focus();
          }
        }

        // Last resort — open a fresh tab
        if (clients.openWindow) return clients.openWindow(targetUrl);
      })
  );
});

// ─── Push subscription change ─────────────────────────────────────────────────
// Firefox & Safari can invalidate subscriptions silently (e.g. after browser update).
// This event lets you re-subscribe automatically without user interaction.
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: event.oldSubscription?.options?.applicationServerKey,
      })
      .then((newSubscription) => {
        // POST new subscription to your backend to replace the old one
        return fetch("/api/update-subscription", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            old: event.oldSubscription?.toJSON(),
            new: newSubscription.toJSON(),
          }),
        });
      })
      .catch((err) => {
        // Non-fatal — next time user visits, useNotifications will re-subscribe
        console.warn("[SW] pushsubscriptionchange resubscribe failed:", err);
      })
  );
});