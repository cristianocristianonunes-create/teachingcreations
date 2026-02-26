import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import TriangleDiagram from "@/components/TriangleDiagram";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import portrait from "@/assets/erika-portrait.jpg";
import vslVideo from "@/assets/vsl-video.mp4";

const Index = () => {
  return (
    <Layout>
      {/* 1. HERO */}
      <section className="min-h-[90vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight text-foreground">
              Making Thinking{" "}
              <span className="italic text-primary">Visible.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg font-sans">
              A new framework for understanding how students develop intellectual autonomy.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-90"
              >
                Explore the Books
              </Link>
              <Link
                to="/cycle-of-thinking"
                className="inline-flex items-center px-8 py-3.5 border border-foreground text-foreground text-sm font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                Watch the Introduction
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="flex justify-center">
            <TriangleDiagram />
          </FadeIn>
        </div>
      </section>

      {/* 2. VSL */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
          <FadeIn>
            <p className="text-lg italic font-serif text-foreground leading-relaxed mb-10">
              "If your students participate but still struggle to think independently,
              this introduction is for you."
            </p>
            <video
              src={vslVideo}
              controls
              className="aspect-video w-full border border-border"
              poster=""
            />
          </FadeIn>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
              Participation Can Mask Misunderstanding.
            </h2>
            <div className="w-16 h-px bg-accent mx-auto mb-16" />
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                title: "Invisible Interpretation",
                text: "Students decode content without building personal meaning. Understanding remains surface-level and untested.",
              },
              {
                title: "Invisible Construction",
                text: "Students reproduce language without structuring thought. Expression appears fluent but lacks depth.",
              },
              {
                title: "Fragile Autonomy",
                text: "Students depend on external scaffolds. Independent thinking collapses without guided prompts.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.15}>
                <h3 className="text-lg font-serif text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE INSIGHT */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-6">
              The Challenge Is Not Content.
              <br />
              <span className="italic text-primary">It Is Invisible Thinking.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              When thinking remains invisible, educators cannot assess it, and students cannot develop it.
              The Cycle of Thinking™ provides a structural lens to make cognitive processes explicit,
              observable, and teachable.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 5. THE MODEL */}
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">The Cycle of Thinking™</h2>
            <div className="w-16 h-px bg-accent mx-auto mb-12" />
          </FadeIn>
          <FadeIn delay={0.15} className="flex justify-center mb-12">
            <TriangleDiagram />
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto text-left">
              <div>
                <h3 className="font-serif text-primary mb-2">Strategic Access™</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Designing how students encounter and interpret new content with intentional cognitive entry points.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-primary mb-2">Structured Expression™</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Providing frameworks that make thinking visible through deliberate, scaffolded articulation.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-primary mb-2">Intellectual Autonomy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The capacity to think independently, transferring skills across contexts without external prompts.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <Link
                to="/cycle-of-thinking"
                className="inline-flex items-center text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
              >
                Explore the Full Framework →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. BOOKS */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
              The Books Behind the Framework
            </h2>
            <div className="w-16 h-px bg-accent mx-auto mb-16" />
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {[
              {
                img: book1,
                title: "Strategic Access",
                reframes: "How students enter and interpret academic content across languages.",
                audience: "Educators working with multilingual learners seeking deeper comprehension strategies.",
              },
              {
                img: book2,
                title: "Structured Expression",
                reframes: "How students construct and articulate thinking with intention and clarity.",
                audience: "Teachers developing student voice and visible thinking routines.",
              },
            ].map((book, i) => (
              <FadeIn key={book.title} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={book.img}
                    alt={`${book.title} book cover`}
                    className="w-48 h-72 object-cover shadow-lg mb-6"
                  />
                  <h3 className="font-serif text-xl mb-3">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">Reframes:</span> {book.reframes}
                  </p>
                  <p className="text-sm text-muted-foreground mb-5">
                    <span className="font-medium text-foreground">For:</span> {book.audience}
                  </p>
                  <button className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity">
                    Buy Now
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="text-center mt-14">
            <Link
              to="/books"
              className="inline-flex items-center text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
            >
              Begin with the Books →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 7. ABOUT ERIKA */}
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center max-w-4xl">
          <FadeIn>
            <img
              src={portrait}
              alt="Erika Sun"
              className="w-full max-w-sm mx-auto object-cover aspect-[4/5]"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
              About the Author
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Erika Sun</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2 font-sans">
              Educator. Framework Developer. Learning Theorist.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-sans">
              With years of experience in multilingual education, Erika Sun developed The Cycle of Thinking™
              to address the invisible cognitive challenges students face when building intellectual autonomy.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
            >
              Read Full Biography →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 8. CLOSING */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif text-background leading-snug mb-2">
              We do not lower expectations.
            </h2>
            <p className="text-3xl md:text-4xl font-serif italic text-accent mb-10">
              We design them visibly.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center px-8 py-3.5 bg-background text-foreground text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Explore the Books
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
