import FadeIn from "@/components/FadeIn";
import bookCover from "@/assets/book-cover.png";
import { usePageContent } from "@/hooks/usePageContent";

const V2BookSection = () => {
  const { get } = usePageContent("home");
  return (
  <section className="bg-white" style={{ padding: "96px 0" }}>
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
          {get("book_title", "The Framework, In Your Hands.")}
        </h2>
        <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
      </FadeIn>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <img
            src={bookCover}
            alt="Teaching Reading and Writing to Multilingual Learners — book cover"
            className="w-full max-w-sm mx-auto h-auto object-contain shadow-2xl"
          />
        </FadeIn>
        <FadeIn delay={0.15}>
          <h3 className="font-serif text-2xl font-semibold text-[#121212] mb-2">
            {get("book_subtitle", "Teaching Reading and Writing to Multilingual Learners")}
          </h3>
          <p className="text-base text-[#555555] leading-relaxed font-sans mb-4">
            {get("book_description_1", "This book presents the practical, coherent framework for designing literacy instruction that is accessible, rigorous, and sustainable.")}
          </p>
          <p className="text-base text-[#555555] leading-relaxed font-sans mb-6">
            {get("book_description_2", "Move from simple reading interaction to meaningful writing — with coherence across every instructional layer.")}
          </p>
          <a
            href="https://a.co/d/05pVmQSf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#B8860B] text-white text-sm font-semibold tracking-wide hover:bg-[#9A7209] transition-colors"
          >
            {get("book_cta", "Purchase on Amazon →")}
          </a>
        </FadeIn>
      </div>
    </div>
  </section>
  );
};

export default V2BookSection;
