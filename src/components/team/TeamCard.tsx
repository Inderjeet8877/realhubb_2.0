import { useState } from "react";
import { Linkedin, Mail, Phone, Quote } from "lucide-react";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

const TeamCard = ({ member, index }: { member: any; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <FadeInOnScroll delay={index * 70} direction="up">
      <div
        className="relative h-[380px]"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
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
};

export default TeamCard;
