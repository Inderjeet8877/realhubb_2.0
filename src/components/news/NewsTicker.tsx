// src/components/news/NewsTicker.tsx
// Scrolling news ticker for homepage — shows latest headlines
// Place it directly below the HeroSection

import { useState, useEffect, useRef } from "react";
import { Newspaper, ExternalLink } from "lucide-react";

interface TickerItem { title: string; link: string; }

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const FEED_URL = "https://news.google.com/rss/search?q=real+estate+india+property&hl=en-IN&gl=IN&ceid=IN:en";

export default function NewsTicker() {
  const [items,   setItems]   = useState<TickerItem[]>([]);
  const [paused,  setPaused]  = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY;

  fetch(`${RSS2JSON}${encodeURIComponent(FEED_URL)}&count=15&api_key=${API_KEY}`)
    .then(r => r.json())
    .then(d => {
      console.log("Ticker data:", d);

      if (d.status === "ok") {
        setItems(
          (d.items || []).map((i: any) => ({
            title: i.title,
            link: i.link,
          }))
        );
      } else {
        console.error("RSS error:", d.message);
      }
    })
    .catch(err => console.error("Ticker fetch error:", err));
}, []);
  if (items.length === 0) return null;

  return (
    <div className="w-full bg-[#0a4851] text-white text-sm overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-0">

         <div className="flex items-center gap-2 shrink-0 pr-4 py-2.5 border-r border-white/20 mr-4">
  <span className="flex items-center gap-2 font-normal text-xs whitespace-nowrap">

    {/* Blinking red dot */}
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
    </span>

    {/* LIVE text */}
    <span className="text-red-500 animate-pulse tracking-wide">
      LIVE NEWS
    </span>

  </span>
</div>

          {/* Scrolling track */}
          <div
            className="flex-1 overflow-hidden cursor-pointer py-2.5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              ref={tickerRef}
              className="flex gap-10 whitespace-nowrap"
              style={{  
                animation: paused ? "none" : "ticker 20s linear infinite",
                willChange: "transform",
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...items, ...items].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors shrink-0 group"
                >
                  <Newspaper className="h-3.5 w-3.5 opacity-70 shrink-0" />
                  <span className="text-xs">{item.title}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* View all */}
          <a
            href="/realhubb-news"
            className="shrink-0 pl-4 py-2.5 border-l border-white/20 ml-4 text-xs font-normal hover:text-white/80 transition-colors whitespace-nowrap"
          >
            View All →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}