import FadeIn from "@/components/FadeIn";
import bookCover1 from "@/assets/book-cover.png";
import bookCover2 from "@/assets/book-2-cover.png";
import { usePageContent } from "@/hooks/usePageContent";

const books = [
  {
    cover: bookCover1,
    alt: "Teaching Reading and Writing to Multilingual Learners — book cover",
    titleKey: "book_subtitle",
    titleFallback: "Teaching Reading and Writing to Multilingual Learners",
    descKey: "book_description_1",
    descFallback:
      "The practical, coherent framework for designing literacy instruction that is accessible, rigorous, and sustainable for multilingual classrooms.",
    url: "https://a.co/d/0cTCikQ0",
  },
  {
    cover: bookCover2,
    alt: "Strategic Access — book cover",
    titleKey: "book2_subtitle",
    titleFallback:
      "Strategic Access: Teaching the Interpretive Phase of The Cycle of Thinking™",
    descKey: "book2_description",
    descFallback:
      "A deep dive into the interpretive phase — equipping educators with strategies to move students from surface-level comprehension to genuine critical thinking.",
    url: "https://a.co/d/06puS62e",
  },
];

const V2BookSection = () => {
  const { get } = usePageContent("home");

  return (
    <section className="bg-white" style={{ padding: "96px 0" }}>
      <div className="container mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-[40px] font-serif font-bold text-center text-[#121212] mb-4 leading-tight">
            {get("books_title", "The Books Behind the Framework")}
          </h2>
          <div className="w-16 h-px bg-[#B8860B] mx-auto mb-16" />
        </FadeIn>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {books.map((book, i) => (
            <FadeIn key={book.url} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center">
                <img
                  src={book.cover}
                  alt={book.alt}
                  className="w-full max-w-[260px] h-auto object-contain shadow-2xl mb-8"
                />
                <h3 className="font-serif text-xl font-semibold text-[#121212] mb-3 leading-snug">
                  {get(book.titleKey, book.titleFallback)}
                </h3>
                <p className="text-base text-[#555555] leading-relaxed font-sans mb-6">
                  {get(book.descKey, book.descFallback)}
                </p>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-[#B8860B] text-white text-sm font-semibold tracking-wide hover:bg-[#9A7209] transition-colors"
                >
                  Purchase on Amazon →
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V2BookSection;
