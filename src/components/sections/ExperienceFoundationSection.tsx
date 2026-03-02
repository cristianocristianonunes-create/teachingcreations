import FadeIn from "@/components/FadeIn";

const pillars = [
  {
    label: "Nearly Three Decades",
    detail: "of continuous teaching practice since 1997.",
  },
  {
    label: "Multiple Learning Contexts",
    detail: "children, adolescents, adults, and multilingual learners.",
  },
  {
    label: "Daily Application",
    detail: "proficiency coaching, literacy instruction, and teacher development.",
  },
  {
    label: "Living Methodology",
    detail: "a framework used in real classrooms, refined through real outcomes.",
  },
];

const ExperienceFoundationSection = () => (
  <section className="py-14 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium text-center">
          Foundation
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">
          Built Through Practice
        </h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-6">
        {pillars.map((p, i) => (
          <FadeIn key={p.label} delay={i * 0.08}>
            <div className="border border-border bg-background p-5">
              <h3 className="font-serif text-primary text-base mb-1">{p.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {p.detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceFoundationSection;
