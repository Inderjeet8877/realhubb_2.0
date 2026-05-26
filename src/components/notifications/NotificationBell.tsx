// src/components/notifications/NotificationBell.tsx
// Bell icon for header — shows subscribe/unsubscribe UI

import { useState } from "react";
import { Bell, BellOff, BellRing, X, Check, Loader2 } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationBell() {
const { status, isSupported, subscribe, unsubscribe } = useNotifications();

  const [showTooltip, setShowTooltip] = useState(false);
  const [justDone,    setJustDone]    = useState(false);

if (!isSupported || status === "unsupported") return null;

  const handleClick = async () => {
    if (status === "granted") {
      setShowTooltip(v => !v);
    } else if (status === "default") {
      await subscribe();
      setJustDone(true);
      setTimeout(() => setJustDone(false), 3000);
    } else if (status === "denied") {
      setShowTooltip(v => !v);
    }
  };

  const Icon =
    status === "loading"  ? Loader2   :
    status === "granted"  ? BellRing  :
    status === "denied"   ? BellOff   :
    Bell;

  const iconClass =
    status === "loading" ? "animate-spin" :
    status === "granted" ? "text-[#D7A764]" :
    "text-gray-400";

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        aria-label="Notification settings"
        className={`relative p-2 rounded-lg transition-all duration-200 hover:bg-slate-100
          ${status === "granted" ? "hover:bg-[#D7A764]/10" : ""}`}
      >
        <Icon className={`h-5 w-5 ${iconClass}`} />

        {/* Green dot when subscribed */}
        {status === "granted" && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-500 border border-white" />
        )}

        {/* Success flash */}
        {justDone && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-green-500">
            <Check className="h-2.5 w-2.5 text-white" />
          </span>
        )}
      </button>

      {/* Tooltip panel */}
      {showTooltip && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setShowTooltip(false)} />

          <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-[100] p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {status === "granted"
                  ? <BellRing className="h-5 w-5 text-[#D7A764]" />
                  : <BellOff  className="h-5 w-5 text-gray-400" />
                }
                <p className="text-sm font-normal text-slate-800">
                  {status === "granted" ? "Notifications On" : "Notifications Blocked"}
                </p>
              </div>
              <button onClick={() => setShowTooltip(false)}>
                <X className="h-4 w-4 text-gray-400 hover:text-slate-600" />
              </button>
            </div>

            {status === "granted" && (
              <>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                  You're subscribed to alerts for new properties, news, and RealHubb updates.
                </p>
                <button
                  onClick={async () => { await unsubscribe(); setShowTooltip(false); }}
                  className="w-full py-2 rounded-xl border border-red-200 text-red-500 text-xs font-normal hover:bg-red-50 transition-colors"
                >
                  Unsubscribe
                </button>
              </>
            )}

            {status === "denied" && (
              <p className="text-xs text-gray-400 leading-relaxed">
                You've blocked notifications for this site. To re-enable, click the 🔒 lock icon
                in your browser address bar → Notifications → Allow.
              </p>
            )}
          </div>
        </>
      )}

      {/* First-time prompt bubble */}
      {status === "default" && !showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#00274D] text-white rounded-2xl shadow-xl z-[100] p-3 pointer-events-none">
          <p className="text-xs font-normal mb-0.5">🏠 Get property alerts!</p>
          <p className="text-[11px] opacity-80">Click to get notified about new listings & real estate news.</p>
          <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#00274D] rotate-45 rounded-sm" />
        </div>
      )}
    </div>
  );
}