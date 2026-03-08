import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageContent } from "@/hooks/usePageContent";

const V2FaqSection = () => {
  const { get } = usePageContent("home");
  const faqs = [
    { q: get("faq_1_q", "What is the investment for professional development?"), a: get("faq_1_a", "Pricing depends on the format, duration, and scope of the engagement. Reach out through the contact form and we will respond with a customized proposal within 48 hours.") },
    { q: get("faq_2_q", "How long does it take to see results in the classroom?"), a: get("faq_2_a", "Many educators report applying strategies the very same week. Documented feedback from multiple cohorts (Spring 2024 – Spring 2025) shows that participants leave sessions with concrete, immediately usable tools.") },
    { q: get("faq_3_q", "Does this work for non-literacy teachers (e.g., Math, Science)?"), a: get("faq_3_a", "Absolutely. The Cycle of Thinking™ is a literacy framework that applies to all content areas because it focuses on how students access, process, and express knowledge, regardless of the subject.") },
    { q: get("faq_4_q", "What makes this different from other teaching frameworks?"), a: get("faq_4_a", "We are the practical bridge between academic theory (like Harvard's Project Zero) and data-driven research (like Hattie's Visible Learning). Our framework was born in the classroom and is 100% focused on implementation.") },
  ];
  return (
  <section className="bg-white" style={{ padding: "96px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
          {get("faq_title", "Frequently (and Honestly) Asked Questions")}
        </h2>
        <div className="w-16 h-px bg-[#B8860B] mx-auto mb-12" />
      </FadeIn>
      <FadeIn delay={0.1}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E0E0E0]">
              <AccordionTrigger className="text-base font-sans font-medium text-[#121212] text-left py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#555555] font-sans leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </div>
  </section>
  );
};

export default V2FaqSection;
