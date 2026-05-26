/**
 * Ongoing Projects Page — Performance Optimized
 * Redesigned to match home page premium navy/gold design system.
 */

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyCard from "@/components/property/PropertyCard";
import CitySelector from "@/components/property/CitySelector";
import PropertySearchFilter, { PropertyFilters } from "@/components/property/PropertySearchFilter";
import { Construction, ArrowRight } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { useProperties } from "../hooks/Useproperties";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

type CityKey = "all" | "bangalore" | "hyderabad" | "chennai";
const VALID_CITIES: CityKey[] = ["bangalore", "hyderabad", "chennai"];

const citySEO: Record<CityKey, {
  title: string; description: string; keywords: string;
  canonical: string; heading: string; subheading: string;
}> = {
  all: {
    title: "Ongoing Projects in Bangalore, Hyderabad & Chennai | RealHubb",
    description: "Browse RERA-approved under-construction apartments, villas & plots in Bangalore, Hyderabad & Chennai. Book now with pre-launch offers and flexible payment plans via RealHubb.",
    keywords: "ongoing projects Bangalore, under construction apartments Hyderabad, pre-launch properties Chennai, RERA approved ongoing projects, new construction properties India, RealHubb ongoing projects",
    canonical: "https://www.realhubb.in/ongoing-projects",
    heading: "Ongoing Projects",
    subheading: "Under-construction RERA-approved properties across Bangalore, Hyderabad, and Chennai with attractive pre-launch offers and flexible payment plans.",
  },
  bangalore: {
    title: "Ongoing Projects in Bangalore | RERA Approved Properties | RealHubb",
    description: "Explore RERA-approved under-construction apartments, villas, and plotted developments in Bangalore. Get pre-launch prices, expert guidance, and site visits with RealHubb.",
    keywords: "ongoing projects Bangalore, under construction flats Bangalore, RERA approved apartments Bangalore, new residential projects Bangalore 2025, pre-launch properties Bangalore",
    canonical: "https://www.realhubb.in/ongoing-projects/bangalore",
    heading: "Ongoing Projects in Bangalore",
    subheading: "Discover RERA-approved under-construction apartments, villas, and plots across Bangalore's fastest-growing localities — from Whitefield and Sarjapur to Electronic City and Hebbal.",
  },
  hyderabad: {
    title: "Ongoing Projects in Hyderabad | RERA Approved Properties | RealHubb",
    description: "Find RERA-approved under-construction flats, villas, and plots in Hyderabad. Book at pre-launch prices with expert real estate guidance from RealHubb.",
    keywords: "ongoing projects Hyderabad, under construction apartments Hyderabad, RERA approved projects Hyderabad, new residential projects Hyderabad 2025, pre-launch flats Hyderabad",
    canonical: "https://www.realhubb.in/ongoing-projects/hyderabad",
    heading: "Ongoing Projects in Hyderabad",
    subheading: "Explore RERA-approved residential projects under construction across Hyderabad — covering Gachibowli, Kondapur, Kokapet, Narsingi, and surrounding growth corridors.",
  },
  chennai: {
    title: "Ongoing Projects in Chennai | RERA Approved Properties | RealHubb",
    description: "Browse RERA-approved under-construction homes and plots in Chennai. RealHubb offers verified listings, guided site visits, and home loan assistance for Chennai property buyers.",
    keywords: "ongoing projects Chennai, under construction flats Chennai, RERA approved projects Chennai, new residential projects Chennai 2025, pre-launch properties Chennai",
    canonical: "https://www.realhubb.in/ongoing-projects/chennai",
    heading: "Ongoing Projects in Chennai",
    subheading: "Find RERA-approved under-construction apartments, villas, and plotted developments in Chennai — spanning OMR, Porur, Sholinganallur, Perungudi, and key residential corridors.",
  },
};

const applyFilters = (list: any[], city: CityKey, filters: PropertyFilters): any[] => {
  let result = [...list];
  if (city !== "all") result = result.filter(p => (p.city || "").toLowerCase() === city);
  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.trim().toLowerCase();
    result = result.filter(p =>
      (p.title || p.name || "").toLowerCase().includes(q) ||
      (p.location || "").toLowerCase().includes(q)
    );
  }
  if (filters.bhk !== "all") result = result.filter(p => (p.bhk || p.bedrooms || "").toLowerCase() === filters.bhk.toLowerCase());
  if (filters.type !== "all") result = result.filter(p => (p.type || "").toLowerCase() === filters.type.toLowerCase());
  if (filters.city !== "all") result = result.filter(p => (p.city || "").toLowerCase() === filters.city.toLowerCase());
  if (filters.priceRange !== "all") {
    const [min, max] = filters.priceRange.split("-").map(Number);
    result = result.filter(p => p.priceValue >= min && p.priceValue <= max);
  }
  result.sort((a, b) => {
    const aFeat = a.featured === "true" || a.featured === true ? 0 : 1;
    const bFeat = b.featured === "true" || b.featured === true ? 0 : 1;
    return aFeat - bFeat;
  });
  return result;
};

const SkeletonCard = () => (
  <div
    className="rounded-2xl overflow-hidden bg-white border border-gray-100"
    style={{ contain: "layout paint", minHeight: "380px" }}
    aria-hidden="true"
  >
    <div className="w-full bg-gray-100 animate-pulse" style={{ height: "220px" }} />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-100 animate-pulse rounded w-3/4" />
      <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
      <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
      <div className="flex gap-2 pt-1">
        <div className="h-6 bg-gray-100 animate-pulse rounded w-16" />
        <div className="h-6 bg-gray-100 animate-pulse rounded w-16" />
      </div>
      <div className="h-9 bg-gray-100 animate-pulse rounded w-full mt-2" />
    </div>
  </div>
);

interface LazyCardProps { property: any; priority: boolean; animationDelay: number; }

const LazyCard = ({ property, priority, animationDelay }: LazyCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(priority);

  useEffect(() => {
    if (priority || inView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, inView]);

  return (
    <div ref={ref} className="fade-in" style={{ animationDelay: `${animationDelay}s`, contain: "layout", minHeight: "380px" }}>
      {inView ? <PropertyCard property={property} /> : <SkeletonCard />}
    </div>
  );
};

const BATCH_SIZE = 6;
const BATCH_DELAY = 16;

function useBatchedList<T>(list: T[]): T[] {
  const [rendered, setRendered] = useState<T[]>([]);
  useEffect(() => {
    if (list.length === 0) { setRendered([]); return; }
    setRendered(list.slice(0, BATCH_SIZE));
    if (list.length <= BATCH_SIZE) return;
    let index = BATCH_SIZE;
    let timer: ReturnType<typeof setTimeout>;
    const addBatch = () => {
      if (index >= list.length) return;
      const next = index + BATCH_SIZE;
      setRendered(list.slice(0, next));
      index = next;
      if (index < list.length) timer = setTimeout(addBatch, BATCH_DELAY);
    };
    timer = setTimeout(addBatch, BATCH_DELAY);
    return () => clearTimeout(timer);
  }, [list]);
  return rendered;
}

const OngoingProjects = () => {
  const { city: cityParam } = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const activeCity: CityKey = useMemo(
    () => cityParam && VALID_CITIES.includes(cityParam.toLowerCase() as CityKey)
      ? (cityParam.toLowerCase() as CityKey) : "all",
    [cityParam]
  );

  const [searchFilters, setSearchFilters] = useState<PropertyFilters>({
    searchQuery: "", bhk: "all", type: "all", city: "all", priceRange: "all",
  });

  useEffect(() => {
    setSearchFilters({ searchQuery: "", bhk: "all", type: "all", city: "all", priceRange: "all" });
  }, [activeCity]);

  const { ongoing, loading } = useProperties();

  const filteredProperties = useMemo(
    () => applyFilters(ongoing, activeCity, searchFilters),
    [ongoing, activeCity, searchFilters]
  );

  const renderedProperties = useBatchedList(filteredProperties);
  const seo = citySEO[activeCity];

  const handleCityChange = useCallback((city: string) => {
    if (city === "all") navigate("/ongoing-projects");
    else navigate(`/ongoing-projects/${city.toLowerCase()}`);
  }, [navigate]);

  const handleFilterChange = useCallback((filters: PropertyFilters) => {
    setSearchFilters(filters);
    if (filters.city !== "all") navigate(`/ongoing-projects/${filters.city.toLowerCase()}`);
  }, [navigate]);

  const breadcrumb = useMemo(() =>
    activeCity === "all"
      ? [{ name: "Home", url: "https://www.realhubb.in/" }, { name: "Ongoing Projects", url: "https://www.realhubb.in/ongoing-projects" }]
      : [
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Ongoing Projects", url: "https://www.realhubb.in/ongoing-projects" },
          { name: `Ongoing Projects in ${activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}`, url: `https://www.realhubb.in/ongoing-projects/${activeCity}` },
        ],
    [activeCity]
  );

  return (
    <>
      <SEO
        title={seo.title} description={seo.description} keywords={seo.keywords}
        canonical={seo.canonical} image="https://www.realhubb.in/og/ongoing-projects.jpg"
        type="website" breadcrumb={breadcrumb}
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-16 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                Properties
              </p>
              <h1 className="text-4xl md:text-[52px] font-normal text-white leading-tight mb-4 max-w-3xl">
                {seo.heading.includes("in") ? (
                  <>
                    {seo.heading.split(" in ")[0]}{" "}
                    <span className="text-[#D7A764]">in {seo.heading.split(" in ")[1]}</span>
                  </>
                ) : (
                  <>
                    Ongoing <span className="text-[#D7A764]">Projects</span>
                  </>
                )}
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-2xl mb-6">{seo.subheading}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-normal">
                  <Construction className="w-3.5 h-3.5 text-[#D7A764]" />
                  {loading && filteredProperties.length === 0 ? "…" : filteredProperties.length} Projects
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D7A764]/10 border border-[#D7A764]/20 text-[#D7A764] text-xs font-normal">
                  Pre-launch offers available
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-700/30 text-green-400 text-xs font-normal">
                  ✅ 100% RERA Approved
                </span>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── FILTERS + GRID ── */}
        <section className="py-12 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            {/* City Selector */}
            <CitySelector value={activeCity} onChange={handleCityChange} />

            {/* Search & Filter */}
            <div className="mt-5">
              <PropertySearchFilter onFilterChange={handleFilterChange} totalResults={filteredProperties.length} />
            </div>

            {/* Skeleton */}
            {loading && filteredProperties.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8" aria-label="Loading properties" aria-busy="true">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Grid */}
            {renderedProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {renderedProperties.map((property, index) => (
                  <LazyCard
                    key={property.id}
                    property={property}
                    priority={index < 6}
                    animationDelay={Math.min(index * 0.05, 0.3)}
                  />
                ))}
                {loading && renderedProperties.length < filteredProperties.length &&
                  Array.from({ length: Math.min(3, filteredProperties.length - renderedProperties.length) })
                    .map((_, i) => <SkeletonCard key={`tail-${i}`} />)
                }
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredProperties.length === 0 && (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Construction className="h-10 w-10 text-[#D7A764]" />
                </div>
                <h3 className="text-2xl font-normal text-[#00274D] mb-2">No Properties Found</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Try adjusting your filters or{" "}
                  <button onClick={() => navigate("/ongoing-projects")} className="text-[#D7A764] underline">
                    view all cities
                  </button>
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="py-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28 text-center">
            <FadeInOnScroll direction="up">
              <h2 className="text-3xl md:text-[40px] font-normal text-white leading-tight mb-4">
                Can't find what you're <span className="text-[#D7A764]">looking for?</span>
              </h2>
              <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
                Our advisors have access to exclusive pre-launch listings not yet on the website.
              </p>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105"
              >
                Talk to an Advisor
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  );
};

export default OngoingProjects;