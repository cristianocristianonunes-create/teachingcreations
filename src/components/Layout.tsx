import Navigation from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">{children}</main>
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Teaching Creations. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground italic font-serif">
            The Cycle of Thinking™
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
