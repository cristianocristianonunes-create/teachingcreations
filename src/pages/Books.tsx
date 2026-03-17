import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import bookCover from "@/assets/book-cover.png";

const Books = () => {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
              Publication
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">The Book Behind the Framework</h1>
            <div className="w-16 h-px bg-accent mb-16" />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
              <img
                src={bookCover}
                alt="Teaching Reading and Writing to Multilingual Learners — book cover"
                className="w-60 h-auto object-contain shadow-lg mx-auto md:mx-0"
              />
              <div>
                <h2 className="text-2xl font-serif mb-2">
                  Teaching Reading and Writing to Multilingual Learners
                </h2>
                <p className="text-sm text-muted-foreground font-sans italic mb-4">
                  A Coherent Framework for Designing Literacy Instruction
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-4 font-sans">
                  This book presents a practical, coherent framework for designing literacy instruction that is accessible, rigorous, and sustainable. Grounded in research and classroom experience, it guides educators to build purposeful reading experiences, teach vocabulary and academic language explicitly, and move from reading interaction to meaningful writing.
                </p>
                <p className="text-sm text-muted-foreground mb-6 font-sans">
                  <span className="font-medium text-foreground">Intended reader:</span> Educators working with multilingual learners, curriculum designers, and instructional coaches seeking research-informed strategies for deeper comprehension.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://a.co/d/0cTCikQ0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 border border-foreground text-foreground text-xs font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
                  >
                    Purchase on Amazon
                  </a>
                  <a
                    href="/#email-capture"
                    className="text-xs text-primary/80 font-sans hover:underline underline-offset-2"
                  >
                    Get Chapter One →
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Books;
