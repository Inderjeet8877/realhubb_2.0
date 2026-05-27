import all from "../assets/all cities.png";
import bangalore from "../assets/bangalore.png";
import hyderabad from "../assets/hyderabad-charminar.png";
import ChennaiIcon from "../assets/chennai.png";

type City = { key: string; label: string; icon: string; subtitle?: string };

interface CitySelectorProps {
  value: string;
  onChange: (city: string) => void;
  cities?: City[];
}

const defaultCities: City[] = [
  { key: "all",       label: "All Cities", icon: all,          subtitle: "Show all cities" },
  { key: "bangalore", label: "Bangalore",  icon: bangalore,    subtitle: "Karnataka"       },
  { key: "hyderabad", label: "Hyderabad",  icon: hyderabad,    subtitle: "Telangana"       },
  { key: "chennai",   label: "Chennai",    icon: ChennaiIcon,  subtitle: "Tamil Nadu"      },
];

const CitySelector = ({ value, onChange, cities = defaultCities }: CitySelectorProps) => {
  const normalizedValue = value?.toLowerCase() ?? "all";

  return (
    <nav aria-label="Filter properties by city" className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-normal text-[#00274D]">Filter by city</p>
        <p className="text-xs text-gray-400">Select one</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {cities.map((c) => {
          const isActive = normalizedValue === c.key.toLowerCase();
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange(c.key)}
              aria-pressed={isActive}
              aria-label={`Show properties in ${c.label}`}
              className={`flex flex-col items-center gap-1.5 rounded-xl border px-5 py-3 cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7A764] ${
                isActive
                  ? "ring-2 ring-[#D7A764] bg-[#D7A764]/5 border-[#D7A764] shadow-sm"
                  : "bg-white border-gray-200 hover:border-[#D7A764]/50 hover:shadow-sm"
              }`}
            >
              <img
                src={c.icon}
                alt={`${c.label} icon`}
                width="40"
                height="40"
                className="w-10 h-10 object-contain"
                loading="lazy"
                style={c.key === "all" ? { filter: "sepia(1) saturate(1.8) brightness(1.05)" } : undefined}
              />
              <span className={`text-sm font-normal ${isActive ? "text-[#D7A764]" : "text-[#00274D]"}`}>
                {c.label}
              </span>
              {c.subtitle && (
                <span className="text-xs text-gray-400">{c.subtitle}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CitySelector;