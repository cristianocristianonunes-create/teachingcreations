import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 2000;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required.";
    else if (name.trim().length > MAX_NAME) e.name = `Max ${MAX_NAME} characters.`;
    if (!email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(email.trim())) e.email = "Enter a valid email address.";
    else if (email.trim().length > MAX_EMAIL) e.email = `Max ${MAX_EMAIL} characters.`;
    if (message.trim().length > MAX_MESSAGE) e.message = `Max ${MAX_MESSAGE} characters.`;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const { error } = await supabase.from("contacts").insert({
        name: name.trim().slice(0, MAX_NAME),
        email: email.trim().slice(0, MAX_EMAIL),
        source: "contact_page",
        interest_type: message.trim().slice(0, MAX_MESSAGE) || null,
      });
      if (error) throw error;
      setSubmitted(true);
      setName(""); setEmail(""); setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            {submitted ? (
              <div className="bg-secondary border border-border p-8 text-center">
                <p className="text-base text-foreground font-sans leading-relaxed">
                  Thank you for reaching out. Erika will get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={MAX_NAME}
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1 font-sans">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={MAX_EMAIL}
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1 font-sans">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans font-medium">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={MAX_MESSAGE}
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1 font-sans">{errors.message}</p>}
                  <p className="text-xs text-muted-foreground mt-1 font-sans text-right">{message.length}/{MAX_MESSAGE}</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
