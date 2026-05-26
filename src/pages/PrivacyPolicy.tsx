// src/pages/PrivacyPolicy.tsx
// Redesigned to match home page premium navy/gold design system.

import { ShieldCheck } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { ReactNode } from "react";

const PolicyCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="group rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#D7A764]/30">
    <h2 className="text-xl font-normal text-[#00274D] mb-4 transition-colors duration-300 group-hover:text-[#D7A764]">
      {title}
    </h2>
    <div className="text-gray-500 leading-relaxed text-sm">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | RealHubb Ventures Pvt. Ltd."
        description="Read RealHubb's privacy policy to understand how we collect, use, and protect your personal data when using our real estate services across Bangalore, Hyderabad & Chennai."
        keywords="RealHubb privacy policy, data protection real estate, personal information policy, RealHubb data security"
        canonical="https://www.realhubb.in/privacy"
        image="https://www.realhubb.in/og-image.jpg"
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Privacy Policy", url: "https://www.realhubb.in/privacy" },
        ]}
      />

      <div className="min-h-screen pt-28 pb-20 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28 max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7A764]/10 text-[#D7A764] shrink-0">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-2">Legal</p>
              <h1 className="text-4xl md:text-5xl font-normal text-[#00274D]">Privacy Policy</h1>
              <p className="text-gray-500 mt-4 max-w-3xl text-base leading-relaxed">
                This Privacy Policy explains how we collect, use, store, and protect
                your personal information when you interact with our website and services.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <PolicyCard title="1. Information We Collect">
              <p>
                We collect information you voluntarily provide to us such as your
                name, email address, phone number, and any details submitted
                through enquiry or contact forms.
              </p>
              <p className="mt-3">
                We may also collect non-personal information such as browser type,
                device information, IP address, and usage data to improve site
                performance and user experience.
              </p>
            </PolicyCard>

            <PolicyCard title="2. How We Use Your Information">
              <p>
                Your information is used strictly to respond to enquiries,
                schedule site visits, provide requested services, and improve our offerings.
              </p>
              <p className="mt-3">
                We do not sell, rent, or trade your personal information under any circumstances.
              </p>
            </PolicyCard>

            <PolicyCard title="3. Cookies and Tracking Technologies">
              <p>
                We use cookies and similar technologies to enhance functionality,
                analyze traffic, and understand user behavior.
              </p>
              <p className="mt-3">
                You can disable cookies in your browser settings, but some
                features of the website may not function properly.
              </p>
            </PolicyCard>

            <PolicyCard title="4. Data Security and Retention">
              <p>
                We implement industry-standard security measures to protect your
                personal data from unauthorized access, misuse, or disclosure.
              </p>
              <p className="mt-3">
                Personal data is retained only as long as necessary to fulfill the
                purposes outlined in this policy or as required by law.
              </p>
            </PolicyCard>

            <PolicyCard title="5. Association With Real Estate Developers">
              <p>
                Our platform showcases residential and commercial projects from multiple
                reputed real estate developers for informational and marketing purposes.
              </p>
              <p className="mt-3">
                When you submit an enquiry on a specific project or developer listing, your
                personal information may be shared only with the relevant developer or
                their authorized sales representatives to facilitate property-related
                communication, site visits, pricing details, and availability updates.
              </p>
              <p className="mt-3">
                Developers featured on our platform include, but are not limited to:
                Prestige Group, Brigade Group, Godrej Properties, Sobha Limited, Lodha Group,
                DSR Group, Assetz Property Group, Birla Estates, Tata Housing, Ramky Group,
                Provident Housing, Sattva Group, Puravankara Limited, Mahindra Lifespaces,
                Total Environment, and other listed developers displayed on our website.
              </p>
              <p className="mt-3">
                We do not sell or distribute your personal information to unrelated third
                parties. Data is shared strictly for real estate enquiry fulfillment.
              </p>
            </PolicyCard>

            <PolicyCard title="6. Third-Party Services">
              <p>
                We may use third-party services for analytics, hosting, customer relationship
                management, and communication. These providers process data only on our
                behalf and are bound by confidentiality obligations.
              </p>
              <p className="mt-3">
                We are not responsible for the privacy practices of external websites or
                developer-owned platforms linked from our site.
              </p>
            </PolicyCard>

            <PolicyCard title="7. Contact Information">
              <p>
                If you have any questions or concerns regarding this Privacy Policy, you may contact us at:
              </p>
              <p className="mt-3 font-medium text-[#00274D]">
                <a href="mailto:info@realhubb.in" className="text-[#D7A764] hover:underline">
                  info@realhubb.in
                </a>
              </p>
            </PolicyCard>

            <p className="text-xs text-gray-400 pt-4">Last updated: November 27, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;