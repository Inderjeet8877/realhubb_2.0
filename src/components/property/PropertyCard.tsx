// src/components/property/PropertyCard.tsx
// Redesigned to match home page premium navy/gold design system.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Calendar } from "lucide-react";
import { Property } from "@/data/properties";
import EnquiryPopup from "./EnquiryPopup";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface PropertyCardProps {
  property: Property;
  imagePriority?: boolean;
}

const PropertyCard = ({ property, imagePriority = false }: PropertyCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const safeImageUrl = property.imageUrl || property.images?.[0] || "";
  const isCompleted = property.status === "completed";
  const isFeatured = property.featured === "true" || property.featured === true;
  const badgeLabel = isFeatured ? "Featured" : isCompleted ? "Ready to Move" : "Under Construction";
  const badgeClass = isFeatured
    ? "bg-[#D7A764] text-[#00274D]"
    : isCompleted
    ? "bg-teal-700 text-white"
    : "bg-[#00274D] text-white";

  const typeLabel = [property.bhk, property.type].filter(Boolean).join(" ").toUpperCase();

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ contain: "layout paint" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/property/${property.slug}`)}
        style={{ height: "220px" }}
      >
        {safeImageUrl ? (
          <OptimizedImage
            src={safeImageUrl}
            preset="propertyCard"
            width={662}
            height={340}
            alt={property.name || property.title || "Property"}
            priority={imagePriority}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Property Image</span>
          </div>
        )}

        {/* Status badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-normal uppercase tracking-wider rounded-full ${badgeClass}`}>
          {badgeLabel}
        </span>

        {/* Type badge */}
        <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-[#00274D] text-[10px] font-normal rounded-full">
          {property.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-[#00274D] font-normal text-base mb-1 leading-snug line-clamp-2 cursor-pointer hover:text-[#D7A764] transition-colors duration-200"
          onClick={() => navigate(`/property/${property.slug}`)}
        >
          {property.title}
        </h3>

        <div
          className="flex items-center gap-1 text-gray-400 text-xs mb-3 cursor-pointer hover:text-[#D7A764] transition-colors"
          onClick={() => property.mapEmbedUrl && window.open(property.mapEmbedUrl, "_blank")}
        >
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* BHK + Area row */}
        {(property.bhk || property.area) && (
          <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
            {property.bhk && (
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium">
                {typeLabel || property.bhk}
              </span>
            )}
            {property.area && (
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium">
                {property.area}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <p className="text-[9px] text-gray-400 uppercase tracking-[0.18em] font-medium mb-0.5">
          Starting from
        </p>
        <p className="text-[#00274D] font-normal text-lg mb-4">{property.price}</p>

        {/* Buttons */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full mb-3 py-2.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] text-sm font-normal transition-colors duration-200"
        >
          Enquire Now
        </button>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">RERA Approved</span>
          <Link to={`/property/${property.slug}`}>
            <button className="w-8 h-8 bg-[#00274D] hover:bg-[#D7A764] rounded-full flex items-center justify-center text-white transition-colors duration-200">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Possession */}
        {property.possession && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Possession: {property.possession}</span>
          </div>
        )}
      </div>

      <EnquiryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        projectName={property.title}
      />
    </div>
  );
};

export default PropertyCard;