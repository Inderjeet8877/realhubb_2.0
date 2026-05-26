// src/pages/TeamGallery.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIX: team members were always displayed in hardcoded array order because
//      useTeamMembers() used hardcodedTeam.map() as the base — meaning Firestore
//      order field was completely ignored.
//
//      New logic:
//      1. If Firestore returns data → use Firestore order exclusively,
//         enriched with any extra fields (email, phone) from hardcoded data
//         that aren't stored in Firestore yet.
//      2. Sort by `order` field (set in admin TeamManager → Display Order input).
//      3. Fallback to hardcoded data sorted by their array index if Firestore empty.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Team Photo Gallery – Realhubb Ventures Pvt. Ltd.
 * Style: Corporate / Professional | Feature: Flip Card
 */

import { useState, useEffect } from "react";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import SEO from "@/components/seo/SEO";
import { Linkedin, Mail, Phone, Users, Quote } from "lucide-react";
import { getTeamMembers } from "@/lib/firestoreService";
import { teamMembers as hardcodedTeam } from "@/data/team";

// ─── useTeamMembers hook ──────────────────────────────────────────────────────
function useTeamMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fsData = await getTeamMembers(); // already sorted by `order` in firestoreService

        if (fsData.length > 0) {
          // Build a lookup of hardcoded members by name for enrichment only
          const hardcodedByName = new Map(
            (hardcodedTeam as any[]).map(m => [m.name, m])
          );

          // Use Firestore as the source of truth for order + content.
          // Enrich with hardcoded fields that may not be in Firestore (email, phone).
          const ordered = fsData.map((fs: any) => {
            const hc = hardcodedByName.get(fs.name) ?? {};
            return {
              // Hardcoded extras (email, phone) as base
              email:       hc.email    ?? "",
              phone:       hc.phone    ?? "",
              // Firestore fields override everything
              id:          fs.id,
              name:        fs.name        || hc.name        || "",
              role:        fs.role        || hc.designation || hc.role || "",
              designation: fs.role        || hc.designation || hc.role || "",
              photo:       fs.photo       || hc.image       || hc.photo || "",
              image:       fs.photo       || hc.image       || hc.photo || "",
              linkedin:    fs.linkedin    || hc.linkedin    || "",
              bio:         fs.bio         || hc.bio         || "",
              order:       fs.order       ?? 999,
            };
          });

          // firestoreService.getTeamMembers() already sorts by order,
          // but sort again here to be safe
          ordered.sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));

          setMembers(ordered);
        } else {
          // Firestore empty — use hardcoded in their natural array order
          setMembers(
            (hardcodedTeam as any[]).map((m, i) => ({
              ...m,
              order:       i,
              role:        m.role        || m.designation || "",
              designation: m.designation || m.role        || "",
              photo:       m.photo       || m.image       || "",
              image:       m.image       || m.photo       || "",
            }))
          );
        }
      } catch (e) {
        console.error("[useTeamMembers] Firestore error:", e);
        // Fallback to hardcoded on error
        setMembers(
          (hardcodedTeam as any[]).map((m, i) => ({
            ...m,
            order:       i,
            role:        m.role        || m.designation || "",
            designation: m.designation || m.role        || "",
            photo:       m.photo       || m.image       || "",
            image:       m.image       || m.photo       || "",
          }))
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { members, loading };
}

// ─── Team Card ────────────────────────────────────────────────────────────────
const TeamCard = ({ member, index }: { member: any; index: number }) => (
  <FadeInOnScroll delay={index * 70} direction="up">
    <div className="group relative h-[380px]" style={{ perspective: "1200px" }}>
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{ transformStyle: "preserve-3d", transform: "rotateY(0deg)" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center px-6 py-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00274D]" />

          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-100 shadow mb-5">
            <img
              src={
                member.image || member.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a3c5e&color=fff&size=200`
              }
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-base font-normal text-slate-800 text-center tracking-tight">
            {member.name}
          </h3>
          <div className="w-8 h-px bg-[#00274D] my-2.5" />
          <p className="text-[#00274D] text-xs font-normal uppercase tracking-widest text-center">
            {member.designation || member.role}
          </p>

          <div className="flex items-center gap-3 mt-6">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">
                <Linkedin size={14} />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-600 hover:text-slate-700 transition-colors">
                <Mail size={14} />
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                <Phone size={14} />
              </a>
            )}
          </div>

          <p className="absolute bottom-3 text-[10px] text-slate-300 uppercase tracking-widest">
            Hover to know more
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-[#00274D] shadow-md flex flex-col justify-between px-6 py-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D7A764]" />
          <Quote size={28} className="text-white/10 mb-1" fill="currentColor" />
          <div className="mb-3">
            <h3 className="text-white font-normal text-base">{member.name}</h3>
            <p className="text-[#D7A764] text-[11px] uppercase tracking-widest font-normal mt-0.5">
              {member.designation || member.role}
            </p>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed flex-1">
            {member.bio ||
              "A dedicated real estate professional committed to helping clients find their perfect property with transparency and expertise."}
          </p>
          <div className="flex gap-2 mt-6">
            {member.email && (
              <a href={`mailto:${member.email}`}
                className="flex-1 py-2 text-center rounded-lg text-xs font-normal bg-white text-[#00274D] hover:bg-slate-100 transition-colors">
                Email Me
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`}
                className="flex-1 py-2 text-center rounded-lg text-xs font-normal border border-white/30 text-white hover:bg-white/10 transition-colors">
                Call Now
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  </FadeInOnScroll>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const TeamGallery = () => {
  const { members, loading } = useTeamMembers();

  return (
    <>
      <SEO
        title="Our Team | Real Estate Advisors at RealHubb Ventures | Bangalore"
        description="Meet RealHubb's certified real estate advisors serving Bangalore, Hyderabad & Chennai. Our experienced team helps buyers find verified RERA-approved properties with full transparency."
        keywords="RealHubb team, real estate advisors Bangalore, property consultants Hyderabad, RealHubb Ventures team, real estate experts Chennai, certified property advisors India"
        canonical="https://www.realhubb.in/gallery/team-gallery"
        image="https://www.realhubb.in/og/team.jpg"
        type="website"
        breadcrumb={[
          { name: "Home",    url: "https://www.realhubb.in/" },
          { name: "Gallery", url: "https://www.realhubb.in/gallery" },
          { name: "Our Team",url: "https://www.realhubb.in/gallery/team-gallery" },
        ]}
      />

      <div className="min-h-screen bg-[#faf6f1] pt-24 pb-24">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">

          {/* Header */}
          <FadeInOnScroll direction="up">
            <div className="flex flex-col lg:flex-row items-start gap-12 mb-20 border-b border-slate-200 pb-16">
              <div className="lg:w-2/5 flex-shrink-0">
                <div className="inline-flex items-center gap-2 text-[11px] font-normal uppercase tracking-widest text-[#00274D] mb-4">
                  <Users size={13} /> Our People
                </div>
                <h1 className="text-4xl md:text-5xl font-extranormal text-slate-900 leading-tight tracking-tight">
                  The Team<br />
                  <span className="text-[#00274D]">Behind RealHubb</span>
                </h1>
                <div className="flex gap-8 mt-8">
                  <div>
                    <p className="text-3xl font-black text-[#00274D]">{members.length}+</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Professionals</p>
                  </div>
                  <div className="w-px bg-slate-200" />
                  <div>
                    <p className="text-3xl font-black text-[#00274D]">3</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Cities</p>
                  </div>
                  <div className="w-px bg-slate-200" />
                  <div>
                    <p className="text-3xl font-black text-[#00274D]">100%</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">RERA Verified</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-3/5 space-y-4 pt-1">
                <p className="text-slate-600 text-base leading-relaxed">
                  At RealHubb Ventures, our strength lies in our people. With deep market knowledge
                  across Bangalore, Hyderabad, and Chennai, our advisors bring clarity, honesty, and
                  precision to every property transaction.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Each member of our team is a certified real estate professional with hands-on
                  experience in residential, commercial, and luxury segments. We don't just match
                  properties — we understand goals, timelines, and budgets to deliver the right
                  outcome for every client.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Hover over any card below to learn more about the individual experts who will
                  guide your journey.
                </p>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[380px] rounded-xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          )}

          {/* Team grid — rendered in Firestore order field order */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member: any, index: number) => (
                <TeamCard
                  key={`${member.id || member.name}-${index}`}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default TeamGallery;