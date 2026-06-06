import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSession, useIsAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Zanko" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { data: session, isLoading: sLoading, isFetched: sFetched } = useSession();
  const { data: isAdmin, isLoading: rLoading, isFetched: rFetched } = useIsAdmin();

  // Client-side guard: the Supabase session is restored from localStorage,
  // so we can only check auth in the browser. SSR renders the loader.
  useEffect(() => {
    if (sFetched && !session) {
      navigate({ to: "/login" });
      return;
    }
    if (sFetched && session && rFetched && !isAdmin) {
      navigate({ to: "/" });
    }
  }, [sFetched, session, rFetched, isAdmin, navigate]);

  if (sLoading || !session || rLoading || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="animate-spin text-accent" size={28} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 px-4 py-6 pl-4 lg:px-10 lg:py-10 lg:pl-10">
        <Outlet />
      </main>
    </div>
  );
}
