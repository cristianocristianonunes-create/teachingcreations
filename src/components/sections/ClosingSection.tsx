import FadeIn from "@/components/FadeIn";

const ClosingSection = () => (
  <section className="py-20 bg-foreground">
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif text-background leading-snug mb-2">
          We do not lower expectations.
        </h2>
        <p className="text-3xl md:text-4xl font-serif italic text-accent mb-8">
          We design them visibly.
        </p>
        <a
          href="#email-capture"
          className="inline-flex items-center px-8 py-3.5 bg-background text-foreground text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Be Notified When Chapter One Is Released
        </a>
      </FadeIn>
    </div>
  </section>
);

export default ClosingSection;
