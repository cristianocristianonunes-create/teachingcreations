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
      // Hero
      { key: "hero_label", label: "Hero — Label (topo)", type: "text" },
      { key: "hero_headline", label: "Hero — Título principal", type: "text" },
      { key: "hero_subheadline", label: "Hero — Subtítulo", type: "textarea" },
      { key: "hero_cta_button", label: "Hero — Botão CTA", type: "text" },
      { key: "hero_social_proof", label: "Hero — Prova social (link)", type: "text" },
      // Social Proof Strip
      { key: "social_title", label: "Prova Social — Título", type: "text" },
      { key: "social_stat_1", label: "Prova Social — Estatística 1", type: "text" },
      { key: "social_stat_2", label: "Prova Social — Estatística 2", type: "text" },
      { key: "social_stat_3", label: "Prova Social — Estatística 3", type: "text" },
      { key: "social_institutions", label: "Prova Social — Instituições", type: "text" },
      // Problem Section
      { key: "problem_title", label: "Problema — Título", type: "text" },
      { key: "problem_card_1_title", label: "Problema — Card 1 Título", type: "text" },
      { key: "problem_card_1_text", label: "Problema — Card 1 Texto", type: "textarea" },
      { key: "problem_card_2_title", label: "Problema — Card 2 Título", type: "text" },
      { key: "problem_card_2_text", label: "Problema — Card 2 Texto", type: "textarea" },
      { key: "problem_card_3_title", label: "Problema — Card 3 Título", type: "text" },
      { key: "problem_card_3_text", label: "Problema — Card 3 Texto", type: "textarea" },
      // Framework Section
      { key: "model_title", label: "Framework — Título", type: "text" },
      { key: "model_body", label: "Framework — Descrição", type: "textarea" },
      { key: "framework_cycle_text", label: "Framework — Texto do ciclo (abaixo do triângulo)", type: "textarea" },
      { key: "framework_pillar_1_title", label: "Framework — Pilar 1 Título", type: "text" },
      { key: "framework_pillar_1_desc", label: "Framework — Pilar 1 Descrição", type: "textarea" },
      { key: "framework_pillar_2_title", label: "Framework — Pilar 2 Título", type: "text" },
      { key: "framework_pillar_2_desc", label: "Framework — Pilar 2 Descrição", type: "textarea" },
      { key: "framework_pillar_3_title", label: "Framework — Pilar 3 Título", type: "text" },
      { key: "framework_pillar_3_desc", label: "Framework — Pilar 3 Descrição", type: "textarea" },
      // About Section
      { key: "about_title", label: "Sobre Erika — Título", type: "text" },
      { key: "about_name", label: "Sobre Erika — Nome", type: "text" },
      { key: "about_role", label: "Sobre Erika — Cargo/Papel", type: "text" },
      { key: "about_bio", label: "Sobre Erika — Bio", type: "textarea" },
      { key: "about_quote", label: "Sobre Erika — Citação em destaque", type: "textarea" },
      // Book Section
      { key: "book_title", label: "Livro — Título da seção", type: "text" },
      { key: "book_subtitle", label: "Livro — Nome do livro", type: "text" },
      { key: "book_description_1", label: "Livro — Descrição 1", type: "textarea" },
      { key: "book_description_2", label: "Livro — Descrição 2", type: "textarea" },
      { key: "book_cta", label: "Livro — Botão CTA", type: "text" },
      // Testimonials
      { key: "testimonials_title", label: "Depoimentos — Título", type: "text" },
      // PD Section
      { key: "pd_title", label: "PD — Título", type: "text" },
      { key: "pd_description", label: "PD — Descrição", type: "textarea" },
      { key: "pd_outcome_1", label: "PD — Resultado 1", type: "text" },
      { key: "pd_outcome_2", label: "PD — Resultado 2", type: "text" },
      { key: "pd_outcome_3", label: "PD — Resultado 3", type: "text" },
      { key: "pd_disclaimer", label: "PD — Aviso de vagas limitadas", type: "textarea" },
      { key: "pd_cta", label: "PD — Botão CTA", type: "text" },
      // Email Capture
      { key: "email_title", label: "Captura de Email — Título", type: "text" },
      { key: "email_description", label: "Captura de Email — Descrição", type: "textarea" },
      { key: "email_benefit_1", label: "Captura de Email — Benefício 1", type: "text" },
      { key: "email_benefit_2", label: "Captura de Email — Benefício 2", type: "text" },
      { key: "email_benefit_3", label: "Captura de Email — Benefício 3", type: "text" },
      { key: "email_bonus", label: "Captura de Email — Bônus (dourado)", type: "textarea" },
      // FAQ
      { key: "faq_title", label: "FAQ — Título", type: "text" },
      { key: "faq_1_q", label: "FAQ 1 — Pergunta", type: "text" },
      { key: "faq_1_a", label: "FAQ 1 — Resposta", type: "textarea" },
      { key: "faq_2_q", label: "FAQ 2 — Pergunta", type: "text" },
      { key: "faq_2_a", label: "FAQ 2 — Resposta", type: "textarea" },
      { key: "faq_3_q", label: "FAQ 3 — Pergunta", type: "text" },
      { key: "faq_3_a", label: "FAQ 3 — Resposta", type: "textarea" },
      { key: "faq_4_q", label: "FAQ 4 — Pergunta", type: "text" },
      { key: "faq_4_a", label: "FAQ 4 — Resposta", type: "textarea" },
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
