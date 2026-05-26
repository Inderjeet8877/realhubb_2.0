// vite-sitemap-plugin.ts
// ✅ Routes match App.tsx exactly
// ✅ Place in project root (same folder as vite.config.ts)
// ✅ Run `npm run build` → auto-generates /public/sitemap.xml

import fs from 'fs';
import path from 'path';
import type { Plugin, ViteDevServer } from 'vite';

export interface SitemapPluginOptions {
  baseUrl?: string;
  outputDir?: string;
}

interface RouteEntry {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

interface BlogPost {
  slug: string;
  lastmod: string;
}

const SITE_URL = 'https://www.realhubb.in';

// ─────────────────────────────────────────────────────────────
// ✅ CORE PAGES — matched to App.tsx routes
// ─────────────────────────────────────────────────────────────
const CORE_PAGES: RouteEntry[] = [
  { path: '/',               priority: '1.0', changefreq: 'weekly'  },
  { path: '/about',          priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us',     priority: '0.8', changefreq: 'monthly' },
  {path: '/developers',      priority: '0.7', changefreq: 'monthly' },
  {path: '/testimonials',      priority: '0.7', changefreq: 'monthly' },
  { path: '/faq',            priority: '0.7', changefreq: 'monthly' },
  { path: '/career',         priority: '0.7', changefreq: 'monthly' },
  { path: '/emi-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/home-loan-eligibility', priority: '0.7', changefreq: 'monthly' },
  { path: '/rental-yield-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/salary-advisor', priority: '0.7', changefreq: 'monthly' },
  { path: '/currency-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy',        priority: '0.3', changefreq: 'yearly',  lastmod: '2025-11-27' },
  { path: '/terms',          priority: '0.3', changefreq: 'yearly',  lastmod: '2025-11-27' },
];

// ─────────────────────────────────────────────────────────────
// ✅ PROPERTIES — add slug here to add a new property page
// ─────────────────────────────────────────────────────────────
const PROPERTY_SLUGS: string[] = [
  'godrej-plot-dodaballapur',
  'century-marathahalli',
  'godrej-hoskote',
  'mahindra-lifespace-blossom',
  'winds-of-change-by-ckpc',
  'ramky-lumina',
  'mana-vista',
  'sobha-neopolis',
  'mana-dale',
  'godrej-regal-pavilion',
  'kalyani-living-tree',
  'aratt-alchemy-essence',
  'sumadhura-tea-and-twilight',
  'mana-the-right-life',
  'brigade-gateway-neopolis',
  'sobha-town-park',
  'sattva-lumina',
  'prestige-spring-heights',
  'bricks-and-milestones-solcrest',
  'godrej-aveline-yelahanka',
  'sattva-city-hamlet',
  'century-attur-yelahanka',
  'birla-trimaya-phase-4',
  'ramky-fortuna-whitefield',
  // ➕ New property? Add slug here:
  // 'new-property-slug',
];

const PROPERTY_PAGES: RouteEntry[] = [
  { path: '/upcoming-projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/ongoing-projects',  priority: '0.9', changefreq: 'weekly' },
  ...PROPERTY_SLUGS.map(slug => ({
    path: `/property/${slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
];

// ─────────────────────────────────────────────────────────────
// ✅ DEVELOPERS — add slug here to add a new developer page
// ─────────────────────────────────────────────────────────────
const DEVELOPER_SLUGS: string[] = [
  'prestige-group',
  'brigade-group',
  'godrej-properties',
  'sobha-limited',
  'lodha-group',
  'dsr-group',
  'assetz-property-group',
  'birla-estates',
  'ckpc-properties',
  'sumedha-realty',
  'sumadhura-infracon',
  'tata-housing',
  'ramky-group',
  'bricks-and-milestone',
  'abhee-group',
  'nikko-homes',
  'vajram-group',
  'provident-housing',
  'sattva-group',
  'kolte-patil-developers',
  'kalyani-developers',
  'mjr-group',
  'tvs-emerald',
  'snn-estates',
  'goyal-co',
  'karle-infra',
  'mana-group',
  'dnr-group',
  'larsen-toubro-realty',
  'century-real-estate',
  'puravankara-limited',
  'nambiar-builders',
  'total-environment',
  'mahindra-lifespaces',
  // ➕ New developer? Add slug here:
  // 'new-developer-slug',
];

// ✅ FIX: Removed /developers listing page — no route exists in App.tsx
const DEVELOPER_PAGES: RouteEntry[] = [
  ...DEVELOPER_SLUGS.map(slug => ({
    
    path: `/developers/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),{path: '/developers',      priority: '0.7', changefreq: 'monthly' },
];

// ─────────────────────────────────────────────────────────────
// ✅ BLOG POSTS — add { slug, lastmod } to add a new post
// ─────────────────────────────────────────────────────────────
const BLOG_POSTS: BlogPost[] = [
  { slug: 'first-time-home-buyers-tips',                                          lastmod: '2024-01-15' },
  { slug: 'understanding-rera-guide',                                              lastmod: '2024-01-20' },
  { slug: '2024-bangalore-real-estate-trends',                                     lastmod: '2024-02-01' },
  { slug: 'home-loan-complete-guide',                                              lastmod: '2024-02-10' },
  { slug: 'why-property-prices-differ-same-area',                                  lastmod: '2024-02-10' },
  { slug: 'how-bda-approval-influences-property-value',                            lastmod: '2024-03-05' },
  { slug: 'bengaluru-business-corridor-real-estate-growth',                        lastmod: '2025-01-10' },
  { slug: 'proptech-digital-transformation-real-estate',                           lastmod: '2025-01-12' },
  { slug: 'future-land-investment-bangalore-2030',                                 lastmod: '2026-01-07' },
  { slug: 'bengaluru-suburban-rail-project-bsrp-real-estate-impact',              lastmod: '2026-01-07' },
  { slug: 'freehold-vs-leasehold-property-india',                                  lastmod: '2026-01-07' },
  { slug: 'sale-agreement-vs-sale-deed-indian-real-estate',                        lastmod: '2026-01-07' },
  { slug: 'tier2-tier3-cities-homebuyers-india',                                   lastmod: '2026-01-07' },
  { slug: 'power-of-attorney-property-safe-or-risky',                              lastmod: '2026-01-08' },
  { slug: 'how-to-verify-property-title-india',                                    lastmod: '2026-01-08' },
  { slug: 'under-construction-vs-ready-to-move-homes',                             lastmod: '2026-01-08' },
  { slug: 'top-5-real-estate-trends-2026-smart-buyers-guide',                     lastmod: '2026-02-18' },
  { slug: 'investment-potential-of-hebbal-rising-hotspot-bangalore',               lastmod: '2026-02-24' },
  { slug: 'kollur-investment-guide-2026-growth-returns-high-potential-properties', lastmod: '2026-02-26' },
  { slug: 'retail-spaces-in-2026-are-malls-still-profitable',                     lastmod: '2026-02-27' },
  { slug: 'metro-city-vs-tier-2-city-where-should-you-invest-in-2026',            lastmod: '2026-02-27' },
  { slug: 'how-nri-investors-are-transforming-india-real-estate-market',           lastmod: '2026-03-03' },
  // ✅ FIX: Duplicate removed — kept latest date only
  { slug: 'what-is-eoi-in-real-estate-guide-homebuyers-investors',                lastmod: '2026-03-10' },
  { slug: 'why-yelahanka-ranks-top-for-real-estate-in-bangalore',                 lastmod: '2026-03-11' },
  { slug: 'investment-potential-of-devanahalli-real-estate',                       lastmod: '2026-03-12' },
  { slug: 'fortune-seven-sarjapur-premium-2-3-4-bhk-apartments-sarjapur-bangalore',                lastmod: '2026-03-13' },
  // ➕ New blog post? Add here:
  // { slug: 'your-new-post-slug', lastmod: '2026-03-11' },
];

const BLOG_PAGES: RouteEntry[] = [
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  ...BLOG_POSTS.map(post => ({
    path: `/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.lastmod,
  })),
];

// ─────────────────────────────────────────────────────────────
// ✅ GALLERY — matched to App.tsx routes exactly
// ─────────────────────────────────────────────────────────────
const GALLERY_PAGES: RouteEntry[] = [
  { path: '/gallery',                priority: '0.5', changefreq: 'monthly' },
  { path: '/gallery/team-gallery',   priority: '0.5', changefreq: 'monthly' },
  // ✅ FIX: google-reviews bumped from 0.4 → 0.6 (trust/review page)
  { path: '/gallery/google-reviews', priority: '0.6', changefreq: 'weekly'  },
  { path: '/gallery/youtube',        priority: '0.4', changefreq: 'weekly'  },
  { path: '/gallery/instagram',      priority: '0.4', changefreq: 'weekly'  },
  { path: '/gallery/linkedin',       priority: '0.4', changefreq: 'weekly'  },
];

// ─────────────────────────────────────────────────────────────
// SECTIONS — controls order in sitemap.xml
// ─────────────────────────────────────────────────────────────
const SECTIONS: Record<string, RouteEntry[]> = {
  'Core Pages':  CORE_PAGES,
  'Properties':  PROPERTY_PAGES,
  'Developers':  DEVELOPER_PAGES,
  'Blog':        BLOG_PAGES,
  'Gallery':     GALLERY_PAGES,
};

const ALL_ROUTES: RouteEntry[] = Object.values(SECTIONS).flat();

// ─────────────────────────────────────────────────────────────
// SITEMAP GENERATOR
// ─────────────────────────────────────────────────────────────
function generateSitemap(baseUrl: string): string {
  const today = new Date().toISOString().split('T')[0];
  let urlEntries = '';

  for (const [sectionName, routes] of Object.entries(SECTIONS)) {
    const dashes = '─'.repeat(Math.max(0, 46 - sectionName.length));
    urlEntries += `\n  <!-- ── ${sectionName} ${dashes} -->\n`;
    for (const route of routes) {
      urlEntries += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }
    urlEntries += '\n';
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

// ─────────────────────────────────────────────────────────────
// ✅ FIXED: robots.txt — removed Crawl-delay on Googlebot,
//    removed /*.json$, /src/, /node_modules/ rules,
//    added Bytespider and omgili AI bot blocks
// ─────────────────────────────────────────────────────────────
function generateRobots(baseUrl: string): string {
  return `# ============================================================
# robots.txt — realhubb.in
# Auto-generated on build: ${new Date().toISOString().split('T')[0]}
# ============================================================

# ── Google ───────────────────────────────────────────────────
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /assets/
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.webp$
Allow: /*.svg$

# ── Bing ─────────────────────────────────────────────────────
User-agent: Bingbot
Allow: /
Crawl-delay: 5

# ── Social Crawlers (Open Graph previews) ────────────────────
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# ── SEO Audit Tools (rate-limited) ───────────────────────────
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /

# ── Block AI Training Bots ───────────────────────────────────
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: omgili
Disallow: /

# ── All Other Bots ───────────────────────────────────────────
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /private/
Crawl-delay: 10

# ── Sitemap ──────────────────────────────────────────────────
Sitemap: ${baseUrl}/sitemap.xml
`;
}

// ─────────────────────────────────────────────────────────────
// VITE PLUGIN EXPORT
// ─────────────────────────────────────────────────────────────
export function sitemapPlugin(options: SitemapPluginOptions = {}): Plugin {
  const baseUrl   = options.baseUrl   ?? SITE_URL;
  const outputDir = options.outputDir ?? 'public';

  return {
    name: 'vite-plugin-sitemap-realhubb',

    closeBundle() {
      const outPath = path.resolve(process.cwd(), outputDir);

      const sitemapPath = path.join(outPath, 'sitemap.xml');
      fs.writeFileSync(sitemapPath, generateSitemap(baseUrl), 'utf-8');

      const robotsPath = path.join(outPath, 'robots.txt');
      fs.writeFileSync(robotsPath, generateRobots(baseUrl), 'utf-8');

      console.log('\n✅ SEO files generated!');
      console.log(`   🗺  sitemap.xml → ${ALL_ROUTES.length} URLs`);
      console.log(`   🤖 robots.txt  → ${robotsPath}`);
      console.log(`   🏠 Core: ${CORE_PAGES.length} | 🏢 Properties: ${PROPERTY_PAGES.length} | 👷 Devs: ${DEVELOPER_PAGES.length} | 📝 Blog: ${BLOG_PAGES.length}\n`);
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml');
        res.end(generateSitemap(baseUrl));
      });
      server.middlewares.use('/robots.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain');
        res.end(generateRobots(baseUrl));
      });
    },
  };
}

export default sitemapPlugin;