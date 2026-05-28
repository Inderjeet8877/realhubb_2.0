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

import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import SEO from "@/components/seo/SEO";
import { Users } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import TeamCard from "@/components/team/TeamCard";

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