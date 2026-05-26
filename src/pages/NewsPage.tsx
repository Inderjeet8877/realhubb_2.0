// src/pages/NewsPage.tsx
// /news route — real estate news via Google News RSS (rss2json proxy)
//
// ─── SETUP ────────────────────────────────────────────────────────────────────
// 1. Create a .env file in your project root (or .env.local for Next.js)
// 2. Add:  VITE_RSS2JSON_API_KEY=your_api_key_here
//    (Get your key: https://rss2json.com → My Account → API Key)
// 3. Restart your dev server after adding env vars
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ExternalLink, RefreshCw, Newspaper, Clock,
  TrendingUp, Home, Building2, DollarSign, FileText, WifiOff,
} from "lucide-react";
import SEO from "@/components/seo/SEO";
import image from "../components/assets/realhubb_news.png";

// ── Env var ────────────────────────────────────────────────────────────────────
// Vite:    import.meta.env.VITE_RSS2JSON_API_KEY
// Next.js: process.env.NEXT_PUBLIC_RSS2JSON_API_KEY
const API_KEY =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_RSS2JSON_API_KEY) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_RSS2JSON_API_KEY) ||
  "";

const RSS2JSON_BASE = "https://api.rss2json.com/v1/api.json";

// ── Types ──────────────────────────────────────────────────────────────────────
interface NewsItem {
  title:       string;
  link:        string;
  pubDate:     string;
  description: string;
  thumbnail:   string;
  source:      string;
  category:    string;
}

// ── RSS Feed definitions ───────────────────────────────────────────────────────
const FEEDS = [
  {
    label:    "Real Estate India",
    icon:     <Building2 className="h-4 w-4" />,
    color:    "bg-blue-50 text-blue-700 border-blue-200",
    category: "real-estate",
    url:      "https://news.google.com/rss/search?q=real+estate+india+property+market&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    label:    "Bengaluru · Hyderabad · Chennai",
    icon:     <Home className="h-4 w-4" />,
    color:    "bg-green-50 text-green-700 border-green-200",
    category: "cities",
    url:      "https://news.google.com/rss/search?q=property+prices+bangalore+hyderabad+chennai&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    label:    "Home Loan & RBI",
    icon:     <DollarSign className="h-4 w-4" />,
    color:    "bg-amber-50 text-amber-700 border-amber-200",
    category: "home-loan",
    url:      "https://news.google.com/rss/search?q=home+loan+interest+rate+RBI+india&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    label:    "RERA Updates",
    icon:     <FileText className="h-4 w-4" />,
    color:    "bg-purple-50 text-purple-700 border-purple-200",
    category: "rera",
    url:      "https://news.google.com/rss/search?q=RERA+india+real+estate+regulation&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    label:    "Finance & Economy",
    icon:     <TrendingUp className="h-4 w-4" />,
    color:    "bg-rose-50 text-rose-700 border-rose-200",
    category: "finance",
    url:      "https://news.google.com/rss/search?q=india+economy+finance+budget+current+affairs&hl=en-IN&gl=IN&ceid=IN:en",
  },
] as const;

type FeedCategory = typeof FEEDS[number]["category"] | "all";

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const m    = Math.floor(diff / 60_000);
  if (m < 1)  return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function cleanDescription(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim()
    .slice(0, 1000);
}



function extractSource(item: any): string {
  // Google News RSS puts the source in "source" field or at end of title like " - Economic Times"
  if (item.source?.name) return item.source.name;
  if (item.author && !item.author.includes("@")) return item.author;
  const titleMatch = item.title?.match(/\s[-–]\s([^-–]+)$/);
  if (titleMatch) return titleMatch[1].trim();
  try {
    return new URL(item.link).hostname.replace("www.", "");
  } catch {
    return "News";
  }
}

function cleanTitle(title: string): string {
  // Remove source suffix from Google News titles like "RBI cuts rate - Economic Times"
  return title.replace(/\s[-–]\s[^-–]+$/, "").trim();
}

// ── Fetch one feed (with API key + retry) ─────────────────────────────────────
async function fetchFeed(
  feed: typeof FEEDS[number],
  retries = 1
): Promise<{ items: NewsItem[]; error?: string }> {
  const params = new URLSearchParams({
    rss_url: feed.url,
    count:   "15",
    ...(API_KEY ? { api_key: API_KEY } : {}),
  });

  const url = `${RSS2JSON_BASE}?${params.toString()}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();

    // rss2json returns status "error" with a message on failure
    if (json.status !== "ok") {
      console.warn(`[rss2json] Feed "${feed.label}" error:`, json.message);
      // Common messages: "This rss feed is not supported"  "Feed not found"
      return { items: [], error: json.message };
    }

    const items: NewsItem[] = (json.items || []).map((item: any) => ({
      title:       cleanTitle(item.title || ""),
      link:        item.link  || "",
      pubDate:     item.pubDate || "",
      description: cleanDescription(item.description || item.content || ""),
      thumbnail:   image,
      source:      extractSource(item),
      category:    feed.category,
    }));

    return { items };
  } catch (err: any) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 800));
      return fetchFeed(feed, retries - 1);
    }
    console.error(`[rss2json] Feed "${feed.label}" failed:`, err?.message);
    return { items: [], error: err?.message };
  }
}

// ── News Card ─────────────────────────────────────────────────────────────────
function NewsCard({
  item,
  feedMeta,
  index,
}: {
  item:     NewsItem;
  feedMeta: typeof FEEDS[number];
  index:    number;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const isNew =
    item.pubDate &&
    Date.now() - new Date(item.pubDate).getTime() < 3 * 60 * 60 * 1000;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#D7A764]/30 transition-all duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden shrink-0">
        {item.thumbnail && !imgFailed ? (
          <img
            src={image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <Newspaper className="h-10 w-10 text-gray-400/30" />
          </div>
        )}

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-normal border backdrop-blur-sm ${feedMeta.color}`}
        >
          {feedMeta.icon}
          {feedMeta.label}
        </span>

        {/* "New" badge */}
        {isNew && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-normal tracking-wide">
            NEW
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-normal text-[#00274D] leading-snug line-clamp-3 group-hover:text-[#D7A764] transition-colors">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100/50">
          <span className="text-[11px] text-gray-400 font-medium truncate max-w-[55%]">
            {item.source}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
            <Clock className="h-3 w-3" />
            {timeAgo(item.pubDate)}
            <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-60 transition-opacity" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Skeleton loader ────────────────────────────────────────────────────────────
function NewsCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-3/5" />
        <div className="flex justify-between pt-3 border-t border-gray-100/30">
          <div className="h-3 bg-gray-100 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

// ── Feed status banner ────────────────────────────────────────────────────────
function FeedStatusBanner({ failedFeeds }: { failedFeeds: string[] }) {
  if (failedFeeds.length === 0) return null;
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs mb-6">
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>
        Could not load: <strong>{failedFeeds.join(", ")}</strong>.
        {!API_KEY && (
          <> Add your <code className="bg-amber-100 px-1 rounded">VITE_RSS2JSON_API_KEY</code> to .env to fix this.</>
        )}
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const [allNews,      setAllNews]      = useState<NewsItem[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [failedFeeds,  setFailedFeeds]  = useState<string[]>([]);
  const [activeTab,    setActiveTab]    = useState<FeedCategory>("all");
  const [refreshing,   setRefreshing]   = useState(false);
  const [lastUpdate,   setLastUpdate]   = useState<Date | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const loadNews = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);
    setFailedFeeds([]);

    try {
      // Fetch all feeds concurrently — failures don't block others
      const results = await Promise.allSettled(
        FEEDS.map(feed => fetchFeed(feed))
      );

      if (!isMounted.current) return;

      const combined: NewsItem[] = [];
      const failed: string[]     = [];

      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          combined.push(...result.value.items);
          if (result.value.error) failed.push(FEEDS[i].label);
        } else {
          failed.push(FEEDS[i].label);
        }
      });

      // Sort newest-first
      combined.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );

      // Deduplicate by normalised title (first 60 chars, lowercase)
      const seen  = new Set<string>();
      const dedup = combined.filter(item => {
        if (!item.title || !item.link) return false;
        const key = item.title.slice(0, 60).toLowerCase().replace(/\s+/g, " ");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setAllNews(dedup);
      setFailedFeeds(failed);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("[NewsPage] Unexpected error:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  // Initial load
  useEffect(() => { loadNews(); }, [loadNews]);

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => loadNews(true), 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadNews]);

  const filtered: NewsItem[] =
    activeTab === "all"
      ? allNews
      : allNews.filter(n => n.category === activeTab);

  const tabs = [
    { value: "all" as FeedCategory, label: "All News", count: allNews.length },
    ...FEEDS.map(f => ({
      value: f.category as FeedCategory,
      label: f.label,
      count: allNews.filter(n => n.category === f.category).length,
    })),
  ];

  return (
    <>
      <SEO
        title="Real Estate News India 2025 | Property Market Updates | RealHubb"
        description="Stay updated with the latest real estate news, property market trends, home loan rates, RERA updates, and finance news across Bangalore, Hyderabad, and Chennai."
        keywords="real estate news india, property market 2025, home loan rates RBI, RERA updates, bangalore property news, hyderabad real estate"
        canonical="https://www.realhubb.in/news"
      />

      <div className="min-h-screen bg-[#faf6f1] pt-20 pb-16">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#D7A764]/10 text-[#D7A764] text-xs font-normal rounded-full border border-[#D7A764]/20">
                  <span className="w-1.5 h-1.5 bg-[#D7A764] rounded-full animate-pulse" />
                  Live Feed
                </span>
                {lastUpdate && (
                  <span className="text-xs text-gray-400">
                    Updated {timeAgo(lastUpdate.toISOString())}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-normal text-[#00274D]">
                Real Estate <span className="text-[#D7A764]">News</span>
              </h1>
              <p className="text-gray-400 mt-2 max-w-xl">
                Latest property market updates, home loan rates, RERA news, and finance headlines — curated for Indian real estate.
              </p>
            </div>

            <button
              onClick={() => loadNews(true)}
              disabled={refreshing || loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-100/50 text-sm font-medium text-[#00274D] transition-all shadow-sm disabled:opacity-60 shrink-0"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          {/* ── Feed error banner (partial failures) ── */}
          <FeedStatusBanner failedFeeds={failedFeeds} />

          {/* ── Tabs ── */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.value
                    ? "bg-[#00274D] text-white border-[#00274D] shadow-sm"
                    : "bg-white border-gray-100 text-[#00274D] hover:border-[#D7A764]/40 hover:bg-[#D7A764]/5"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full font-normal ${
                      activeTab === tab.value
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── No API key warning ── */}
          {!API_KEY && !loading && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs">
              <strong>Dev note:</strong> No <code className="bg-blue-100 px-1 rounded">VITE_RSS2JSON_API_KEY</code> found.
              The free tier (no key) is rate-limited to ~30 req/hour.{" "}
              <a href="https://rss2json.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                Get your free API key →
              </a>
            </div>
          )}

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading ? (
              [...Array(12)].map((_, i) => <NewsCardSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
                <Newspaper className="h-12 w-12 opacity-20" />
                <p className="text-sm">
                  {allNews.length === 0
                    ? "Could not load news. Check your API key or connection."
                    : "No articles in this category yet."}
                </p>
                {allNews.length === 0 && (
                  <button
                    onClick={() => loadNews()}
                    className="px-4 py-2 rounded-xl bg-[#00274D] text-white text-sm font-medium"
                  >
                    Try Again
                  </button>
                )}
              </div>
            ) : (
              filtered.map((item, i) => {
                const feedMeta =
                  FEEDS.find(f => f.category === item.category) ?? FEEDS[0];
                return (
                  <NewsCard
                    key={`${item.link}-${i}`}
                    item={item}
                    feedMeta={feedMeta}
                    index={i}
                  />
                );
              })
            )}
          </div>

          {/* ── Footer ── */}
          {!loading && filtered.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-10">
              News sourced via Google News RSS.{" "}
              <span className="text-[#D7A764] font-medium">{filtered.length} articles</span> loaded.
              RealHubb does not own this content.
            </p>
          )}

        </div>
      </div>
    </>
  );
}