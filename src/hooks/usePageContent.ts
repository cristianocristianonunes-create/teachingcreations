import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type ContentBlock = {
  section_key: string;
  content: { value: string };
};

export function usePageContent(page: string) {
  const { data: blocks = [] } = useQuery({
    queryKey: ["page-content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("section_key, content")
        .eq("page", page);
      if (error) throw error;
      return data as ContentBlock[];
    },
    staleTime: 1000 * 60 * 5, // cache 5 min
  });

  const get = (key: string, fallback = ""): string => {
    const block = blocks.find((b) => b.section_key === key);
    return block?.content?.value || fallback;
  };

  return { get };
}
