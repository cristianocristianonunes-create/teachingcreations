import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const insights = [
  {
    slug: "participation-is-not-thinking",
    title: "Participation Is Not Thinking",
    excerpt:
      "The most visible classrooms are not always the most cognitively demanding. What happens when engagement becomes a performance?",
    date: "February 2026",
  },
  {
    slug: "the-cost-of-simplification",
    title: "The Cost of Simplification",
    excerpt:
      "When we simplify content for accessibility, we may inadvertently remove the cognitive challenge that develops autonomy.",
    date: "January 2026",
  },
  {
    slug: "expression-without-structure",
    title: "Expression Without Structure",
    excerpt:
      "Free-form responses can feel liberating. But without structural support, students often reproduce rather than construct meaning.",
    date: "December 2025",
  },
];

const Insights = () => {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
              Reflections
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Insights</h1>
            <div className="w-16 h-px bg-accent mb-16" />
          </FadeIn>

          <div className="space-y-16">
            {insights.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <article className="border-b border-border pb-12">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3 font-sans">
                    {post.date}
                  </p>
                  <h2 className="text-2xl font-serif mb-3">{post.title}</h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4 font-sans">
                    {post.excerpt}
                  </p>
                  <span className="text-sm text-primary font-medium tracking-widest uppercase cursor-pointer hover:underline underline-offset-4">
                    Read More →
                  </span>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
