import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import FrameworkSection from "@/components/sections/FrameworkSection";
import BooksSection from "@/components/sections/BooksSection";
import AuthorStorySection from "@/components/sections/AuthorStorySection";
import VideoSection from "@/components/sections/VideoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PdSection from "@/components/sections/PdSection";
import EmailCaptureSection from "@/components/sections/EmailCaptureSection";
import ClosingSection from "@/components/sections/ClosingSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <FrameworkSection />
      <BooksSection />
      <AuthorStorySection />
      <VideoSection />
      <TestimonialsSection />
      <PdSection />
      <EmailCaptureSection />
      <ClosingSection />
    </Layout>
  );
};

export default Index;
