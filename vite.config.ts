import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from './vite-sitemap-plugin';  // ✅ Step 1: import

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,  // ✅ kept for localhost testing
  },

  assetsInclude: ["**/*.JPG"],

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin({                           // ✅ Step 2: add plugin
      baseUrl: 'https://www.realhubb.in',
      outputDir: 'public',
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  ssgOptions: {
    script: "async",
    formatting: "minify",
    entry: "src/main.tsx",

    includedRoutes: () => [
      "/",

      // ── Core ─────────────────────────────────────────────
      "/about",
      "/contact-us",
      "/faq",
      "/career",
      "/emi-calculator",
      "/privacy",
      "/terms",

      // ── Properties ───────────────────────────────────────
      "/upcoming-projects",
      "/ongoing-projects",
      "/property/godrej-plot-dodaballapur",
      "/property/century-marathahalli",
      "/property/godrej-hoskote",
      "/property/mahindra-lifespace-blossom",
      "/property/winds-of-change-by-ckpc",
      "/property/ramky-lumina",
      "/property/mana-vista",
      "/property/sobha-neopolis",
      "/property/mana-dale",
      "/property/godrej-regal-pavilion",
      "/property/kalyani-living-tree",
      "/property/aratt-alchemy-essence",
      "/property/sumadhura-tea-and-twilight",
      "/property/mana-the-right-life",
      "/property/brigade-gateway-neopolis",
      "/property/sobha-town-park",
      "/property/sattva-lumina",
      "/property/prestige-spring-heights",
      "/property/bricks-and-milestones-solcrest",

      // ── Developers ───────────────────────────────────────
      "/developers",
      "/developers/prestige-group",
      "/developers/brigade-group",
      "/developers/godrej-properties",
      "/developers/sobha-limited",
      "/developers/lodha-group",
      "/developers/dsr-group",
      "/developers/assetz-property-group",
      "/developers/birla-estates",
      "/developers/ckpc-properties",
      "/developers/sumedha-realty",
      "/developers/sumadhura-infracon",
      "/developers/tata-housing",
      "/developers/ramky-group",
      "/developers/bricks-and-milestone",
      "/developers/abhee-group",
      "/developers/nikko-homes",
      "/developers/vajram-group",
      "/developers/provident-housing",
      "/developers/sattva-group",
      "/developers/kolte-patil-developers",
      "/developers/kalyani-developers",
      "/developers/mjr-group",
      "/developers/tvs-emerald",
      "/developers/snn-estates",
      "/developers/goyal-co",
      "/developers/karle-infra",
      "/developers/mana-group",
      "/developers/dnr-group",
      "/developers/larsen-toubro-realty",
      "/developers/century-real-estate",
      "/developers/puravankara-limited",
      "/developers/nambiar-builders",
      "/developers/total-environment",
      "/developers/mahindra-lifespaces",

      // ── Blog ─────────────────────────────────────────────
      "/blog",
      "/blog/first-time-home-buyers-tips",
      "/blog/understanding-rera-guide",
      "/blog/2024-bangalore-real-estate-trends",
      "/blog/home-loan-complete-guide",
      "/blog/why-property-prices-differ-same-area",
      "/blog/how-bda-approval-influences-property-value",
      "/blog/bengaluru-business-corridor-real-estate-growth",
      "/blog/proptech-digital-transformation-real-estate",
      "/blog/future-land-investment-bangalore-2030",
      "/blog/bengaluru-suburban-rail-project-bsrp-real-estate-impact",
      "/blog/freehold-vs-leasehold-property-india",
      "/blog/sale-agreement-vs-sale-deed-indian-real-estate",
      "/blog/tier2-tier3-cities-homebuyers-india",
      "/blog/power-of-attorney-property-safe-or-risky",
      "/blog/how-to-verify-property-title-india",
      "/blog/under-construction-vs-ready-to-move-homes",
      "/blog/top-5-real-estate-trends-2026-smart-buyers-guide",
      "/blog/investment-potential-of-hebbal-rising-hotspot-bangalore",
      "/blog/kollur-investment-guide-2026-growth-returns-high-potential-properties",
      "/blog/retail-spaces-in-2026-are-malls-still-profitable",
      "/blog/metro-city-vs-tier-2-city-where-should-you-invest-in-2026",
      "/blog/how-nri-investors-are-transforming-india-real-estate-market",

      // ── Gallery ──────────────────────────────────────────
      "/gallery",
      "/gallery/team-gallery",
      "/gallery/google-reviews",
      "/gallery/youtube",
      "/gallery/instagram",
      "/gallery/linkedin",
    ],
  },
}));