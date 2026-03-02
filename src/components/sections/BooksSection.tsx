import FadeIn from "@/components/FadeIn";
import bookCover from "@/assets/book-cover.png";

const BooksSection = () => (
  <section className="py-16" id="books">
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium text-center">
          Start Here
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-2">
          The Book Behind the Framework
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-12" />
      </FadeIn>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <img
              src={bookCover}
              alt="Teaching Reading and Writing to Multilingual Learners — book cover"
              className="w-64 md:w-72 h-auto object-contain shadow-lg flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl mb-1">
                Teaching Reading and Writing to Multilingual Learners
              </h3>
              <p className="text-sm text-muted-foreground font-sans italic mb-1">
                A Coherent Framework for Designing Literacy Instruction
              </p>
              <p className="text-xs text-primary font-medium mb-3 font-sans">
                Available on Amazon · Paperback and Kindle
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-sans">
                This book presents a practical, coherent framework for designing literacy instruction that is accessible, rigorous, and sustainable. Grounded in research and classroom experience, it guides educators to build purposeful reading experiences, teach vocabulary and academic language explicitly, and move from reading interaction to meaningful writing.
              </p>
              <p className="text-xs text-muted-foreground/70 mb-5 font-sans">
                For educators working with multilingual learners across content areas.
              </p>
              <div className="flex flex-col items-center md:items-start gap-2">
                <a
                  href="https://a.co/d/05pVmQSf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-foreground text-foreground text-xs font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  Purchase on Amazon
                </a>
                <a
                  href="#email-capture"
                  className="text-xs text-primary/80 font-sans hover:underline underline-offset-2 mt-1"
                >
                  Get Chapter One →
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
        {/* Learn the framework — text link below the book */}
        <FadeIn delay={0.1}>
          <div className="text-center mt-8">
            <a
              href="/cycle-of-thinking"
              className="text-sm text-primary font-medium hover:underline underline-offset-4 font-sans"
            >
              Learn the framework →
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default BooksSection;
