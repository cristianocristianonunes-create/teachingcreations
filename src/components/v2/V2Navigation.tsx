import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PrefixedLink as Link, usePathPrefix } from "@/contexts/PathPrefixContext";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/logo-full-transparent.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "The Cycle of Thinking™", path: "/cycle-of-thinking" },
  { label: "Books", path: "/books" },
  { label: "Speaking", path: "/speaking" },
  { label: "About Erika", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const V2Navigation = () => {
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
          ? "bg-[#F9F9F9]/95 backdrop-blur-sm border-b border-[#E0E0E0] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-3 px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img src={logoIcon} alt="Teaching Creations" className="h-24 w-auto object-contain" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors duration-200 hover:text-[#2F5233] ${
                    location.pathname === `${prefix}${link.path}`
                      ? "text-[#2F5233] font-medium"
                      : "text-[#555555]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#v2-email-capture"
            className="px-5 py-2.5 bg-[#B8860B] text-white text-sm font-medium tracking-wide hover:bg-[#9A7209] transition-colors"
          >
            Get Chapter One →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#121212]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F9F9F9] border-b border-[#E0E0E0]">
          <ul className="flex flex-col items-center gap-5 py-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-base tracking-wide transition-colors duration-200 hover:text-[#2F5233] ${
                    location.pathname === `${prefix}${link.path}`
                      ? "text-[#2F5233] font-medium"
                      : "text-[#555555]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#v2-email-capture"
                className="px-5 py-2.5 bg-[#B8860B] text-white text-sm font-medium tracking-wide hover:bg-[#9A7209] transition-colors"
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

export default V2Navigation;
