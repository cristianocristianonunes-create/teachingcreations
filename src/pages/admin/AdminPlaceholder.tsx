import { useLocation } from "react-router-dom";

const AdminPlaceholder = () => {
  const location = useLocation();
  const section = location.pathname.split("/admin/")[1] || "section";
  const title = section
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      <h1 className="text-2xl font-serif text-foreground mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground">
        This module will be available in the next phase.
      </p>
      <div className="mt-8 bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-sm italic">Coming soon</p>
      </div>
    </div>
  );
};

export default AdminPlaceholder;
