import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check } from "lucide-react";

const benefits = [
  "The complete 3-part framework diagram.",
  "A step-by-step guide to designing your first thinking-driven lesson.",
  "3 common mistakes to avoid when teaching multilingual learners.",
];

const V2EmailCaptureSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chapterStatus, setChapterStatus] = useState<"draft" | "ready">("draft");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "chapter_status")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value === "ready") setChapterStatus("ready");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      if (chapterStatus === "draft") {
        const { error } = await supabase.from("free_chapter_interest").insert({
          name: name.trim() || "Visitor",
          email: email.trim(),
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("contacts").insert({
          name: name.trim() || "Visitor",
          email: email.trim(),
          source: "landing_v2_lead_magnet",
          interest_type: "free_chapter",
        });
        if (error) throw error;
      }
      setSubmitted(true);
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F9F9F9]" id="v2-email-capture" style={{ padding: "96px 0" }}>
      <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-[40px] font-serif font-bold text-[#121212] mb-4 leading-tight">
            Get the Framework in Your Inbox—Instantly.
          </h2>
          <p className="text-base text-[#555555] font-sans leading-relaxed mb-6">
            Download Chapter One of "Teaching Reading and Writing to Multilingual Learners" for free and get the complete visual map of The Cycle of Thinking™. See exactly how to implement Strategic Access™ in your next lesson.
          </p>

          <ul className="text-base text-[#555555] font-sans leading-relaxed mb-4 space-y-2 inline-block text-left">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#2F5233] mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-[#B8860B] font-medium font-sans mb-8">
            Bonus: When you download Chapter One this week, you'll also receive our "5 Activities to Make Thinking Visible" guide (a $29 value).
          </p>

          {submitted ? (
            <div className="bg-white border border-[#E0E0E0] p-8">
              <p className="text-base text-[#121212] font-sans leading-relaxed">
                Thank you! Check your email for Chapter One. If you don't see it, check your spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-[#E0E0E0] text-[#121212] text-base font-sans focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-[#E0E0E0] text-[#121212] text-base font-sans focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-[#B8860B] text-white text-sm font-semibold tracking-widest uppercase hover:bg-[#9A7209] transition-colors disabled:opacity-50"
              >
                {loading ? "Sending…" : "SEND ME CHAPTER ONE NOW"}
              </button>
            </form>
          )}
          <p className="text-xs text-[#555555]/70 mt-4 font-sans">
            No spam. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default V2EmailCaptureSection;
