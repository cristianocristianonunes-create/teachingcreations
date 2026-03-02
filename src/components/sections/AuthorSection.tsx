import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import portrait from "@/assets/erika-professional.jpg";

const credentials = [
  "Teaching professionally since 1997",
  "Experience across children, adolescents, adults, and multilingual learners",
  "Proficiency coaching, literacy instruction, and teacher development",
  "Published author on cognitive access and structured expression",
  "Professional development facilitator for K–12 districts",
];

const AuthorSection = () => (
  <section className="py-14 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center max-w-4xl">
      <FadeIn>
        <img
          src={portrait}
          alt="Erika Sun — Educator and Framework Developer"
          className="w-full max-w-xs mx-auto object-cover aspect-[4/5] shadow-lg"
        />
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          Meet the Author
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-1">Erika Sun</h2>
        <p className="text-sm text-primary font-medium font-sans mb-4">
          Educator · Framework Developer · Nearly Three Decades of Practice
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-sans">
          Erika Sun began teaching professionally in 1997. Across nearly three decades,
          her work has spanned children, adolescents, adults, and multilingual learners.
          The Cycle of Thinking™ did not emerge from theory alone — it was shaped through
          continuous classroom practice, proficiency coaching, and the daily work of making
          learning visible and transferable.
        </p>
        <ul className="space-y-1.5 mb-5">
          {credentials.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground font-sans">
              <span className="text-accent mt-0.5">•</span>
              {c}
            </li>
          ))}
        </ul>
        <Link
          to="/about"
          className="inline-flex items-center text-sm text-primary font-medium tracking-widest uppercase hover:underline underline-offset-4"
        >
          Read Full Biography →
        </Link>
      </FadeIn>
    </div>
  </section>
);

export default AuthorSection;
