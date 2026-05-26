/**
 * Home Page - SEO Optimized
 * RealHubb | Verified RERA Approved Properties in Bangalore, Hyderabad & Chennai
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSection from "@/components/home/HeroSection";
import PropertyCard from "@/components/property/PropertyCard";
import EnquiryPopup from "@/components/property/EnquiryPopup";
import { useProperties } from "../hooks/Useproperties";
import { companyInfo, testimonials } from "@/data/company";
import {
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  TrendingUp,
  Home as HomeIcon,
  FileText,
  Users,
  Building2,
  Award,
  Headphones,
  Scale,
} from "lucide-react";
import { cities } from "@/data/cities";
import { useDevelopers } from "@/hooks/useDevelopers";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import FaqSection from "@/components/faq/FaqSection";
import { faqData } from "@/data/faqData";
import SEO from "@/components/seo/SEO";
import { imagePresets } from "@/lib/cloudinary";
import crealogo from "../components/assets/awards/Untitled design.png";

const homeFaq = faqData.find((f) => f.id === "general")?.items ?? [];


// const HOME_FAQS = [
//   { q: "What is RealHubb?",                          a: "RealHubb is a trusted real estate advisory platform helping homebuyers discover verified RERA-approved residential projects across Bangalore, Hyderabad, and Chennai with end-to-end support." },
//   { q: "Is RealHubb a broker or a developer?",       a: "Neither. We are an authorized channel partner for reputed developers like Prestige, Brigade, Godrej, Sobha and more. Buyers pay zero brokerage." },
//   { q: "Which cities does RealHubb operate in?",     a: "Bangalore, Hyderabad, and Chennai — covering key micro-markets including Whitefield, Sarjapur, Gachibowli, HITEC City, OMR and more." },
//   { q: "Does RealHubb charge any fee to buyers?",    a: "No. Consultation, site visits, comparisons and advisory are free for buyers. We are compensated by developers only upon successful booking." },
//   { q: "How do you verify properties?",              a: "Every listing is checked for RERA registration, builder reputation, title clarity, and legal compliance before it reaches our platform." },
// ];

const Home = () => {
  const { featured: featuredProperties, loading: propsLoading } = useProperties();
  const { developers } = useDevelopers();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [enquiryProp, setEnquiryProp] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="RealHubb | Verified RERA Approved Properties in Bangalore, Hyderabad & Chennai"
        description="Buy or rent verified RERA-approved properties in Bangalore, Hyderabad, and Chennai. RealHubb connects buyers with trusted developers, verified listings, legal guidance, and guided site visits."
        keywords="real estate Bangalore, real estate Hyderabad, real estate Chennai, RERA approved properties, buy property India, RealHubb, property investment Bangalore, verified property listings, apartments Bangalore, villas Hyderabad"
        canonical="https://www.realhubb.in/"
        image="https://www.realhubb.in/assets/realhubb%20trademark%20logo-DpR5IVGg.png"
        breadcrumb={[{ name: "Home", url: "https://www.realhubb.in/" }]}
        faq={homeFaq.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      <div className="min-h-screen">

        {/* ── 1. HERO ── */}
        <HeroSection />

        {/* ── 2. EXPLORE BY CITY ── */}
        <section className="py-20 bg-[#faf6f1]" aria-label="Explore properties by city">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            {/* Header */}
            <FadeInOnScroll direction="up">
              <div className="mb-10" align="center">
                <p className="text-[#D7A764] text-[11px] tracking-[0.25em] uppercase font-normal mb-3">
                  02 — Cities
                </p>
                <h2 className="text-[40px] md:text-[52px] xl:text-[40px] font-normal text-[#00274D] leading-[1.1] mb-4 max-w-3xl mx-auto">
                  Real Estate Services in
                  <span className="text-[#D7A764] block">
                    Bangalore, Hyderabad, and Chennai
                  </span>
                </h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                  RealHubb is a trusted real estate platform helping home buyers, investors, and tenants find verified RERA-approved properties in Bangalore, Hyderabad, and Chennai. Browse residential apartments, premium villas, and plotted developments across India's fastest-growing real estate markets. Each city listing is handpicked, legally verified, and backed by expert advisory — making your property search transparent and reliable.
                </p>
              </div>
            </FadeInOnScroll>

            {/* City cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cities.map((city, index) => (
                <FadeInOnScroll key={city.name} delay={index * 120} direction="up">
                  <Link to={`/ongoing-projects/${city.name.toLowerCase()}`} className="group block">
                    <div
                      className="relative h-[500px] rounded-2xl overflow-hidden"
                      style={{
                        backgroundImage: `url(${city.logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00274D]/90 via-[#00274D]/30 to-transparent" />

                      {/* Project count — top left */}
                      <p className="absolute top-5 left-5 text-[#D7A764] text-[10px] tracking-[0.22em] uppercase font-normal">
                        {city.projects}+ Projects
                      </p>

                      {/* Content — bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-2xl font-normal mb-1 group-hover:text-[#D7A764] transition-colors duration-200">
                          {city.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-4 leading-snug">
                          {city.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[#D7A764] text-xs font-normal tracking-wide">
                          Browse Projects
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeInOnScroll>
              ))}
            </div>

          </div>
        </section>

        {/* ── 3. FEATURED RESIDENCES ── */}
        <section className="py-20 bg-[#faf6f1]" aria-label="Featured residences">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            {/* Header */}
            <div className="flex items-start justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-[#D7A764]/50" />
                  <p className="text-[#D7A764] text-[10px] tracking-[0.3em] uppercase font-normal">
                    Featured Residences
                  </p>
                  <span className="h-px w-10 bg-[#D7A764]/50" />
                </div>
                <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight">
                  RERA-approved properties,<br />
                  <span className="text-[#D7A764]">curated for you.</span>
                </h2>
              </div>
              <Link
                to="/ongoing-projects"
                className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#D7A764] transition-colors shrink-0 mt-2"
              >
                View all properties
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cards */}
            {propsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    <div className="h-72 bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-5 bg-gray-200 rounded w-2/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredProperties.slice(0, 6).map((prop, i) => {
                  const image = Array.isArray(prop.images) ? prop.images[0] : "";
                  const isFeatured = prop.featured === "true";
                  const isCompleted = prop.status === "completed";
                  const badgeLabel = isFeatured ? "Featured" : isCompleted ? "Upcoming" : "RERA Approved";
                  const badgeClass = isFeatured ? "bg-[#D7A764]" : isCompleted ? "bg-teal-700" : "bg-amber-500";
                  const typeLabel = [prop.bhk, prop.type].filter(Boolean).join(" ").toUpperCase();
                  return (
                    <FadeInOnScroll key={prop.id} delay={i * 80} direction="up">
                      <Link to={`/property/${prop.slug || prop.id}`} className="group block">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

                          {/* Image */}
                          <div className="relative h-72 overflow-hidden bg-gray-100">
                            {image ? (
                              <img
                                src={image}
                                alt={prop.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Property Image</span>
                              </div>
                            )}
                            {/* Badge */}
                            <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-normal uppercase tracking-wider rounded-full text-white ${badgeClass}`}>
                              {badgeLabel}
                            </span>
                            {/* Verified */}
                            <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-white/90 rounded-full text-[10px] font-normal text-gray-500">
                              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                              Verified
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-[#00274D] font-normal text-lg mb-1 group-hover:text-[#D7A764] transition-colors duration-200">
                              {prop.title}
                            </h3>
                            <p className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                              <MapPin className="w-3 h-3 shrink-0" />
                              {prop.location}, {prop.city.charAt(0).toUpperCase() + prop.city.slice(1)}
                            </p>
                            <p className="text-[9px] text-gray-400 uppercase tracking-[0.18em] font-medium mb-1">
                              {typeLabel || prop.type}
                            </p>
                            <p className="text-[#00274D] font-normal text-lg mb-4">
                              {prop.price}
                            </p>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setEnquiryProp(prop.title);
                              }}
                              className="w-full mb-3 py-2 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] text-sm font-normal transition-colors duration-200"
                            >
                              Enquire Now
                            </button>
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                              <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                                RERA Approved
                              </span>
                              <button className="w-8 h-8 bg-[#00274D] hover:bg-[#D7A764] rounded-full flex items-center justify-center text-white transition-colors duration-200">
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>
                      </Link>
                    </FadeInOnScroll>
                  );
                })}
              </div>
            )}

          </div>
        </section>

        <EnquiryPopup
          isOpen={enquiryProp !== null}
          onClose={() => setEnquiryProp(null)}
          projectName={enquiryProp ?? ""}
        />

        {/* ── WHY REALHUBB ── */}
        <section className="py-24 bg-[#00274D]" aria-label="Why RealHubb">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <div className="grid lg:grid-cols-[38%_62%] gap-12 lg:gap-16 items-start">

              {/* Left */}
              <div className="space-y-6">
                <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal">
                  04 — Why RealHubb
                </p>
                <h2 className="text-2xl md:text-[44px] font-normal text-white leading-tight">
                  Built on trust.<br />
                  <span className="text-[#D7A764]">Engineered for clarity.</span>
                </h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  RealHubb simplifies the entire property buying process —
                  combining verified listings, market intelligence, and personalized
                  guidance so every decision is confident and well-informed.
                </p>
                <Link to="/contact-us">
                  <button className="mt-2 px-7 py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105">
                    Speak to an Advisor
                  </button>
                </Link>
              </div>

              {/* Right — 2×3 grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Award className="w-5 h-5 text-[#D7A764]" />,      title: "17+ Years of Excellence",  desc: "Decades of insight into India's fastest-growing markets."           },
                  { icon: <Users className="w-5 h-5 text-[#D7A764]" />,      title: "3,000+ Happy Families",    desc: "Thousands of homes delivered with care and clarity."                },
                  { icon: <ShieldCheck className="w-5 h-5 text-[#D7A764]" />,title: "Trusted Partnerships",     desc: "Exclusive access to top-tier RERA-approved developers."             },
                  { icon: <Shield className="w-5 h-5 text-[#D7A764]" />,     title: "Zero Hidden Charges",      desc: "Transparent pricing — no commissions from buyers."                  },
                  { icon: <Headphones className="w-5 h-5 text-[#D7A764]" />, title: "End-to-End Support",       desc: "From discovery to registration and beyond."                         },
                  { icon: <Scale className="w-5 h-5 text-[#D7A764]" />,      title: "Legal Expertise",          desc: "In-house counsel ensures every transaction is secure."              },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-normal text-sm mb-2">{item.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-20 bg-[#faf6f1]" aria-label="Our services">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            {/* Header */}
            <FadeInOnScroll direction="up">
              <div className="mb-12">
                <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                  03 — Services
                </p>
                <h2 className="text-3xl md:text-[42px] font-normal text-[#00274D] leading-tight">
                  End-to-end real estate,{" "}
                  <span className="text-[#D7A764]">handled<br />with care.</span>
                </h2>
              </div>
            </FadeInOnScroll>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: "01", title: "Property Consultation",  desc: "Tailored advisory matched to your budget and goals.",            link: "/contact-us" },
                { num: "02", title: "Guided Site Visits",     desc: "Curated visits with full project walkthroughs.",                 link: "/contact-us" },
                { num: "03", title: "Legal Documentation",    desc: "Title verification, RERA checks, registration support.",         link: "/contact-us" },
                { num: "04", title: "Investment Advisory",    desc: "Micro-market analysis for high-return projects.",                 link: "/contact-us" },
                { num: "05", title: "Home Loan Assistance",   desc: "Best rates via leading banks and NBFCs.",                        link: "/emi-calculator" },
                { num: "06", title: "After-Sales Support",    desc: "Possession, follow-ups, and lifetime care.",                     link: "/contact-us" },
              ].map((s, i) => (
                <FadeInOnScroll key={i} delay={i * 80} direction="up">
                  <Link to={s.link} className="group block">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                      {/* Title row */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-[#00274D] font-normal text-base leading-snug">
                          {s.title}
                        </h3>
                        <span className="text-5xl font-normal text-[#D7A764]/20 leading-none shrink-0 ml-2 -mt-1">
                          {s.num}
                        </span>
                      </div>
                      {/* Gold underline */}
                      <span className="block h-px w-8 bg-[#D7A764] mb-4" />
                      {/* Description */}
                      <p className="text-gray-400 text-xs leading-relaxed flex-1">
                        {s.desc}
                      </p>
                      {/* Learn more */}
                      <div className="mt-5 flex items-center gap-1.5 text-[#D7A764] text-[10px] font-normal tracking-[0.18em] uppercase group-hover:gap-2.5 transition-all duration-200">
                        Learn More
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </FadeInOnScroll>
              ))}
            </div>

          </div>
        </section>

        {/* ── DEVELOPER NETWORK ── */}
        <section className="py-20 bg-[#00274D]" aria-label="Developer network">

          {/* Header — padded */}
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="text-center mb-12">
                <p className="text-[#D7A764] text-[10px] tracking-[0.3em] uppercase font-normal mb-4">
                  06 — Developer Network
                </p>
                <h2 className="text-3xl md:text-[42px] font-normal text-white leading-tight">
                  Trusted Real{" "}
                  <span className="text-[#D7A764]"> Estate </span> Developers
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-4">
                  We collaborate exclusively with RERA-registered developers known for quality construction, on-time delivery, and transparent transactions. Our curated developer network spans Bangalore, Hyderabad, and Chennai, ensuring every property investment you make is backed by verified builder credibility and legal compliance.
                </p>
              </div>
            </FadeInOnScroll>
          </div>

          {/* Marquee — full viewport width, no padding */}
          <div className="relative w-full overflow-hidden group">
            <div className="flex w-max animate-marquee gap-6 px-6 group-hover:[animation-play-state:paused]">
              {[...developers, ...developers].map((dev, index) => (
                <Link
                  key={`${dev.name}-${index}`}
                  to={`/developers/${dev.slug}`}
                  aria-label={dev.name}
                  className="flex items-center justify-center w-36 h-16 bg-white rounded-lg shrink-0 hover:shadow-[0_0_0_2px_#D7A764] transition-all duration-300"
                >
                  <img
                    src={imagePresets.developerLogo(dev.logo)}
                    alt={dev.name}
                    className={`w-full h-full object-contain ${
                      ["birla", "ckpc", "abhee", "kalyani", "tvs", "dnr", "aditya"].some(k =>
                        dev.name.toLowerCase().includes(k)
                      ) ? "p-1" : "p-3"
                    }`}
                    loading="lazy"
                    width={160}
                    height={64}
                  />
                </Link>
              ))}
            </div>
          </div>

        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 bg-[#faf6f1]" aria-label="Testimonials">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">

            <FadeInOnScroll direction="up">
              <div className="mb-12">
                <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                  07 — Testimonials
                </p>
                <h2 className="text-4xl md:text-[34px] font-normal text-[#00274D] leading-tight max-w-lg">
                  Stories from{" "}
                  <span className="text-[#D7A764]">homeowners</span>{" "}
                  who trusted us.
                </h2>
              </div>
            </FadeInOnScroll>

            {/* Testimonial cards — 2×2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "Amit & Priya Sharma",  property: "Skyline Towers · 2BHK · Whitefield",       rating: 5, comment: "RealHubb made our home buying journey incredibly smooth. Professional, transparent, and they found the perfect apartment within our budget." },
                { name: "Rahul Mehta",           property: "Green Valley Villas · 3BHK · Sarjapur Road", rating: 5, comment: "Exceptional service. They handled site visits to documentation flawlessly. Their market knowledge is commendable." },
                { name: "Deepa Krishnan",        property: "Royal Residency · 2BHK · Electronic City",   rating: 5, comment: "As a first-time buyer, I had many concerns. The team patiently guided me through every step. Excellent experience." },
                { name: "Suresh & Kavita Reddy", property: "Paradise Gardens · 4BHK · Hennur Road",      rating: 5, comment: "Professional, reliable, trustworthy. The best deal on our dream villa and brilliant after-sales support." },
              ].map((t, i) => (
                <FadeInOnScroll key={i} delay={i * 100} direction="up">
                  <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-5">
                    {/* Stars + quote icon row */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-0.5">
                        {[...Array(t.rating)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-[#D7A764] text-[#D7A764]" />
                        ))}
                      </div>
                      <span className="text-[#D7A764]/30 text-5xl font-serif leading-none select-none">"</span>
                    </div>
                    {/* Quote */}
                    <p className="text-[#00274D]/80 text-sm leading-relaxed flex-1">
                      "{t.comment}"
                    </p>
                    {/* Divider + Author */}
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-[#00274D] font-normal text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs mt-1">{t.property}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>

          </div>
        </section>

        {/* ── FAQ ── */}
        {/* <section className="py-20 bg-[#faf6f1]" aria-label="FAQ"> */}
          {/* <div className="px-8 md:px-14 lg:px-20 xl:px-28 max-w-4xl mx-auto"> */}

            {/* <FadeInOnScroll direction="up">
              <div className="text-center mb-12">
                <p className="text-[#D7A764] text-[10px] tracking-[0.3em] uppercase font-normal mb-4">
                  08 — FAQ
                </p>
                <h2 className="text-4xl md:text-[48px] font-normal text-[#00274D] leading-tight">
                  Questions, <span className="text-[#D7A764]">answered.</span>
                </h2>
              </div>
            </FadeInOnScroll> */}

            {/* <div className="space-y-3">
              {HOME_FAQS.map((faq, i) => (
                <FadeInOnScroll key={i} delay={i * 60} direction="up">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-7 py-5 text-left"
                    >
                      <span className="text-[#00274D] font-medium text-base">{faq.q}</span>
                      <span className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>
                        <span className="text-gray-500 text-xl leading-none">+</span>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-7 pb-6">
                        <div className="h-px bg-gray-100 mb-4" />
                        <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                </FadeInOnScroll>
              ))}
            </div> */}

          {/* </div> */}
        {/* </section> */}

      </div>
    </>
  );
};

export default Home;
