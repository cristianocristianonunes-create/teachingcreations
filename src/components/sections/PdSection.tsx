import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";

const outcomes = [
  "Coherent planning across reading, writing, and vocabulary",
  "Immediate classroom application within the same week",
  "Support for multilingual learners without reducing rigor",
];

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
        <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
          Customized sessions designed to help your team make thinking
          visible — across content areas, grade levels, and language backgrounds.
        </p>
        <ul className="text-sm text-muted-foreground font-sans leading-relaxed mb-6 space-y-1.5 inline-block text-left">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2">
              <span className="text-accent mt-0.5">·</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
        <div>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Request Professional Development
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default PdSection;
