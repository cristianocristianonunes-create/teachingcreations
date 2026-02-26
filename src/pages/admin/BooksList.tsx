import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Book = Tables<"books">;

const BooksList = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin-books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Book[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast({ title: "Book deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const filtered = books.filter(
    (b) =>
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.format_type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Books</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage publications and purchase links</p>
        </div>
        <Link
          to="/admin/books/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Book
        </Link>
      </div>

      <div className="relative max-w-sm mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-3 pr-3 py-2 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-sm">
            {books.length === 0 ? "No books yet. Add your first book." : "No books match your search."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="bg-card border border-border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors"
            >
              {book.cover_image ? (
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded border border-border flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-20 bg-muted rounded border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-muted-foreground">No cover</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-foreground truncate">{book.title}</h3>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                      book.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {book.published ? "Published" : "Draft"}
                  </span>
                </div>
                {book.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{book.description}</p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {book.format_type || "Print"}
                  </span>
                  {book.amazon_url && (
                    <a href={book.amazon_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
                      Amazon <ExternalLink size={10} />
                    </a>
                  )}
                  {book.external_url && (
                    <a href={book.external_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
                      External <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                  to={`/admin/books/${book.id}`}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Delete this book?")) deleteMutation.mutate(book.id);
                  }}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;
