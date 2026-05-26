import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;  
  canonical?: string;
  image?: string;
  type?: "website" | "article";


  // Blog specific
  author?: string;
  datePublished?: string;
  dateModified?: string;

  // For future use - Breadcrumbs, FAQ, etc.
  breadcrumb?: { name: string; url: string }[];

  faq?: { question: string; answer: string }[];

   
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image = "https://www.realhubb.in/og-image.jpg",
  type = "website",
  author = "RealHubb Editorial Team",
  datePublished,
  dateModified,
  breadcrumb,
  faq,
  
}: SEOProps) => {

  const siteName = "RealHubb";
  const url = canonical || "https://www.realhubb.in";

  // Organization Schema
  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.realhubb.in/#organization",
  name: "RealHubb",
  url: "https://www.realhubb.in/",
  logo: "https://www.realhubb.in/logo.png",
  description:
    "RealHubb is a real estate advisory platform showcasing verified RERA approved properties in Bangalore, Hyderabad and Chennai.",
  sameAs: [
    "https://www.instagram.com/realhubb_ventures/",
    "https://www.youtube.com/@RealhubbVentures",
    "https://www.linkedin.com/company/102738045/"
  ],
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Chennai" }
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN"
  }
};

//website schema 

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.realhubb.in/#website",
  url: "https://www.realhubb.in/",
  name: "RealHubb",
  publisher: {
    "@id": "https://www.realhubb.in/#organization"
  }
};

  // Blog Schema
  const articleSchema =
    type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: description,
          image: image,
          author: {
            "@type": "Person",
            name: author
          },
          publisher: {
            "@type": "Organization",
            name: "RealHubb",
            logo: {
              "@type": "ImageObject",
              url: "https://www.realhubb.in/logo.png"
            }
          },
          datePublished: datePublished,
          dateModified: dateModified || datePublished,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url
          }
        }
      : null;

      // Future schemas like BreadcrumbList, FAQPage can be added here based on props
      const breadcrumbSchema = breadcrumb
  ? {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  : null;

  // FAQ Schema can be implemented similarly when needed
  const faqSchema = faq
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  : null;

  return (
    <Helmet>

      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="Bangalore, Hyderabad, Chennai" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Blog Schema */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

  {breadcrumbSchema && (
    <script type="application/ld+json">
      {JSON.stringify(breadcrumbSchema)}
    </script>
  )}

  {faqSchema && (
    <script type="application/ld+json">
      {JSON.stringify(faqSchema)}
    </script>
  )}

</Helmet>
  );
};

export default SEO;