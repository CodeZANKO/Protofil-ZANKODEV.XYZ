import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useContent, useSaveContent } from "@/lib/cms";
import { PageShell, FieldRow, inputCls } from "@/components/admin/PageShell";

export const Route = createFileRoute("/admin/appearance")({ component: AppearanceAdmin });

interface AppearanceData { theme: "dark" | "light"; accent: string }
const fallback: AppearanceData = { theme: "dark", accent: "neon-blue" };

const accents = ["neon-blue", "neon-purple", "neon-cyan", "neon-pink"];

function AppearanceAdmin() {
  const { data, isLoading } = useContent<AppearanceData>("appearance", fallback);
  const save = useSaveContent("appearance");
  const [form, setForm] = useState<AppearanceData>(fallback);
  useEffect(() => { if (data) setForm({ ...fallback, ...data }); }, [data]);

  return (
    <PageShell title="Appearance" description="Theme & brand accents.">
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(form as unknown as Record<string, unknown>); }}
        className="glass space-y-5 rounded-2xl p-6">
        {isLoading ? <Loader2 className="animate-spin" /> : <>
          <FieldRow label="Theme">
            <div className="flex gap-2">
              {(["dark", "light"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setForm({ ...form, theme: t })}
                  className={`rounded-lg border px-4 py-2 text-sm capitalize transition ${form.theme === t ? "border-accent bg-accent/10 text-accent" : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </FieldRow>
          <FieldRow label="Accent">
            <div className="flex flex-wrap gap-2">
              {accents.map((a) => (
                <button key={a} type="button" onClick={() => setForm({ ...form, accent: a })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${form.accent === a ? "border-accent bg-accent/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                  <span className="h-4 w-4 rounded-full" style={{ background: `var(--${a})` }} />
                  {a}
                </button>
              ))}
            </div>
          </FieldRow>
          <FieldRow label="Custom note">
            <input className={inputCls} placeholder="e.g. holiday theme variant" />
          </FieldRow>
        </>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] disabled:opacity-60">
            {save.isPending ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Save
          </button>
        </div>
      </form>
    </PageShell>
  );
}
