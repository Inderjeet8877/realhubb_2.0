// src/components/home/CityCard.tsx

import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CityCardProps {
  name: string;
  logo: string;
  projects: number;
  description: string;
  link: string;
}

const CityCard: React.FC<CityCardProps> = ({
  name,
  logo,
  projects,
  description,
  link,
}) => {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Card
          className="
            group relative p-6 
            h-48 md:h-48
            flex flex-col items-center justify-center 
            rounded-2xl overflow-hidden cursor-pointer
            bg-white border border-gray-200
            shadow-md hover:shadow-xl active:shadow-lg
            transition-all duration-300
          "
        >
          {/* Background gradient on hover/active */}
          <div
            className="
              absolute inset-0 opacity-0 
              group-hover:opacity-100 group-active:opacity-100
              transition-all duration-500
              bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100
            "
          />

          {/* Logo */}
          <motion.img
            src={logo}
            alt={name}
            width="112"
            height="112"
            className="
              h-16 md:h-20 w-auto relative z-10 
              transition-all duration-300
              group-hover:h-10 md:group-hover:h-12
              group-active:h-10
            "
          />

          {/* City Name - Always visible, moves up on hover */}
          <motion.h3
            className="
              text-lg md:text-xl font-normal text-gray-800 
              mt-2 md:mt-3 relative z-10
              transition-all duration-300
              group-hover:-translate-y-2 group-hover:text-base md:group-hover:text-lg
              group-active:-translate-y-2 group-active:text-base
            "
          >
            {name}
          </motion.h3>

          {/* Hover content - Projects and Description */}
          <div
            className="
              relative z-10 flex flex-col items-center justify-center
              opacity-0 
              group-hover:opacity-100 group-active:opacity-100
              transition-all duration-300
              px-4 text-center mt-1 md:mt-2
              translate-y-4 
              group-hover:translate-y-0 group-active:translate-y-0
            "
          >
            <p className="text-xs md:text-sm text-gray-700 font-medium">
              {projects}+ Projects Available
            </p>

            <p className="text-xs text-gray-600 mt-1 md:mt-2 line-clamp-2">
              {description}
            </p>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default CityCard;