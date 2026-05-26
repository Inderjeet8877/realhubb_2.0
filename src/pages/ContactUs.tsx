/**
 * Contact Us Page
 * Redesigned to match home page premium navy/gold design system.
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { companyInfo } from "@/data/company";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import emailjs from "emailjs-com";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import SEO from "@/components/seo/SEO";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) newErrors.name = "Name must contain only letters and spaces.";
    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (formData.phone.length !== 10) newErrors.phone = "Phone number must be exactly 10 digits.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    else if (formData.subject.trim().length < 3) newErrors.subject = "Subject must be at least 3 characters.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
    if (!formData.consent) newErrors.consent = "You must agree to the terms to proceed.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await emailjs.send("service_mai4j8k", "template_1oq6oci", {
        name: formData.name, email: formData.email, phone: formData.phone,
        subject: formData.subject, message: formData.message,
      }, "R-j4qmWrSTnvwNVIc");
      toast.success("Message sent successfully!", { description: "Our team will contact you within 24 hours." });
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "contact_form_submit", { event_category: "engagement", event_label: "Contact Us Form" });
      }
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", consent: false });
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message.", { description: "Please try again later or contact us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact RealHubb | Real Estate Consultation in Bangalore"
        description="Contact RealHubb for expert real estate consultation in Bangalore. Book a free property site visit, get legal assistance, and speak with our property advisors today."
        keywords="contact RealHubb, real estate consultation Bangalore, property advisors Bangalore, book property site visit Bangalore"
        canonical="https://www.realhubb.in/contact-us"
        image="https://www.realhubb.in/og-contact.jpg"
      />

      <div className="bg-[#faf6f1]">

        {/* ── SPLIT SCREEN: info left, form right ── */}
        {/* mt-16/20 offsets the fixed navbar (h-16 mobile / h-20 desktop) */}
        <section className="flex flex-col lg:flex-row mt-16 lg:mt-20 lg:h-[calc(100vh-80px)]">

          {/* Left: Navy panel */}
          <div className="lg:w-[42%] shrink-0 bg-[#00274D] flex flex-col justify-center px-8 md:px-12 lg:px-14 py-12 lg:py-10">
            <FadeInOnScroll direction="up">
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">
                Contact Us
              </p>
              <h1 className="text-3xl md:text-4xl font-normal text-white leading-tight mb-3">
                Get in <span className="text-[#D7A764]">touch</span> with our advisors.
              </h1>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                Have questions about our properties or services? Reach out — we respond within 24 hours.
              </p>

              {/* Compact contact info */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#D7A764]/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-[#D7A764]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-normal text-white/40 mb-0.5">Call Us</p>
                    <a href={`tel:${companyInfo.contact.phone}`} className="text-white text-sm hover:text-[#D7A764] transition-colors font-medium">
                      {companyInfo.contact.phone}
                    </a>
                    <p className="text-white/40 text-xs mt-0.5">{companyInfo.workingHours.weekdays}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#D7A764]/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-[#D7A764]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-normal text-white/40 mb-0.5">Email Us</p>
                    <a href={`mailto:${companyInfo.contact.email}`} className="text-white text-sm hover:text-[#D7A764] transition-colors font-medium break-all">
                      {companyInfo.contact.email}
                    </a>
                    <p className="text-white/40 text-xs mt-0.5">24/7 email support</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#D7A764]/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-[#D7A764]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-normal text-white/40 mb-0.5">Visit Us</p>
                    <span className="text-white text-sm font-medium">{companyInfo.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#D7A764]/10 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-[#D7A764]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-normal text-white/40 mb-0.5">Working Hours</p>
                    <span className="text-white text-sm font-medium">Mon–Fri: {companyInfo.workingHours.weekdays}</span>
                    <p className="text-white/40 text-xs mt-0.5">Sat: {companyInfo.workingHours.saturday} · Sun: {companyInfo.workingHours.sunday}</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>

          {/* Right: Form panel */}
          <div className="min-w-0 flex-1 bg-[#faf6f1] flex flex-col justify-center px-8 md:px-12 lg:px-14 py-10 lg:overflow-y-auto">
            <FadeInOnScroll direction="up" delay={80}>
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-1">
                Send a Message
              </p>
              <h2 className="text-2xl font-normal text-[#00274D] mb-5">
                We'd love to hear from you.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-[#00274D] text-xs font-normal">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Enter your name"
                      className={`border-gray-200 focus-visible:ring-[#D7A764]/30 focus-visible:border-[#D7A764] ${errors.name ? "border-red-400" : ""}`} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-[#00274D] text-xs font-normal">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                      placeholder="mohan@example.com"
                      className={`border-gray-200 focus-visible:ring-[#D7A764]/30 focus-visible:border-[#D7A764] ${errors.email ? "border-red-400" : ""}`} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-[#00274D] text-xs font-normal">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange}
                      placeholder="Enter 10-digit number" inputMode="numeric" maxLength={10}
                      className={`border-gray-200 focus-visible:ring-[#D7A764]/30 focus-visible:border-[#D7A764] ${errors.phone ? "border-red-400" : ""}`} />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  {/* Subject */}
                  <div className="space-y-1">
                    <Label htmlFor="subject" className="text-[#00274D] text-xs font-normal">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange}
                      placeholder="Property Inquiry"
                      className={`border-gray-200 focus-visible:ring-[#D7A764]/30 focus-visible:border-[#D7A764] ${errors.subject ? "border-red-400" : ""}`} />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <Label htmlFor="message" className="text-[#00274D] text-xs font-normal">
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your requirements..." rows={4}
                    className={`border-gray-200 focus-visible:ring-[#D7A764]/30 focus-visible:border-[#D7A764] ${errors.message ? "border-red-400" : ""}`} />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Consent */}
                <div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="consent" name="consent" checked={formData.consent}
                      onChange={handleChange} className="mt-1 h-4 w-4 accent-[#D7A764]" />
                    <Label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">
                      By submitting the above information you agree to receive communication about
                      my products and services via SMS/RCS/WABA/Voice/etc.{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-500 mt-1">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── MAP ── */}
        <section className="py-16 bg-[#faf6f1]">
          <div className="px-8 md:px-14 lg:px-20 xl:px-28">
            <FadeInOnScroll direction="up">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84574096615!2d77.49085259179685!3d12.95396876513768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17000e1f6281:0x6da5c82f288af451!2sRealhubb+Ventures+Private+Limited!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </FadeInOnScroll>
          </div>
        </section>

      </div>
    </>
  );
};

export default ContactUs;