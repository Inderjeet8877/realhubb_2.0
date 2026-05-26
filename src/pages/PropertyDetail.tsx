// src/pages/PropertyDetail.tsx
// Redesigned to match home page premium navy/gold design system.

import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useProperties } from "../hooks/Useproperties";
import FaqSection from "@/components/faq/FaqSection";
import { getPropertyFaqs, getPropertyFaqSchema } from "../data/Propertyfaqdata";
import SEO from "@/components/seo/SEO";
import { companyInfo } from "@/data/company";
import {
  MapPin, Calendar, ArrowLeft, Phone, Mail,
  CheckCircle, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import EnquiryPopup from "../components/property/EnquiryPopup";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

function PropertySkeleton() {
  return (
    <div className="min-h-screen bg-[#faf6f1] pt-28 pb-20">
      <div className="px-8 md:px-14 lg:px-20 xl:px-28">
        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { properties, loading } = useProperties();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen,      setIsFullscreen]      = useState(false);
  const [isEnquiryOpen,     setIsEnquiryOpen]     = useState(false);

  const property = useMemo(
    () => properties.find(p => p.slug === slug || p.id === slug),
    [properties, slug]
  );

  if (loading) return <PropertySkeleton />;

  if (!property) {
    return (
      <div className="min-h-screen bg-[#faf6f1] pt-28 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
          <h2 className="text-2xl font-normal text-[#00274D] mb-4">Property Not Found</h2>
          <p className="text-gray-400 mb-6 text-sm">
            This property may have been removed or the link is incorrect.
          </p>
          <Link to="/ongoing-projects">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const p             = property as any;
  const title         = p.title    || p.name     || "";
  const bhk           = p.bhk      || p.bedrooms || "";
  const images: string[] = Array.isArray(p.images)
    ? p.images
    : p.image      ? [p.image]
    : p.coverImage ? [p.coverImage]
    : [];
  const amenities:      string[] = Array.isArray(p.amenities)     ? p.amenities      : [];
  const specifications: any[]    = Array.isArray(p.specifications) ? p.specifications : [];

  const propertyFaqs = getPropertyFaqs(property.id);
  const faqSchema    = getPropertyFaqSchema(property.id);

  const nextImage = () => setCurrentImageIndex(i => i === images.length - 1 ? 0 : i + 1);
  const prevImage = () => setCurrentImageIndex(i => i === 0 ? images.length - 1 : i - 1);

  const isCompleted = p.status === "completed";
  const isFeatured  = p.featured && p.featured !== "false" && p.featured !== false;

  return (
    <>
      <SEO
        title={`${title} | ${bhk} in ${p.location}, ${p.city} | RealHubb`}
        description={`${title} – RERA approved ${(p.type || "").toLowerCase()} in ${p.location}, ${p.city}. ${bhk} starting ${p.price}. ${p.possession ? `Possession by ${p.possession}.` : ""} Book a free site visit with RealHubb.`}
        keywords={`${title}, ${bhk} in ${p.location}, ${(p.type || "").toLowerCase()} in ${p.city}, RERA approved ${p.city}, ${p.location} real estate`}
        canonical={`https://www.realhubb.in/property/${p.slug || p.id}`}
        image={images[0] || "https://www.realhubb.in/og-image.jpg"}
        type="website"
        breadcrumb={[
          { name: "Home", url: "https://www.realhubb.in/" },
          {
            name: isCompleted ? "Upcoming Projects" : "Ongoing Projects",
            url:  isCompleted ? "https://www.realhubb.in/upcoming-projects" : "https://www.realhubb.in/ongoing-projects",
          },
          { name: title, url: `https://www.realhubb.in/property/${p.slug || p.id}` },
        ]}
        faq={propertyFaqs.length > 0 ? propertyFaqs.map(item => ({ question: item.question, answer: item.answer })) : undefined}
      />

      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="min-h-screen bg-[#faf6f1] pt-28 pb-20">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">

          {/* Back */}
          <Link
            to={isCompleted ? "/upcoming-projects" : "/ongoing-projects"}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#D7A764] transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to {isCompleted ? "Upcoming" : "Ongoing"} Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* Image gallery */}
              <FadeInOnScroll direction="up">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  {images.length > 0 ? (
                    <>
                      <div
                        className="relative w-full bg-gray-900 cursor-pointer"
                        onClick={() => setIsFullscreen(true)}
                      >
                        <img
                          src={images[currentImageIndex]}
                          alt={title}
                          className="w-full h-auto block"
                          style={{ maxHeight: "70vh", objectFit: "contain", margin: "0 auto" }}
                        />

                        {images.length > 1 && (
                          <>
                            <button
                              onClick={e => { e.stopPropagation(); prevImage(); }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow transition"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="h-5 w-5 text-[#00274D]" />
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); nextImage(); }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow transition"
                              aria-label="Next image"
                            >
                              <ChevronRight className="h-5 w-5 text-[#00274D]" />
                            </button>
                          </>
                        )}

                        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                          <span className={`px-3 py-1 text-[10px] font-normal uppercase tracking-wider rounded-full ${isCompleted ? "bg-teal-700 text-white" : "bg-[#00274D] text-white"}`}>
                            {isCompleted ? "Ready to Move" : "Under Construction"}
                          </span>
                          {isFeatured && (
                            <span className="px-3 py-1 text-[10px] font-normal uppercase tracking-wider rounded-full bg-[#D7A764] text-[#00274D]">
                              Featured
                            </span>
                          )}
                        </div>

                        {images.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                            {currentImageIndex + 1} / {images.length}
                          </div>
                        )}
                      </div>

                      {images.length > 1 && (
                        <div className="p-3 flex gap-2 overflow-x-auto bg-gray-50">
                          {images.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentImageIndex(i)}
                              className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                                i === currentImageIndex
                                  ? "border-[#D7A764] opacity-100"
                                  : "border-transparent opacity-50 hover:opacity-80"
                              }`}
                              aria-label={`View image ${i + 1}`}
                            >
                              <img src={img} className="w-full h-full object-cover" alt="" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No images available
                    </div>
                  )}
                </div>
              </FadeInOnScroll>

              {/* Info card */}
              <FadeInOnScroll direction="up" delay={60}>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h1 className="text-2xl sm:text-3xl font-normal text-[#00274D]">{title}</h1>

                  {p.location && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{p.location}{p.city ? `, ${p.city}` : ""}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 border-t border-gray-100 pt-6">
                    {p.type && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">Type</p>
                        <p className="font-normal text-[#00274D] capitalize">{p.type}</p>
                      </div>
                    )}
                    {bhk && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">Configuration</p>
                        <p className="font-normal text-[#00274D]">{bhk}</p>
                      </div>
                    )}
                    {p.area && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">Area</p>
                        <p className="font-normal text-[#00274D]">{p.area}</p>
                      </div>
                    )}
                    {p.developer && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">Developer</p>
                        <p className="font-normal text-[#00274D]">{p.developer}</p>
                      </div>
                    )}
                    {(p.possession || p.completionDate) && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">Possession</p>
                        <p className="font-normal text-[#00274D]">{p.possession || p.completionDate}</p>
                      </div>
                    )}
                    {p.rera && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">RERA No.</p>
                        <p className="font-normal text-[#00274D] text-xs break-all">{p.rera}</p>
                      </div>
                    )}
                  </div>

                  {p.description && (
                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <h2 className="text-lg font-normal text-[#00274D] mb-3">Description</h2>
                      <p className="text-gray-500 leading-relaxed text-sm">{p.description}</p>
                    </div>
                  )}
                </div>
              </FadeInOnScroll>

              {/* Map */}
              {p.mapEmbedUrl && (
                <FadeInOnScroll direction="up" delay={80}>
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-normal text-[#00274D] mb-1">Project Location</h2>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-5">
                      <MapPin className="h-4 w-4" />
                      <span>{p.location}</span>
                    </div>
                    <div className="w-full h-[350px] rounded-xl overflow-hidden border border-gray-100">
                      <iframe
                        src={p.mapEmbedUrl}
                        title={`${title} Map`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </FadeInOnScroll>
              )}

              {/* Specifications */}
              {specifications.length > 0 && (
                <FadeInOnScroll direction="up" delay={100}>
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-normal text-[#00274D] mb-4">Specifications</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {specifications.map((s: any, i: number) => (
                        <div key={i} className="flex justify-between p-4 bg-[#faf6f1] rounded-xl">
                          <span className="text-gray-400 text-sm">{s.label}</span>
                          <span className="font-normal text-[#00274D] text-sm">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInOnScroll>
              )}

              {/* Amenities */}
              {amenities.length > 0 && (
                <FadeInOnScroll direction="up" delay={120}>
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-normal text-[#00274D] mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {amenities.map((a: string, i: number) => (
                        <div key={i} className="flex gap-2 items-center">
                          <CheckCircle className="h-4 w-4 text-[#D7A764] shrink-0" />
                          <span className="text-gray-500 text-sm">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInOnScroll>
              )}

              {/* FAQs */}
              {propertyFaqs.length > 0 && (
                <FadeInOnScroll direction="up" delay={140}>
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <FaqSection
                      id={property.id}
                      icon="❓"
                      title={`Frequently Asked Questions – ${title}`}
                      items={propertyFaqs}
                    />
                    <p className="text-sm text-gray-400 mt-4">
                      Have more questions?{" "}
                      <button
                        onClick={() => setIsEnquiryOpen(true)}
                        className="text-[#D7A764] underline underline-offset-2 hover:text-[#c4954a] transition-colors"
                      >
                        Ask our advisor
                      </button>
                    </p>
                  </div>
                </FadeInOnScroll>
              )}

            </div>

            {/* RIGHT: Sticky CTA */}
            <div className="lg:order-last">
              <FadeInOnScroll direction="up" delay={60}>
                <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-28 space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.18em] font-medium mb-1">Starting from</p>
                    <p className="text-2xl sm:text-3xl font-normal text-[#00274D]">{p.price}</p>
                    {(p.possession || p.completionDate) && (
                      <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Possession: {p.possession || p.completionDate}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsEnquiryOpen(true)}
                    className="w-full py-3 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-colors"
                  >
                    Enquire Now
                  </button>

                  <a href={`tel:${companyInfo.contact.phone}`} className="block">
                    <button className="w-full py-3 rounded-full border border-[#00274D] text-[#00274D] hover:bg-[#00274D] hover:text-white font-normal text-sm transition-colors flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Schedule Site Visit
                    </button>
                  </a>

                  <a href={`mailto:${companyInfo.contact.email}`} className="block">
                    <button className="w-full py-3 rounded-full border border-gray-200 text-gray-500 hover:border-[#D7A764] hover:text-[#D7A764] font-normal text-sm transition-colors flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      Request Callback
                    </button>
                  </a>

                  <p className="text-xs text-gray-400 text-center">
                    For instant enquiry press Enquire Now
                  </p>

                  <EnquiryPopup
                    isOpen={isEnquiryOpen}
                    onClose={() => setIsEnquiryOpen(false)}
                    projectName={title}
                  />
                </div>
              </FadeInOnScroll>
            </div>

          </div>
        </div>

        {/* Fullscreen modal */}
        {isFullscreen && images.length > 0 && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 text-white hover:text-gray-300 z-10"
              onClick={e => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <img
              src={images[currentImageIndex]}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              alt={title}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute right-4 text-white hover:text-gray-300 z-10"
              onClick={e => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default PropertyDetail;