import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import bookCover from "@/assets/book-cover.png";
import erikaAuthority from "@/assets/erika-authority.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fullQuote =
  "Dr. Erika Sun provided extraordinary support throughout the course. Her objectives were always clear, her materials carefully prepared, and her availability beyond class hours made a real difference. She combines deep expertise with patience, professionalism, and genuine respect for her students. Her teaching strategies are truly worth emulating.";

const shortQuote =
  "Dr. Erika Sun provided extraordinary support throughout the course. Her objectives were always clear, her materials carefully prepared, and her availability beyond class hours made a real difference.";

const HeroSection = () => {
  const [showFullQuote, setShowFullQuote] = useState(false);

  return (
    <section className="min-h-[75vh] flex items-center pt-24">
      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 font-sans mb-4">
            An Instructional Design Framework for Multilingual Literacy
          </p>
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
            Built from classroom practice, professional development, and long-term work with multilingual learner educators.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://a.co/d/05pVmQSf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 border border-foreground text-foreground text-sm font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Purchase on Amazon
            </a>
            <a
              href="#email-capture"
              className="text-sm text-primary font-medium hover:underline underline-offset-4 font-sans"
            >
              Get Chapter One →
            </a>
          </div>
          <blockquote className="mt-14 border-l-2 border-primary/20 pl-4 max-w-md">
            <p className="text-xs text-muted-foreground/80 leading-relaxed font-sans italic">
              "{shortQuote}"
            </p>
            <button
              onClick={() => setShowFullQuote(true)}
              className="text-[10px] text-primary/70 font-sans mt-1.5 hover:underline underline-offset-2"
            >
              Read full testimonial
            </button>
            <footer className="mt-2">
              <p className="text-[11px] font-medium text-foreground/70 font-sans">Alice Anyam</p>
              <p className="text-[11px] text-muted-foreground/50 font-sans">ELD High School Classroom Teacher</p>
            </footer>
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.2} className="flex justify-center">
          <div className="relative flex flex-col items-center gap-6">
            <img
              src={erikaAuthority}
              alt="Dr. Erika Sun, educator and developer of The Cycle of Thinking framework"
              className="relative z-10 w-56 md:w-64 h-auto object-cover object-top aspect-[4/5] shadow-lg"
              loading="eager"
            />
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 -rotate-3" />
              <img
                src={bookCover}
                alt="Teaching Reading and Writing to Multilingual Learners — book cover"
                className="relative z-10 w-52 md:w-60 h-auto object-contain shadow-2xl"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <Dialog open={showFullQuote} onOpenChange={setShowFullQuote}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg">Educator Testimonial</DialogTitle>
          </DialogHeader>
          <blockquote className="border-l-2 border-primary/20 pl-4">
            <p className="text-sm text-muted-foreground leading-relaxed font-sans italic">
              "{fullQuote}"
            </p>
            <footer className="mt-3">
              <p className="text-sm font-medium text-foreground font-sans">Alice Anyam</p>
              <p className="text-xs text-muted-foreground font-sans">ELD High School Classroom Teacher</p>
            </footer>
          </blockquote>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
