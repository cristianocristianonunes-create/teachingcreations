import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";

const books = [
  {
    img: book1,
    title: "Strategic Access",
    description:
      "This book reframes how educators design student entry points into academic content. Moving beyond simplification, Strategic Access™ presents a model for intentional cognitive engagement from the first moment of learning.",
    audience: "Educators working with multilingual learners, curriculum designers, and instructional coaches seeking research-informed strategies for deeper comprehension.",
  },
  {
    img: book2,
    title: "Structured Expression",
    description:
      "Structured Expression™ explores how students can move from surface-level reproduction to genuine, scaffolded articulation of thought. This book provides frameworks that make thinking visible through deliberate expression design.",
    audience: "Teachers developing student voice, visible thinking routines, and assessment strategies that reveal cognitive depth.",
  },
];

const Books = () => {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
              Publications
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">The Books Behind the Framework</h1>
            <div className="w-16 h-px bg-accent mb-16" />
          </FadeIn>

          <div className="space-y-24">
            {books.map((book, i) => (
              <FadeIn key={book.title} delay={i * 0.15}>
                <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
                  <img
                    src={book.img}
                    alt={`${book.title} book cover`}
                    className="w-60 h-auto object-cover shadow-lg mx-auto md:mx-0"
                  />
                  <div>
                    <h2 className="text-2xl font-serif mb-4">{book.title}</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4 font-sans">
                      {book.description}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6 font-sans">
                      <span className="font-medium text-foreground">Intended reader:</span> {book.audience}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity">
                        Purchase
                      </button>
                      <button className="px-6 py-2.5 border border-border text-foreground text-xs font-medium tracking-widest uppercase hover:bg-muted transition-colors">
                        Sample Chapter
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Books;
