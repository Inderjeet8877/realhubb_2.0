import { FaqItem } from "@/data/faqData";
import FaqAccordion from "./FaqAccordion";

interface Props {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

const FaqSection = ({ id, title, icon, items }: Props) => {
  return (
    <section id={`faq-${id}`} className="scroll-mt-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <h2 className="text-lg md:text-xl font-normal">{title}</h2>
      </div>
      <FaqAccordion items={items} categoryId={id} />
    </section>
  );
};

export default FaqSection;