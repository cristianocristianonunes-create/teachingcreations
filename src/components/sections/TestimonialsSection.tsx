import FadeIn from "@/components/FadeIn";

const placeholderTestimonials = [
  {
    quote: "The Cycle of Thinking™ changed how I design lessons. My students aren't just participating anymore — they're constructing meaning independently.",
    name: "Middle School ELA Teacher",
    role: "New York, NY",
  },
  {
    quote: "Strategic Access gave me a language for what I was seeing but couldn't name. My multilingual learners are finally showing what they actually know.",
    name: "ESL Instructional Coach",
    role: "Houston, TX",
  },
  {
    quote: "This framework should be in every teacher preparation program. It bridges the gap between engagement and genuine intellectual growth.",
    name: "Curriculum Director",
    role: "K–12 District",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-3">
          What Educators Are Saying
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-14" />
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-8">
        {placeholderTestimonials.map((t, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <blockquote className="bg-background p-6 h-full flex flex-col">
              <p className="text-sm text-muted-foreground leading-relaxed font-sans italic flex-1">
                "{t.quote}"
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground font-sans">{t.name}</p>
                <p className="text-xs text-muted-foreground font-sans">{t.role}</p>
              </div>
            </blockquote>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
