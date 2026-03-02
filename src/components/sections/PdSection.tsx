import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";

const PdSection = () => (
  <section className="py-14 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          For Schools &amp; Districts
        </p>
        <h2 className="text-2xl md:text-3xl font-serif mb-3">
          Bring The Cycle of Thinking™ to Your School
        </h2>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
          Developed through years of classroom practice and professional learning with
          educators. Customized sessions designed to help your team make thinking
          visible — across content areas, grade levels, and language backgrounds.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Request Professional Development
        </Link>
      </FadeIn>
    </div>
  </section>
);

export default PdSection;
