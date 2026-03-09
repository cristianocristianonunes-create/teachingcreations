import FadeIn from "@/components/FadeIn";

const OriginStorySection = () => (
  <section className="py-14">
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          Origin
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          Where the Cycle of Thinking™ Began
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-sans">
          <p>
            Erika Sun began teaching professionally in 1997. What became a lifelong practice of observing how people learn —
            across ages, languages, and disciplines.
          </p>
          <p>
            Her experience spans children, adolescents, adults, and multilingual learners.
            Across these contexts, a consistent pattern emerged: learning improved when thinking
            processes became visible — not just to the teacher, but to the learner.
          </p>
          <p>
            The Cycle of Thinking™ was not designed as a theory to be published. It emerged
            gradually, shaped through years of designing literacy instruction, building professional
            development programs, and coaching educators toward greater instructional coherence.
          </p>
          <p>
            It is the formalization of a thinking process discovered through practice — not
            invented for promotion.
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default OriginStorySection;
