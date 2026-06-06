import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useContent, useSaveContent } from "@/lib/cms";
import { PageShell, FieldRow, inputCls } from "@/components/admin/PageShell";

export const Route = createFileRoute("/admin/contact")({ component: ContactAdmin });

interface ContactData {
  email: string;
  phone: string;
  telegram: string;
  location: string;
}
const fallback: ContactData = { email: "hello@zanko.dev", phone: "", telegram: "", location: "Remote" };

function ContactAdmin() {
  const { data, isLoading } = useContent<ContactData>("contact", fallback);
  const save = useSaveContent("contact");
  const [form, setForm] = useState<ContactData>(fallback);
  useEffect(() => { if (data) setForm({ ...fallback, ...data }); }, [data]);

  return (
    <PageShell title="Contact info" description="How visitors can reach you.">
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(form as unknown as Record<string, unknown>); }}
        className="glass space-y-5 rounded-2xl p-6">
        {isLoading ? <Loader2 className="animate-spin" /> : <>
          <FieldRow label="Email"><input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></FieldRow>
          <FieldRow label="Phone"><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></FieldRow>
          <FieldRow label="Telegram handle"><input className={inputCls} value={form.telegram} onChange={(e) => setForm({ ...form, telegram: e.target.value })} placeholder="@username" /></FieldRow>
          <FieldRow label="Location"><input className={inputCls} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></FieldRow>
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
