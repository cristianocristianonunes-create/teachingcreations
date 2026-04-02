import FadeIn from "@/components/FadeIn";

const indicators = [
  "Serving educators since 1997",
  "Professional development delivered across multiple semesters",
  "Longitudinal feedback collected across multiple cohorts",
  "Focused on multilingual literacy instruction for educators",
];

const InstitutionalProofStrip = () => (
  <section className="py-6 border-y border-border bg-secondary/30">
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 md:gap-x-12">
          {indicators.map((text, i) => (
            <span key={i} className="flex items-center gap-x-8 md:gap-x-12">
              <span className="text-[11px] tracking-widest uppercase text-muted-foreground font-sans font-medium">
                {text}
              </span>
              {i < indicators.length - 1 && (
                <span className="hidden md:inline text-border">|</span>
              )}
            </span>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default InstitutionalProofStrip;
