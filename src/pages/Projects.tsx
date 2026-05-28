import { useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PropertyCard from "@/components/property/PropertyCard";
import CitySelector from "@/components/property/CitySelector";
import PropertySearchFilter, { PropertyFilters } from "@/components/property/PropertySearchFilter";
import { Building2, ArrowRight, Clock, Construction } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { useProperties } from "../hooks/Useproperties";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

type CityKey = "all" | "bangalore" | "hyderabad" | "chennai";
type ProjectType = "ongoing" | "upcoming";

const EMPTY_FILTERS: PropertyFilters = {
  searchQuery: "", bhk: "all", type: "all", city: "all", priceRange: "all",
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
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100" style={{ minHeight: "380px" }}>
    <div className="w-full bg-gray-100 animate-pulse" style={{ height: "220px" }} />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-100 animate-pulse rounded w-3/4" />
      <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
      <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
      <div className="h-9 bg-gray-100 animate-pulse rounded w-full mt-2" />
    </div>
  </div>
);

const Projects = () => {
  const { type: typeParam, city: cityParam } = useParams<{ type?: string; city?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const projectType: ProjectType =
    typeParam === "upcoming" ? "upcoming" : "ongoing";

  const activeCity: CityKey =
    cityParam && (["bangalore", "hyderabad", "chennai"] as CityKey[]).includes(cityParam.toLowerCase() as CityKey)
      ? (cityParam.toLowerCase() as CityKey)
      : "all";

  const initialFilters: PropertyFilters = useMemo(() => {
    const type      = searchParams.get("type")  ?? "all";
    const priceRange = searchParams.get("price") ?? "all";
    return { ...EMPTY_FILTERS, type, priceRange };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchFilters, setSearchFilters] = useState<PropertyFilters>(initialFilters);
  const [animKey, setAnimKey] = useState(0);

  const { ongoing, upcoming, loading } = useProperties();

  const source = projectType === "ongoing" ? ongoing : upcoming;

  const filteredProperties = useMemo(
    () => applyFilters(source, activeCity, searchFilters),
    [source, activeCity, searchFilters]
  );

  const handleTypeChange = (type: ProjectType) => {
    navigate(`/projects/${type}`);
    setSearchFilters(EMPTY_FILTERS);
    setAnimKey(k => k + 1);
  };

  const handleCityChange = (city: string) => {
    if (city === "all") navigate(`/projects/${projectType}`);
    else navigate(`/projects/${projectType}/${city.toLowerCase()}`);
    setAnimKey(k => k + 1);
  };

  const handleFilterChange = (filters: PropertyFilters) => {
    setSearchFilters(filters);
    if (filters.city !== "all") navigate(`/projects/${projectType}/${filters.city.toLowerCase()}`);
    else navigate(`/projects/${projectType}`);
  };

  return (
    <>
      <SEO
        title="Projects | Ongoing & Upcoming Properties | RealHubb"
        description="Browse RERA-approved ongoing and upcoming residential projects in Bangalore, Hyderabad & Chennai. Find your dream home with RealHubb."
        keywords="ongoing projects, upcoming projects, real estate Bangalore, property Hyderabad, apartments Chennai, RealHubb projects"
        canonical="https://www.realhubb.in/projects"
        image="https://www.realhubb.in/og/projects.jpg"
        type="website"
      />

      <style>{`
        @keyframes projectsFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .projects-grid-enter {
          animation: projectsFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                Our Properties
              </p>

              <h1 className="text-4xl md:text-[52px] font-normal text-white leading-tight mb-6">
                {projectType === "ongoing" ? (
                  <>Ongoing <span className="text-[#D7A764]">Projects</span></>
                ) : (
                  <>Upcoming <span className="text-[#D7A764]">Projects</span></>
                )}
              </h1>

              {/* Project type toggle */}
              <div className="mb-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Select project type</p>
                <div className="inline-flex gap-3 flex-wrap">
                  <button
                    onClick={() => handleTypeChange("ongoing")}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      projectType === "ongoing"
                        ? "bg-[#D7A764] border-[#D7A764] text-[#00274D]"
                        : "bg-white/5 border-white/20 text-white/70 hover:border-[#D7A764]/60 hover:bg-white/10"
                    }`}
                  >
                    <Construction className={`w-5 h-5 shrink-0 ${projectType === "ongoing" ? "text-[#00274D]" : "text-[#D7A764]"}`} />
                    <div className="text-left">
                      <p className={`text-sm font-medium leading-tight ${projectType === "ongoing" ? "text-[#00274D]" : "text-white"}`}>
                        Ongoing
                      </p>
                      <p className={`text-xs leading-tight mt-0.5 ${projectType === "ongoing" ? "text-[#00274D]/70" : "text-white/40"}`}>
                        Under construction
                      </p>
                    </div>
                    {projectType === "ongoing" && (
                      <span className="ml-1 w-5 h-5 rounded-full bg-[#00274D]/20 flex items-center justify-center text-[10px] text-[#00274D] font-bold">✓</span>
                    )}
                  </button>

                  <button
                    onClick={() => handleTypeChange("upcoming")}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      projectType === "upcoming"
                        ? "bg-[#D7A764] border-[#D7A764] text-[#00274D]"
                        : "bg-white/5 border-white/20 text-white/70 hover:border-[#D7A764]/60 hover:bg-white/10"
                    }`}
                  >
                    <Clock className={`w-5 h-5 shrink-0 ${projectType === "upcoming" ? "text-[#00274D]" : "text-[#D7A764]"}`} />
                    <div className="text-left">
                      <p className={`text-sm font-medium leading-tight ${projectType === "upcoming" ? "text-[#00274D]" : "text-white"}`}>
                        Upcoming
                      </p>
                      <p className={`text-xs leading-tight mt-0.5 ${projectType === "upcoming" ? "text-[#00274D]/70" : "text-white/40"}`}>
                        Pre-launch &amp; new launches
                      </p>
                    </div>
                    {projectType === "upcoming" && (
                      <span className="ml-1 w-5 h-5 rounded-full bg-[#00274D]/20 flex items-center justify-center text-[10px] text-[#00274D] font-bold">✓</span>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-white/60 text-base leading-relaxed max-w-xl mb-6">
                {projectType === "ongoing"
                  ? "Under-construction RERA-approved properties across Bangalore, Hyderabad, and Chennai with flexible payment plans."
                  : "Explore soon-to-launch RERA-approved residential projects. Book early for best prices and unit selection."}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs">
                  <span className="text-white font-medium">{loading ? "…" : filteredProperties.length}</span>
                  &nbsp;{projectType === "ongoing" ? "active projects" : "upcoming launches"}
                </span>
                {projectType === "upcoming" && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7A764]/10 text-[#D7A764] text-xs">
                    🔑 Early access pricing
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs">
                  ✅ 100% RERA Approved
                </span>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-12 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            <CitySelector value={activeCity} onChange={handleCityChange} />

            <div className="mt-5">
              <PropertySearchFilter
                onFilterChange={handleFilterChange}
                totalResults={filteredProperties.length}
                initialFilters={initialFilters}
              />
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Grid — key swap triggers fade-in animation on every type/city change */}
            {!loading && filteredProperties.length > 0 && (
              <div
                key={animKey}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 projects-grid-enter"
              >
                {filteredProperties.map((property, index) => (
                  <FadeInOnScroll key={property.id} direction="up" delay={Math.min(index * 55, 280)}>
                    <PropertyCard property={property} imagePriority={index < 3} />
                  </FadeInOnScroll>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredProperties.length === 0 && (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Building2 className="h-10 w-10 text-[#D7A764]" />
                </div>
                <h3 className="text-2xl font-normal text-[#00274D] mb-2">No Projects Found</h3>
                <p className="text-gray-400 text-sm">
                  Try adjusting your filters or switching between Ongoing / Upcoming.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-2">
                    Get Expert Help
                  </p>
                  <h2 className="text-2xl md:text-3xl font-normal text-white">
                    Can't find what you're looking for?
                  </h2>
                </div>
                <a href="/contact-us">
                  <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105 shrink-0">
                    Talk to an Advisor
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  );
};

export default Projects;
