import FadeIn from "@/components/FadeIn";

const metrics = [
  { value: "5,000+", label: "Educators Reached" },
  { value: "12+", label: "Countries Impacted" },
  { value: "500+", label: "Classrooms Influenced" },
  { value: "10+", label: "Years of Practice" },
];

const ImpactMetricsSection = () => (
  <section className="py-14">
    <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium text-center">
          Impact at a Glance
        </p>
        <div className="w-16 h-px bg-accent mx-auto mb-10" />
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <FadeIn key={m.label} delay={i * 0.08}>
            <div className="text-center p-6 bg-secondary">
              <p className="text-3xl md:text-4xl font-serif text-primary mb-1">{m.value}</p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans font-medium">
                {m.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactMetricsSection;
