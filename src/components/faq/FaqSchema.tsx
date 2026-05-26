import { faqData } from "@/data/faqData";

const FaqSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "RealHubb FAQ – Real Estate Advisory in Bangalore, Hyderabad & Chennai",
    description:
      "Answers to frequently asked questions about buying property, RERA-approved projects, home loans, site visits, and real estate advisory services by RealHubb.",
    url: "https://www.realhubb.in/faq",
    mainEntity: faqData.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

export default FaqSchema;