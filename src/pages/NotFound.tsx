// src/pages/NotFound.tsx
// Redesigned to match home page premium navy/gold design system.

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#00274D] flex flex-col items-center justify-center px-8 text-center">
      {/* Large 404 */}
      <p className="text-[#D7A764]/20 font-normal leading-none select-none"
        style={{ fontSize: "clamp(120px, 25vw, 240px)" }}>
        404
      </p>

      {/* Content */}
      <div className="-mt-8 relative z-10">
        <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
          Page Not Found
        </p>
        <h1 className="text-3xl md:text-5xl font-normal text-white leading-tight mb-4">
          Looks like you've wandered<br />
          off the <span className="text-[#D7A764]">property map.</span>
        </h1>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto mb-10">
          The page you're looking for doesn't exist or may have moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105">
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
          <Link to="/ongoing-projects">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 font-normal text-sm transition-colors duration-200">
              Browse Properties
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;