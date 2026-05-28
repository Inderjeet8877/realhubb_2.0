import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export interface PropertyFilters {
  searchQuery: string;
  bhk: string;
  type: string;
  city: string;
  priceRange: string;
}

interface PropertySearchFilterProps {
  onFilterChange: (filters: PropertyFilters) => void;
  totalResults: number;
  initialFilters?: Partial<PropertyFilters>;
}

const BHK_OPTIONS = [
  { label: "All",    value: "all"   },
  { label: "Studio", value: "studio"},
  { label: "1 BHK",  value: "1bhk" },
  { label: "2 BHK",  value: "2bhk" },
  { label: "3 BHK",  value: "3bhk" },
  { label: "4 BHK",  value: "4bhk" },
  { label: "5 BHK+", value: "5bhk+"},
];

const TYPE_OPTIONS = [
  { label: "All",       value: "all"       },
  { label: "Apartment", value: "apartment" },
  { label: "Villa",     value: "villa"     },
  { label: "Plot",      value: "plot"      },
];

const CITY_OPTIONS = [
  { label: "All Cities", value: "all"       },
  { label: "Bangalore",  value: "bangalore" },
  { label: "Hyderabad",  value: "hyderabad" },
  { label: "Chennai",    value: "chennai"   },
];

const PRICE_OPTIONS = [
  { label: "Any Price",    value: "all"              },
  { label: "Under ₹50L",  value: "0-5000000"         },
  { label: "₹50L–₹1Cr",  value: "5000000-10000000"  },
  { label: "₹1Cr–₹2Cr",  value: "10000000-20000000" },
  { label: "₹2Cr–₹5Cr",  value: "20000000-50000000" },
  { label: "Above ₹5Cr",  value: "50000000-999999999"},
];

const DEFAULT_FILTERS: PropertyFilters = {
  searchQuery: "", bhk: "all", type: "all", city: "all", priceRange: "all",
};

const PropertySearchFilter = ({ onFilterChange, totalResults, initialFilters }: PropertySearchFilterProps) => {
  const merged = initialFilters ? { ...DEFAULT_FILTERS, ...initialFilters } : DEFAULT_FILTERS;
  const [filters, setFilters] = useState<PropertyFilters>(merged);
  const [showAdvanced, setShowAdvanced] = useState(() =>
    !!(initialFilters?.type && initialFilters.type !== "all") ||
    !!(initialFilters?.priceRange && initialFilters.priceRange !== "all")
  );

  const activeFilterCount = [
    filters.bhk !== "all",
    filters.type !== "all",
    filters.city !== "all",
    filters.priceRange !== "all",
  ].filter(Boolean).length;

  const updateFilter = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    onFilterChange(DEFAULT_FILTERS);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Row 1: Search + Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-[#00274D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D7A764]/30 focus:border-[#D7A764] transition-all text-sm"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilter("searchQuery", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-3.5 w-3.5 text-gray-400" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowAdvanced((v) => !v)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all whitespace-nowrap ${
            showAdvanced || activeFilterCount > 0
              ? "bg-[#00274D] text-white border-[#00274D]"
              : "bg-white border-gray-200 text-[#00274D] hover:border-[#D7A764]/50"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/25 text-xs font-normal">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Row 2: Filter Groups */}
      {showAdvanced && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
          <FilterGroup label="BHK Type"       options={BHK_OPTIONS}   value={filters.bhk}        onChange={(v) => updateFilter("bhk", v)}        />
          <FilterGroup label="Property Type"  options={TYPE_OPTIONS}  value={filters.type}       onChange={(v) => updateFilter("type", v)}       />
          <FilterGroup label="City"           options={CITY_OPTIONS}  value={filters.city}       onChange={(v) => updateFilter("city", v)}       />
          <FilterGroup label="Budget"         options={PRICE_OPTIONS} value={filters.priceRange} onChange={(v) => updateFilter("priceRange", v)} />

          {activeFilterCount > 0 && (
            <div className="pt-1 border-t border-gray-100">
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Row 3: Results count + active tags */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <span>
          <span className="font-normal text-[#00274D]">{totalResults}</span>{" "}
          {totalResults === 1 ? "property" : "properties"} found
        </span>

        {filters.bhk !== "all" && (
          <ActiveTag label={BHK_OPTIONS.find((o) => o.value === filters.bhk)?.label ?? filters.bhk} onRemove={() => updateFilter("bhk", "all")} />
        )}
        {filters.type !== "all" && (
          <ActiveTag label={TYPE_OPTIONS.find((o) => o.value === filters.type)?.label ?? filters.type} onRemove={() => updateFilter("type", "all")} />
        )}
        {filters.city !== "all" && (
          <ActiveTag label={CITY_OPTIONS.find((o) => o.value === filters.city)?.label ?? filters.city} onRemove={() => updateFilter("city", "all")} />
        )}
        {filters.priceRange !== "all" && (
          <ActiveTag label={PRICE_OPTIONS.find((o) => o.value === filters.priceRange)?.label ?? ""} onRemove={() => updateFilter("priceRange", "all")} />
        )}
      </div>
    </div>
  );
};

const FilterGroup = ({
  label, options, value, onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <p className="text-xs font-normal text-gray-400 uppercase tracking-wider">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
            value === opt.value
              ? "bg-[#00274D] text-white border-[#00274D] shadow-sm"
              : "bg-white border-gray-200 text-[#00274D] hover:border-[#D7A764]/50 hover:bg-[#D7A764]/5"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const ActiveTag = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D7A764]/10 text-[#D7A764] text-xs font-medium border border-[#D7A764]/20">
    {label}
    <button onClick={onRemove} className="hover:text-[#D7A764]/60 transition-colors ml-0.5">
      <X className="h-3 w-3" />
    </button>
  </span>
);

export default PropertySearchFilter;