// src/pages/FaqPage.tsx
// Redesigned to match home page premium navy/gold design system.

import { useState, useRef, useEffect } from "react";
import { faqData } from "@/data/faqData";
import FaqSection from "@/components/faq/FaqSection";
import SEO from "@/components/seo/SEO";
import { Search, Phone, ChevronRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { companyInfo } from "@/data/company";
import Whatsapp from "../components/assets/whatsapp.png";

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredData = faqData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const visibleData = searchQuery
    ? filteredData
    : activeCategory === "all"
    ? faqData
    : faqData.filter((c) => c.id === activeCategory);

  const totalQuestions = faqData.reduce((acc, c) => acc + c.items.length, 0);
  const totalResults = filteredData.reduce((acc, c) => acc + c.items.length, 0);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    setSearchQuery("");
    if (id === "all") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  useEffect(() => {
    if (searchQuery) return;
    const observers: IntersectionObserver[] = [];
    faqData.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSectionId(cat.id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [searchQuery, visibleData]);

  return (
    <>
      <SEO
        title="Real Estate FAQ | Property Buying, RERA & Home Loan Questions | RealHubb"
        description="Find answers to common real estate questions on RERA compliance, home loans, property buying process, site visits and more in Bangalore, Hyderabad & Chennai. RealHubb answers it all."
        keywords="real estate FAQ India, property buying questions, RERA compliance FAQ, home loan questions, site visit FAQ, RealHubb help, property FAQ Bangalore, real estate questions Hyderabad"
        canonical="https://www.realhubb.in/faq"
        image="https://www.realhubb.in/og/faq.jpg"
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "FAQ", url: "https://www.realhubb.in/faq" },
        ]}
        faq={faqData.flatMap((category) =>
          category.items.map((item) => ({ question: item.question, answer: item.answer }))
        )}
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
                <Link to="/" className="hover:text-[#D7A764] transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/70 font-medium">FAQ</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-[#D7A764]/10 text-[#D7A764] text-xs font-normal px-3 py-1.5 rounded-full mb-5">
                <HelpCircle className="h-3.5 w-3.5" />
                Help Center
              </div>

              <h1 className="text-4xl md:text-[52px] font-normal text-white leading-tight mb-4 max-w-2xl">
                Frequently asked <span className="text-[#D7A764]">questions.</span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xl mb-2">
                Everything you need to know about buying property, RERA compliance,
                home loans, and how RealHubb works.
              </p>
              <p className="text-white/40 text-sm">
                <span className="font-normal text-white/70">{totalQuestions} answers</span>{" "}
                across {faqData.length} categories
              </p>
            </FadeInOnScroll>

            {/* Search */}
            <FadeInOnScroll direction="up" delay={100}>
              <div className="relative mt-8 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search questions… e.g. RERA, home loan, site visit"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory("all"); }}
                  className="w-full pl-11 pr-10 py-3.5 text-sm rounded-xl border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D7A764]/30"
                  aria-label="Search FAQ"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00274D] text-xs transition"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── MAIN BODY ── */}
        <section className="py-12 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <div className="flex flex-col lg:flex-row gap-10">

              {/* Sticky sidebar — desktop */}
              <aside className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-24 space-y-1">
                  <p className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-3 px-2">
                    Categories
                  </p>

                  <button
                    onClick={() => scrollToCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      !activeSectionId && activeCategory === "all"
                        ? "bg-[#D7A764]/10 text-[#D7A764]"
                        : "text-gray-500 hover:bg-white hover:text-[#00274D]"
                    }`}
                  >
                    All Questions
                  </button>

                  {faqData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => scrollToCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                        activeSectionId === cat.id
                          ? "bg-[#D7A764]/10 text-[#D7A764]"
                          : "text-gray-500 hover:bg-white hover:text-[#00274D]"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate flex-1">{cat.title}</span>
                      <span className="text-[10px] bg-gray-100 rounded-full px-1.5 py-0.5 shrink-0 text-gray-400">
                        {cat.items.length}
                      </span>
                    </button>
                  ))}

                  {/* Sidebar contact card */}
                  <div className="mt-6 p-4 rounded-2xl bg-white shadow-sm space-y-3">
                    <p className="text-xs font-normal text-[#00274D]">Still need help?</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Advisors available Mon–Sat, 9 AM – 7 PM IST.
                    </p>
                    <Link to="/contact-us">
                      <button className="w-full mt-1 px-3 py-2 rounded-full bg-[#D7A764] text-[#00274D] text-xs font-normal flex items-center justify-center gap-1.5 hover:bg-[#c4954a] transition-colors">
                        <Phone className="h-3 w-3" />
                        Talk to an Advisor
                      </button>
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Mobile category pills */}
              <div className="lg:hidden -mx-4 px-4 mb-2">
                <div className="flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="FAQ Categories">
                  <button
                    role="tab" aria-selected={activeCategory === "all"}
                    onClick={() => scrollToCategory("all")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 border transition-all ${
                      activeCategory === "all"
                        ? "bg-[#00274D] text-white border-[#00274D]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#D7A764]/50"
                    }`}
                  >
                    All
                  </button>
                  {faqData.map((cat) => (
                    <button
                      key={cat.id} role="tab" aria-selected={activeCategory === cat.id}
                      onClick={() => scrollToCategory(cat.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 border transition-all ${
                        activeCategory === cat.id
                          ? "bg-[#00274D] text-white border-[#00274D]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-[#D7A764]/50"
                      }`}
                    >
                      {cat.icon} {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ content */}
              <div className="flex-1 min-w-0">
                {searchQuery && (
                  <p className="text-xs text-gray-400 mb-6">
                    <span className="font-normal text-[#00274D]">{totalResults}</span>{" "}
                    result{totalResults !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                  </p>
                )}

                {visibleData.length > 0 ? (
                  <div className="space-y-10">
                    {visibleData.map((category, i) => (
                      <FadeInOnScroll key={category.id} direction="up" delay={i * 60}>
                        <div
                          ref={(el) => { sectionRefs.current[category.id] = el; }}
                          className="scroll-mt-28 bg-white rounded-2xl shadow-sm p-6 md:p-8"
                        >
                          <FaqSection
                            id={category.id}
                            title={category.title}
                            icon={category.icon}
                            items={category.items}
                          />
                        </div>
                      </FadeInOnScroll>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-5xl mb-5">🔍</p>
                    <p className="font-normal text-[#00274D] text-xl mb-2">
                      No results for &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-sm text-gray-400 mb-6 max-w-sm">
                      Try a different keyword, or contact our advisors for personalised help.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-2.5 rounded-full border border-[#D7A764] text-[#D7A764] text-sm font-normal hover:bg-[#D7A764] hover:text-[#00274D] transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                {/* Bottom CTA */}
                <FadeInOnScroll direction="up">
                  <div className="mt-10 bg-[#00274D] rounded-2xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                      <div className="flex-1">
                        <h2 className="text-lg md:text-xl font-normal text-white mb-2">
                          Didn&apos;t find what you were looking for?
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                          Our advisors are happy to answer specific questions — completely free of charge.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <Link to="/contact-us">
                          <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm flex items-center justify-center gap-2 transition-colors">
                            <Phone className="h-4 w-4" />
                            Talk to an Advisor
                          </button>
                        </Link>
                        <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer">
                          <button className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 font-normal text-sm flex items-center justify-center gap-2 transition-colors">
                            <img src={Whatsapp} alt="WhatsApp" className="w-4 h-4" />
                            WhatsApp Us
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>

              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default FaqPage;