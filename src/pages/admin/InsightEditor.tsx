import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye } from "lucide-react";

const categories = [
  "Curriculum & Instruction",
  "Leadership",
  "Critical Thinking",
  "Assessment",
  "Professional Development",
  "Equity & Access",
  "Other",
];

const InsightEditor = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [publishDate, setPublishDate] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch existing insight
  const { data: insight, isLoading } = useQuery({
    queryKey: ["admin-insight", id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (insight) {
      setTitle(insight.title);
      setSubtitle(insight.subtitle || "");
      setSlug(insight.slug);
      setContent(insight.content || "");
      setCategory(insight.category || "");
      setTags(insight.tags?.join(", ") || "");
      setCoverImage(insight.cover_image || "");
      setStatus(insight.status);
      setPublishDate(
        insight.publish_date
          ? new Date(insight.publish_date).toISOString().slice(0, 16)
          : ""
      );
    }
  }, [insight]);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 80)
      );
    }
  }, [title, isNew]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        slug: slug.trim(),
        content: content.trim() || null,
        category: category || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        cover_image: coverImage.trim() || null,
        status,
        publish_date: publishDate ? new Date(publishDate).toISOString() : null,
        updated_by: user?.id || null,
      };

      if (isNew) {
        const { error } = await supabase
          .from("insights")
          .insert({ ...payload, created_by: user?.id || null });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("insights")
          .update(payload)
          .eq("id", id!);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-insights"] });
      toast({ title: isNew ? "Insight created" : "Insight updated" });
      navigate("/admin/insights");
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSave = async () => {
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (!slug.trim()) {
      toast({ title: "Slug is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    await saveMutation.mutateAsync();
    setSaving(false);
  };

  if (!isNew && isLoading) {
    return <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/insights")}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-foreground">
              {isNew ? "New Insight" : "Edit Insight"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <a
              href={`/insights/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded hover:bg-muted transition-colors"
            >
              <Eye size={14} />
              Preview
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter insight title"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Optional subtitle"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Slug *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
            placeholder="insight-url-slug"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y leading-relaxed"
            placeholder="Write your insight content here..."
          />
        </div>

        {/* Category & Tags row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="tag1, tag2, tag3"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
            Cover Image URL
          </label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        {/* Status & Publish date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Publish Date
            </label>
            <input
              type="datetime-local"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightEditor;
