// src/pages/social/GalleryNav.tsx
// Redesigned to match home page premium navy/gold design system.

import { Link, useLocation } from "react-router-dom";

const TABS = [
  { key: "google",    label: "Google Reviews", path: "/gallery/google-reviews" },
  { key: "youtube",  label: "YouTube",         path: "/gallery/youtube"         },
  { key: "instagram",label: "Instagram",       path: "/gallery/instagram"       },
  { key: "linkedin", label: "LinkedIn",        path: "/gallery/linkedin"        },
] as const;

const GalleryNav = () => {
  const location = useLocation();

  return (
    <div className="sticky top-16 z-40 bg-[#00274D] border-b border-white/10 shadow-sm mb-10">
      <div className="px-8 md:px-14 lg:px-20 xl:px-28 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-normal text-white shrink-0">
          Social <span className="text-[#D7A764]">Gallery</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <Link key={tab.key} to={tab.path}>
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-normal transition-all duration-200 ${
                  location.pathname === tab.path
                    ? "bg-[#D7A764] text-[#00274D]"
                    : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryNav;