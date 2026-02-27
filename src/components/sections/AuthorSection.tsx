import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import FadeIn from "@/components/FadeIn";
import portrait from "@/assets/erika-portrait.jpg";

const credentials = [
  "10+ years in multilingual education",
  "Framework developer & learning theorist",
  "Published author on cognitive access & expression",
  "Professional development facilitator for K–12 districts",
];

const AuthorSection = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center max-w-4xl">
      <FadeIn>
        <img
          src={portrait}
          alt="Erika Sun — Educator, Framework Developer, Learning Theorist"
          className="w-full max-w-xs mx-auto object-cover aspect-[4/5] shadow-lg"
        />
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          Meet the Author
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-1">Erika Sun</h2>
        <p className="text-sm text-primary font-medium font-sans mb-4">
          Educator · Framework Developer · Learning Theorist
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-sans">
          With over a decade of experience in multilingual education, Erika Sun developed
          The Cycle of Thinking™ to address the invisible cognitive challenges students face
          when building intellectual autonomy. Her work bridges classroom practice and
          cognitive theory, giving educators structural tools that make thinking explicit,
          observable, and teachable.
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
