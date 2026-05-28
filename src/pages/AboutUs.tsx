/**
 * About Us Page – Realhubb Ventures Pvt. Ltd.
 * Redesigned to match home page premium navy/gold design system.
 */

import { companyInfo } from "@/data/company";
import {
  BriefcaseBusiness,
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  MessageSquare,
  MapPin,
  FileText,
  HeadphonesIcon,
  Home,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import TeamCard from "@/components/team/TeamCard";
import CountingNumber from "../components/ui/counting_text";
import Whatsapp from "../components/assets/whatsapp.png";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import SEO from "@/components/seo/SEO";
import FaqSection from "@/components/faq/FaqSection";
import { faqData } from "@/data/faqData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import crealogo from "../components/assets/awards/Untitled design.png";

const aboutFaqCategory = faqData.find((f) => f.id === "general");

const AboutUs = () => {
  const { members, loading: teamLoading } = useTeamMembers();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [hash]);

  return (
    <>
      <SEO
        title="About RealHubb Ventures | Real Estate Channel Partner in Bangalore"
        description="RealHubb Ventures Pvt. Ltd. is a trusted real estate channel partner in Bangalore. We help buyers find verified RERA-approved properties in Bangalore, Hyderabad & Chennai with expert advisory and site visits."
        keywords="about RealHubb, RealHubb Ventures Pvt Ltd, real estate channel partner Bangalore, property consultants Bangalore, RERA approved properties, property advisory Bangalore"
        canonical="https://www.realhubb.in/about"
        image="https://www.realhubb.in/og/about-realhubb.jpg"
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "About Us", url: "https://www.realhubb.in/about" },
        ]}
        faq={
          aboutFaqCategory
            ? aboutFaqCategory.items.map((item) => ({
                question: item.question,
                answer: item.answer,
              }))
            : []
        }
      />

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                About RealHubb
              </p>
              <h1 className="text-4xl md:text-[56px] font-normal text-white leading-tight mb-6 max-w-3xl">
                Building India's most{" "}
                <span className="text-[#D7A764]">trusted</span> real estate platform.
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xl mb-8">
                Realhubb Ventures Pvt. Ltd. — a RERA-compliant channel partner connecting thousands
                of families with verified properties across Bangalore, Hyderabad, and Chennai.
              </p>
              <a
                href={companyInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105"
              >
                <img src={Whatsapp} alt="" className="w-4 h-4" />
                Chat with Us
              </a>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { icon: <Award className="w-5 h-5 text-[#D7A764]" />, label: "Properties Sold",  stat: companyInfo.stats.propertiesSold },
                { icon: <Users className="w-5 h-5 text-[#D7A764]" />, label: "Happy Clients",    stat: companyInfo.stats.happyClients   },
                { icon: <TrendingUp className="w-5 h-5 text-[#D7A764]" />, label: "Years Experience", stat: companyInfo.stats.yearsExperience },
                { icon: <Users className="w-5 h-5 text-[#D7A764]" />,  label: "Expert Advisors",  stat: companyInfo.stats.expertAdvisors },
              ].map((item, i) => (
                <FadeInOnScroll key={i} delay={i * 100} direction="up">
                  <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                    <div className="w-11 h-11 rounded-full bg-[#D7A764]/10 flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <div className="flex items-end justify-center gap-0.5">
                      <CountingNumber
                        fromNumber={0}
                        number={Number(String(item.stat).replace(/[^0-9.]/g, ""))}
                        decimalPlaces={0}
                        className="text-3xl font-normal text-[#00274D]"
                        inView
                      />
                      <span className="text-3xl font-normal text-[#00274D]">+</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{item.label}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section id="who-we-are" className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-[44px] font-normal text-white leading-tight mb-6 max-w-2xl">
                A team that puts <span className="text-[#D7A764]">your home</span> first.
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-3xl">
                At <strong className="text-white">Realhubb Ventures Pvt. Ltd.</strong>, we take pride in being one of
                Bangalore's most trusted channel partners in real estate. With over{" "}
                <strong className="text-[#D7A764]">{companyInfo.stats.yearsExperience} years of experience</strong>, we have
                helped thousands of families discover their dream homes and investors find
                profitable opportunities. Our focus on transparency, customer-first service, and
                end-to-end assistance ensures a seamless buying experience from start to finish.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                Mission & Vision
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-10">
                What drives us <span className="text-[#D7A764]">every day.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FadeInOnScroll delay={0} direction="left">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                  <div className="w-11 h-11 rounded-full bg-[#D7A764]/10 flex items-center justify-center mb-5">
                    <Target className="h-5 w-5 text-[#D7A764]" />
                  </div>
                  <h3 className="text-xl font-normal text-[#00274D] mb-4">Our Mission</h3>
                  <span className="block h-px w-8 bg-[#D7A764] mb-4" />
                  <p className="text-gray-500 leading-relaxed text-sm">{companyInfo.aboutUs.mission}</p>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={200} direction="right">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                  <div className="w-11 h-11 rounded-full bg-[#D7A764]/10 flex items-center justify-center mb-5">
                    <Eye className="h-5 w-5 text-[#D7A764]" />
                  </div>
                  <h3 className="text-xl font-normal text-[#00274D] mb-4">Our Vision</h3>
                  <span className="block h-px w-8 bg-[#D7A764] mb-4" />
                  <p className="text-gray-500 leading-relaxed text-sm">{companyInfo.aboutUs.vision}</p>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                Core Values
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-10">
                The principles that <span className="text-[#D7A764]">guide us.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {companyInfo.aboutUs.values.map((value, index) => (
                <FadeInOnScroll key={index} delay={index * 80} direction="up">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#00274D] flex items-center justify-center shrink-0">
                        <span className="text-[#D7A764] font-normal text-sm">{index + 1}</span>
                      </div>
                      <p className="text-[#00274D] font-medium text-sm leading-relaxed pt-1.5">{value}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="what-we-offer" className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                What We Offer
              </p>
              <h2 className="text-3xl md:text-[44px] font-normal text-white leading-tight mb-10">
                Services built around <span className="text-[#D7A764]">you.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companyInfo.services.map((service, i) => {
                const iconMap: Record<string, React.ReactNode> = {
                  MessageSquare: <MessageSquare className="h-5 w-5 text-[#D7A764]" />,
                  MapPin:        <MapPin className="h-5 w-5 text-[#D7A764]" />,
                  FileText:      <FileText className="h-5 w-5 text-[#D7A764]" />,
                  HeadphonesIcon:<HeadphonesIcon className="h-5 w-5 text-[#D7A764]" />,
                  Home:          <Home className="h-5 w-5 text-[#D7A764]" />,
                  Rocket:        <Rocket className="h-5 w-5 text-[#D7A764]" />,
                };
                return (
                  <FadeInOnScroll key={i} delay={i * 80} direction="up">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors duration-200">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        {iconMap[service.icon] ?? <BriefcaseBusiness className="h-5 w-5 text-[#D7A764]" />}
                      </div>
                      <h3 className="text-white font-normal text-base mb-2">{service.title}</h3>
                      <span className="block h-px w-8 bg-[#D7A764] mb-3" />
                      <p className="text-white/50 text-xs leading-relaxed">{service.description}</p>
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CORE TEAM ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                Core Team
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-10">
                Meet the people <span className="text-[#D7A764]">behind RealHubb.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {companyInfo.team.map((member, index) => (
                <FadeInOnScroll key={index} delay={index * 120} direction="up">
                  <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
                    />
                    <h3 className="text-[#00274D] text-lg font-normal mb-1">{member.name}</h3>
                    <p className="text-[#D7A764] text-sm font-normal mb-3">{member.designation}</p>
                    <span className="block h-px w-8 bg-[#D7A764] mx-auto mb-3" />
                    <p className="text-gray-400 text-xs leading-relaxed mb-4">{member.bio}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0A66C2] text-sm font-medium hover:underline transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11.334 20h-3v-10h3v10zm-1.5-11.269c-.966 0-1.75-.792-1.75-1.77s.784-1.77 1.75-1.77 1.75.792 1.75 1.77-.784 1.77-1.75 1.77zm13.834 11.269h-3v-5.604c0-1.337-.027-3.06-1.865-3.06-1.866 0-2.153 1.46-2.153 2.967v5.697h-3v-10h2.879v1.367h.041c.401-.758 1.381-1.558 2.844-1.558 3.04 0 3.604 2.004 3.604 4.61v5.581z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── REALHUBB REAL HEROES ── */}
        <section className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                RealHubb RealHeroes
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-white leading-tight mb-3">
                The people who make it <span className="text-[#D7A764]">happen every day.</span>
              </h2>
              <p className="text-white/50 text-sm max-w-xl mb-10">
                Our advisors, specialists, and support team — the real force behind every successful transaction.
                Hover over a card to know their story.
              </p>
            </FadeInOnScroll>

            {/* Loading skeleton */}
            {teamLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-[380px] rounded-xl bg-white/10 animate-pulse" />
                ))}
              </div>
            )}

            {/* Flip card grid */}
            {!teamLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member: any, index: number) => (
                  <TeamCard
                    key={member.id || member.name}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── LEADERSHIP RECOGNITION ── */}
        <section id="leadership-recognition" className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                Leadership Recognition
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-white leading-tight mb-4">
                A proud <span className="text-[#D7A764]">national milestone.</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl mb-10">
                A proud milestone for Realhubb Ventures — our Co-founder &amp; CEO earns national recognition.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll direction="up" delay={100}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="p-4 bg-white rounded-2xl shadow-lg mb-3">
                      <img
                        src={crealogo}
                        alt="CREA(I) – Confederation of Real Estate Associates India"
                        className="w-28 h-28 object-contain"
                      />
                    </div>
                    <span className="text-[#D7A764] text-[10px] font-normal uppercase tracking-widest">
                      CREA(I) Approved
                    </span>
                  </div>

                  <div className="hidden md:block w-px h-36 bg-white/10" />

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-[#D7A764]/10 text-[#D7A764] px-4 py-1.5 rounded-full text-sm font-normal mb-4">
                      <Award className="h-4 w-4" />
                      National Recognition
                    </div>
                    <h3 className="text-2xl md:text-3xl font-normal text-white mb-1">Mr. Sanjeev R Singh</h3>
                    <p className="text-[#D7A764] font-normal text-base mb-4">
                      Co-Founder &amp; CEO — Realhubb Ventures Pvt. Ltd.
                    </p>
                    <p className="text-white/60 leading-relaxed text-sm">
                      We are immensely proud to announce that{" "}
                      <strong className="text-white">Mr. Sanjeev R Singh</strong> has been
                      officially inducted as a{" "}
                      <strong className="text-[#D7A764]">CREA(I) Committee Member</strong> — the
                      Confederation of Real Estate Associates India. This prestigious recognition
                      reflects his outstanding contributions to India's real estate industry and his
                      dedication to professionalising the channel partner ecosystem at a national level.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm text-white/80 font-medium">
                        CREA(I) Committee Member
                      </span>
                      <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm text-white/80 font-medium">
                        National Association of Realtors – India
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-10">
                Why families trust <span className="text-[#D7A764]">Realhubb.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {companyInfo.whyChooseUs.map((reason, index) => (
                <FadeInOnScroll key={index} delay={index * 100} direction="up">
                  <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h3 className="text-[#00274D] font-normal text-base mb-3">{reason.title}</h3>
                    <span className="block h-px w-8 bg-[#D7A764] mb-3" />
                    <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {aboutFaqCategory && (
          <section className="py-20 bg-[#faf6f1]">
            <div className="px-8 md:px-14 lg:px-20 xl:px-28 max-w-4xl mx-auto">
              <FadeInOnScroll direction="up">
                <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3 text-center">
                  FAQ
                </p>
                <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-10 text-center">
                  Common <span className="text-[#D7A764]">questions.</span>
                </h2>
              </FadeInOnScroll>
              <FadeInOnScroll direction="up" delay={100}>
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                  <FaqSection
                    id={aboutFaqCategory.id}
                    icon={aboutFaqCategory.icon}
                    title={aboutFaqCategory.title}
                    items={aboutFaqCategory.items}
                  />
                  <p className="text-sm text-gray-400 mt-6 text-center">
                    Have more questions?{" "}
                    <a href="/faq" className="text-[#D7A764] underline underline-offset-2 hover:text-[#c4954a] transition-colors">
                      Browse all FAQs →
                    </a>
                  </p>
                </div>
              </FadeInOnScroll>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28 text-center">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">
                Get Started
              </p>
              <h2 className="text-3xl md:text-[44px] font-normal text-white leading-tight mb-4">
                Ready to find your <span className="text-[#D7A764]">dream home?</span>
              </h2>
              <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
                Connect with our expert advisors and start your real estate journey today.
              </p>
              <a
                href={companyInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105"
              >
                <img src={Whatsapp} alt="WhatsApp" className="w-4 h-4" />
                Chat with Us on WhatsApp
              </a>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutUs;