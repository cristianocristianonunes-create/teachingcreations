import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const Contact = () => {
  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-accent mb-4 font-sans font-medium">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact</h1>
            <div className="w-16 h-px bg-accent mb-10" />
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-sans">
              For speaking engagements, professional development inquiries, or collaboration opportunities, please reach out using the form below.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans font-medium">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
