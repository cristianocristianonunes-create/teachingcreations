import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import { Mic, Users, Lightbulb, Globe, Clock, CheckCircle } from "lucide-react";
import portrait from "@/assets/erika-professional.jpg";

const keynotes = [
  {
    icon: Lightbulb,
    title: "Stop Mistaking Participation for Thinking",
    audience: "Educators & School Leaders",
    duration: "45–90 min keynote",
    description:
      "Students are completing tasks, raising hands, and filling out graphic organizers — and none of it is real thinking. In this session, Erika reveals the difference between engagement and cognition, introduces The Cycle of Thinking™ framework, and gives attendees a concrete path to designing instruction that demands — and develops — genuine intellectual autonomy.",
    outcomes: [
      "Understand the three stages of The Cycle of Thinking™",
      "Identify the common classroom patterns that mask shallow processing",
      "Leave with one actionable strategy to implement the next day",
    ],
  },
  {
    icon: Users,
    title: "Teaching Multilingual Learners Without Lowering the Bar",
    audience: "K-12 Educators & Curriculum Leaders",
    duration: "60–90 min keynote / Half-day workshop",
    description:
      "Differentiation too often means simplification. This session challenges that assumption and presents a research-backed approach to designing instruction that is simultaneously rigorous and accessible — honoring students' language diversity while refusing to lower cognitive expectations. Grounded in Erika's 28 years of classroom experience with multilingual populations.",
    outcomes: [
      "Apply Strategic Access™ to scaffold without simplifying",
      "Use Structured Expression™ to make thinking visible across language levels",
      "Design lessons that serve all learners without two separate plans",
    ],
  },
  {
    icon: Globe,
    title: "From Compliance to Cognition: Building a Culture of Deep Thinking",
    audience: "Principals, Instructional Coaches & District Leaders",
    duration: "Half-day or Full-day institute",
    description:
      "School culture shifts don't happen in one PD session — but they start with one clear vision. This strategic session equips instructional leaders with the language, tools, and implementation roadmap to move their campuses from task-driven to thinking-driven. Erika works directly with leadership teams to diagnose current practice and co-design a campus-specific action plan.",
    outcomes: [
      "Conduct a thinking audit of your current instructional culture",
      "Build shared language across departments and grade levels",
      "Create a 90-day implementation roadmap for your campus",
    ],
  },
  {
    icon: Mic,
    title: "The Architecture of Autonomy: Research, Framework, and Future",
    audience: "Academic Conferences & Professional Associations",
    duration: "45–60 min keynote",
    description:
      "A research-forward presentation that bridges Harvard's Project Zero, John Hattie's Visible Learning, and the practical realities of today's diverse classroom. Erika presents the evidence base behind The Cycle of Thinking™ and makes the case for why intellectual autonomy — not test scores — is the true measure of instructional success.",
    outcomes: [
      "Understand the research foundations of The Cycle of Thinking™",
      "See how the framework aligns with leading educational research",
      "Engage with a model that is both theoretically sound and practically tested",
    ],
  },
];

const formats = [
  { label: "Keynote", desc: "45–90 minutes. Ideal for conference openings, district convocations, and staff kick-offs." },
  { label: "Half-Day Workshop", desc: "3–4 hours. Combines keynote with hands-on application. Teams leave with a usable product." },
  { label: "Full-Day Institute", desc: "6 hours. Deep implementation work. Best for instructional coaches and department leads." },
  { label: "Multi-Session Series", desc: "3–6 sessions over a semester. Sustained coaching for lasting cultural change." },
];

const Speaking = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#F9F9F9]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-sans mb-4">
              Keynotes · Workshops · Institutes
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#121212] leading-tight mb-6">
              Bring The Cycle of Thinking™ to Your Stage
            </h1>
            <p className="text-lg text-[#555555] font-sans leading-relaxed mb-8">
              Erika Sun delivers evidence-based, immediately applicable sessions for educators, instructional leaders, and district teams — in English and Spanish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#B8860B] text-white text-sm font-semibold tracking-wide hover:bg-[#9A7209] transition-colors"
              >
                Inquire About Booking
              </Link>
              <a
                href="#topics"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#2F5233] text-[#2F5233] text-sm font-semibold tracking-wide hover:bg-[#2F5233]/5 transition-colors"
              >
                View Topics
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <img
              src={portrait}
              alt="Erika Sun — Keynote Speaker"
              className="w-full max-w-sm mx-auto object-cover object-top aspect-[4/5] shadow-lg"
            />
          </FadeIn>
        </div>
      </section>

      {/* Why Erika */}
      <section className="bg-white" style={{ padding: "72px 0" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-serif font-bold text-[#121212] mb-6">Why Erika?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { stat: "28+", label: "Years in the Classroom", desc: "Not a theorist — a practitioner who built this framework solving real problems with real students." },
                { stat: "4", label: "Semesters of Documented PD", desc: "Longitudinal feedback collected Spring 2024 – Spring 2025 across multiple cohorts." },
                { stat: "K–12", label: "Multilingual Literacy Focus", desc: "Every session grounded in the real challenges of teaching language-diverse students." },
              ].map((item) => (
                <div key={item.stat} className="border-t-2 border-[#B8860B] pt-6">
                  <p className="text-4xl font-serif font-bold text-[#2F5233] mb-1">{item.stat}</p>
                  <p className="text-sm font-semibold text-[#121212] font-sans mb-2">{item.label}</p>
                  <p className="text-sm text-[#555555] font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Keynote Topics */}
      <section id="topics" className="bg-[#F9F9F9]" style={{ padding: "96px 0" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4">
              Keynote Topics
            </h2>
            <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
          </FadeIn>
          <div className="space-y-12">
            {keynotes.map((k, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#E0E0E0] p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#2F5233]/10 flex items-center justify-center flex-shrink-0">
                      <k.icon className="w-6 h-6 text-[#2F5233]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#121212] leading-snug mb-1">
                        {k.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="text-xs text-[#2F5233] font-medium font-sans">{k.audience}</span>
                        <span className="text-[#E0E0E0]">·</span>
                        <span className="text-xs text-[#B8860B] font-medium font-sans flex items-center gap-1">
                          <Clock size={10} /> {k.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-[#555555] font-sans leading-relaxed mb-5">{k.description}</p>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#121212] mb-3">Attendees will:</p>
                    <ul className="space-y-2">
                      {k.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-3 text-sm text-[#555555] font-sans">
                          <CheckCircle size={16} className="text-[#2F5233] mt-0.5 flex-shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-[#1A2A3A]" style={{ padding: "72px 0" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-serif font-bold text-white text-center mb-12">
              Delivery Formats
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {formats.map((f) => (
                <div key={f.label} className="border border-white/10 p-6">
                  <h3 className="font-serif text-lg font-semibold text-[#B8860B] mb-2">{f.label}</h3>
                  <p className="text-sm text-white/70 font-sans leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-white/50 font-sans mt-8">
              Available in English and Spanish. Virtual and in-person delivery.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F9F9F9]" style={{ padding: "80px 0" }}>
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-serif font-bold text-[#121212] mb-4">
              Ready to Book Erika?
            </h2>
            <p className="text-base text-[#555555] font-sans leading-relaxed mb-8">
              Due to demand, Erika accepts a limited number of speaking engagements per semester.
              Reach out early to check availability for your event.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-[#B8860B] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#9A7209] transition-colors"
            >
              Inquire About Booking →
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Speaking;
