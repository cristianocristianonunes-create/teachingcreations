import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EmailCaptureSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("contacts").insert({
        name: name.trim() || "Visitor",
        email: email.trim(),
        source: "landing_lead_magnet",
        interest_type: "free_chapter",
      });
      if (error) throw error;
      toast.success("You're in! Check your email for the free chapter.");
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16" id="email-capture">
      <div className="container mx-auto px-6 lg:px-8 max-w-xl text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-serif mb-2">
            Download Chapter One Free
          </h2>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-2">
            Get Chapter One of <em>Teaching Reading and Writing to Multilingual Learners</em> and
            discover how to design intentional cognitive entry points for your students.
          </p>
          <p className="text-xs text-primary font-medium font-sans mb-6">
            Join educators already applying the framework.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Sending…" : "Download Free Chapter"}
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-3 font-sans">
            No spam. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default EmailCaptureSection;
