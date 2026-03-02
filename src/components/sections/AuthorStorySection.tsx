import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import portrait from "@/assets/erika-professional.jpg";

const AuthorStorySection = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center max-w-4xl">
      <FadeIn>
        <img
          src={portrait}
          alt="Erika Sun — Educator and Framework Developer"
          className="w-full max-w-xs mx-auto object-cover object-top aspect-[4/5] shadow-lg"
        />
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          The Story Behind the Framework
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-1">Erika Sun</h2>
        <p className="text-sm text-primary font-medium font-sans mb-4">
          Educator · Framework Developer · Teaching Since 1997
        </p>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-sans">
          <p>
           Erika Sun began teaching professionally at 16. Across <span className="text-foreground font-medium">nearly three decades</span> of experience, her
            work has spanned children, adolescents, adults, and language-diverse populations — from
            proficiency coaching to literacy instruction and teacher development.
          </p>
          <p>
            The framework formalizes a thinking process refined through decades of instructional
            design and educator coaching. The Cycle of Thinking™ emerged gradually — shaped
            through years of designing instruction and coaching educators toward greater coherence.
          </p>
        </div>
        <Link
          to="/about"
          className="inline-flex items-center mt-5 text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
        >
          Read Full Biography →
        </Link>
      </FadeIn>
    </div>
  </section>
);

export default AuthorStorySection;
