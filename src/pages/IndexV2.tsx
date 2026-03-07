import V2Navigation from "@/components/v2/V2Navigation";
import V2HeroSection from "@/components/v2/V2HeroSection";
import V2SocialProofStrip from "@/components/v2/V2SocialProofStrip";
import V2ProblemSection from "@/components/v2/V2ProblemSection";
import V2FrameworkSection from "@/components/v2/V2FrameworkSection";
import VideoSection from "@/components/sections/VideoSection";
import V2TestimonialsSection from "@/components/v2/V2TestimonialsSection";
import V2BookSection from "@/components/v2/V2BookSection";
import V2AboutSection from "@/components/v2/V2AboutSection";
import V2PdSection from "@/components/v2/V2PdSection";
import V2SpeakingSection from "@/components/v2/V2SpeakingSection";
import V2FaqSection from "@/components/v2/V2FaqSection";
import V2EmailCaptureSection from "@/components/v2/V2EmailCaptureSection";
import V2Footer from "@/components/v2/V2Footer";

const IndexV2 = () => {
  return (
    <div className="v2-theme min-h-screen flex flex-col">
      <V2Navigation />
      <main className="flex-1 pt-20">
        <V2HeroSection />
        <V2SocialProofStrip />
        <V2ProblemSection />
        <V2FrameworkSection />
        <VideoSection />
        <V2TestimonialsSection />
        <V2BookSection />
        <V2AboutSection />
        <V2SpeakingSection />
        <V2PdSection />
        <V2FaqSection />
        <V2EmailCaptureSection />
      </main>
      <V2Footer />
    </div>
  );
};

export default IndexV2;
