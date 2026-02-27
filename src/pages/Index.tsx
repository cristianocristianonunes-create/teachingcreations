import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import AuthorSection from "@/components/sections/AuthorSection";
import FrameworkSection from "@/components/sections/FrameworkSection";
import VideoSection from "@/components/sections/VideoSection";
import BooksSection from "@/components/sections/BooksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import EmailCaptureSection from "@/components/sections/EmailCaptureSection";
import PdSection from "@/components/sections/PdSection";
import ClosingSection from "@/components/sections/ClosingSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <AuthorSection />
      <FrameworkSection />
      <VideoSection />
      <BooksSection />
      <TestimonialsSection />
      <EmailCaptureSection />
      <PdSection />
      <ClosingSection />
    </Layout>
  );
};

export default Index;
