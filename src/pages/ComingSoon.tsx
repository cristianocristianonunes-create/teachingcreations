import logo from "@/assets/logo-icon-transparent.png";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Subtle decorative triangle outlines in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.04]"
          style={{
            clipPath: "polygon(50% 8%, 6% 92%, 94% 92%)",
            border: "1px solid",
            background: "transparent",
            boxShadow: "inset 0 0 0 1px hsl(var(--accent))",
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[420px] h-[420px] md:w-[580px] md:h-[580px] opacity-[0.03]"
          style={{
            clipPath: "polygon(50% 12%, 10% 90%, 90% 90%)",
            boxShadow: "inset 0 0 0 1px hsl(var(--primary))",
          }}
        />
      </div>

      {/* Logo — large and detailed */}
      <div className="relative z-10 mb-8 fade-in">
        <img
          src={logo}
          alt="Teaching Creations"
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_40px_hsl(var(--accent)/0.15)]"
        />
      </div>

      {/* Text content */}
      <h1 className="relative z-10 text-4xl md:text-5xl font-serif text-background tracking-tight mb-3 fade-in fade-in-delay-1">
        Coming Soon
      </h1>

      <div className="w-12 h-px bg-accent mx-auto mb-5 fade-in fade-in-delay-2" />

      <p className="relative z-10 text-muted-foreground font-sans text-sm md:text-base max-w-sm leading-relaxed fade-in fade-in-delay-2">
        We're crafting something meaningful. Stay tuned.
      </p>

      <p className="relative z-10 mt-16 text-[10px] text-muted-foreground/40 font-sans tracking-[0.25em] uppercase fade-in fade-in-delay-3">
        Teaching Creations
      </p>
    </div>
  );
};

export default ComingSoon;
