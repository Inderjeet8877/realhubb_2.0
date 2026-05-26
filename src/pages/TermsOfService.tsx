// src/pages/TermsOfService.tsx
// Redesigned to match home page premium navy/gold design system.

import { FileText } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { ReactNode } from "react";

const TermsCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="group rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#D7A764]/30">
    <h2 className="text-xl font-normal text-[#00274D] mb-4 transition-colors duration-300 group-hover:text-[#D7A764]">
      {title}
    </h2>
    <div className="text-gray-500 leading-relaxed text-sm">{children}</div>
  </div>
);

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service | RealHubb Ventures Pvt. Ltd."
        description="Read RealHubb's terms of service governing your use of our real estate platform, property listings, and advisory services across Bangalore, Hyderabad & Chennai."
        keywords="RealHubb terms of service, user agreement, real estate platform terms, property listing terms, RealHubb Ventures terms"
        canonical="https://www.realhubb.in/terms"
        image="https://www.realhubb.in/og-image.jpg"
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          { name: "Terms of Service", url: "https://www.realhubb.in/terms" },
        ]}
      />

      <div className="min-h-screen pt-28 pb-20 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28 max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7A764]/10 text-[#D7A764] shrink-0">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-2">Legal</p>
              <h1 className="text-4xl md:text-5xl font-normal text-[#00274D]">Terms of Service</h1>
              <p className="text-gray-500 mt-4 max-w-3xl text-base leading-relaxed">
                These Terms of Service govern your access to and use of our website,
                services, and content. Please read them carefully.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <TermsCard title="1. Acceptance of Terms">
              <p>
                By accessing or using this website, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="mt-3">
                If you do not agree with any part of these Terms, you must not use
                the website or services.
              </p>
            </TermsCard>

            <TermsCard title="2. User Obligations">
              <p>
                You agree to provide accurate, complete, and current information
                when submitting enquiries or forms on the website.
              </p>
              <p className="mt-3">
                You must not use the website for unlawful activities, misleading
                actions, or any behavior that may harm the platform or its users.
              </p>
            </TermsCard>

            <TermsCard title="3. Intellectual Property">
              <p>
                All content on this website including text, images, graphics,
                logos, and layouts is protected by applicable intellectual property laws.
              </p>
              <p className="mt-3">
                You may not copy, reproduce, distribute, or republish any content
                without prior written permission.
              </p>
            </TermsCard>

            <TermsCard title="4. Role of the Platform">
              <p>
                This website operates as an informational and marketing platform for real
                estate projects offered by third-party developers.
              </p>
              <p className="mt-3">
                We are not a property developer, owner, or construction company. We act as
                an intermediary to facilitate communication between prospective buyers and
                listed developers or their authorized representatives.
              </p>
            </TermsCard>

            <TermsCard title="5. Listings, Pricing, and Disclaimers">
              <p>
                Property listings, pricing, availability, floor plans, images, and other
                project-related information are provided for general informational purposes only.
              </p>
              <p className="mt-3">
                Such information is subject to change without notice and may differ from
                actual offerings. Users are advised to verify all details directly with the
                respective developers before making any decisions.
              </p>
            </TermsCard>

            <TermsCard title="6. Contact Information">
              <p>
                For legal notices, compliance questions, or concerns regarding
                these Terms, please contact us at:
              </p>
              <p className="mt-3 font-medium text-[#00274D]">
                <a href="mailto:info@realhubb.in" className="text-[#D7A764] hover:underline">
                  info@realhubb.in
                </a>
              </p>
            </TermsCard>

            <p className="text-xs text-gray-400 pt-4">Last updated: November 27, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;