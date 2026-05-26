// src/pages/Gallery.tsx
// Redesigned to match home page premium navy/gold design system.

import { Link, useLocation } from "react-router-dom";
import SEO from "../components/seo/SEO";

const TABS = [
  { key: "google",    label: "Google Reviews", path: "/gallery/google-reviews" },
  { key: "youtube",  label: "YouTube",         path: "/gallery/youtube"         },
  { key: "instagram",label: "Instagram",       path: "/gallery/instagram"       },
  { key: "linkedin", label: "LinkedIn",        path: "/gallery/linkedin"        },
] as const;

const Gallery = () => {
  const location = useLocation();

  return (
    <>
      <SEO
        title="Social Media Gallery | Reviews, Videos & Posts | RealHubb"
        description="Explore RealHubb's verified Google reviews, YouTube property videos, Instagram posts and LinkedIn updates. See real client experiences across Bangalore, Hyderabad & Chennai."
        keywords="RealHubb reviews, RealHubb YouTube, RealHubb Instagram, real estate client reviews Bangalore, property videos India, RealHubb social media"
        canonical="https://www.realhubb.in/gallery"
        image="https://www.realhubb.in/og/gallery.jpg"
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Gallery", url: "https://www.realhubb.in/gallery" },
        ]}
      />

      <div className="min-h-screen bg-[#faf6f1]">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-[#00274D] border-b border-white/10 shadow-sm">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28 py-5 flex flex-col items-center gap-4">
            <h1 className="text-2xl font-normal text-white text-center">
              Social <span className="text-[#D7A764]">Gallery</span>
            </h1>

            <div className="flex flex-wrap justify-center gap-2">
              {TABS.map((tab) => (
                <Link key={tab.key} to={tab.path}>
                  <button
                    className={`px-5 py-2 rounded-full text-sm font-normal transition-all duration-200 ${
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

        {/* Content */}
        <div className="px-8 md:px-14 lg:px-20 xl:px-28 py-16 text-center">
          <p className="text-gray-400 text-base">
            Select a tab above to view content for each social platform.
          </p>
        </div>
      </div>
    </>
  );
};

export default Gallery;