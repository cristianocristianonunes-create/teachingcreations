import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen,
  Users,
  GraduationCap,
  Lightbulb,
  MessageSquareQuote,
  TrendingUp,
} from "lucide-react";

interface Stats {
  books: number;
  contacts: number;
  pdRequests: number;
  insights: number;
  testimonials: number;
  pendingPd: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    books: 0,
    contacts: 0,
    pdRequests: 0,
    insights: 0,
    testimonials: 0,
    pendingPd: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [books, contacts, pdRequests, insights, testimonials, pendingPd] =
        await Promise.all([
          supabase.from("books").select("id", { count: "exact", head: true }),
          supabase.from("contacts").select("id", { count: "exact", head: true }),
          supabase.from("pd_requests").select("id", { count: "exact", head: true }),
          supabase.from("insights").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
          supabase
            .from("pd_requests")
            .select("id", { count: "exact", head: true })
            .eq("status", "new_inquiry"),
        ]);

      setStats({
        books: books.count ?? 0,
        contacts: contacts.count ?? 0,
        pdRequests: pdRequests.count ?? 0,
        insights: insights.count ?? 0,
        testimonials: testimonials.count ?? 0,
        pendingPd: pendingPd.count ?? 0,
      });
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Books", value: stats.books, icon: BookOpen, color: "text-primary" },
    { label: "Audience", value: stats.contacts, icon: Users, color: "text-primary" },
    { label: "PD Requests", value: stats.pdRequests, icon: GraduationCap, color: "text-accent" },
    { label: "Pending PD", value: stats.pendingPd, icon: TrendingUp, color: "text-destructive" },
    { label: "Insights", value: stats.insights, icon: Lightbulb, color: "text-primary" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquareQuote, color: "text-accent" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here's your platform overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-card border border-border rounded-lg p-5 flex items-start justify-between"
            >
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {card.label}
                </p>
                <p className="text-3xl font-serif text-foreground mt-2">{card.value}</p>
              </div>
              <Icon size={20} className={card.color} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
            Recent Activity
          </h2>
          <p className="text-sm text-muted-foreground italic">
            Activity feed will populate as you add content and receive inquiries.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: "Write New Insight", path: "/admin/insights" },
              { label: "Review PD Requests", path: "/admin/pd-requests" },
              { label: "Manage Books", path: "/admin/books" },
              { label: "View Audience", path: "/admin/audience" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.path}
                className="block text-sm text-primary hover:underline underline-offset-4"
              >
                {action.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
