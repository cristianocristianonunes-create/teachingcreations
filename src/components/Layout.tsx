import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">{children}</main>
      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <p className="font-serif text-lg mb-2">Teaching Creations</p>
              <p className="text-sm text-background/60 italic font-serif">
                The Cycle of Thinking™
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

            {/* Newsletter teaser */}
            <div>
              <p className="text-xs tracking-widest uppercase text-background/40 mb-3 font-sans font-medium">Stay Updated</p>
              <p className="text-sm text-background/60 font-sans leading-relaxed mb-4">
                Receive insights on making thinking visible in your classroom.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-sm text-accent font-medium tracking-widest uppercase hover:underline underline-offset-4 font-sans"
              >
                Get in Touch →
              </Link>
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
