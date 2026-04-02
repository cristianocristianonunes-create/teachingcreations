import FadeIn from "@/components/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";

const V2SocialProofStrip = () => {
  const { get } = usePageContent("home");
  return (
  <section id="v2-social-proof" className="bg-[#1A2A3A]" style={{ padding: "48px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white/90">
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {get("social_stat_1", "Teaching Since 1997")}
          </span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {get("social_stat_2", "Professional Development Across Multiple Semesters")}
          </span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {get("social_stat_3", "Feedback Collected Across Multiple Cohorts")}
          </span>
        </div>
        <p className="mt-6 text-sm text-white/50 font-sans">
          {get("social_institutions", "Focused on K–12 multilingual literacy instruction")}
        </p>
      </FadeIn>
    </div>
  </section>
  );
};

export default V2SocialProofStrip;
