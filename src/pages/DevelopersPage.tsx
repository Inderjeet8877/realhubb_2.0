// src/pages/DevelopersPage.tsx
// Redesigned to match home page premium navy/gold design system.

import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import SEO from "@/components/seo/SEO"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import {
  Building2, MapPin, Star, ArrowRight,
  Search, CheckCircle, TrendingUp, Award,
} from "lucide-react"
import { useDevelopers } from "@/hooks/useDevelopers"

const CITY_FILTERS = [
  { key: "all",       label: "All Cities" },
  { key: "bangalore", label: "Bangalore"  },
  { key: "hyderabad", label: "Hyderabad"  },
  { key: "chennai",   label: "Chennai"    },
  { key: "mumbai",    label: "Mumbai"     },
  { key: "pune",      label: "Pune"       },
]

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={12}
        style={{ fill: s <= Math.round(rating) ? "#D7A764" : "transparent", color: s <= Math.round(rating) ? "#D7A764" : "#d1d5db" }}
      />
    ))}
    <span className="text-xs font-normal text-[#00274D] ml-1">{rating}</span>
  </div>
)

const DevCard = ({ dev }: { dev: any }) => (
  <Link to={`/developers/${dev.slug}`} className="group block h-full" aria-label={`View projects by ${dev.name}`}>
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col h-full group-hover:ring-1 group-hover:ring-[#D7A764]/40">
      {/* Logo + rating */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-28 h-12 flex items-center">
          <img src={dev.logo} alt={`${dev.name} logo`} loading="lazy" className="max-w-full max-h-full object-contain" />
        </div>
        <Stars rating={dev.customerRating} />
      </div>

      {/* Name + location */}
      <h3 className="text-[#00274D] font-normal text-base mb-1 group-hover:text-[#D7A764] transition-colors duration-200">
        {dev.name}
      </h3>
      <p className="flex items-center gap-1 text-gray-400 text-xs mb-3">
        <MapPin size={11} /> {dev.headquarters} · Est. {dev.established}
      </p>
      <span className="block h-px w-8 bg-[#D7A764] mb-3" />

      {/* Description */}
      <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
        {dev.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#faf6f1] rounded-xl p-3 text-center">
          <p className="text-lg font-normal text-[#00274D] leading-none">{dev.projectsCompleted}+</p>
          <p className="text-[10px] text-gray-400 mt-1">Completed</p>
        </div>
        <div className="bg-[#faf6f1] rounded-xl p-3 text-center">
          <p className="text-lg font-normal text-[#D7A764] leading-none">{dev.ongoingProjects}</p>
          <p className="text-[10px] text-gray-400 mt-1">Ongoing</p>
        </div>
      </div>

      {/* Location tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {dev.keyLocations.slice(0, 3).map((loc: string) => (
          <span key={loc} className="text-[10px] px-2.5 py-1 rounded-full bg-[#D7A764]/10 text-[#D7A764] border border-[#D7A764]/20 font-medium">
            {loc}
          </span>
        ))}
        {dev.keyLocations.length > 3 && (
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-400">
            +{dev.keyLocations.length - 3} more
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-[#D7A764] text-[10px] font-normal uppercase tracking-[0.15em] group-hover:gap-2.5 transition-all duration-200 mt-auto">
        View Projects
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
)

const DevelopersPage = () => {
  const [cityFilter, setCityFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { developers, loading } = useDevelopers()

  const filtered = useMemo(() => {
    let result = [...developers]
    if (cityFilter !== "all") result = result.filter(d => d.keyLocations.some((loc: string) => loc.toLowerCase().includes(cityFilter)))
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.headquarters.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [developers, cityFilter, searchQuery])

  return (
    <>
      <SEO
        title="Trusted Real Estate Developers in Bangalore, Hyderabad & Chennai | RealHubb"
        description="Explore RealHubb's curated list of RERA-registered real estate developers in Bangalore, Hyderabad, and Chennai. Find verified builders like Prestige, Brigade, Sobha, Godrej, Tata Housing, and more."
        keywords="real estate developers Bangalore, trusted builders Hyderabad, RERA registered developers Chennai, Prestige Group, Brigade Group, Sobha Limited, Godrej Properties, top builders India, RealHubb developers"
        canonical="https://www.realhubb.in/developers"
        image="https://www.realhubb.in/assets/realhubb%20trademark%20logo-DpR5IVGg.png"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Developers", url: "https://www.realhubb.in/developers" },
        ]}
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                Developer Network
              </p>
              <h1 className="text-4xl md:text-[52px] font-normal text-white leading-tight mb-4 max-w-3xl">
                India's most <span className="text-[#D7A764]">trusted</span> developers, curated for you.
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
                RealHubb partners exclusively with <strong className="text-white">RERA-registered, verified developers</strong> across
                Bangalore, Hyderabad, and Chennai. Every builder is carefully evaluated for construction quality, delivery
                track record, legal compliance, and customer trust.
              </p>
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { text: `${developers.length}+ Verified Developers`, cls: "bg-white/10 border-white/10 text-white/80" },
                  { text: "100% RERA Registered",  cls: "bg-green-900/30 border-green-700/30 text-green-400" },
                  { text: "3 Major Cities",          cls: "bg-[#D7A764]/10 border-[#D7A764]/20 text-[#D7A764]" },
                  { text: "Award-Winning Builders",  cls: "bg-white/10 border-white/10 text-white/80" },
                ].map(p => (
                  <span key={p.text} className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-normal ${p.cls}`}>
                    {p.text}
                  </span>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── WHY VERIFIED ── */}
        <section className="py-16 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
                <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                  Our Commitment
                </p>
                <h2 className="text-2xl font-normal text-[#00274D] mb-4">
                  Why RealHubb only works with <span className="text-[#D7A764]">verified developers</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-500 text-sm leading-relaxed">
                  <p>
                    Choosing the right developer is one of the most critical decisions in a property purchase. At RealHubb,
                    we partner only with RERA-registered builders who have a demonstrated history of on-time project delivery,
                    transparent documentation, and quality construction.
                  </p>
                  <p>
                    Whether you're looking at a luxury apartment by{" "}
                    <Link to="/developers/prestige-group" className="text-[#D7A764] hover:underline font-medium">Prestige Group</Link> in Bangalore, a premium villa by{" "}
                    <Link to="/developers/sobha-limited" className="text-[#D7A764] hover:underline font-medium">Sobha Limited</Link>, or an affordable home by{" "}
                    <Link to="/developers/provident-housing" className="text-[#D7A764] hover:underline font-medium">Provident Housing</Link>{" "}
                    in Chennai — every option on RealHubb comes with our verification seal.
                  </p>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── SEARCH + FILTER + GRID ── */}
        <section className="pb-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search developers by name or city…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    aria-label="Search real estate developers"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D7A764]/30 focus:border-[#D7A764]"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {CITY_FILTERS.map(f => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setCityFilter(f.key)}
                      aria-pressed={cityFilter === f.key}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        cityFilter === f.key
                          ? "bg-[#00274D] text-white border-[#00274D]"
                          : "bg-white border-gray-200 text-gray-500 hover:border-[#D7A764]/50 hover:text-[#D7A764]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-8">
                Showing <span className="font-normal text-[#00274D]">{loading ? "…" : filtered.length}</span>{" "}
                {filtered.length === 1 ? "developer" : "developers"}
                {cityFilter !== "all" && <> in <span className="font-normal text-[#D7A764] capitalize">{cityFilter}</span></>}
                {searchQuery && <> matching <span className="font-normal text-[#D7A764]">"{searchQuery}"</span></>}
              </p>
            </FadeInOnScroll>

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse shadow-sm" />
                ))}
              </div>
            )}

            {/* Cards */}
            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((dev, index) => (
                  <FadeInOnScroll key={dev.slug} delay={index * 60} direction="up">
                    <DevCard dev={dev} />
                  </FadeInOnScroll>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Building2 className="h-10 w-10 text-[#D7A764]" />
                </div>
                <h3 className="text-xl font-normal text-[#00274D] mb-2">No Developers Found</h3>
                <p className="text-gray-400 text-sm mb-4">Try a different city or clear your search.</p>
                <button
                  onClick={() => { setCityFilter("all"); setSearchQuery("") }}
                  className="px-6 py-2.5 rounded-full border border-[#D7A764] text-[#D7A764] text-sm font-normal hover:bg-[#D7A764] hover:text-[#00274D] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── WHY TRUST ── */}
        <section className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3 text-center">
                Our Standards
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-white leading-tight mb-10 text-center">
                What makes a <span className="text-[#D7A764]">RealHubb developer.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: <CheckCircle className="h-5 w-5 text-[#D7A764]" />, title: "RERA Verified Builders", desc: "Every developer on RealHubb is registered under Karnataka RERA, Telangana RERA, or Tamil Nadu RERA — giving you full legal protection as a buyer." },
                { icon: <TrendingUp className="h-5 w-5 text-[#D7A764]" />, title: "Proven Delivery Track Record", desc: "We assess each developer's on-time handover history, construction quality audits, and post-possession support before adding them to our network." },
                { icon: <Award className="h-5 w-5 text-[#D7A764]" />, title: "Award-Winning Developers", desc: "Our network includes nationally recognised builders who have received awards for construction excellence, sustainability, and customer satisfaction." },
              ].map((item, i) => (
                <FadeInOnScroll key={i} delay={i * 100} direction="up">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-normal text-sm mb-2">{item.title}</h3>
                    <span className="block h-px w-8 bg-[#D7A764] mb-3" />
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
                <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                  Find Your Property
                </p>
                <h2 className="text-2xl font-normal text-[#00274D] mb-3">
                  Looking for properties by a specific developer?
                </h2>
                <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto">
                  Browse RERA-approved ongoing and completed projects by your preferred developer across Bangalore, Hyderabad, and Chennai.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ongoing-projects">
                    <button className="px-8 py-3 rounded-full bg-[#00274D] hover:bg-[#001d3d] text-white font-normal text-sm flex items-center gap-2 transition-colors duration-200">
                      Browse All Projects
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link to="/contact-us">
                    <button className="px-8 py-3 rounded-full border border-[#D7A764] text-[#D7A764] hover:bg-[#D7A764] hover:text-[#00274D] font-normal text-sm transition-colors duration-200">
                      Talk to an Expert
                    </button>
                  </Link>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  )
}

export default DevelopersPage