import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Save, Shield, Palette, Link2, Users, Trash2, BookOpen } from "lucide-react";
import ChapterSettings from "@/components/admin/ChapterSettings";
import type { Tables } from "@/integrations/supabase/types";
import type { TrackingPixels } from "@/hooks/useTrackingScripts";

type UserRole = Tables<"user_roles">;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("chapter");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const tabs = [
    { key: "chapter", label: "Chapter", icon: BookOpen },
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

      {activeTab === "chapter" && <ChapterSettings />}
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
  const queryClient = useQueryClient();
  const [form, setForm] = useState<TrackingPixels>({});

  const { isLoading } = useQuery({
    queryKey: ["tracking-pixels"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "tracking_pixels")
        .maybeSingle();
      const pixels = (data?.value as TrackingPixels) || {};
      setForm(pixels);
      return pixels;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (pixels: TrackingPixels) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "tracking_pixels", value: pixels as never }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracking-pixels"] });
      toast({ title: "Tracking pixels saved" });
    },
    onError: (err: Error) => {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    },
  });

  const fields: { key: keyof TrackingPixels; label: string; placeholder: string }[] = [
    { key: "facebook_pixel_id", label: "Facebook Pixel ID", placeholder: "e.g. 1234567890123456" },
    { key: "google_analytics_id", label: "Google Analytics (GA4) ID", placeholder: "e.g. G-XXXXXXXXXX" },
    { key: "google_tag_manager_id", label: "Google Tag Manager ID", placeholder: "e.g. GTM-XXXXXXX" },
    { key: "tiktok_pixel_id", label: "TikTok Pixel ID", placeholder: "e.g. CXXXXXXXXXXXXXXX" },
  ];

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-xl space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Tracking Pixels
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          Add your pixel IDs below. Leave blank to disable. Scripts are injected automatically when a value is saved.
        </p>
        <div className="space-y-4">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                {label}
              </label>
              <input
                type="text"
                value={form[key] || ""}
                placeholder={placeholder}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => saveMutation.mutate(form)}
          disabled={saveMutation.isPending}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save size={13} />
          {saveMutation.isPending ? "Saving..." : "Save Pixels"}
        </button>
      </div>
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
