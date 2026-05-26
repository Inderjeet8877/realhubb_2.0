import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { currentProjects } from "@/data/properties";
import PropertyCard from "@/components/property/PropertyCard";

const CompletedProjectsSection = () => {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="mb-20 text-center">
      {/* Section Header */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D7A764]/10 rounded-2xl mb-6 border border-[#D7A764]/25">
        <Building2 className="h-8 w-8 text-[#D7A764]" />
      </div>
      <h2 className="text-3xl font-normal text-[#00274D] mb-6">
        Our <span className="text-[#D7A764]">Completed Projects</span>
      </h2>

      {/* Toggle Button */}
      <button
        onClick={() => setShowProjects(!showProjects)}
        className="px-6 py-3 rounded-full bg-[#00274D] text-white font-normal shadow-md hover:bg-[#001d3a] transition flex items-center gap-2 mx-auto"
      >
        {showProjects ? "Hide Projects" : "View Completed Projects"}
        {showProjects ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {/* Animated Projects Grid */}
      <AnimatePresence>
        {showProjects && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {currentProjects.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (Number(property.id) || 0) }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompletedProjectsSection;
