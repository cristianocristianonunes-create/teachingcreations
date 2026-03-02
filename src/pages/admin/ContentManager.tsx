import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Save, FileText, ChevronDown } from "lucide-react";

type ContentBlock = {
  id: string;
  page: string;
  section_key: string;
  content: Record<string, string>;
  updated_at: string;
};

const pages = [
  {
    name: "Home",
    slug: "home",
    sections: [
      { key: "hero_headline", label: "Hero Headline", type: "text" },
      { key: "hero_subheadline", label: "Hero Subheadline", type: "text" },
      { key: "vsl_url", label: "VSL Video URL", type: "text" },
      { key: "problem_title", label: "Problem Section Title", type: "text" },
      { key: "problem_body", label: "Problem Section Body", type: "textarea" },
      { key: "origin_story", label: "Origin Story Content", type: "textarea" },
      { key: "experience_foundation", label: "Experience Foundation Content", type: "textarea" },
      { key: "moments_of_clarity", label: "Moments of Clarity Content", type: "textarea" },
      { key: "model_title", label: "Framework Section Title", type: "text" },
      { key: "model_body", label: "Framework Section Body", type: "textarea" },
      { key: "future_vision", label: "Future Vision Content", type: "textarea" },
      { key: "closing_statement", label: "Closing Statement", type: "textarea" },
      { key: "testimonials_placeholder", label: "Testimonials (placeholder)", type: "textarea" },
      { key: "institutional_logos", label: "Institutional Logos (placeholder)", type: "textarea" },
      { key: "classroom_stories", label: "Classroom Stories (placeholder)", type: "textarea" },
      { key: "impact_metrics", label: "Impact Metrics (placeholder)", type: "textarea" },
      { key: "speaking_engagements", label: "Speaking Engagements (placeholder)", type: "textarea" },
    ],
  },
  {
    name: "Cycle of Thinking™",
    slug: "cycle-of-thinking",
    sections: [
      { key: "headline", label: "Page Headline", type: "text" },
      { key: "intro", label: "Introduction", type: "textarea" },
      { key: "framework_description", label: "Framework Description", type: "textarea" },
    ],
  },
  {
    name: "About Erika",
    slug: "about",
    sections: [
      { key: "headline", label: "Page Headline", type: "text" },
      { key: "bio_short", label: "Short Bio", type: "textarea" },
      { key: "bio_long", label: "Full Bio", type: "textarea" },
    ],
  },
  {
    name: "Contact",
    slug: "contact",
    sections: [
      { key: "headline", label: "Page Headline", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
  },
];

const ContentManager = () => {
  const [expandedPage, setExpandedPage] = useState<string | null>("home");
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [savingPage, setSavingPage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: blocks = [], isLoading } = useQuery({
    queryKey: ["admin-content-blocks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("content_blocks").select("*");
      if (error) throw error;
      return data as ContentBlock[];
    },
  });

  const getBlockValue = (page: string, sectionKey: string) => {
    const editKey = `${page}:${sectionKey}`;
    if (edits[editKey] !== undefined) return edits[editKey];
    const block = blocks.find((b) => b.page === page && b.section_key === sectionKey);
    return block?.content?.value || "";
  };

  const setFieldValue = (page: string, sectionKey: string, value: string) => {
    setEdits((prev) => ({ ...prev, [`${page}:${sectionKey}`]: value }));
  };

  const saveMutation = useMutation({
    mutationFn: async (pageSlug: string) => {
      const pageDef = pages.find((p) => p.slug === pageSlug);
      if (!pageDef) return;

      for (const section of pageDef.sections) {
        const editKey = `${pageSlug}:${section.key}`;
        if (edits[editKey] === undefined) continue;

        const existing = blocks.find((b) => b.page === pageSlug && b.section_key === section.key);
        const payload = {
          page: pageSlug,
          section_key: section.key,
          content: { value: edits[editKey] },
          updated_by: user?.id || null,
        };

        if (existing) {
          const { error } = await supabase.from("content_blocks").update(payload).eq("id", existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("content_blocks").insert(payload);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content-blocks"] });
      toast({ title: "Content saved" });
      setEdits({});
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSave = async (pageSlug: string) => {
    setSavingPage(pageSlug);
    await saveMutation.mutateAsync(pageSlug);
    setSavingPage(null);
  };

  const hasPageEdits = (pageSlug: string) =>
    Object.keys(edits).some((k) => k.startsWith(`${pageSlug}:`));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-foreground">Content</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Edit website sections and page content
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-2">
          {pages.map((page) => (
            <div key={page.slug} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedPage(expandedPage === page.slug ? null : page.slug)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{page.name}</span>
                  <span className="text-xs text-muted-foreground">{page.sections.length} sections</span>
                  {hasPageEdits(page.slug) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${expandedPage === page.slug ? "rotate-180" : ""}`}
                />
              </button>

              {expandedPage === page.slug && (
                <div className="px-4 pb-4 border-t border-border pt-4 space-y-4">
                  {page.sections.map((section) => (
                    <div key={section.key}>
                      <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                        {section.label}
                      </label>
                      {section.type === "textarea" ? (
                        <textarea
                          value={getBlockValue(page.slug, section.key)}
                          onChange={(e) => setFieldValue(page.slug, section.key, e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y leading-relaxed"
                        />
                      ) : (
                        <input
                          type="text"
                          value={getBlockValue(page.slug, section.key)}
                          onChange={(e) => setFieldValue(page.slug, section.key, e.target.value)}
                          className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave(page.slug)}
                      disabled={!hasPageEdits(page.slug) || savingPage === page.slug}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Save size={14} />
                      {savingPage === page.slug ? "Saving..." : "Save Page"}
                    </button>
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

export default ContentManager;
