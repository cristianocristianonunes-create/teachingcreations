import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import TriangleDiagram from "@/components/TriangleDiagram";

const HeroSection = () => (
  <section className="min-h-[80vh] flex items-center">
    <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <FadeIn>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight text-foreground">
          Making Thinking{" "}
          <span className="italic text-primary">Visible.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-lg font-sans">
          A practical framework helping educators transform participation into independent thinking.
        </p>
        <p className="mt-3 text-xs tracking-widest uppercase text-accent font-sans font-medium">
          For K–12 educators, instructional leaders, and professional learning communities.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#email-capture"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            Download the Free Chapter
          </a>
          <Link
            to="/cycle-of-thinking"
            className="inline-flex items-center px-8 py-3.5 border border-foreground text-foreground text-sm font-medium tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Watch Introduction
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
