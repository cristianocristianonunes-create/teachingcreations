import FadeIn from "@/components/FadeIn";

const quotes = [
  {
    text: "The discussion sessions were enriching and mind opening.",
    role: "High School Content Teacher",
    semester: "Spring 2024",
  },
  {
    text: "I have come to realize that integrated strategies accelerate progress — combining reading, writing, and vocabulary scaffolding fosters quicker and more sustained growth.",
    role: "High School ELD Teacher",
    semester: "Fall 2024",
  },
  {
    text: "Dr. Sun modeling best practices and provided scenarios applicable to the classroom.",
    role: "High School Administrator",
    semester: "Summer 2024",
  },
  {
    text: "I felt a gap in some areas that I thought I knew. I was excited to get more ways on how to teach reading to my Multilingual learners.",
    role: "High School ELD Teacher",
    semester: "Fall 2024",
  },
  {
    text: "Bar none, best CPD trainer to date!",
    role: "Early College Content Teacher",
    semester: "Spring 2025",
  },
  {
    text: "The culminating project gives me a complete lesson plan that I can use in my class.",
    role: "High School Content Teacher",
    semester: "Summer 2024",
  },
];

const SocialProofSection = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium text-center">
          Educator Feedback — Collected Across Four Semesters
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-10 text-center">
          What Educators Are Saying
        </h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <blockquote className="bg-background p-6 h-full flex flex-col justify-between border border-border">
              <p className="text-sm text-foreground leading-relaxed font-sans italic mb-4">
                "{q.text}"
              </p>
              <footer className="mt-auto">
                <p className="text-xs font-medium text-primary font-sans">
                  — {q.role}
                </p>
                <p className="text-xs text-muted-foreground font-sans">
                  {q.semester}
                </p>
              </footer>
            </blockquote>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.5}>
        <p className="text-center mt-8">
          <a
            href="/evidence"
            className="text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
          >
            View Full Evidence Archive →
          </a>
        </p>
      </FadeIn>
    </div>
  </section>
);

export default SocialProofSection;
