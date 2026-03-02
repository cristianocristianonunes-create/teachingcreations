import FadeIn from "@/components/FadeIn";

const TestimonialsSection = () => (
  <section className="py-16 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-serif mb-2">
          What Educators Are Saying
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-8" />
        <p className="text-sm text-muted-foreground font-sans leading-relaxed">
          Testimonials from educators using The Cycle of Thinking™ in their classrooms are coming soon.
        </p>
      </FadeIn>
    </div>
  </section>
);

export default TestimonialsSection;
