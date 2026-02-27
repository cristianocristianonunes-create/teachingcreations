import logo from "@/assets/logo-transparent.png";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="Teaching Creations" className="w-36 md:w-48 mb-10 opacity-90" />

      <h1 className="text-4xl md:text-5xl font-serif text-background tracking-tight mb-4">
        Coming Soon
      </h1>

      <div className="w-16 h-px bg-accent mx-auto mb-6" />

      <p className="text-muted-foreground font-sans text-sm md:text-base max-w-md leading-relaxed">
        We're working on something special. Stay tuned.
      </p>

      <p className="mt-12 text-xs text-muted-foreground/60 font-sans tracking-widest uppercase">
        Teaching Creations
      </p>
    </div>
  );
};

export default ComingSoon;
