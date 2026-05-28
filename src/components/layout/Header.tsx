import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Phone, ChevronDown } from "lucide-react";
import logotm from "../assets/realhubb-new-logo.png";
import { companyInfo } from "../../data/company";
import { useProperties } from "@/hooks/Useproperties";
import NotificationBell from "../notifications/NotificationBell";

// ── Global Search ──────────────────────────────────────────────────────────────
function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const { properties } = useProperties();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); return; }
    setResults(
      properties.filter(p => {
        const title     = (p.title || (p as any).name    || "").toLowerCase();
        const location  = (p.location                    || "").toLowerCase();
        const developer = ((p as any).developer          || "").toLowerCase();
        const city      = (p.city                        || "").toLowerCase();
        return title.includes(q) || location.includes(q) || developer.includes(q) || city.includes(q);
      }).slice(0, 6)
    );
  }, [query, properties]);

  const go = (slug: string, id: string) => {
    navigate(`/property/${slug || id}`);
    setQuery(""); setResults([]); onClose();
  };

  const viewAll = () => {
    navigate(`/ongoing-projects?search=${encodeURIComponent(query.trim())}`);
    setQuery(""); setResults([]); onClose();
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/20 bg-white/10 focus-within:ring-2 focus-within:ring-[#D7A764]/50 focus-within:border-[#D7A764]/50 transition-all">
        <Search className="h-4 w-4 text-white/60 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && query.trim() && viewAll()}
          placeholder="Search project, location, developer…"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none min-w-0"
        />
        <button aria-label="Close search" onClick={onClose}
          className="shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors">
          <X className="h-3.5 w-3.5 text-white/60" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-[200] overflow-hidden">
          {results.map(p => {
            const title     = p.title || (p as any).name || "";
            const developer = (p as any).developer || "";
            const image     = Array.isArray(p.images) ? p.images[0] : "";
            return (
              <button key={p.id} onClick={() => go(p.slug, p.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0">
                {image
                  ? <img src={image} alt={title} className="w-11 h-9 rounded-lg object-cover shrink-0" />
                  : <div className="w-11 h-9 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-400 text-xs">No img</div>
                }
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-normal text-gray-900 truncate">{title}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {[developer, p.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className={`ml-auto shrink-0 text-[10px] font-normal px-2 py-0.5 rounded-full ${
                  p.status === "completed" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                }`}>
                  {p.status === "completed" ? "Upcoming" : "Ongoing"}
                </span>
              </button>
            );
          })}
          <button onClick={viewAll}
            className="w-full px-4 py-2.5 text-xs font-normal text-[#D7A764] hover:bg-amber-50 transition-colors text-center">
            See all results for "{query}" →
          </button>
        </div>
      )}

      {query.trim() !== "" && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-[200] px-4 py-3 text-sm text-gray-500">
          No properties found for "<span className="font-medium text-gray-900">{query}</span>"
        </div>
      )}
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) { setIsScrolled(true); return; }
    const onScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSearch(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") { setShowSearch(false); setOpenDropdown(null); } };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/",              label: "Home"          },
    // { label: "Projects", children: [
    //     { path: "/upcoming-projects", label: "Upcoming Projects" },
    //     { path: "/ongoing-projects",  label: "Ongoing Projects"  },
    // ]},
    { path: "/projects/ongoing",         label: "Projects"         },
       { path: "/gallery",         label: "Gallery"         },

    { path: "/blog",           label: "Blog"           },
    // { path: "/realhubb-news",     label: "News" },
    { label: "Tools", children: [
      { path: "/emi-calculator", label: "EMI Calculator" },
      { path: "/home-loan-eligibility", label: "Loan Eligibility Checker" },
      { path: "/rental-yield-calculator", label: "Rental Yield Calculator" },
      { path: "/salary-advisor", label: "Salary EMI Advisor" },
      { path: "/currency-calculator", label: "Currency Calculator" },
    ]},
    { path: "/career",         label: "Career"         },
    { path: "/about",          label: "About Us"       },
    { path: "/faq",            label: "FAQ"            },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#00274D] shadow-[0_2px_24px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}>
        <div className="w-full px-8 md:px-14 lg:px-20 xl:px-28">

          {/* ── Main row ── */}
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link
              to="/"
              className="shrink-0"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <img src={logotm} alt="RealHubb" width="243" height="70"
                className="h-16 md:h-20 w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link, i) =>
                link.children ? (
                  <div key={i} className="relative group">
                    <button
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white transition-colors">
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>
                    <div
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-0 top-full pt-1 w-52 transition-all duration-150 z-50 ${
                        openDropdown === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                      }`}>
                      <div className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                        {link.children.map(child => (
                          <Link key={child.path} to={child.path}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#D7A764]/10 hover:text-[#D7A764] transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={link.path} to={link.path!}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.path!)
                        ? "text-[#D7A764]"
                        : "text-white/80 hover:text-white"
                    }`}>
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3 shrink-0">

              {/* Search (desktop) */}
              <div className="hidden md:block">
                {/* {showSearch ? (
                  <div className="w-72 lg:w-80">
                    <GlobalSearch onClose={() => setShowSearch(false)} />
                  </div>
                ) : (
                  <button onClick={() => setShowSearch(true)}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Search">
                    <Search className="h-4 w-4" />
                  </button>
                )} */}
              </div>

              {/* Notification bell */}
              {/* <div className="hidden md:block">
                <NotificationBell />
              </div> */}

              {/* Phone number (desktop) */}
              <a href={`tel:${companyInfo.contact.phone.replace(/\s/g, "")}`}
                className="hidden lg:flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
                <Phone className="w-4 h-4 text-[#D7A764]" />
                {companyInfo.contact.phone}
              </a>

              {/* Free Consultation CTA */}
              <Link to="/contact-us" className="hidden lg:block">
                <button className="px-5 py-2.5 rounded-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap shadow-md">
                  Free Consultation
                </button>
              </Link>

              {/* Mobile search icon */}
              <button onClick={() => { setShowSearch(v => !v); setIsMobileMenuOpen(false); }}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Search">
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => { setIsMobileMenuOpen(v => !v); setShowSearch(false); }}
                aria-label="Toggle menu"
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D7A764]/50">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {showSearch && (
            <div className="lg:hidden pb-3 pt-1">
              <GlobalSearch onClose={() => setShowSearch(false)} />
            </div>
          )}
        </div>

        {/* Mobile nav drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#001f3f] border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="w-full px-8 md:px-14 lg:px-20 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) =>
                link.children ? (
                  <div key={i}>
                    <p className="px-3 py-2 text-xs font-normal text-white/40 uppercase tracking-widest">
                      {link.label}
                    </p>
                    {link.children.map(child => (
                      <Link key={child.path} to={child.path}
                        className="flex items-center gap-2 pl-5 pr-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D7A764]/60 shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.path} to={link.path!}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path!)
                        ? "text-[#D7A764] bg-white/5"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}>
                    {link.label}
                  </Link>
                )
              )}

              {/* Mobile bottom actions */}
              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-white/10">
                <a href={`tel:${companyInfo.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-white/70 text-sm">
                  <Phone className="w-4 h-4 text-[#D7A764]" />
                  {companyInfo.contact.phone}
                </a>
                <Link to="/contact-us" className="ml-auto">
                  <button className="px-5 py-2.5 rounded-full bg-[#D7A764] text-[#00274D] font-normal text-sm">
                    Free Consultation
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;
