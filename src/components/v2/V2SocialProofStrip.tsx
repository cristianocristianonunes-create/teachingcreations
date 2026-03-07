import FadeIn from "@/components/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";

const V2SocialProofStrip = () => {
  const { get } = usePageContent("home");
  return (
  <section id="v2-social-proof" className="bg-[#1A2A3A]" style={{ padding: "48px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <FadeIn>
        <h2 className="text-xl md:text-2xl font-serif font-semibold text-white mb-8">
          {get("social_title", "Trusted by 2,500+ Educators & Leading Institutions")}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white/90">
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {get("social_stat_1", "2,500+ Educators Trained")}
          </span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {get("social_stat_2", "40% Average Increase in Student Autonomy")}
          </span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {get("social_stat_3", "98% Recommendation Rate")}
          </span>
        </div>
        <p className="mt-6 text-sm text-white/50 font-sans">
          {get("social_institutions", "Featured in institutions like: San Diego Unified, LA County Office of Education, Charter Schools of Excellence")}
        </p>
      </FadeIn>
    </div>
  </section>
  );
};

export default V2SocialProofStrip;
