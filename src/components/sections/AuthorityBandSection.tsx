import FadeIn from "@/components/FadeIn";

const placeholderLogos = [
  "School District A",
  "Learning Community B",
  "International School C",
  "Education Institute D",
  "Teaching Network E",
];

const AuthorityBandSection = () => (
  <section className="py-8 border-y border-border bg-secondary/50">
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-muted-foreground text-center mb-6 font-sans font-medium">
          Trusted by educators across schools and learning communities worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {placeholderLogos.map((name) => (
            <div
              key={name}
              className="px-5 py-2.5 border border-border bg-background text-xs font-sans text-muted-foreground tracking-wide uppercase"
            >
              {name}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default AuthorityBandSection;
