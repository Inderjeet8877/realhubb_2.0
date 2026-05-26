import { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// ── inline hook ──
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// ── WhatsApp SVG icon ──
const WhatsAppIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/Realhubb/", color: "hover:bg-blue-600" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/realhubb_ventures/", color: "hover:bg-pink-600" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/102738045/admin/dashboard/", color: "hover:bg-blue-700" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@realhubbventures?si=aFUlCDER-mQz8UC6", color: "hover:bg-red-600" },
  { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/9980189914", color: "hover:bg-green-600" },
];

const SocialSidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  /* ── MOBILE layout ── */
  if (isMobile) {
    return (
      <div className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className={`
            bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-lg
            flex gap-2 px-3 py-2 rounded-full
            transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen ? "opacity-100 translate-y-0 max-h-20" : "opacity-0 translate-y-3 max-h-0 py-0 px-0 pointer-events-none"}
          `}
        >
          {socialLinks.map((social) => {
            const isWhatsApp = social.name === "WhatsApp";
            const Icon = social.icon;
            return (
              <a // <--- Fixed: Added missing opening tag
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${social.color} group`}
                aria-label={social.name}
              >
                {isWhatsApp ? (
                  <>
                    <MessageCircle className="h-5 w-5 text-zinc-700 dark:text-zinc-200 group-hover:opacity-0 transition-opacity duration-200 absolute" />
                    <WhatsAppIcon className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute" />
                  </>
                ) : (
                  <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-200 group-hover:text-white transition-colors" />
                )}
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle social links"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>
    );
  }

  /* ── DESKTOP layout ── */
  return (
    <div className="fixed z-50 left-0 top-1/2 -translate-y-1/2 flex items-center">
      <div
        className={`
          bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-lg
          rounded-r-xl overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-12 opacity-100" : "w-0 opacity-0 pointer-events-none"}
        `}
      >
        {socialLinks.map((social) => {
          const isWhatsApp = social.name === "WhatsApp";
          const Icon = social.icon;
          return (
            <a // <--- Fixed: Added missing opening tag
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex items-center justify-center w-12 h-12 transition-all duration-300 ${social.color} hover:w-16 group`}
              aria-label={social.name}
            >
              {isWhatsApp ? (
                <>
                  <MessageCircle className="h-5 w-5 text-zinc-700 dark:text-zinc-200 group-hover:opacity-0 transition-opacity duration-200 absolute" />
                  <WhatsAppIcon className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute" />
                </>
              ) : (
                <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-200 group-hover:text-white transition-colors" />
              )}
            </a>
          );
        })}
      </div>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle social links"
        className="flex items-center justify-center w-5 h-10 rounded-r-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-lg border-l border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-blue-500 hover:text-white transition-all duration-300"
      >
        {isOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </button>
    </div>
  );
};

export default SocialSidebar;