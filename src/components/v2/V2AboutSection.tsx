import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import portrait from "@/assets/erika-professional.jpg";
import { usePageContent } from "@/hooks/usePageContent";

const V2AboutSection = () => {
  const { get } = usePageContent("home");
  return (
  <section className="bg-[#F9F9F9]" style={{ padding: "96px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
          {get("about_title", "From Classroom Practice to a Global Framework")}
        </h2>
        <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <img
            src={portrait}
            alt="Erika Sun — Educator and Framework Developer"
            className="w-full max-w-[350px] mx-auto object-cover object-top aspect-[4/5] shadow-lg"
          />
        </FadeIn>
        <FadeIn delay={0.15}>
          <h3 className="font-serif text-2xl font-bold text-[#121212] mb-1">{get("about_name", "Erika Sun, Ed.D.")}</h3>
          <p className="text-sm text-[#2F5233] font-medium font-sans mb-6">
            {get("about_role", "Educator · Framework Developer · Teaching Since 1997")}
          </p>
          <p className="text-base text-[#555555] leading-relaxed font-sans mb-4">
            {get("about_bio", "Across nearly three decades, Erika Sun's work has spanned children, adolescents, and language-diverse populations. The Cycle of Thinking™ is not a theory developed in isolation; it's a framework forged in the classroom, refined through coaching thousands of educators, and designed to solve the real-world challenges you face every day.")}
          </p>
          <blockquote className="border-l-4 border-[#B8860B] pl-4 my-6">
            <p className="text-base text-[#121212] italic font-medium font-serif leading-relaxed">
              {get("about_quote", "\"While Harvard's Project Zero gave us the 'why' and John Hattie's Visible Learning gave us the 'what', The Cycle of Thinking™ finally delivers the 'how'—a practical, implementable framework for today's diverse classroom.\"")}
            </p>
          </blockquote>
          <Link
            to="/about"
            className="text-sm text-[#2F5233] font-medium tracking-widest uppercase hover:underline underline-offset-4"
          >
            READ FULL BIOGRAPHY →
          </Link>
        </FadeIn>
      </div>
    </div>
  </section>
  );
};

export default V2AboutSection;
