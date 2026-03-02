import FadeIn from "@/components/FadeIn";

const FutureVisionSection = () => (
  <section className="py-14">
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          Looking Ahead
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          The Future of Teaching Creations
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-sans">
          <p>
            Teaching Creations is evolving into a central platform for educators who believe
            that thinking can — and should — be taught deliberately.
          </p>
          <p>
            The Cycle of Thinking™ serves as the core methodology. From here, professional
            learning experiences, workshops, instructional materials, and a growing library
            of classroom-tested resources will expand the reach of the framework.
          </p>
          <p>
            This is not a product launch. It is a growing educational movement rooted in
            practice, shaped by real classrooms, and driven by a single conviction:
            every learner deserves the tools to think independently.
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default FutureVisionSection;
