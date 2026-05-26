// src/admin/sections/AnalyticsSection.tsx

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BarChart2, Users, Eye, Clock, TrendingUp, TrendingDown,
  Minus, RefreshCw, ExternalLink, Globe, Smartphone, Monitor,
  Tablet, ArrowUpRight, Activity, Search, FileText, Home,
  MousePointerClick, Wifi, MapPin, Zap,
} from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────
const PROPERTY_ID    = "properties/529852769";
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-HPYW6VG3WR";
const GA4_BASE       = "https://analytics.google.com/analytics/web";
const POLL_MS        = 30_000;

// Live Firebase Function URLs
const REALTIME_URL = "https://us-central1-realhubb-8daf5.cloudfunctions.net/ga4realtime";
const METRICS_URL  = "https://us-central1-realhubb-8daf5.cloudfunctions.net/ga4metrics";

const ga4Link = (path: string) =>
  `${GA4_BASE}/#/${PROPERTY_ID.replace("properties/", "")}/${path}`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface RealtimeData {
  activeUsers: number;
  byCountry:   { country: string; users: number }[];
  byPage:      { page: string;    users: number }[];
  lastUpdated: Date;
  online:      boolean;
}

interface MetricCard {
  label:  string;
  value:  string;
  change: number | null;
  icon:   React.ReactNode;
  color:  string;
  bg:     string;
  border: string;
}
interface TopPage    { path: string; views: number; pct: number; }
interface DeviceData { label: string; pct: number; icon: React.ReactNode; color: string; }

// ── Realtime hook — polls REALTIME_URL every 30s ──────────────────────────────
function useRealtimeData() {
  const [data, setData] = useState<RealtimeData>({
    activeUsers: 0,
    byCountry:   [],
    byPage:      [],
    lastUpdated: new Date(),
    online:      false,
  });
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(REALTIME_URL);
      if (!res.ok) throw new Error("not ok");
      const json = await res.json();
      setData({
        activeUsers: json.activeUsers ?? 0,
        byCountry:   json.byCountry   ?? [],
        byPage:      json.byPage      ?? [],
        lastUpdated: new Date(),
        online:      true,
      });
    } catch {
      setData(prev => ({ ...prev, online: false, lastUpdated: new Date() }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(fetchData, POLL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fetchData]);

  return { data, loading, refresh: fetchData };
}

// ── 7-day metrics hook ────────────────────────────────────────────────────────
function useGAMetrics() {
  const [loading,  setLoading]  = useState(true);
  const [metrics,  setMetrics]  = useState<MetricCard[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [devices,  setDevices]  = useState<DeviceData[]>([]);
  const [ts,       setTs]       = useState(new Date());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(METRICS_URL);
      if (!res.ok) throw new Error("not ok");
      const json = await res.json();

      setMetrics([
        { label: "Total users (7d)", value: json.users     > 0 ? json.users.toLocaleString()     : "—", change: json.usersChange     ?? null, icon: <Users    className="h-4 w-4" />, color: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-200"     },
        { label: "Sessions (7d)",    value: json.sessions  > 0 ? json.sessions.toLocaleString()  : "—", change: json.sessionsChange  ?? null, icon: <Activity className="h-4 w-4" />, color: "text-indigo-600",  bg: "bg-indigo-50",  border: "border-indigo-200"  },
        { label: "Page views (7d)",  value: json.pageviews > 0 ? json.pageviews.toLocaleString() : "—", change: json.pageviewsChange ?? null, icon: <Eye      className="h-4 w-4" />, color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200"  },
        { label: "Avg. session (s)", value: json.duration  > 0 ? `${json.duration}s`             : "—", change: null,                        icon: <Clock    className="h-4 w-4" />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
      ]);

      if (json.topPages?.length) {
        const max = json.topPages[0].views || 1;
        setTopPages(json.topPages.map((p: any) => ({
          path:  p.path,
          views: p.views,
          pct:   Math.round((p.views / max) * 100),
        })));
      }

      if (json.devices?.length) {
        const icons:  Record<string, React.ReactNode> = {
          mobile:  <Smartphone className="h-3.5 w-3.5" />,
          desktop: <Monitor    className="h-3.5 w-3.5" />,
          tablet:  <Tablet     className="h-3.5 w-3.5" />,
        };
        const colors: Record<string, string> = {
          mobile:  "bg-sky-500",
          desktop: "bg-indigo-500",
          tablet:  "bg-violet-500",
        };
        setDevices(json.devices.map((d: any) => ({
          label: d.label,
          pct:   d.pct,
          icon:  icons[d.label.toLowerCase()]  || <Monitor className="h-3.5 w-3.5" />,
          color: colors[d.label.toLowerCase()] || "bg-slate-400",
        })));
      }
    } catch {
      setMetrics([
        { label: "Total users (7d)", value: "—", change: null, icon: <Users    className="h-4 w-4" />, color: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-200"     },
        { label: "Sessions (7d)",    value: "—", change: null, icon: <Activity className="h-4 w-4" />, color: "text-indigo-600",  bg: "bg-indigo-50",  border: "border-indigo-200"  },
        { label: "Page views (7d)",  value: "—", change: null, icon: <Eye      className="h-4 w-4" />, color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200"  },
        { label: "Avg. session (s)", value: "—", change: null, icon: <Clock    className="h-4 w-4" />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
      ]);
      setTopPages([
        { path: "/",                 views: 0, pct: 100 },
        { path: "/ongoing-projects", views: 0, pct: 0   },
        { path: "/property/...",     views: 0, pct: 0   },
        { path: "/blog",             views: 0, pct: 0   },
        { path: "/contact-us",       views: 0, pct: 0   },
      ]);
      setDevices([
        { label: "Mobile",  pct: 62, icon: <Smartphone className="h-3.5 w-3.5" />, color: "bg-sky-500"    },
        { label: "Desktop", pct: 33, icon: <Monitor    className="h-3.5 w-3.5" />, color: "bg-indigo-500" },
        { label: "Tablet",  pct: 5,  icon: <Tablet     className="h-3.5 w-3.5" />, color: "bg-violet-500" },
      ]);
    } finally {
      setTs(new Date());
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  return { loading, metrics, topPages, devices, ts, reload: load };
}

// ── Realtime Panel ─────────────────────────────────────────────────────────────
function RealtimePanel() {
  const { data, loading, refresh } = useRealtimeData();
  const [tick, setTick] = useState(POLL_MS / 1000);

  useEffect(() => {
    setTick(POLL_MS / 1000);
    const id = setInterval(
      () => setTick(t => (t <= 1 ? POLL_MS / 1000 : t - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [data.lastUpdated]);

  const barHeights = [4, 7, 5, 9, 6, 8,
    data.online ? Math.min((data.activeUsers || 1) * 2 + 3, 14) : 5,
  ];

  // GA4 byPage returns page titles — truncate long ones for display
  const truncateTitle = (title: string, max = 40) =>
    title.length > max ? title.slice(0, max) + "…" : title;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
          </div>
          <p className="text-sm font-normal text-slate-700">Live users on site right now</p>
          {data.online
            ? <span className="flex items-center gap-1 text-[10px] font-normal text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <Wifi className="h-2.5 w-2.5" /> Live
              </span>
            : <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                <Zap className="h-2.5 w-2.5" /> Connecting…
              </span>
          }
        </div>
        <div className="flex items-center gap-3">
          {data.online && (
            <span className="text-[10px] text-slate-400">refreshes in {tick}s</span>
          )}
          <button
            onClick={refresh}
            title="Refresh now"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="p-6">

        {/* Big number + pulse bars */}
        <div className="flex items-end gap-6 mb-6">
          <div>
            <p className="text-[11px] font-normal uppercase tracking-wider text-slate-400 mb-1.5">
              Active right now
            </p>
            {loading
              ? <div className="w-20 h-12 bg-slate-100 rounded-xl animate-pulse" />
              : (
                <div className="flex items-baseline gap-2">
                  <span className={`text-6xl font-black leading-none tabular-nums transition-all duration-500 ${
                    data.online ? "text-emerald-500" : "text-slate-300"
                  }`}>
                    {data.online ? data.activeUsers : "—"}
                  </span>
                  <span className="text-sm text-slate-400 mb-1">users</span>
                </div>
              )
            }
          </div>

          {/* Animated bars */}
          <div className="flex items-end gap-1 pb-1">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className={`w-2.5 rounded-t-sm transition-all duration-700 ${
                  data.online ? "bg-emerald-400" : "bg-slate-200"
                }`}
                style={{
                  height:  `${h * 4}px`,
                  opacity: data.online ? (0.3 + i * 0.1) : 0.4,
                }}
              />
            ))}
          </div>

          {/* Last updated pill */}
          {data.online && (
            <div className="ml-auto flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {data.activeUsers} active
              </div>
              <p className="text-[10px] text-slate-400">
                {data.lastUpdated.toLocaleTimeString([], {
                  hour: "2-digit", minute: "2-digit", second: "2-digit",
                })}
              </p>
            </div>
          )}
        </div>

        {/* Country + Page breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* By country */}
          <div>
            <p className="text-[11px] font-normal uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> By country
            </p>
            {loading ? (
              <div className="space-y-2">
                {[100, 70, 40].map(w => (
                  <div key={w} className="h-7 bg-slate-100 rounded animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : data.byCountry.length > 0 ? (
              <div className="space-y-2.5">
                {data.byCountry.slice(0, 6).map((c, i) => {
                  const max = data.byCountry[0]?.users || 1;
                  const pct = Math.round((c.users / max) * 100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 font-medium">{c.country}</span>
                        <span className="text-slate-500 font-normal">
                          {c.users} user{c.users !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Globe className="h-6 w-6 text-slate-300 mb-2" />
                <p className="text-xs text-slate-400">No active users right now</p>
              </div>
            )}
          </div>

          {/* By page — GA4 returns page titles, displayed as readable titles */}
          <div>
            <p className="text-[11px] font-normal uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="h-3 w-3" /> Active pages
            </p>
            {loading ? (
              <div className="space-y-2">
                {[100, 75, 55, 40].map(w => (
                  <div key={w} className="h-7 bg-slate-100 rounded animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : data.byPage.length > 0 ? (
              <div className="space-y-2.5">
                {data.byPage.slice(0, 6).map((p, i) => {
                  const max = data.byPage[0]?.users || 1;
                  const pct = Math.round((p.users / max) * 100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1 gap-2">
                        <span
                          className="text-slate-600 truncate"
                          title={p.page}
                        >
                          {truncateTitle(p.page)}
                        </span>
                        <span className="text-slate-500 font-normal shrink-0">
                          {p.users}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-400 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[10px] text-slate-400 pt-1">
                  Showing page titles from GA4
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <FileText className="h-6 w-6 text-slate-300 mb-2" />
                <p className="text-xs text-slate-400">No active page data yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-[10px] text-slate-400">
          Auto-refreshes every 30s · {REALTIME_URL.split("/").pop()}
        </p>
        <a
          href={ga4Link("p/realtime/")}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
        >
          Open in GA4 <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// ── Report quick-links ─────────────────────────────────────────────────────────
const REPORT_LINKS = [
  { label: "Realtime",       desc: "Live users right now",     icon: <Activity          className="h-4 w-4" />, path: "p/realtime/",                          color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { label: "Acquisition",    desc: "Where traffic comes from", icon: <TrendingUp        className="h-4 w-4" />, path: "p/acquisition/overview",               color: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-200"     },
  { label: "Engagement",     desc: "Pages, sessions, events",  icon: <MousePointerClick className="h-4 w-4" />, path: "p/engagement/overview",                color: "text-indigo-600",  bg: "bg-indigo-50",  border: "border-indigo-200"  },
  { label: "Top Pages",      desc: "Most visited content",     icon: <FileText          className="h-4 w-4" />, path: "p/engagement/pages",                   color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200"  },
  { label: "Demographics",   desc: "Audience location & age",  icon: <Globe             className="h-4 w-4" />, path: "p/user/explorer",                      color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200"   },
  { label: "Search Console", desc: "Organic search queries",   icon: <Search            className="h-4 w-4" />, path: "p/acquisition/search-console/queries", color: "text-rose-600",    bg: "bg-rose-50",    border: "border-rose-200"    },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AnalyticsSection() {
  const { loading, metrics, topPages, devices, ts, reload } = useGAMetrics();
  const [tab, setTab] = useState<"overview" | "reports">("overview");

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-normal text-slate-800">Analytics</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Google Analytics ·{" "}
            <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">
              {MEASUREMENT_ID}
            </code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reload}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 border border-slate-200 bg-white transition shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading
              ? "Loading…"
              : `Updated ${ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            }
          </button>
          <a
            href={ga4Link("")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-indigo-600 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 transition"
          >
            Open GA4 <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {(["overview", "reports"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition capitalize ${
              tab === t
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── TAB: Overview ── */}
      {tab === "overview" && (
        <div className="space-y-5">

          {/* Realtime panel — always at top */}
          <RealtimePanel />

          {/* 7-day metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map(m => (
              <div key={m.label} className={`p-5 rounded-2xl border ${m.border} bg-white shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`p-1.5 rounded-lg ${m.bg} ${m.color}`}>{m.icon}</span>
                  {m.change !== null && (
                    <span className={`flex items-center gap-0.5 text-xs font-medium ${
                      m.change > 0
                        ? "text-emerald-600"
                        : m.change < 0
                        ? "text-red-500"
                        : "text-slate-400"
                    }`}>
                      {m.change > 0
                        ? <TrendingUp   className="h-3 w-3" />
                        : m.change < 0
                        ? <TrendingDown className="h-3 w-3" />
                        : <Minus        className="h-3 w-3" />
                      }
                      {Math.abs(m.change)}%
                    </span>
                  )}
                </div>
                <p className={`text-3xl font-black leading-none ${m.color}`}>
                  {loading
                    ? <span className="inline-block w-16 h-7 bg-slate-100 rounded-lg animate-pulse" />
                    : m.value
                  }
                </p>
                <p className="text-xs text-slate-500 mt-2">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Top pages + Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-violet-500" />
                  <p className="text-sm font-normal text-slate-700">Top pages (7d)</p>
                </div>
                <a
                  href={ga4Link("p/engagement/pages")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
                >
                  Full report <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[80, 65, 55, 45, 35].map(w => (
                    <div key={w} className="h-8 bg-slate-100 rounded-lg animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {topPages.map((p, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 font-medium font-mono truncate max-w-[200px]">
                          {p.path}
                        </span>
                        <span className="text-slate-400 shrink-0 ml-2">
                          {p.views > 0 ? `${p.views.toLocaleString()} views` : "connect API"}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-violet-400 transition-all duration-700"
                          style={{ width: p.views > 0 ? `${p.pct}%` : "8%" }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
                    Live data requires{" "}
                    <a
                      href="https://developers.google.com/analytics/devguides/reporting/data/v1"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-500 hover:underline"
                    >
                      GA4 Data API
                    </a>{" "}
                    setup.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Monitor className="h-4 w-4 text-sky-500" />
                <p className="text-sm font-normal text-slate-700">Device breakdown</p>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[70, 40, 20].map(w => (
                    <div key={w} className="h-8 bg-slate-100 rounded-lg animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {devices.map(d => (
                    <div key={d.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                          {d.icon} {d.label}
                        </span>
                        <span className="text-slate-500 font-normal">{d.pct}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${d.color} transition-all duration-700`}
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                    Connect GA4 Data API for your actual device breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Open GA4 banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-5 w-5 text-indigo-500 shrink-0" />
              <div>
                <p className="text-sm font-normal text-slate-700">Full historical reports</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Charts, funnels, audience segments, and more in Google Analytics.
                </p>
              </div>
            </div>
            <a
              href={ga4Link("")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-normal transition shrink-0"
            >
              Open GA4 <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ── TAB: Reports ── */}
      {tab === "reports" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPORT_LINKS.map(r => (
              <a
                key={r.label}
                href={ga4Link(r.path)}
                target="_blank"
                rel="noreferrer"
                className={`flex items-start gap-4 p-5 rounded-2xl border ${r.border} bg-white hover:shadow-md transition-all group`}
              >
                <span className={`p-2 rounded-xl ${r.bg} ${r.color} mt-0.5`}>{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-normal ${r.color}`}>{r.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Activity className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-normal text-emerald-800">Tip: verify your tag</p>
              <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                Open Realtime in GA4, then browse your site in another tab.
                If you see yourself appear, your GA4 tag is firing correctly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}