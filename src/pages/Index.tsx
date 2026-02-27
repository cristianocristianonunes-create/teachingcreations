import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AuthorityBandSection from "@/components/sections/AuthorityBandSection";
import ProblemSection from "@/components/sections/ProblemSection";
import AuthorSection from "@/components/sections/AuthorSection";
import FrameworkSection from "@/components/sections/FrameworkSection";
import VideoSection from "@/components/sections/VideoSection";
import BooksSection from "@/components/sections/BooksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ImpactMetricsSection from "@/components/sections/ImpactMetricsSection";
import PdSection from "@/components/sections/PdSection";
import EmailCaptureSection from "@/components/sections/EmailCaptureSection";
import ClosingSection from "@/components/sections/ClosingSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AuthorityBandSection />
      <ProblemSection />
      <AuthorSection />
      <FrameworkSection />
      <VideoSection />
      <BooksSection />
      <TestimonialsSection />
      <ImpactMetricsSection />
      <PdSection />
      <EmailCaptureSection />
      <ClosingSection />
    </Layout>
  );
};

export default Index;
