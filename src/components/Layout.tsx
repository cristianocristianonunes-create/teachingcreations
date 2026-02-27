import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import Navigation from "./Navigation";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [footerEmail, setFooterEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("contacts").insert({
        name: "Newsletter Subscriber",
        email: footerEmail.trim(),
        source: "footer_newsletter",
        interest_type: "newsletter",
      });
      if (error) throw error;
      toast.success("Subscribed! Welcome aboard.");
      setFooterEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">{children}</main>
      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <p className="font-serif text-lg mb-2">Teaching Creations</p>
              <p className="text-sm text-background/60 italic font-serif mb-3">
                The Cycle of Thinking™
              </p>
              <p className="text-xs text-background/40 font-sans leading-relaxed">
                Bridging research and classroom practice — making thinking visible, measurable, and teachable.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              <p className="text-xs tracking-widest uppercase text-background/40 mb-1 font-sans font-medium">Navigate</p>
              {[
                { label: "Books", path: "/books" },
                { label: "The Framework", path: "/cycle-of-thinking" },
                { label: "About Erika", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Insights", path: "/insights" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-sm text-background/60 hover:text-background transition-colors font-sans"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs tracking-widest uppercase text-background/40 mb-3 font-sans font-medium">Stay Updated</p>
              <p className="text-sm text-background/60 font-sans leading-relaxed mb-3">
                Receive insights on making thinking visible in your classroom.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-background/10 border border-background/20 text-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-background/40"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-accent text-accent-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "…" : "Join"}
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-background/10 mt-10 pt-6 text-center">
            <p className="text-xs text-background/40 tracking-wide font-sans">
              © {new Date().getFullYear()} Teaching Creations. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
