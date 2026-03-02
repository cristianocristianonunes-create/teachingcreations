import FadeIn from "@/components/FadeIn";

const patterns = [
  {
    title: "A-ha Moments",
    description:
      "Educators consistently report moments of clarity — discovering gaps in what they thought they already knew, and finding new language for practices they had been using intuitively.",
  },
  {
    title: "Instructional Clarity",
    description:
      "Participants describe a shift from task-driven instruction to thinking-driven planning. Lessons become more intentional, coherent, and transferable across content areas.",
  },
  {
    title: "Immediate Classroom Application",
    description:
      "Educators report using strategies the same week — from partner reading protocols to vocabulary scaffolding techniques to integrated lesson planning using the ExC-ELL framework.",
  },
  {
    title: "Improved Multilingual Learner Support",
    description:
      "Teachers working with ELLs describe a deeper understanding of how to design reading and writing instruction that meets students where they are — without reducing rigor.",
  },
];

const InstitutionalEvidenceSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          Longitudinal Professional Development Evidence
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-2">
          What Educators Experience After Training
        </h2>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-8">
          Patterns emerging across four semesters of professional development
          feedback — Spring 2024 through Spring 2025.
        </p>
      </FadeIn>
      <div className="space-y-6">
        {patterns.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div className="border-l-2 border-accent pl-5">
              <h3 className="font-serif text-foreground text-base mb-1">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {p.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.4}>
        <p className="text-xs text-muted-foreground/60 font-sans mt-8 text-center italic">
          Collected from four semesters of professional development feedback, Spring 2024 to Spring 2025.
        </p>
      </FadeIn>
    </div>
  </section>
);

export default InstitutionalEvidenceSection;
