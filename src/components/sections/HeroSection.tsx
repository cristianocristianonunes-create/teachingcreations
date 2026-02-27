import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import TriangleDiagram from "@/components/TriangleDiagram";

const HeroSection = () => (
  <section className="min-h-[85vh] flex items-center">
    <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
      <FadeIn>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight text-foreground">
          Making Thinking{" "}
          <span className="italic text-primary">Visible.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg font-sans">
          For educators who want students to think independently — not just participate.
        </p>
        <p className="mt-3 text-xs tracking-widest uppercase text-accent font-sans font-medium">
          Designed for K–12 educators, instructional leaders, and learning designers.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/books"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            Start with the Books
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
);

export default HeroSection;
