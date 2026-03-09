import FadeIn from "@/components/FadeIn";
import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import { Mic, Users, Lightbulb } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const V2SpeakingSection = () => {
  const { get } = usePageContent("home");
  const topics = [
    {
      icon: Lightbulb,
      title: get("speaking_topic_1_title", "Stop Mistaking Participation for Thinking"),
      desc: get("speaking_topic_1_desc", "A keynote that challenges educators and leaders to rethink what engagement really means — and introduces the framework that makes deep thinking measurable."),
    },
    {
      icon: Users,
      title: get("speaking_topic_2_title", "Teaching Multilingual Learners Without Lowering the Bar"),
      desc: get("speaking_topic_2_desc", "How to design instruction that is simultaneously rigorous and accessible — using The Cycle of Thinking™ to close gaps without watering down content."),
    },
    {
      icon: Mic,
      title: get("speaking_topic_3_title", "From Compliance to Cognition: Building a School Culture of Deep Thinking"),
      desc: get("speaking_topic_3_desc", "A strategic session for instructional leaders on how to shift campus culture from task completion to genuine intellectual autonomy."),
    },
  ];

  return (
    <section className="bg-white" style={{ padding: "96px 0" }}>
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <FadeIn>
          <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
            {get("speaking_title", "Book Erika to Speak at Your Event")}
          </h2>
          <p className="text-base text-[#555555] font-sans max-w-2xl mx-auto text-center leading-relaxed mb-4">
            {get("speaking_description", "Erika delivers keynotes and workshops for conferences, district leadership days, and school professional development — grounded in research, immediately applicable in the classroom.")}
          </p>
          <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {topics.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#2F5233]/10 flex items-center justify-center mb-4">
                  <t.icon className="w-6 h-6 text-[#2F5233]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#121212] mb-2 leading-snug">{t.title}</h3>
                <p className="text-sm text-[#555555] leading-relaxed font-sans">{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="bg-[#F9F9F9] border border-[#E0E0E0] p-8 text-center">
            <p className="text-sm text-[#555555] font-sans mb-6 max-w-xl mx-auto">
              {get("speaking_formats", "Available for keynotes (45–90 min), half-day workshops, full-day institutes, and multi-session series.")}
            </p>
            <Link
              to="/speaking"
              className="inline-flex items-center px-8 py-4 bg-[#2F5233] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#244226] transition-colors"
            >
              {get("speaking_cta", "View Speaking Topics & Inquire →")}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default V2SpeakingSection;
