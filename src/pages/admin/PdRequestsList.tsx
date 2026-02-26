import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Search, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type PdRequest = Tables<"pd_requests">;

const statuses = [
  { value: "new_inquiry", label: "New Inquiry", color: "bg-blue-500/10 text-blue-700" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500/10 text-yellow-700" },
  { value: "proposal_sent", label: "Proposal Sent", color: "bg-accent/20 text-accent-foreground" },
  { value: "confirmed", label: "Confirmed", color: "bg-primary/10 text-primary" },
  { value: "completed", label: "Completed", color: "bg-muted text-muted-foreground" },
];

const PdRequestsList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ id: string; notes: string } | null>(null);
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-pd-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pd_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PdRequest[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PdRequest> }) => {
      const { error } = await supabase.from("pd_requests").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pd-requests"] });
      toast({ title: "Request updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const filtered = requests.filter((r) => {
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesSearch =
      !search ||
      r.organization_name.toLowerCase().includes(search.toLowerCase()) ||
      r.contact_person.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusStyle = (status: string) =>
    statuses.find((s) => s.value === status)?.color || "bg-muted text-muted-foreground";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground">PD Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Professional development inquiry pipeline
        </p>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {statuses.map((s) => {
          const count = requests.filter((r) => r.status === s.value).length;
          return (
            <button
              key={s.value}
              onClick={() => setStatusFilter(statusFilter === s.value ? "all" : s.value)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                statusFilter === s.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <p className="text-lg font-semibold text-foreground">{count}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
            </button>
          );
        })}
      </div>

      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-sm">No requests found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((req) => (
            <div key={req.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${getStatusStyle(req.status)}`}>
                    {req.status.replace("_", " ")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{req.organization_name}</p>
                    <p className="text-xs text-muted-foreground">{req.contact_person} · {req.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(req.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform ${expandedId === req.id ? "rotate-180" : ""}`} />
                </div>
              </button>

              {expandedId === req.id && (
                <div className="px-4 pb-4 border-t border-border pt-3 space-y-4">
                  {req.message && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Message</p>
                      <p className="text-sm text-foreground">{req.message}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                    <select
                      value={req.status}
                      onChange={(e) => updateMutation.mutate({ id: req.id, updates: { status: e.target.value } })}
                      className="px-3 py-1.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                    {editingNotes?.id === req.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editingNotes.notes}
                          onChange={(e) => setEditingNotes({ ...editingNotes, notes: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              updateMutation.mutate({ id: req.id, updates: { notes: editingNotes.notes || null } });
                              setEditingNotes(null);
                            }}
                            className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded hover:opacity-90"
                          >
                            Save
                          </button>
                          <button onClick={() => setEditingNotes(null)} className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingNotes({ id: req.id, notes: req.notes || "" })}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {req.notes || "Add notes..."}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdRequestsList;
