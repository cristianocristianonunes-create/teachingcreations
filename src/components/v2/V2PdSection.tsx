import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import { Check } from "lucide-react";

const outcomes = [
  "Coherent literacy planning across reading, writing, and vocabulary",
  "Immediate classroom application within the same instructional cycle",
  "Rigorous multilingual learner support without lowering expectations",
];

const V2PdSection = () => (
  <section className="bg-[#1A2A3A]" style={{ padding: "96px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-white mb-4 leading-tight">
          Bring The Cycle of Thinking™ to Your School or District
        </h2>
        <p className="text-base text-white/70 font-sans leading-relaxed mb-8 max-w-2xl mx-auto">
          Customized professional development designed for schools and districts seeking
          coherent literacy instruction aligned to multilingual learner needs. We partner with you to build capacity, improve student outcomes, and create a sustainable culture of deep thinking.
        </p>
        <ul className="text-base text-white/90 font-sans leading-relaxed mb-6 space-y-3 inline-block text-left">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#B8860B] mt-0.5 flex-shrink-0" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-white/50 font-sans mb-8">
          Due to the in-depth nature of our coaching, we limit our partnerships to 5 new districts per semester. Spots for Fall 2026 are filling fast.
        </p>
        <div>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 border-2 border-[#2F5233] text-[#2F5233] bg-[#2F5233] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#244226] transition-colors"
          >
            Request Professional Development
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default V2PdSection;
