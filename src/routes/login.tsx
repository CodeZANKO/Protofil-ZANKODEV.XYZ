import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Admin Login — Zanko" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) window.location.replace("/admin");
  }, [session]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back");
      window.location.href = "/admin";
    } catch (err) {
      toast.error((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--gradient-radial)" }}
      />

      <Link
        to="/"
        className="glass absolute left-6 top-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to site
      </Link>

      <div className="glass-strong w-full max-w-md rounded-2xl p-8 shadow-[var(--shadow-elegant)] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-purple)] animate-pulse-glow">
            <Lock className="text-white" size={22} />
          </div>
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:shadow-[var(--shadow-glow-cyan)]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:shadow-[var(--shadow-glow-cyan)]"
                placeholder="At least 8 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-medium text-white shadow-[var(--shadow-glow-purple)] transition hover:scale-[1.02] disabled:opacity-60"
          >
            {busy ? <Loader2 className="animate-spin" size={16} /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
