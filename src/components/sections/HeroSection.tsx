import FadeIn from "@/components/FadeIn";
import bookCover from "@/assets/book-cover.png";

const HeroSection = () => (
  <section className="min-h-[75vh] flex items-center">
    <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent font-sans font-medium mb-3">
          For K–12 educators working with multilingual learners
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight text-foreground">
          Making Thinking{" "}
          <span className="italic text-primary">Visible.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-lg font-sans">
          A practical framework for designing literacy instruction that develops independent thinkers — not just task completion.
        </p>
        <p className="mt-3 text-xs text-muted-foreground/70 tracking-wide font-sans max-w-lg">
          Developed through years of classroom practice and professional learning with K–12 educators.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#email-capture"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            Download a Free Chapter
          </a>
          <a
            href="https://a.co/d/05pVmQSf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 border border-foreground text-foreground text-sm font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Buy the Book
          </a>
        </div>
        <blockquote className="mt-10 border-l-2 border-primary/20 pl-4 max-w-lg">
          <p className="text-[13px] text-muted-foreground leading-relaxed font-sans italic">
            "Dr. Erika Sun provided extraordinary support throughout the course. Her objectives were always clear, her materials carefully prepared, and her availability beyond class hours made a real difference. She combines deep expertise with patience, professionalism, and genuine respect for her students. Her teaching strategies are truly worth emulating."
          </p>
          <footer className="mt-2">
            <p className="text-xs font-medium text-foreground/80 font-sans">Alice Anyam</p>
            <p className="text-xs text-muted-foreground/60 font-sans">ELD High School Classroom Teacher</p>
          </footer>
        </blockquote>
      </FadeIn>
      <FadeIn delay={0.2} className="flex justify-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/5 -rotate-3" />
          <img
            src={bookCover}
            alt="Teaching Reading and Writing to Multilingual Learners — book cover"
            className="relative z-10 w-72 md:w-80 h-auto object-contain shadow-2xl"
          />
        </div>
      </FadeIn>
    </div>
  </section>
);

export default HeroSection;
