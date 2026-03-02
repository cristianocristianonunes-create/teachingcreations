import FadeIn from "@/components/FadeIn";

const ClosingSection = () => (
  <section className="pt-36 pb-24 bg-foreground mt-8">
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif text-background leading-snug mb-2">
          We do not lower expectations.
        </h2>
        <p className="text-3xl md:text-4xl font-serif italic text-accent mb-10">
          We design them visibly.
        </p>
        <a
          href="#email-capture"
          className="text-sm text-background/80 font-medium hover:text-background hover:underline underline-offset-4 font-sans tracking-wide"
        >
          Get Chapter One →
        </a>
      </FadeIn>
    </div>
  </section>
);

export default ClosingSection;
