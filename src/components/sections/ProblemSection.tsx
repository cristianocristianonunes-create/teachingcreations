import FadeIn from "@/components/FadeIn";

const problems = [
  {
    title: "Task Completion ≠ Understanding",
    text: "Students complete assignments and pass assessments but cannot transfer learning to new contexts. Activity masks the absence of deep thinking.",
  },
  {
    title: "Engagement Without Independence",
    text: "Classrooms buzz with participation, yet students remain dependent on teacher prompts. Remove the scaffold, and thinking collapses.",
  },
  {
    title: "Compliance Mistaken for Thinking",
    text: "Behavioral compliance — raising hands, following instructions — is celebrated as evidence of cognition. It rarely is.",
  },
];

const ProblemSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-3">
          Participation Can Mask Misunderstanding.
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-14" />
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
        {problems.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.12}>
            <h3 className="text-lg font-serif text-primary mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.text}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
