import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useContent, useSaveContent } from "@/lib/cms";
import { PageShell, FieldRow, inputCls } from "@/components/admin/PageShell";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const Route = createFileRoute("/admin/seo")({ component: SeoAdmin });

interface SeoData { title: string; description: string; keywords: string; ogImage: string }
const fallback: SeoData = {
  title: "Zanko — AI Engineer & Full-Stack Developer",
  description: "Premium portfolio of Zanko: AI engineer and full-stack developer.",
  keywords: "AI, ML, full-stack, developer",
  ogImage: "",
};

function SeoAdmin() {
  const { data, isLoading } = useContent<SeoData>("seo", fallback);
  const save = useSaveContent("seo");
  const [form, setForm] = useState<SeoData>(fallback);
  useEffect(() => { if (data) setForm({ ...fallback, ...data }); }, [data]);

  return (
    <PageShell title="SEO settings" description="Meta tags & social preview.">
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(form as unknown as Record<string, unknown>); }}
        className="glass space-y-5 rounded-2xl p-6">
        {isLoading ? <Loader2 className="animate-spin" /> : <>
          <FieldRow label="Page title (≤60 chars)">
            <input className={inputCls} maxLength={60} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </FieldRow>
          <FieldRow label="Meta description (≤160 chars)">
            <textarea rows={3} maxLength={160} className={inputCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </FieldRow>
          <FieldRow label="Keywords (comma separated)">
            <input className={inputCls} value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          </FieldRow>
          <FieldRow label="OpenGraph image (1200×630)">
            <ImageUploader value={form.ogImage} onChange={(url) => setForm({ ...form, ogImage: url })} folder="seo" />
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
