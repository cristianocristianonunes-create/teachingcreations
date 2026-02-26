import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Save, Shield, Palette, Link2, Users, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type UserRole = Tables<"user_roles">;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const tabs = [
    { key: "general", label: "General", icon: Palette },
    { key: "integrations", label: "Integrations", icon: Link2 },
    { key: "users", label: "User Roles", icon: Users },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform configuration</p>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "general" && <GeneralSettings />}
      {activeTab === "integrations" && <IntegrationsSettings />}
      {activeTab === "users" && <UserRolesSettings />}
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <div className="max-w-xl space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Brand</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Site Title
            </label>
            <input
              type="text"
              defaultValue="Teaching Creations"
              className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              defaultValue="Transforming Teaching Through Thinking"
              className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">SEO Defaults</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Meta Description
            </label>
            <textarea
              rows={3}
              defaultValue="Teaching Creations by Erika Sun — Resources, insights, and professional development for educators committed to cultivating critical thinking."
              className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          </div>
        </div>
      </div>

      <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Logo upload and brand color customization coming in a future update
        </p>
      </div>
    </div>
  );
};

const IntegrationsSettings = () => {
  const integrations = [
    { name: "Stripe", description: "Process book sales and payments", status: "Not connected", actionLabel: "Connect" },
    { name: "Email Provider", description: "Send newsletters and notifications", status: "Not connected", actionLabel: "Configure" },
    { name: "Analytics", description: "Track website traffic and conversions", status: "Not connected", actionLabel: "Configure" },
    { name: "Video Hosting", description: "Manage VSL and training videos", status: "Not connected", actionLabel: "Configure" },
  ];

  return (
    <div className="max-w-xl space-y-3">
      {integrations.map((int) => (
        <div key={int.name} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{int.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{int.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{int.status}</span>
            <button className="px-3 py-1.5 border border-border text-xs text-foreground rounded hover:bg-muted transition-colors">
              {int.actionLabel}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const UserRolesSettings = () => {
  const queryClient = useQueryClient();

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["admin-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as UserRole[];
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("user_roles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-roles"] });
      toast({ title: "Role removed" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const getProfileName = (userId: string) => {
    const profile = profiles.find((p) => p.id === userId);
    return profile?.full_name || userId.slice(0, 8) + "...";
  };

  return (
    <div className="max-w-xl">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Shield size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Roles</span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div>
        ) : roles.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No roles assigned</div>
        ) : (
          <div>
            {roles.map((r) => (
              <div key={r.id} className="px-4 py-3 flex items-center justify-between border-b border-border last:border-0">
                <div>
                  <p className="text-sm text-foreground">{getProfileName(r.user_id)}</p>
                  <p className="text-xs text-muted-foreground">{r.user_id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-primary/10 text-primary">
                    {r.role.replace("_", " ")}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm("Remove this role?")) deleteMutation.mutate(r.id);
                    }}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 bg-muted/30 border border-border rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Adding new users and role assignment will be available in a future update
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
