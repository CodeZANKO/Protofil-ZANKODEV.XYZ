import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ---------- Singleton site_content ---------- */

export type ContentKey = "hero" | "about" | "contact" | "seo" | "appearance";

export function useContent<T = Record<string, unknown>>(key: ContentKey, fallback: T) {
  return useQuery({
    queryKey: ["site_content", key],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_content")
        .select("data")
        .eq("key", key)
        .maybeSingle();
      return ((data?.data as T) ?? fallback) as T;
    },
  });
}

export function useSaveContent(key: ContentKey) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { error } = await supabase
        .from("site_content")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .upsert({ key, data: data as any, updated_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content", key] });
      toast.success("Saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

/* ---------- Generic list CRUD ---------- */

export type ListTable = "skills" | "projects" | "services" | "tools" | "social_links";

export function useList<T>(table: ListTable) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export function useUpsertItem(table: ListTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Record<string, unknown>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await supabase.from(table).upsert(item as any);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success("Saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteItem(table: ListTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
