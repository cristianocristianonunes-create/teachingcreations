import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Search, CheckCircle, XCircle, Trash2, Quote } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Testimonial = Tables<"testimonials">;

const TestimonialsList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      const { error } = await supabase.from("testimonials").update({ approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Testimonial updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Testimonial deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const filtered = testimonials.filter((t) => {
    const matchesFilter =
      filter === "all" || (filter === "approved" ? t.approved : !t.approved);
    const matchesSearch =
      !search ||
      t.author_name.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase()) ||
      t.institution?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: testimonials.length,
    pending: testimonials.filter((t) => !t.approved).length,
    approved: testimonials.filter((t) => t.approved).length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground">Testimonials</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and approve testimonials for the website
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors capitalize ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-sm">No testimonials found.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`bg-card border rounded-lg p-4 transition-colors ${
                t.approved ? "border-border" : "border-accent/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <Quote size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed italic">"{t.quote}"</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{t.author_name}</span>
                    {t.author_role && <span className="text-xs text-muted-foreground">· {t.author_role}</span>}
                    {t.institution && <span className="text-xs text-muted-foreground">· {t.institution}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {t.approved ? (
                    <button
                      onClick={() => updateMutation.mutate({ id: t.id, approved: false })}
                      className="p-1.5 text-primary hover:text-muted-foreground transition-colors rounded hover:bg-muted"
                      title="Unapprove"
                    >
                      <XCircle size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => updateMutation.mutate({ id: t.id, approved: true })}
                      className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10"
                      title="Approve"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm("Delete this testimonial?")) deleteMutation.mutate(t.id);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-2 ml-7">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                    t.approved ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
                  }`}
                >
                  {t.approved ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsList;
