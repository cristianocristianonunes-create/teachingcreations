import FadeIn from "@/components/FadeIn";
import bookCover from "@/assets/book-cover.png";
import erikaAuthority from "@/assets/erika-authority.jpg";

const V2HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center bg-[#F9F9F9]" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <p
            className="text-xs tracking-[0.2em] uppercase text-[#555555] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}
          >
            FOR K-12 EDUCATORS WHOSE STUDENTS ARE DROWNING IN BUSYWORK
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-bold leading-tight text-[#121212]">
            Stop Mistaking Participation for Thinking.
          </h1>
          <p className="mt-6 text-lg text-[#555555] leading-relaxed max-w-lg font-sans">
            The classroom-proven framework to develop truly independent learners, increase student autonomy by 40%, and reclaim your planning time.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#v2-email-capture"
              className="inline-flex items-center px-8 py-4 bg-[#B8860B] text-white text-sm font-semibold tracking-wide hover:bg-[#9A7209] transition-colors"
            >
              Get Chapter One FREE & See the Framework
            </a>
          </div>
          <a
            href="#v2-social-proof"
            className="inline-block mt-3 text-sm text-[#2F5233] font-medium hover:underline underline-offset-4"
          >
            Used by 2,500+ educators. See the evidence →
          </a>
        </FadeIn>

        <FadeIn delay={0.2} className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <img
              src={erikaAuthority}
              alt="Dr. Erika Sun, educator and developer of The Cycle of Thinking framework"
              className="w-[350px] h-auto object-cover object-top aspect-[4/5] shadow-lg"
              loading="eager"
            />
            <img
              src={bookCover}
              alt="Teaching Reading and Writing to Multilingual Learners — book cover"
              className="w-56 md:w-64 h-auto object-contain shadow-xl"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default V2HeroSection;
