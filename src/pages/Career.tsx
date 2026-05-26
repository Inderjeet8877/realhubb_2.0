/**
 * Career Page - Realhubb Ventures Pvt. Ltd.
 * Redesigned to match home page premium navy/gold design system.
 * WITH GOOGLE SHEETS INTEGRATION
 */

import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import SEO from "@/components/seo/SEO";
import { Helmet } from "react-helmet-async";
import {
  Briefcase, MapPin, Clock, DollarSign,
  TrendingUp, Heart, Coffee,
  Award, GraduationCap, CalendarDays,
  ArrowRight, Send, Loader2,
} from "lucide-react";
import { useState } from "react";
import { companyInfo } from "@/data/company";
import FaqSection from "@/components/faq/FaqSection";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyZHMdf-F61QxgHF2Gbx3A_rltJBD7Xn7W_0S6T4e0XuLYFGzKkaxwQ3dlRVTxVkbc_wg/exec";

const jobOpenings = [
  {
    id: 1,
    title: "Real Estate Sales Executive",
    department: "Sales",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹3-6 LPA + Incentives",
    description: "We're looking for passionate sales professionals to help clients find their dream properties.",
    responsibilities: [
      "Meet with clients to understand property requirements",
      "Showcase properties and conduct site visits",
      "Negotiate deals and close sales",
      "Build and maintain client relationships",
      "Achieve monthly sales targets",
    ],
    requirements: [
      "1-3 years experience in real estate sales",
      "Excellent communication and negotiation skills",
      "Strong knowledge of Bangalore real estate market",
      "Two-wheeler/car with valid license",
      "Graduate in any discipline",
    ],
  },
  {
    id: 2,
    title: "Telesales Executive",
    department: "Sales",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "0-1 years",
    salary: "₹3-4 LPA",
    description: "Join our telesales team to generate leads and convert inquiries into successful property sales.",
    responsibilities: [
      "Make outbound calls to potential clients",
      "Understand client needs and recommend suitable properties",
      "Schedule site visits and follow up with leads",
      "Maintain accurate records in CRM",
      "Achieve monthly lead conversion targets",
    ],
    requirements: [
      "0-1 years experience in telesales or telemarketing",
      "Strong communication and persuasion skills",
      "Ability to handle rejection and stay motivated",
      "Familiarity with CRM software is a plus",
      "Graduate in any discipline",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹4-7 LPA",
    description: "Drive our digital presence and lead generation through strategic online marketing campaigns.",
    responsibilities: [
      "Manage social media platforms and content strategy",
      "Run paid advertising campaigns (Google Ads, Facebook, Instagram)",
      "Generate quality leads through digital channels",
      "Analyze campaign performance and optimize ROI",
      "Collaborate with sales team on lead nurturing",
    ],
    requirements: [
      "2-4 years experience in digital marketing",
      "Expertise in Google Ads, Facebook Ads, SEO/SEM",
      "Experience with real estate marketing preferred",
      "Strong analytical and creative skills",
      "Proficiency in marketing tools and analytics platforms",
    ],
  },
];

const benefits = [
  { icon: DollarSign, title: "Competitive Salary", description: "Industry-leading compensation with performance-based incentives" },
  { icon: TrendingUp, title: "Career Growth", description: "Clear career progression path with regular promotions" },
  { icon: GraduationCap, title: "Training & Development", description: "Regular training programs and skill development workshops" },
  { icon: CalendarDays, title: "Flexible Hours", description: "Work-life balance with flexible working arrangements" },
  { icon: Award, title: "Recognition Programs", description: "Monthly and annual awards for top performers" },
  { icon: Coffee, title: "Fun Work Culture", description: "Team outings, celebrations, and a supportive environment" },
  { icon: Heart, title: "Employee Wellness", description: "Mental health support and wellness initiatives" },
];

const careerFaqItems = [
  { question: "How long does the hiring process take?", answer: "Our hiring process typically takes 5–7 working days. After you submit your application, our HR team will review it within 48 hours and reach out to shortlisted candidates for a phone screening, followed by an in-person or virtual interview." },
  { question: "Do I need prior real estate experience to apply?", answer: "Not for all roles. Our Telesales Executive role is open to freshers with strong communication skills. For Sales Executive and Digital Marketing roles, we prefer 1–3 years of relevant experience. We provide thorough onboarding and training regardless of your background." },
  { question: "What is the interview process at Realhubb?", answer: "Our interview process has two rounds: an initial HR screening call to understand your background and expectations, followed by a final round with the department head. The entire process is completed within a week of your application." },
  { question: "Are the roles remote or in-office?", answer: "Our current openings are based out of our Bangalore office. We offer flexible working arrangements for certain roles. The specific work model will be discussed during the interview process." },
  { question: "What growth opportunities does Realhubb offer?", answer: "Realhubb has a clear career progression path — top performers are promoted within 6–12 months. We invest in our team through regular training programs, mentorship, and skill development workshops." },
];

const Career = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", position: "", experience: "",
    resume: null as File | null, coverLetter: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { alert("File size must be less than 5MB"); e.target.value = ""; return; }
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSend = {
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        name: formData.name, email: formData.email, phone: formData.phone,
        position: formData.position, experience: formData.experience + " years",
        resumeUrl: formData.resume ? formData.resume.name : "No file uploaded",
        coverLetter: formData.coverLetter || "N/A",
      };
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      alert("✅ Thank you for your application! We've received it and will review it within 48 hours.");
      setFormData({ name: "", email: "", phone: "", position: "", experience: "", resume: null, coverLetter: "" });
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ There was an error submitting your application. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D7A764]/30 focus:border-[#D7A764] disabled:opacity-60";
  const labelClass = "block text-[10px] font-normal text-[#00274D] uppercase tracking-[0.15em] mb-1.5";

  return (
    <>
      <SEO
        title="Careers at RealHubb | Real Estate Jobs in Bangalore"
        description="Apply for real estate jobs in Bangalore at RealHubb. We are hiring Sales Executives, Telesales Executives, and Digital Marketing Specialists."
        keywords="real estate jobs Bangalore, sales executive jobs Bangalore, real estate career Bangalore, digital marketing jobs Bangalore, RealHubb careers"
        canonical="https://www.realhubb.in/career"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "ItemList",
          itemListElement: jobOpenings.map((job) => ({
            "@type": "JobPosting", title: job.title, description: job.description,
            employmentType: "FULL_TIME", datePosted: "2026-03-01",
            hiringOrganization: { "@type": "Organization", name: "RealHubb Ventures Pvt Ltd", sameAs: "https://www.realhubb.in" },
            jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressRegion: "Karnataka", addressCountry: "IN" } },
          })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#faf6f1]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-20 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-4">Careers</p>
              <h1 className="text-4xl md:text-[52px] font-normal text-white leading-tight mb-4 max-w-3xl">
                Join our <span className="text-[#D7A764]">growing team.</span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
                Be part of Bangalore's leading real estate channel partner. Build your career with us and make a difference in people's lives.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "10+ Team Members",       cls: "bg-white/10 border-white/10 text-white/80" },
                  { label: "95% Employee Satisfaction", cls: "bg-[#D7A764]/10 border-[#D7A764]/20 text-[#D7A764]" },
                  { label: "100% Growth Opportunity",   cls: "bg-green-900/30 border-green-700/30 text-green-400" },
                ].map(b => (
                  <span key={b.label} className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-normal ${b.cls}`}>
                    {b.label}
                  </span>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">Why Join Us</p>
              <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-10">
                More than just a job — a <span className="text-[#D7A764]">career.</span>
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((benefit, index) => (
                <FadeInOnScroll key={index} delay={index * 80} direction="up">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                    <div className="w-11 h-11 rounded-full bg-[#D7A764]/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-5 w-5 text-[#D7A764]" />
                    </div>
                    <h3 className="text-[#00274D] font-normal text-sm mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOB OPENINGS ── */}
        <section className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">Open Positions</p>
              <h2 className="text-3xl md:text-[40px] font-normal text-white leading-tight mb-10">
                Current <span className="text-[#D7A764]">openings.</span>
              </h2>
            </FadeInOnScroll>
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <FadeInOnScroll key={job.id} delay={index * 80} direction="up">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-normal text-xl mb-1">{job.title}</h3>
                        <p className="text-white/60 text-sm mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-white/40">
                          {[
                            { icon: <Briefcase className="w-3.5 h-3.5 text-[#D7A764]" />, text: job.department },
                            { icon: <MapPin className="w-3.5 h-3.5 text-[#D7A764]" />, text: job.location },
                            { icon: <Clock className="w-3.5 h-3.5 text-[#D7A764]" />, text: job.type },
                            { icon: <DollarSign className="w-3.5 h-3.5 text-[#D7A764]" />, text: job.salary },
                          ].map((item, i) => (
                            <span key={i} className="flex items-center gap-1.5">{item.icon}{item.text}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                        className="shrink-0 px-5 py-2.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm flex items-center gap-2 transition-colors duration-200"
                      >
                        {selectedJob === job.id ? "Hide Details" : "View Details"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {selectedJob === job.id && (
                      <div className="pt-6 border-t border-white/10">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="text-[#D7A764] text-xs font-normal uppercase tracking-[0.2em] mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                  <span className="text-[#D7A764] mt-1 shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[#D7A764] text-xs font-normal uppercase tracking-[0.2em] mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                  <span className="text-[#D7A764] mt-1 shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <a href="#apply">
                          <button className="px-6 py-2.5 rounded-full border border-[#D7A764] text-[#D7A764] text-sm font-normal hover:bg-[#D7A764] hover:text-[#00274D] transition-colors duration-200 flex items-center gap-2">
                            Apply for this role
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM ── */}
        <section id="apply" className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3 text-center">Apply Now</p>
              <h2 className="text-3xl md:text-[40px] font-normal text-[#00274D] leading-tight mb-4 text-center">
                Ready to <span className="text-[#D7A764]">join us?</span>
              </h2>
              <p className="text-gray-500 text-sm text-center max-w-xl mx-auto mb-10">
                Fill out the form below and attach your resume. We'll get back to you within 48 hours.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll direction="up" delay={100}>
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={inputClass} placeholder="Enter your full name" disabled={isSubmitting} />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="your.email@example.com" disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="+91 XXXXX XXXXX" disabled={isSubmitting} />
                    </div>
                    <div>
                      <label className={labelClass}>Position Applied For *</label>
                      <select name="position" required value={formData.position} onChange={handleInputChange} className={inputClass} disabled={isSubmitting}>
                        <option value="">Select a position</option>
                        {jobOpenings.map(job => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Years of Experience *</label>
                    <input type="text" name="experience" required value={formData.experience} onChange={handleInputChange} className={inputClass} placeholder="e.g., 3 years" disabled={isSubmitting} />
                  </div>

                  <div>
                    <label className={labelClass}>Upload Resume * (PDF, DOC, DOCX — Max 5MB)</label>
                    <input type="file" name="resume" required onChange={handleFileChange} accept=".pdf,.doc,.docx" className={`${inputClass} file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-[#D7A764]/10 file:text-[#D7A764] file:text-xs file:font-normal cursor-pointer`} disabled={isSubmitting} />
                    {formData.resume && <p className="text-xs text-gray-400 mt-1.5">Selected: {formData.resume.name}</p>}
                  </div>

                  <div>
                    <label className={labelClass}>Cover Letter (Optional)</label>
                    <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows={5} className={inputClass} placeholder="Tell us why you're a great fit for this role…" disabled={isSubmitting} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
                    ) : (
                      <><Send className="h-4 w-4" /> Submit Application</>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-[#00274D]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3 text-center">FAQ</p>
              <h2 className="text-3xl font-normal text-white leading-tight mb-10 text-center">
                Career <span className="text-[#D7A764]">questions.</span>
              </h2>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={100}>
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <FaqSection id="career" icon="💼" title="Hiring & Application" items={careerFaqItems} />
                <p className="text-sm text-gray-400 mt-6 text-center">
                  Still have questions?{" "}
                  <a href={`mailto:${companyInfo.contact.email}`} className="text-[#D7A764] underline underline-offset-2 hover:text-[#c4954a] transition-colors">
                    Email our HR team →
                  </a>
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
                <h2 className="text-2xl font-normal text-[#00274D] mb-3">Have Questions?</h2>
                <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
                  Our HR team is here to help. Reach out to us for any queries about careers at Realhubb.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={`mailto:${companyInfo.contact.email}`}>
                    <button className="px-8 py-3 rounded-full bg-[#00274D] hover:bg-[#001d3d] text-white font-normal text-sm transition-colors duration-200">
                      Email HR Team
                    </button>
                  </a>
                  <a href={`tel:${companyInfo.contact.phone}`}>
                    <button className="px-8 py-3 rounded-full border border-[#D7A764] text-[#D7A764] hover:bg-[#D7A764] hover:text-[#00274D] font-normal text-sm transition-colors duration-200">
                      Call Us
                    </button>
                  </a>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  );
};

export default Career;