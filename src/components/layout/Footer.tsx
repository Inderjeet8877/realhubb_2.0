import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import { companyInfo } from "@/data/company";
import logotm from "../assets/realhubb-new-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home",               to: "/"                    },
    { label: "Upcoming Projects",  to: "/upcoming-projects"   },
    { label: "Ongoing Projects",   to: "/ongoing-projects"    },
    { label: "About Us",           to: "/about"               },
    { label: "Blog",               to: "/blog"                },
    { label: "Contact Us",         to: "/contact-us"          },
    { label: "Career",             to: "/career"              },
    { label: "FAQ",                to: "/faq"                 },
  ];

  const services = companyInfo.services.map((s) => s.title);

  return (
    <footer className="bg-[#00274D] text-white">
      <div className="px-8 md:px-14 lg:px-20 xl:px-28 pt-12 pb-6">

        {/* Main grid — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-10">

          {/* ── Col 1: Company ── */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logotm} alt="RealHubb" className="w-52 h-auto object-contain" />
            </Link>

            <p className="text-sm font-normal text-white/80 -mt-1">
              {companyInfo.tagline}
            </p>

            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              {companyInfo.description}
            </p>

            {/* Stats */}
            <div className="flex gap-6 pt-1">
              <div>
                <p className="text-[#D7A764] text-lg font-normal leading-tight">
                  {companyInfo.stats.propertiesSold}
                </p>
                <p className="text-white/40 text-[11px]">Properties Sold</p>
              </div>
              <div>
                <p className="text-[#D7A764] text-lg font-normal leading-tight">
                  {companyInfo.stats.yearsExperience}
                </p>
                <p className="text-white/40 text-[11px]">Years Experience</p>
              </div>
              <div>
                <p className="text-[#D7A764] text-lg font-normal leading-tight">
                  {companyInfo.stats.happyClients}
                </p>
                <p className="text-white/40 text-[11px]">Happy Clients</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { href: companyInfo.social.facebook,  Icon: Facebook  },
                { href: companyInfo.social.instagram, Icon: Instagram },
                { href: companyInfo.social.linkedin,  Icon: Linkedin  },
                { href: companyInfo.social.youtube,   Icon: Youtube   },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#D7A764] hover:text-[#D7A764] transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h4 className="text-white text-sm font-normal mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white/50 text-xs hover:text-[#D7A764] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Our Services ── */}
          <div>
            <h4 className="text-white text-sm font-normal mb-4 tracking-wide">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((title) => (
                <li key={title}>
                  <Link
                    to="/contact-us"
                    className="text-white/50 text-xs hover:text-[#D7A764] transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact Us ── */}
          <div>
            <h4 className="text-white text-sm font-normal mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D7A764] mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`tel:${companyInfo.contact.phone.replace(/\s/g, "")}`}
                    className="text-white/70 text-xs hover:text-[#D7A764] transition-colors duration-200 block"
                  >
                    {companyInfo.contact.phone}
                  </a>
                  <span className="text-white/35 text-[11px]">
                    Mon–Sun, {companyInfo.workingHours.weekdays}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D7A764] mt-0.5 shrink-0" />
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="text-white/70 text-xs hover:text-[#D7A764] transition-colors duration-200"
                >
                  {companyInfo.contact.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D7A764] mt-0.5 shrink-0" />
                <p className="text-white/50 text-xs leading-relaxed">
                  {companyInfo.contact.address}
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D7A764] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/50 text-xs">Mon–Fri: {companyInfo.workingHours.weekdays}</p>
                  <p className="text-white/50 text-xs">Sat–Sun: {companyInfo.workingHours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-xs">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-white/35 text-xs hover:text-[#D7A764] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/35 text-xs hover:text-[#D7A764] transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;