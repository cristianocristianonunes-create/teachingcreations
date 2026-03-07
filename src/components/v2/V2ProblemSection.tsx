import FadeIn from "@/components/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";

const problems = [
  {
    title: "The Illusion of Engagement",
    text: "Your classroom is buzzing. Students are completing tasks. But when the prompts disappear, they collapse. You're not alone: 78% of educators report that student participation often masks a deep lack of independent thinking.",
  },
  {
    title: "Assessments Without Transfer",
    text: "Students can summarize a text perfectly but can't explain the author's intent. They pass the test but fail to apply the knowledge next week. This is a sign of shallow processing, not deep learning.",
  },
  {
    title: "Compliance Mistaken for Cognition",
    text: "We celebrate students who follow instructions perfectly. But following a recipe isn't the same as being a chef. True cognition is about designing the recipe, not just executing it.",
  },
];

const V2ProblemSection = () => {
  const { get } = usePageContent("home");
  return (
  <section className="bg-[#F9F9F9]" style={{ padding: "96px 0" }}>
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
          {get("problem_title", "Your Students Seem Engaged. But Are They Thinking?")}
        </h2>
        <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {problems.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.12}>
            <h3 className="text-xl font-serif font-semibold text-[#2F5233] mb-3">{item.title}</h3>
            <p className="text-base text-[#555555] leading-relaxed font-sans">{item.text}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
  );
};

export default V2ProblemSection;
