import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Users,
  GraduationCap,
  MessageSquareQuote,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo-vertical-transparent.png";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Insights", path: "/admin/insights", icon: Lightbulb },
  { label: "Books", path: "/admin/books", icon: BookOpen },
  { label: "Analytics", path: "/admin/sales", icon: TrendingUp },
  { label: "Audience", path: "/admin/audience", icon: Users },
  { label: "PD Requests", path: "/admin/pd-requests", icon: GraduationCap },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Media Kit", path: "/admin/media-kit", icon: Briefcase },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border flex flex-col fixed inset-y-0 left-0 bg-card/50">
        <div className="p-5 border-b border-border">
          <Link to="/admin" className="flex flex-col items-center">
            <img
              src={logo}
              alt="Teaching Creations"
              className="w-32 h-auto object-contain"
            />
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
