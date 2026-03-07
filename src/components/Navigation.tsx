import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PrefixedLink as Link, usePathPrefix } from "@/contexts/PathPrefixContext";
import { Menu, X } from "lucide-react";
import logoFull from "@/assets/logo-full-transparent.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "The Cycle of Thinking™", path: "/cycle-of-thinking" },
  { label: "Books", path: "/books" },
  { label: "About Erika", path: "/about" },
  { label: "Evidence", path: "/evidence" },
  { label: "Insights", path: "/insights" },
  { label: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const prefix = usePathPrefix();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-3 px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoFull}
            alt="Teaching Creations"
            className="h-36 w-auto object-contain"
            style={{ marginTop: "-18%", marginBottom: "-25%" }}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                    location.pathname === `${prefix}${link.path}`
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Sticky CTA */}
          <a
            href="#email-capture"
            className="text-sm text-primary font-medium hover:underline underline-offset-4 font-sans"
          >
            Get Chapter One →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <ul className="flex flex-col items-center gap-5 py-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-base tracking-wide transition-colors duration-200 hover:text-primary ${
                    location.pathname === `${prefix}${link.path}`
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#email-capture"
                className="text-base text-primary font-medium hover:underline underline-offset-4 font-sans"
              >
                Get Chapter One →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
