import FadeIn from "@/components/FadeIn";
import TriangleDiagram from "@/components/TriangleDiagram";
import { Eye, MessageSquare, Lightbulb } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const V2FrameworkSection = () => {
  const { get } = usePageContent("home");
  const pillars = [
    { icon: Eye, title: get("framework_pillar_1_title", "Strategic Access™"), desc: get("framework_pillar_1_desc", "Designing how students encounter and interpret content — with intentional cognitive entry points.") },
    { icon: MessageSquare, title: get("framework_pillar_2_title", "Structured Expression™"), desc: get("framework_pillar_2_desc", "Providing frameworks that make thinking visible through deliberate, scaffolded articulation.") },
    { icon: Lightbulb, title: get("framework_pillar_3_title", "Intellectual Autonomy"), desc: get("framework_pillar_3_desc", "The capacity to think independently, transferring skills across contexts without external prompts.") },
  ];
  return (
  <section className="bg-white" style={{ padding: "72px 0" }}>
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-[40px] font-serif font-bold text-[#121212] mb-4 leading-tight">
          {get("model_title", "The Cycle of Thinking™: Your Architecture for Autonomy")}
        </h2>
        <p className="text-base text-[#555555] font-sans max-w-3xl mx-auto leading-relaxed mb-12">
          {get("model_body", "This isn't another teaching trend. It's a proprietary, 3-part system that makes deep thinking visible, measurable, and teachable. It's the bridge between the theory of Harvard's Project Zero and the data of John Hattie's Visible Learning.")}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-col items-center mb-16">
        <TriangleDiagram />
        <p className="mt-6 max-w-xl text-sm text-[#555555] font-sans leading-relaxed text-center italic">
          {get("framework_cycle_text", "Each vertex feeds the next — Strategic Access opens the door, Structured Expression makes thinking visible, and Intellectual Autonomy sustains it independently. Together, they form a self-reinforcing cycle that compounds over time.")}
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-left">
        {pillars.map((p, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full bg-[#2F5233]/10 flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-[#2F5233]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#2F5233] mb-2">{p.title}</h3>
              <p className="text-base text-[#555555] leading-relaxed font-sans">{p.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
  );
};

export default V2FrameworkSection;
