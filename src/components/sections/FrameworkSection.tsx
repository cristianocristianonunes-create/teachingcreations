import FadeIn from "@/components/FadeIn";
import TriangleDiagram from "@/components/TriangleDiagram";

const FrameworkSection = () => (
  <section className="py-20 md:py-24">
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif mb-3">The Cycle of Thinking™</h2>
        <p className="text-sm text-primary/70 font-sans tracking-wide max-w-2xl mx-auto leading-relaxed mb-10">
          A proprietary instructional framework integrating access, articulation, and autonomy into a coherent literacy design model.
        </p>
      </FadeIn>
      <FadeIn delay={0.1} className="flex flex-col items-center mb-12">
        <TriangleDiagram />
        <p className="text-xs text-muted-foreground/50 font-sans mt-4 italic">
          The structural architecture of The Cycle of Thinking™.
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left mt-6 mb-10">
          <div>
            <h3 className="font-serif text-primary mb-2">Strategic Access™</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Designing how students encounter and interpret content — with intentional cognitive entry points.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-primary mb-2">Structured Expression™</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Providing frameworks that make thinking visible through deliberate, scaffolded articulation.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-primary mb-2">Intellectual Autonomy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              The capacity to think independently, transferring skills across contexts without external prompts.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-secondary p-6 text-left">
          <p className="text-xs tracking-widest uppercase text-accent mb-2 font-sans font-medium">
            In the Classroom
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans italic">
            "A 7th-grade student could summarize every paragraph perfectly — but could not explain
            why the author structured the argument that way. She was accessing content without
            constructing meaning. The Cycle of Thinking™ revealed the gap: Strategic Access
            was present, but Structured Expression had never been developed."
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default FrameworkSection;
