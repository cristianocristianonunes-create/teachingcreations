import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const BookEditor = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [amazonUrl, setAmazonUrl] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [stripePriceId, setStripePriceId] = useState("");
  const [formatType, setFormatType] = useState("print");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: book, isLoading } = useQuery({
    queryKey: ["admin-book", id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase.from("books").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setDescription(book.description || "");
      setCoverImage(book.cover_image || "");
      setAmazonUrl(book.amazon_url || "");
      setExternalUrl(book.external_url || "");
      setStripePriceId(book.stripe_price_id || "");
      setFormatType(book.format_type || "print");
      setPublished(book.published);
    }
  }, [book]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        cover_image: coverImage.trim() || null,
        amazon_url: amazonUrl.trim() || null,
        external_url: externalUrl.trim() || null,
        stripe_price_id: stripePriceId.trim() || null,
        format_type: formatType,
        published,
      };

      if (isNew) {
        const { error } = await supabase.from("books").insert({ ...payload, created_by: user?.id || null });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("books").update(payload).eq("id", id!);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast({ title: isNew ? "Book added" : "Book updated" });
      navigate("/admin/books");
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
    setSaving(true);
    await saveMutation.mutateAsync();
    setSaving(false);
  };

  if (!isNew && isLoading) {
    return <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/books")} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-serif text-foreground">{isNew ? "Add Book" : "Edit Book"}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Book title" />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y" placeholder="Book description" />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Cover Image URL</label>
          <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://..." />
          {coverImage && <img src={coverImage} alt="Preview" className="mt-2 w-24 h-32 object-cover rounded border border-border" />}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Format</label>
            <select value={formatType} onChange={(e) => setFormatType(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="print">Print</option>
              <option value="digital">Digital</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-border" />
              <span className="text-sm text-foreground">Published</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Amazon URL</label>
          <input type="url" value={amazonUrl} onChange={(e) => setAmazonUrl(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://amazon.com/..." />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">External URL</label>
          <input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Stripe Price ID</label>
          <input type="text" value={stripePriceId} onChange={(e) => setStripePriceId(e.target.value)} className="w-full px-3 py-2.5 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="price_..." />
        </div>
      </div>
    </div>
  );
};

export default BookEditor;
