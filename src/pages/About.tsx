import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import portrait from "@/assets/erika-professional.jpg";

const About = () => {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="grid md:grid-cols-[300px_1fr] gap-16 items-start">
            <FadeIn>
              <img
                src={portrait}
                alt="Dr. Erika Sun, educator and developer of The Cycle of Thinking framework"
                className="w-full object-cover object-top aspect-[4/5] transition-transform duration-500 hover:scale-[1.03]"
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
                About
              </p>
              <h1 className="text-4xl md:text-5xl font-serif mb-6">Erika Sun</h1>
              <div className="w-16 h-px bg-accent mb-8" />

              <p className="text-base text-muted-foreground leading-relaxed mb-6 font-sans">
                Erika Sun is an educator, framework developer, and learning theorist whose work focuses on making invisible cognitive processes explicit and teachable. With extensive experience in multilingual education settings, she identified a persistent challenge: students who appeared engaged were often not developing genuine intellectual autonomy.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 font-sans">
                This observation led to the creation of The Cycle of Thinking™ — a research-informed framework that provides educators with structural tools to design learning experiences that develop independent thinking, not just content knowledge.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 font-sans">
                Her two published works, <em>Strategic Access</em> and <em>Structured Expression</em>, translate this framework into practical, implementable strategies for educators across disciplines and contexts.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed font-sans">
                Erika's purpose is not to create resources — but to change how educators understand and develop the thinking capacity of their students.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
