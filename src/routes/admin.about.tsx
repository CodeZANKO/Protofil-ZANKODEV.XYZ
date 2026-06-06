import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { useContent, useSaveContent } from "@/lib/cms";
import { PageShell, FieldRow, inputCls } from "@/components/admin/PageShell";

export const Route = createFileRoute("/admin/about")({ component: AboutAdmin });

interface Stat { label: string; value: string }
interface AboutData {
  heading: string;
  subtitle: string;
  body: string;
  stats: Stat[];
}

const fallback: AboutData = {
  heading: "Building the future, one line of code",
  subtitle: "Developer obsessed with technology, AI, and craft.",
  body: "I'm Zanko — an AI engineer and full-stack developer focused on shipping production-grade intelligent systems.",
  stats: [
    { label: "Projects", value: "50+" },
    { label: "Years", value: "5+" },
    { label: "Clients", value: "30+" },
  ],
};

function AboutAdmin() {
  const { data, isLoading } = useContent<AboutData>("about", fallback);
  const save = useSaveContent("about");
  const [form, setForm] = useState<AboutData>(fallback);

  useEffect(() => { if (data) setForm({ ...fallback, ...data, stats: data.stats ?? fallback.stats }); }, [data]);

  const updateStat = (i: number, patch: Partial<Stat>) =>
    setForm((f) => ({ ...f, stats: f.stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) }));
  const addStat = () => setForm((f) => ({ ...f, stats: [...f.stats, { label: "New", value: "0" }] }));
  const rmStat = (i: number) => setForm((f) => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }));

  return (
    <PageShell title="About section" description="Tell visitors who you are.">
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(form as unknown as Record<string, unknown>); }}
        className="glass space-y-5 rounded-2xl p-6">
        {isLoading ? <Loader2 className="animate-spin" /> : <>
          <FieldRow label="Heading">
            <input className={inputCls} value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
          </FieldRow>
          <FieldRow label="Subtitle">
            <input className={inputCls} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          </FieldRow>
          <FieldRow label="Body">
            <textarea rows={5} className={inputCls} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </FieldRow>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Quick stats</span>
              <button type="button" onClick={addStat} className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {form.stats.map((s, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <input className={inputCls} placeholder="Label" value={s.label} onChange={(e) => updateStat(i, { label: e.target.value })} />
                  <input className={inputCls} placeholder="Value" value={s.value} onChange={(e) => updateStat(i, { value: e.target.value })} />
                  <button type="button" onClick={() => rmStat(i)} className="rounded-lg border border-white/10 px-3 text-destructive hover:bg-destructive/10">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
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
