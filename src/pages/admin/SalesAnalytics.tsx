import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { DollarSign, BookOpen, TrendingUp, BarChart3 } from "lucide-react";

type Book = Tables<"books">;

const SalesAnalytics = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin-books-sales"],
    queryFn: async () => {
      const { data, error } = await supabase.from("books").select("*").order("title");
      if (error) throw error;
      return data as Book[];
    },
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["admin-contacts-count"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contacts").select("id, created_at, source");
      if (error) throw error;
      return data || [];
    },
  });

  // Placeholder metrics (real sales data would come from Stripe)
  const publishedBooks = books.filter((b) => b.published).length;
  const booksWithStripe = books.filter((b) => b.stripe_price_id).length;
  const recentContacts = contacts.filter(
    (c) => new Date(c.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  const stats = [
    { label: "Published Books", value: publishedBooks, icon: BookOpen, color: "text-primary" },
    { label: "Stripe-linked", value: booksWithStripe, icon: DollarSign, color: "text-primary" },
    { label: "New Contacts (30d)", value: recentContacts, icon: TrendingUp, color: "text-primary" },
    { label: "Total Audience", value: contacts.length, icon: BarChart3, color: "text-primary" },
  ];

  // Monthly contact growth
  const monthlyData = (() => {
    const months: Record<string, number> = {};
    contacts.forEach((c) => {
      const d = new Date(c.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months[key] = (months[key] || 0) + 1;
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, count]) => ({ month, count }));
  })();

  const maxCount = Math.max(...monthlyData.map((m) => m.count), 1);

  // Source distribution
  const sources = (() => {
    const map: Record<string, number> = {};
    contacts.forEach((c) => {
      const src = c.source || "Direct";
      map[src] = (map[src] || 0) + 1;
    });
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  })();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Audience growth, contact sources, and book catalog overview
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className={s.color} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="text-2xl font-serif text-foreground">{s.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Monthly growth chart */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Audience Growth (Monthly)
              </h3>
              {monthlyData.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
              ) : (
                <div className="space-y-2">
                  {monthlyData.map((m) => (
                    <div key={m.month} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16 flex-shrink-0">{m.month}</span>
                      <div className="flex-1 h-5 bg-muted/50 rounded overflow-hidden">
                        <div
                          className="h-full bg-primary/20 rounded"
                          style={{ width: `${(m.count / maxCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground w-8 text-right">{m.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Source distribution */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Contact Sources
              </h3>
              {sources.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {sources.map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between">
                      <span className="text-sm text-foreground capitalize">{source}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {contacts.length > 0 ? Math.round((count / contacts.length) * 100) : 0}%
                        </span>
                        <span className="text-sm font-medium text-foreground">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Books performance */}
          <div className="bg-card border border-border rounded-lg p-5 mt-6">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Books Overview
            </h3>
            {books.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No books yet</p>
            ) : (
              <div className="space-y-3">
                {books.map((b) => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-foreground">{b.title}</span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                          b.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {b.published ? "Live" : "Draft"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{b.format_type || "Print"}</span>
                      {b.stripe_price_id && <span className="text-primary">Stripe ✓</span>}
                      {b.amazon_url && <span>Amazon ✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-muted/30 border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">
              For detailed sales data, connect Stripe in Settings → Integrations
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesAnalytics;
