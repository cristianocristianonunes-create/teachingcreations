import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";

const books = [
  {
    img: book1,
    title: "Strategic Access",
    promise: "Transform how students enter and interpret academic content — moving from passive decoding to intentional comprehension.",
    startHere: "Start here if your students can read but struggle to interpret.",
    audience: "Educators working with multilingual learners.",
  },
  {
    img: book2,
    title: "Structured Expression",
    promise: "Give students the structural tools to articulate thinking with clarity — not just repeat learned language.",
    startHere: "Start here if your students participate but can't explain their reasoning.",
    audience: "Teachers developing visible thinking routines.",
  },
];

const BooksSection = () => (
  <section className="py-20" id="books">
    <div className="container mx-auto px-6 lg:px-8">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium text-center">
          Primary Entry Point
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-3">
          Start Here: The Books
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-14" />
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-14 max-w-4xl mx-auto">
        {books.map((book, i) => (
          <FadeIn key={book.title} delay={i * 0.12}>
            <div className="flex flex-col items-center text-center">
              <img
                src={book.img}
                alt={`${book.title} book cover`}
                className="w-56 md:w-64 h-auto object-cover shadow-lg mb-6"
              />
              <h3 className="font-serif text-xl mb-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2 font-sans">
                {book.promise}
              </p>
              <p className="text-xs text-primary font-medium mb-4 font-sans italic">
                {book.startHere}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/books"
                  className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  Purchase
                </Link>
                <button className="px-6 py-2.5 border border-border text-foreground text-xs font-medium tracking-widest uppercase hover:bg-muted transition-colors">
                  Read Chapter One Free
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.25} className="text-center mt-10">
        <Link
          to="/books"
          className="inline-flex items-center text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
        >
          View Full Book Details →
        </Link>
      </FadeIn>
    </div>
  </section>
);

export default BooksSection;
