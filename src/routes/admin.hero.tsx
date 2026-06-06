import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useContent, useSaveContent } from "@/lib/cms";
import { PageShell, FieldRow, inputCls } from "@/components/admin/PageShell";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const Route = createFileRoute("/admin/hero")({ component: HeroAdmin });

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  avatarUrl: string;
  badge?: string;
}

const fallback: HeroData = {
  name: "Zanko",
  title: "AI Engineer & Full-Stack Developer",
  tagline: "Building intelligent systems that ship.",
  ctaPrimary: "View Projects",
  ctaSecondary: "Contact Me",
  avatarUrl: "",
  badge: "Available for new projects",
};

function HeroAdmin() {
  const { data, isLoading } = useContent<HeroData>("hero", fallback);
  const save = useSaveContent("hero");
  const [form, setForm] = useState<HeroData>(fallback);

  useEffect(() => {
    if (data) setForm({ ...fallback, ...data });
  }, [data]);

  const set = <K extends keyof HeroData>(k: K, v: HeroData[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <PageShell title="Hero section" description="The first thing visitors see.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate(form as unknown as Record<string, unknown>);
        }}
        className="glass space-y-5 rounded-2xl p-6"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <FieldRow label="Name">
                <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </FieldRow>
              <FieldRow label="Badge text">
                <input className={inputCls} value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value)} />
              </FieldRow>
            </div>
            <FieldRow label="Title / role">
              <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} />
            </FieldRow>
            <FieldRow label="Tagline">
              <textarea
                rows={3}
                className={inputCls}
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
            </FieldRow>
            <div className="grid gap-5 md:grid-cols-2">
              <FieldRow label="Primary CTA label">
                <input className={inputCls} value={form.ctaPrimary} onChange={(e) => set("ctaPrimary", e.target.value)} />
              </FieldRow>
              <FieldRow label="Secondary CTA label">
                <input className={inputCls} value={form.ctaSecondary} onChange={(e) => set("ctaSecondary", e.target.value)} />
              </FieldRow>
            </div>
            <FieldRow label="Avatar image">
              <ImageUploader value={form.avatarUrl} onChange={(url) => set("avatarUrl", url)} folder="hero" />
            </FieldRow>
          </>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] transition hover:scale-[1.02] disabled:opacity-60"
          >
            {save.isPending ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            Save changes
          </button>
        </div>
      </form>
    </PageShell>
  );
}
