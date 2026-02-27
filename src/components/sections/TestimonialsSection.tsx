import FadeIn from "@/components/FadeIn";

const testimonials = [
  {
    quote: "The Cycle of Thinking™ changed how I design lessons. My students aren't just participating anymore — they're constructing meaning independently.",
    name: "Maria L.",
    role: "Middle School ELA Teacher",
    institution: "New York City Schools",
    outcome: "40% improvement in student explanatory writing.",
  },
  {
    quote: "Strategic Access gave me a language for what I was seeing but couldn't name. My multilingual learners are finally showing what they actually know.",
    name: "James R.",
    role: "ESL Instructional Coach",
    institution: "Houston ISD",
    outcome: "Adopted district-wide across 12 campuses.",
  },
  {
    quote: "This framework should be in every teacher preparation program. It bridges the gap between engagement and genuine intellectual growth.",
    name: "Dr. Susan W.",
    role: "Curriculum Director",
    institution: "K–12 District, California",
    outcome: "Implemented in 3 grade-level PLCs.",
  },
];

const TestimonialsSection = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-2">
          What Educators Are Saying
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-12" />
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <blockquote className="bg-background p-6 h-full flex flex-col">
              <p className="text-sm text-muted-foreground leading-relaxed font-sans italic flex-1">
                "{t.quote}"
              </p>
              {t.outcome && (
                <p className="text-xs text-primary font-medium font-sans mt-3">
                  ↑ {t.outcome}
                </p>
              )}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-sm font-medium">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground font-sans">{t.name}</p>
                    <p className="text-xs text-muted-foreground font-sans">{t.role}</p>
                    <p className="text-xs text-muted-foreground font-sans">{t.institution}</p>
                  </div>
                </div>
              </div>
            </blockquote>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
