import FadeIn from "@/components/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";

const V2ProblemSection = () => {
  const { get } = usePageContent("home");
  const problems = [
    { title: get("problem_card_1_title", "The Illusion of Engagement"), text: get("problem_card_1_text", "Your classroom is buzzing. Students are completing tasks. But when the prompts disappear, they collapse. Visible participation is not the same as genuine thinking — and most classrooms are built to reward the former.") },
    { title: get("problem_card_2_title", "Assessments Without Transfer"), text: get("problem_card_2_text", "Students can summarize a text perfectly but can't explain the author's intent. They pass the test but fail to apply the knowledge next week. This is a sign of shallow processing, not deep learning.") },
    { title: get("problem_card_3_title", "Compliance Mistaken for Cognition"), text: get("problem_card_3_text", "We celebrate students who follow instructions perfectly. But following a recipe isn't the same as being a chef. True cognition is about designing the recipe, not just executing it.") },
  ];
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
          <FadeIn key={i} delay={i * 0.12}>
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
