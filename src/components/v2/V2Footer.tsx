import { PrefixedLink as Link } from "@/contexts/PathPrefixContext";

const V2Footer = () => (
  <footer className="bg-[#1A2A3A] text-white">
    <div className="container mx-auto px-6 lg:px-8" style={{ padding: "64px 24px" }}>
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl mb-2">Teaching Creations</p>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            Bridging research and classroom practice — making thinking visible, measurable, and teachable.
          </p>
        </div>

        {/* Navigate */}
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-1 font-sans font-medium">
            Navigate
          </p>
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
              className="text-sm text-white/60 hover:text-white transition-colors font-sans"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Latest Insights */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3 font-sans font-medium">
            Latest Insights
          </p>
          <p className="text-sm text-white/50 font-sans">
            New articles coming soon. Stay tuned.
          </p>
        </div>

        {/* Free Resource */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3 font-sans font-medium">
            Free Resource
          </p>
          <p className="text-sm text-white/60 font-sans leading-relaxed mb-4">
            Get the framework built for today's diverse classroom.
          </p>
          <a
            href="#v2-email-capture"
            className="inline-flex px-5 py-2.5 bg-[#B8860B] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#9A7209] transition-colors"
          >
            GET CHAPTER ONE FREE
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-6 text-center">
        <p className="text-xs text-white/40 tracking-wide font-sans">
          © {new Date().getFullYear()} Teaching Creations. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default V2Footer;
