import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-nav.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "The Cycle of Thinking™", path: "/cycle-of-thinking" },
  { label: "Books", path: "/books" },
  { label: "About Erika", path: "/about" },
  { label: "Insights", path: "/insights" },
  { label: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Teaching Creations"
            className="h-14 w-14 lg:h-16 lg:w-16 object-contain"
          />
          <span className="font-serif text-sm tracking-widest uppercase text-muted-foreground hidden sm:block">
            Teaching Creations
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                    location.pathname === link.path
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
          <Link
            to="/books"
            className="px-5 py-2 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Explore the Books
          </Link>
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
                    location.pathname === link.path
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/books"
                className="inline-flex px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase"
              >
                Explore the Books
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
