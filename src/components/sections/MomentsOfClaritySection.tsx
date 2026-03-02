import FadeIn from "@/components/FadeIn";

const moments = [
  {
    theme: "The Shift",
    description:
      "Educators describe the moment they stopped teaching tasks and started teaching thinking. The classroom feels different — not louder, but more purposeful.",
  },
  {
    theme: "Instructional Coherence",
    description:
      "Lessons begin to connect. Teachers report that planning becomes more intentional — not because they follow a script, but because they understand what thinking looks like at each stage.",
  },
  {
    theme: "Clearer Expectations",
    description:
      "Students begin to understand what is being asked of them — not just the task, but the thinking behind it. Directions become invitations to reason.",
  },
  {
    theme: "The Aha Moment",
    description:
      "Many educators recall a specific moment when the framework made something they already knew feel newly visible. It is less about new information and more about new clarity.",
  },
];

const MomentsOfClaritySection = () => (
  <section className="py-14">
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-accent mb-3 font-sans font-medium">
          What Educators Notice
        </p>
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Moments of Clarity</h2>
      </FadeIn>
      <div className="space-y-6">
        {moments.map((m, i) => (
          <FadeIn key={m.theme} delay={i * 0.08}>
            <div className="border-l-2 border-accent pl-5">
              <h3 className="font-serif text-foreground text-base mb-1">{m.theme}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {m.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default MomentsOfClaritySection;
