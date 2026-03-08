import FadeIn from "@/components/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";

const testimonials = [
  {
    headline: "Bar none, best CPD trainer to date!",
    text: "The culminating project gives me a complete lesson plan that I can use in my class. I have come to realize that integrated strategies accelerate progress — combining reading, writing, and vocabulary scaffolding fosters quicker and more sustained growth.",
    name: "",
    role: "Early College Content Teacher",
    org: "Spring 2025",
  },
  {
    headline: "The discussion sessions were enriching and mind opening.",
    text: "I felt a gap in some areas that I thought I knew. I was excited to get more ways on how to teach reading to my Multilingual learners.",
    name: "Alice Anyam",
    role: "High School ELD Teacher",
    org: "Fall 2024",
  },
  {
    headline: "Dr. Sun modeling best practices.",
    text: "Dr. Sun modeled best practices and provided scenarios applicable to the classroom. I saw an immediate shift in how I approach thinking-driven planning.",
    name: "",
    role: "High School Administrator",
    org: "Summer 2024",
  },
];

const V2TestimonialsSection = () => {
  const { get } = usePageContent("home");
  return (
  <section className="bg-[#F9F9F9]" style={{ padding: "96px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
          {get("testimonials_title", "Proof from the Classroom")}
        </h2>
        <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <blockquote className="bg-white p-8 h-full flex flex-col border border-[#E0E0E0] shadow-sm">
              <p className="text-base font-semibold text-[#B8860B] leading-snug mb-3 font-serif italic">
                "{t.headline}"
              </p>
              <p className="text-sm text-[#555555] leading-relaxed font-sans mb-6 flex-1">
                "{t.text}"
              </p>
              <footer className="mt-auto border-t border-[#E0E0E0] pt-4">
                <p className="text-sm font-medium text-[#121212] font-sans">{t.name}</p>
                <p className="text-xs text-[#555555] font-sans">{t.role}</p>
                <p className="text-xs text-[#B8860B] font-sans font-medium">{t.org}</p>
              </footer>
            </blockquote>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
  );
};

export default V2TestimonialsSection;
