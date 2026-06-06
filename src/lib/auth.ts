import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSession() {
  const qc = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      qc.invalidateQueries({ queryKey: ["session"] });
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
    });
    return () => subscription.unsubscribe();
  }, [qc]);

  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
    staleTime: 60_000,
  });
}

export function useIsAdmin() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["isAdmin", session?.user?.id],
    enabled: !!session?.user,
    queryFn: async () => {
      if (!session?.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
