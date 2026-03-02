import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const semesters = [
  {
    title: "Spring I — 2025",
    images: ["/evidence/spring-2025-1.png", "/evidence/spring-2025-2.png"],
  },
  {
    title: "Fall — 2024",
    images: [
      "/evidence/fall-2024-1.png",
      "/evidence/fall-2024-2.png",
      "/evidence/fall-2024-3.png",
      "/evidence/fall-2024-4.png",
    ],
  },
  {
    title: "Summer — 2024",
    images: [
      "/evidence/summer-2024-1.png",
      "/evidence/summer-2024-2.png",
      "/evidence/summer-2024-3.png",
    ],
  },
  {
    title: "Spring — 2024",
    images: ["/evidence/spring-2024-1.png"],
  },
];

const Evidence = () => (
  <Layout>
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <FadeIn>
          <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
            Documented Evidence
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Professional Development Feedback Archive
          </h1>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-2xl mb-4">
            The following surveys were collected anonymously from educators who
            participated in professional development sessions facilitated by Dr.
            Erika Sun. They are presented here as documented evidence — not
            marketing material.
          </p>
          <p className="text-xs text-muted-foreground font-sans mb-12">
            Developed through years of classroom practice and professional
            learning with educators.
          </p>
        </FadeIn>

        {semesters.map((semester, si) => (
          <FadeIn key={semester.title} delay={si * 0.1}>
            <div className="mb-16">
              <h2 className="text-2xl font-serif mb-6 border-b border-border pb-3">
                {semester.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {semester.images.map((src, i) => (
                  <div
                    key={i}
                    className="border border-border bg-background overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Educator feedback survey — ${semester.title}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  </Layout>
);

export default Evidence;
