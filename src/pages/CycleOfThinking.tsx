import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import TriangleDiagram from "@/components/TriangleDiagram";

const CycleOfThinking = () => {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
              The Framework
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">The Cycle of Thinking™</h1>
            <div className="w-16 h-px bg-accent mb-10" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-serif mb-4 text-primary">The Illusion of Understanding</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-sans">
              In classrooms around the world, students appear to engage. They raise their hands, complete tasks, and produce written responses. Yet beneath this visible participation, a critical gap often exists: students may follow instructions without truly thinking. The Cycle of Thinking™ was developed to address this invisible challenge — making cognitive processes explicit, observable, and developable.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex justify-center my-16">
            <TriangleDiagram />
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="text-2xl font-serif mb-4 text-primary">Strategic Access™</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-sans">
              Strategic Access™ redefines how students encounter new content. Rather than passive reception, it involves designing intentional cognitive entry points — structures that guide learners to interpret, connect, and construct meaning from the first moment of contact. Access is not about simplification; it is about strategic design.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-serif mb-4 text-primary">Structured Expression™</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-sans">
              Structured Expression™ provides deliberate frameworks through which students articulate their thinking. It moves beyond free-form responses to scaffolded articulation — ensuring that what students say, write, or produce reflects genuine cognitive processing rather than surface reproduction.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h2 className="text-2xl font-serif mb-4 text-primary">Intellectual Autonomy</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-sans">
              The ultimate goal of the cycle is Intellectual Autonomy — the capacity to think independently, transfer skills across contexts, and engage with complexity without external scaffolds. Autonomy is not given; it is systematically developed through repeated cycles of access and expression.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h2 className="text-2xl font-serif mb-4 text-primary">Beyond Multilingual Classrooms</h2>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              While The Cycle of Thinking™ was developed within multilingual educational contexts, its principles extend to any learning environment where invisible thinking prevents genuine understanding. The framework offers a universal lens for educators committed to developing students who don't just participate — but think.
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default CycleOfThinking;
