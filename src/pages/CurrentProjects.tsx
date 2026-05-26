/**
 * Upcoming Projects Page — connected to Firestore
 * URL: /upcoming-projects          → shows all cities
 * URL: /upcoming-projects/bangalore → filters to Bangalore
 * URL: /upcoming-projects/hyderabad → filters to Hyderabad
 * URL: /upcoming-projects/chennai   → filters to Chennai
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PropertyCard from "@/components/property/PropertyCard";
import CitySelector from "@/components/property/CitySelector";
import PropertySearchFilter, { PropertyFilters } from "@/components/property/PropertySearchFilter";
import { Clock, ChevronRight, ArrowRight } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { useProperties } from "../hooks/Useproperties";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

type CityKey = "all" | "bangalore" | "hyderabad" | "chennai";

const citySEO: Record<CityKey, {
  title: string; description: string; keywords: string;
  canonical: string; heading: string; subheading: string;
}> = {
  all: {
    title: "Upcoming Projects in Bangalore, Hyderabad & Chennai | RealHubb",
    description: "Discover RERA-approved upcoming residential projects in Bangalore, Hyderabad & Chennai. Book early at pre-launch prices and secure your dream home with RealHubb.",
    keywords: "upcoming projects Bangalore, new launch properties Hyderabad, pre-launch apartments Chennai, RERA approved upcoming projects India, RealHubb upcoming projects",
    canonical: "https://www.realhubb.in/upcoming-projects",
    heading: "Upcoming Projects",
    subheading: "Explore soon-to-launch RERA-approved residential projects across Bangalore, Hyderabad, and Chennai. Book early for the best prices and unit selection.",
  },
  bangalore: {
    title: "Upcoming Projects in Bangalore | Pre-Launch Properties | RealHubb",
    description: "Discover new launch apartments, villas, and plots in Bangalore. Book at pre-launch prices with RealHubb — verified listings, site visits, and home loan support.",
    keywords: "upcoming projects Bangalore, new launch flats Bangalore, pre-launch apartments Bangalore 2025, RERA approved upcoming properties Bangalore",
    canonical: "https://www.realhubb.in/upcoming-projects/bangalore",
    heading: "Upcoming Projects in Bangalore",
    subheading: "Get early access to new residential launches in Bangalore — from North Bangalore and Whitefield to Sarjapur Road and Electronic City.",
  },
  hyderabad: {
    title: "Upcoming Projects in Hyderabad | Pre-Launch Properties | RealHubb",
    description: "Find new launch flats, villas, and plots in Hyderabad at pre-launch prices. RealHubb offers verified upcoming projects with expert guidance and site visits.",
    keywords: "upcoming projects Hyderabad, new launch apartments Hyderabad, pre-launch properties Hyderabad 2025, RERA approved upcoming projects Hyderabad",
    canonical: "https://www.realhubb.in/upcoming-projects/hyderabad",
    heading: "Upcoming Projects in Hyderabad",
    subheading: "Book early in new residential launches across Hyderabad — Gachibowli, Kokapet, Narsingi, and fast-growing outskirts.",
  },
  chennai: {
    title: "Upcoming Projects in Chennai | Pre-Launch Properties | RealHubb",
    description: "Explore new launch apartments and plotted developments in Chennai. Book pre-launch with RealHubb for the best prices, verified listings, and home loan assistance.",
    keywords: "upcoming projects Chennai, new launch flats Chennai, pre-launch apartments Chennai 2025, RERA approved upcoming properties Chennai",
    canonical: "https://www.realhubb.in/upcoming-projects/chennai",
    heading: "Upcoming Projects in Chennai",
    subheading: "Discover upcoming residential launches across Chennai — OMR, Sholinganallur, Porur, and key growth corridors.",
  },
};

const VALID_CITIES: CityKey[] = ["bangalore", "hyderabad", "chennai"];

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
  if (filters.bhk !== "all")  result = result.filter(p => (p.bhk || p.bedrooms || "").toLowerCase() === filters.bhk.toLowerCase());
  if (filters.type !== "all") result = result.filter(p => (p.type || "").toLowerCase() === filters.type.toLowerCase());
  if (filters.city !== "all") result = result.filter(p => (p.city || "").toLowerCase() === filters.city.toLowerCase());
  if (filters.priceRange !== "all") {
    const [min, max] = filters.priceRange.split("-").map(Number);
    result = result.filter(p => p.priceValue >= min && p.priceValue <= max);
  }

  result.sort((a, b) => {
    const aFeat = (a as any).featured === "true" || (a as any).featured === true ? 0 : 1;
    const bFeat = (b as any).featured === "true" || (b as any).featured === true ? 0 : 1;
    return aFeat - bFeat;
  });

  return result;
};

const UpcomingProjects = () => {
  const { city: cityParam } = useParams<{ city?: string }>();
  const navigate = useNavigate();

  const activeCity: CityKey =
    cityParam && VALID_CITIES.includes(cityParam.toLowerCase() as CityKey)
      ? (cityParam.toLowerCase() as CityKey)
      : "all";

  const [searchFilters, setSearchFilters] = useState<PropertyFilters>({
    searchQuery: "", bhk: "all", type: "all", city: "all", priceRange: "all",
  });

  const { upcoming, loading } = useProperties();

  useEffect(() => {
    setSearchFilters({ searchQuery: "", bhk: "all", type: "all", city: "all", priceRange: "all" });
  }, [activeCity]);

  const filteredProperties = applyFilters(upcoming, activeCity, searchFilters);
  const seo = citySEO[activeCity];

  const handleCityChange = (city: string) => {
    if (city === "all") navigate("/upcoming-projects");
    else navigate(`/upcoming-projects/${city.toLowerCase()}`);
  };

  const handleFilterChange = (filters: PropertyFilters) => {
    setSearchFilters(filters);
    if (filters.city !== "all") navigate(`/upcoming-projects/${filters.city.toLowerCase()}`);
  };

  const breadcrumb = activeCity === "all"
    ? [
        { name: "Home", url: "https://www.realhubb.in/" },
        { name: "Upcoming Projects", url: "https://www.realhubb.in/upcoming-projects" },
      ]
    : [
        { name: "Home", url: "https://www.realhubb.in/" },
        { name: "Upcoming Projects", url: "https://www.realhubb.in/upcoming-projects" },
        {
          name: `Upcoming Projects in ${activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}`,
          url: `https://www.realhubb.in/upcoming-projects/${activeCity}`,
        },
      ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        image="https://www.realhubb.in/og/upcoming-projects.jpg"
        type="website"
        breadcrumb={breadcrumb}
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
                <Link to="/" className="hover:text-[#D7A764] transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                {activeCity !== "all" && (
                  <>
                    <Link to="/upcoming-projects" className="hover:text-[#D7A764] transition-colors">Upcoming Projects</Link>
                    <ChevronRight className="h-3 w-3" />
                  </>
                )}
                <span className="text-white/70 font-medium">
                  {activeCity === "all" ? "Upcoming Projects" : activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}
                </span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-[#D7A764]/10 text-[#D7A764] text-xs font-normal px-3 py-1.5 rounded-full mb-5">
                <Clock className="h-3.5 w-3.5" />
                Pre-Launch &amp; Upcoming
              </div>

              <h1 className="text-4xl md:text-[52px] font-normal text-white leading-tight mb-4 max-w-2xl">
                {activeCity === "all" ? (
                  <>Upcoming <span className="text-[#D7A764]">Projects</span></>
                ) : (
                  <>Upcoming Projects in{" "}
                    <span className="text-[#D7A764]">
                      {activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xl mb-6">
                {seo.subheading}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-medium">
                  <span className="font-normal text-white">{loading ? "…" : filteredProperties.length}</span>
                  {activeCity === "all" ? " upcoming launches" : ` launches in ${activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}`}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7A764]/10 text-[#D7A764] text-xs font-medium">
                  🔑 Early access pricing
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-medium">
                  ✅ 100% RERA Approved
                </span>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            {/* City Selector */}
            <CitySelector value={activeCity} onChange={handleCityChange} />

            {/* Search & Filter */}
            <PropertySearchFilter
              onFilterChange={handleFilterChange}
              totalResults={filteredProperties.length}
            />

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-[220px] bg-gray-100 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                      <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                      <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Properties Grid */}
            {!loading && filteredProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {filteredProperties.map((property, index) => (
                  <FadeInOnScroll key={property.id} direction="up" delay={Math.min(index * 60, 300)}>
                    <PropertyCard property={property} imagePriority={index < 3} />
                  </FadeInOnScroll>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredProperties.length === 0 && (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Clock className="h-10 w-10 text-[#D7A764]" />
                </div>
                <h3 className="text-2xl font-normal text-[#00274D] mb-2">No Projects Found</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Try adjusting your filters or{" "}
                  <button
                    onClick={() => navigate("/upcoming-projects")}
                    className="text-[#D7A764] underline font-medium"
                  >
                    view all cities
                  </button>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Strip */}
        <section className="py-16 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-2">
                    Early Bird Advantage
                  </p>
                  <h2 className="text-2xl md:text-3xl font-normal text-white">
                    Be the first to know about new launches
                  </h2>
                </div>
                <Link to="/contact-us">
                  <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105 shrink-0">
                    Talk to an Advisor
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  );
};

export default UpcomingProjects;