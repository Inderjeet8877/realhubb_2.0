import { useParams, Navigate } from "react-router-dom"
import { developers } from "../data/developers"
import { useEffect, useRef, useState } from "react"
import {
  MapPin, Star, Trophy, TrendingUp,
  Globe, Shield, Zap
} from "lucide-react"

import SEO from "@/components/seo/SEO"
import {
  RadialBarChart, RadialBar, PolarAngleAxis,
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts"

/* ─── Animated Counter ─────────────────────────────────────── */
const useCountUp = (target: number, duration = 1400, trigger = false) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, trigger])
  return count
}

/* ─── Intersection Observer Hook ───────────────────────────── */
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Stat Card ─────────────────────────────────────────────── */
const StatCard = ({ value, suffix = "", label, delay = 0 }: {
  value: number; suffix?: string; label: string; delay?: number
}) => {
  const { ref, inView } = useInView()
  const count = useCountUp(value, 1400, inView)
  return (
    <div ref={ref} className="bg-white/10 backdrop-blur-sm px-6 py-5 text-center border-r border-white/10 last:border-r-0"
      style={{ animationDelay: `${delay}ms` }}>
      <div className="font-extranormal text-4xl text-[#D7A764] leading-none">{count}{suffix}</div>
      <div className="text-[10px] text-white/50 uppercase tracking-widest mt-2">{label}</div>
    </div>
  )
}

/* ─── Rating Stars ──────────────────────────────────────────── */
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-2">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className="w-5 h-5"
        style={s <= Math.floor(rating)
          ? { fill: "#D7A764", color: "#D7A764" }
          : { color: "rgba(0,0,0,0.12)" }}
      />
    ))}
  </div>
)

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const DeveloperPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const developer = developers.find((dev) => dev.slug === slug)
  const [heroVisible, setHeroVisible] = useState(false)
  const { ref: chartRef, inView: chartInView } = useInView(0.1)
  const { ref: timelineRef, inView: timelineInView } = useInView(0.1)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (!developer) return <Navigate to="/developers" replace />

  const ratingData = [{ name: "Rating", value: (developer.customerRating / 5) * 100 }]
  const projectsChartData = [
    { name: "Completed", value: developer.projectsCompleted, color: "#00274D" },
    { name: "Ongoing",   value: developer.ongoingProjects,   color: "#D7A764" },
  ]
  const timelineChartData = developer.timeline.map((t, i) => ({
    year: t.year.toString(),
    milestone: i + 1,
  }))
  const yearsActive = new Date().getFullYear() - developer.established

  const enterCls = (delay: number) =>
    `transition-all duration-700 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`

  return (
    <>
      <SEO
        title={`${developer.name} | RERA Approved Developer in ${developer.keyLocations[0]} | RealHubb`}
        description={`${developer.name} is a trusted RERA approved real estate developer in ${developer.keyLocations.join(", ")}. ${developer.projectsCompleted}+ completed projects, ${developer.ongoingProjects} ongoing. Est. ${developer.established}. Explore verified properties on RealHubb.`}
        keywords={`${developer.name}, ${developer.name} projects, ${developer.keyLocations.map(l => `${developer.name} ${l}`).join(", ")}, RERA approved developer ${developer.keyLocations[0]}, real estate developer ${developer.keyLocations[0]}, ${developer.name} apartments`}
        canonical={`https://www.realhubb.in/developers/${developer.slug}`}
        image={developer.logo}
        type="website"
        breadcrumb={[
          { name: "Home",       url: "https://www.realhubb.in/" },
          { name: "Developers", url: "https://www.realhubb.in/developers" },
          { name: developer.name, url: `https://www.realhubb.in/developers/${developer.slug}` }
        ]}
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ═══ HERO ═══════════════════════════════════════════ */}
        <section className="relative bg-[#00274D] overflow-hidden pt-28 pb-16">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(215,167,100,1) 1px, transparent 1px), linear-gradient(90deg, rgba(215,167,100,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px"
            }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D7A764]/30 to-transparent" />

          <div className="relative z-10 px-8 md:px-14 lg:px-20 xl:px-28 text-center">

            {/* Badge */}
            <div className={enterCls(0)} style={{ transitionDelay: "0ms" }}>
              <div className="inline-flex items-center gap-2 bg-[#D7A764]/10 border border-[#D7A764]/30 text-[#D7A764] px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-widest mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7A764] animate-pulse" />
                Real Estate Developer · Est. {developer.established}
              </div>
            </div>

            {/* Logo ring */}
            <div className={enterCls(120)} style={{ transitionDelay: "120ms" }}>
              <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#D7A764]/30 animate-spin" style={{ animationDuration: "14s" }} />
                <div className="absolute inset-2.5 rounded-full border border-dashed border-[#D7A764]/15 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
                <img src={developer.logo} alt={developer.name}
                  className="w-20 h-20 object-contain rounded-2xl bg-white p-2 z-10 shadow-lg" />
              </div>
            </div>

            {/* Title */}
            <div className={enterCls(220)} style={{ transitionDelay: "220ms" }}>
              <h1 className="text-4xl md:text-6xl font-extranormal text-white leading-tight tracking-tight mb-6">
                {developer.name}
              </h1>
            </div>

            {/* Description */}
            <div className={enterCls(340)} style={{ transitionDelay: "340ms" }}>
              <p className="max-w-2xl mx-auto text-white/60 text-base leading-relaxed font-light mb-12">
                {developer.description}
              </p>
            </div>

            {/* Stats bar */}
            <div className={enterCls(460)} style={{ transitionDelay: "460ms" }}>
              <div className="inline-grid grid-cols-2 sm:grid-cols-4 border border-white/10 rounded-2xl overflow-hidden">
                <StatCard value={developer.established}       label="Founded"            delay={500} />
                <StatCard value={developer.projectsCompleted} suffix="+" label="Completed"  delay={620} />
                <StatCard value={developer.ongoingProjects}   label="Ongoing Projects"   delay={740} />
                <StatCard value={yearsActive}                 suffix="yrs" label="Active"  delay={860} />
              </div>
            </div>

          </div>
        </section>

        {/* ═══ CHARTS ══════════════════════════════════════════ */}
        <div ref={chartRef}>
          <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
              <h2 className="text-2xl font-normal text-[#00274D]">Performance Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Radial — Rating */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-4">Customer Rating</p>
                <div className="relative">
                  <ResponsiveContainer width="100%" height={190}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="62%" outerRadius="90%"
                      startAngle={90} endAngle={-270} data={ratingData}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar
                        dataKey="value" cornerRadius={10}
                        background={{ fill: "rgba(0,0,0,0.04)" }}
                        fill="#D7A764"
                        animationBegin={chartInView ? 0 : 999999}
                        animationDuration={1600}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-3xl font-extranormal text-[#D7A764]">{developer.customerRating}</div>
                    <div className="text-xs text-gray-400">out of 5</div>
                  </div>
                </div>
                <RatingStars rating={developer.customerRating} />
              </div>

              {/* Bar — Projects */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-4">Project Portfolio</p>
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={projectsChartData} barSize={44}>
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} content={({ active, payload }) =>
                      active && payload?.length
                        ? <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-md text-slate-700">
                            {payload[0].name}: <b>{payload[0].value}</b>
                          </div>
                        : null
                    } />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}
                      animationBegin={chartInView ? 350 : 999999}
                      cursor="default"
                      activeBar={false}>
                      {projectsChartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Area — Milestones */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-4">Growth Milestones</p>
                <ResponsiveContainer width="100%" height={190}>
                  <AreaChart data={timelineChartData}>
                    <defs>
                      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#00274D" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#00274D" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={({ active, payload }) =>
                      active && payload?.length
                        ? <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-md text-slate-700">Milestone #{payload[0].value}</div>
                        : null
                    } />
                    <Area type="monotone" dataKey="milestone"
                      stroke="#00274D" strokeWidth={2.5} fill="url(#ag)"
                      dot={{ fill: "#00274D", r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "#D7A764" }}
                      animationBegin={chartInView ? 700 : 999999} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:mx-20 xl:mx-28" />

        {/* ═══ PROFILE ════════════════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
            <h2 className="text-2xl font-normal text-[#00274D]">Developer Profile</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-2">Headquarters</p>
                <div className="flex items-start gap-2 text-sm font-medium text-slate-700">
                  <MapPin size={15} className="text-[#D7A764] shrink-0 mt-0.5" />
                  {developer.headquarters}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-2">Operates In</p>
                <div className="flex items-start gap-2 text-sm font-medium text-slate-700">
                  <Globe size={15} className="text-[#D7A764] shrink-0 mt-0.5" />
                  {developer.operatesIn}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-3">Key Locations</p>
                <div className="flex flex-wrap gap-2">
                  {developer.keyLocations.map((l) => (
                    <span key={l} className="bg-[#D7A764]/10 border border-[#D7A764]/25 text-[#00274D] px-3 py-1 rounded-full text-xs font-normal">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-2">Design Philosophy</p>
                <div className="flex items-start gap-2 text-sm font-medium text-slate-700">
                  <Zap size={15} className="text-[#D7A764] shrink-0 mt-0.5" />
                  {developer.designPhilosophy}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-2">Delivery Reputation</p>
                <div className="flex items-start gap-2 text-sm font-medium text-slate-700">
                  <TrendingUp size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  {developer.deliveryReputation}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:mx-20 xl:mx-28" />

        {/* ═══ RERA ═══════════════════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
            <h2 className="text-2xl font-normal text-[#00274D]">RERA Registration</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex gap-5 items-start">
            <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <Shield size={22} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mb-1">Registration Info</p>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">{developer.reraInfo}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-normal mt-4 mb-1">Operates In</p>
              <p className="text-sm font-medium text-slate-700">{developer.operatesIn}</p>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:mx-20 xl:mx-28" />

        {/* ═══ ICONIC PROJECTS ════════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
            <h2 className="text-2xl font-normal text-[#00274D]">Iconic Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {developer.iconicProjects.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-[#00274D]" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-normal text-[#00274D] text-base leading-snug">{p.name}</h3>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-normal shrink-0 ml-2">
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <MapPin size={12} />{p.location}
                  </div>
                  <span className="inline-block bg-slate-50 border border-slate-200 text-slate-500 px-2.5 py-1 rounded-lg text-xs">
                    {p.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:mx-20 xl:mx-28" />

        {/* ═══ ONGOING PROJECTS ═══════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
            <h2 className="text-2xl font-normal text-[#00274D]">Ongoing Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {developer.ongoingProjectsList.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-[#D7A764]" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-normal text-[#00274D] text-base leading-snug">{p.name}</h3>
                    <span className="bg-[#D7A764]/10 text-[#00274D] border border-[#D7A764]/30 px-2.5 py-0.5 rounded-full text-[11px] font-normal shrink-0 ml-2">
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <MapPin size={12} />{p.location}
                  </div>
                  <span className="inline-block bg-slate-50 border border-slate-200 text-slate-500 px-2.5 py-1 rounded-lg text-xs">
                    {p.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ AWARDS ═════════════════════════════════════════ */}
        {developer.awards.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:mx-20 xl:mx-28" />
            <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
                <h2 className="text-2xl font-normal text-[#00274D]">Awards & Recognition</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {developer.awards.map((a, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D7A764]/10 border border-[#D7A764]/25 flex items-center justify-center shrink-0">
                      <Trophy size={20} className="text-[#D7A764]" />
                    </div>
                    <div>
                      <p className="text-xs font-normal text-[#D7A764] tracking-wide mb-1">{a.year}</p>
                      <p className="text-sm font-medium text-slate-700 leading-snug">{a.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:px-20 xl:px-28" />

        {/* ═══ RATING ═════════════════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
            <h2 className="text-2xl font-normal text-[#00274D]">Customer Rating</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex items-center gap-12 flex-wrap">
            <div>
              <div className="text-7xl font-extranormal text-[#D7A764] leading-none mb-3">
                {developer.customerRating}
              </div>
              <RatingStars rating={developer.customerRating} />
              <p className="text-xs text-gray-400">Based on verified buyer reviews</p>
            </div>
            <div className="flex-1 min-w-[220px] space-y-3">
              {[
                { label: "Quality",  pct: Math.min(developer.customerRating / 5 * 95 + 4, 100) },
                { label: "Delivery", pct: Math.min(developer.customerRating / 5 * 90 + 8, 100) },
                { label: "Design",   pct: Math.min(developer.customerRating / 5 * 92 + 5, 100) },
                { label: "Value",    pct: Math.min(developer.customerRating / 5 * 88 + 6, 100) },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-14 shrink-0">{r.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D7A764] to-[#c4954a] rounded-full transition-all duration-700"
                      style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-7 text-right">{(r.pct / 20).toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 md:mx-14 lg:mx-20 xl:mx-28" />

        {/* ═══ TIMELINE ═══════════════════════════════════════ */}
        <section className="px-8 md:px-14 lg:px-20 xl:px-28 py-20" ref={timelineRef}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-7 rounded bg-gradient-to-b from-[#00274D] to-[#D7A764]" />
            <h2 className="text-2xl font-normal text-[#00274D]">Company Timeline</h2>
          </div>
          <div className="relative pl-14">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#00274D] via-[#D7A764] to-transparent rounded-full" />
            {developer.timeline.map((item, i) => (
              <div
                key={item.year}
                className="relative mb-10 transition-all duration-500 ease-out"
                style={{
                  opacity: timelineInView ? 1 : 0,
                  transform: timelineInView ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className="absolute -left-[3rem] top-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#00274D] to-[#00274D] border-4 border-[#faf6f1] shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D7A764]" />
                </div>
                <p className="text-xs font-normal text-[#D7A764] uppercase tracking-widest mb-1">{item.year}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}

export default DeveloperPage