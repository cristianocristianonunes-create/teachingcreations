import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Save, BookOpen, Mail, Link2, AlertCircle, CheckCircle2 } from "lucide-react";

type SettingRow = { key: string; value: string };

const KEYS = ["chapter_status", "chapter_pdf_url", "chapter_email_subject", "chapter_email_body"] as const;

const ChapterSettings = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["chapter-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [...KEYS]);
      if (error) throw error;
      const map: Record<string, string> = {};
      (data || []).forEach((row) => {
        map[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value).replace(/^"|"$/g, "");
      });
      return map;
    },
  });

  const [status, setStatus] = useState("draft");
  const [pdfUrl, setPdfUrl] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    if (settings) {
      setStatus(settings.chapter_status || "draft");
      setPdfUrl(settings.chapter_pdf_url || "");
      setEmailSubject(settings.chapter_email_subject || "");
      setEmailBody(settings.chapter_email_body || "");
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const updates = [
        { key: "chapter_status", value: JSON.stringify(status) },
        { key: "chapter_pdf_url", value: JSON.stringify(pdfUrl) },
        { key: "chapter_email_subject", value: JSON.stringify(emailSubject) },
        { key: "chapter_email_body", value: JSON.stringify(emailBody) },
      ];

      for (const u of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: u.value as any })
          .eq("key", u.key);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapter-settings"] });
      toast({ title: "Chapter settings saved" });
    },
    onError: (err: Error) => {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    },
  });

  const isReady = status === "ready";
  const missingForReady = isReady && (!pdfUrl.trim() || !emailSubject.trim() || !emailBody.trim());

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-xl space-y-6">
      {/* Status */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-muted-foreground" />
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Chapter Status</h3>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStatus("draft")}
            className={`flex-1 px-4 py-3 rounded-lg border text-sm transition-colors ${
              status === "draft"
                ? "border-primary bg-primary/10 text-foreground font-medium"
                : "border-border text-muted-foreground hover:border-foreground/20"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle size={14} />
              <span>Draft</span>
            </div>
            <p className="text-[10px] mt-1 opacity-70">Collecting interest only</p>
          </button>
          <button
            onClick={() => setStatus("ready")}
            className={`flex-1 px-4 py-3 rounded-lg border text-sm transition-colors ${
              status === "ready"
                ? "border-primary bg-primary/10 text-foreground font-medium"
                : "border-border text-muted-foreground hover:border-foreground/20"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={14} />
              <span>Ready</span>
            </div>
            <p className="text-[10px] mt-1 opacity-70">Delivers chapter automatically</p>
          </button>
        </div>

        {isReady && (
          <p className="text-xs text-muted-foreground mt-3">
            When set to <span className="font-medium text-foreground">Ready</span>, the form will show "Download Chapter One" and trigger the delivery workflow.
          </p>
        )}
      </div>

      {/* PDF URL */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Link2 size={14} className="text-muted-foreground" />
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Chapter PDF</h3>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            PDF URL
          </label>
          <input
            type="url"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
          />
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Direct link to the Chapter One PDF file. Required when status is "Ready".
          </p>
        </div>
      </div>

      {/* Email Configuration */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Mail size={14} className="text-muted-foreground" />
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Delivery Email</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Email Subject
            </label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Your free chapter is here"
              className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Email Body
            </label>
            <textarea
              rows={5}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Hi {name}, thank you for your interest in The Cycle of Thinking..."
              className="w-full px-3 py-2.5 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y placeholder:text-muted-foreground/50"
            />
            <p className="text-[10px] text-muted-foreground mt-1.5">
              Use <code className="bg-muted px-1 rounded">{"{name}"}</code> to insert the subscriber's name. The PDF link will be appended automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Validation warning */}
      {missingForReady && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-destructive mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Missing configuration</p>
            <p className="text-xs text-muted-foreground mt-1">
              To set status to "Ready", you need to provide the PDF URL, email subject, and email body.
            </p>
          </div>
        </div>
      )}

      {/* Save */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending || missingForReady}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={14} />
        {saveMutation.isPending ? "Saving..." : "Save Chapter Settings"}
      </button>
    </div>
  );
};

export default ChapterSettings;
