import { useRef, useState } from "react";
import { FaqItem } from "@/data/faqData";
import { ChevronDown } from "lucide-react";

interface Props {
  items: FaqItem[];
  categoryId: string;
}

const FaqAccordion = ({ items, categoryId }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentEl = contentRefs.current[index];
        const height = isOpen && contentEl ? contentEl.scrollHeight : 0;

        return (
          <div
            key={`${categoryId}-${index}`}
            className={`realhubb-card border transition-all duration-200 ${
              isOpen
                ? "border-[#D7A764]/40 shadow-sm"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 p-4 text-left cursor-pointer select-none"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${categoryId}-${index}`}
              id={`faq-question-${categoryId}-${index}`}
            >
              <h3 className="font-normal text-sm md:text-base leading-snug">
                {item.question}
              </h3>

              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Animated answer panel */}
            <div
              id={`faq-answer-${categoryId}-${index}`}
              role="region"
              aria-labelledby={`faq-question-${categoryId}-${index}`}
              style={{
                maxHeight: `${height}px`,
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="px-4 pb-4"
              >
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;