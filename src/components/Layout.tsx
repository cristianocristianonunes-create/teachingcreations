import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";
import Navigation from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32">{children}</main>
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

            {/* Chapter CTA */}
            <div>
              <p className="text-xs tracking-widest uppercase text-background/40 mb-3 font-sans font-medium">Free Resource</p>
              <p className="text-sm text-background/60 font-sans leading-relaxed mb-3">
                Be notified when Chapter One is released.
              </p>
              <a
                href="#email-capture"
                className="inline-flex px-5 py-2.5 bg-accent text-accent-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Get Chapter One Free
              </a>
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
