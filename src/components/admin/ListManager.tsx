import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, Eye, EyeOff, Pencil, X } from "lucide-react";
import { useList, useUpsertItem, useDeleteItem, type ListTable } from "@/lib/cms";
import { PageShell, FieldRow, inputCls } from "./PageShell";
import { ImageUploader } from "./ImageUploader";
import { toast } from "sonner";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "image" | "url" | "csv";
  placeholder?: string;
};

type Item = { id?: string; visible?: boolean; display_order?: number } & Record<string, unknown>;

export function ListManager({
  table,
  title,
  description,
  fields,
  imageFolder,
}: {
  table: ListTable;
  title: string;
  description?: string;
  fields: FieldDef[];
  imageFolder?: string;
}) {
  const { data, isLoading } = useList<Item>(table);
  const upsert = useUpsertItem(table);
  const del = useDeleteItem(table);
  const [editing, setEditing] = useState<Item | null>(null);

  const startNew = () =>
    setEditing({ visible: true, display_order: (data?.length ?? 0) });

  return (
    <PageShell
      title={title}
      description={description}
      actions={
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] transition hover:scale-[1.02]"
        >
          <Plus size={14} /> Add new
        </button>
      }
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((item) => (
            <div key={item.id} className="glass flex items-center justify-between gap-4 rounded-xl p-4">
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">
                  {(item[fields[0].key] as string) || "Untitled"}
                </div>
                {fields[1] && (
                  <div className="truncate text-xs text-muted-foreground">
                    {String(item[fields[1].key] ?? "")}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => upsert.mutate({ ...item, visible: !item.visible })}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:border-accent"
                  title={item.visible ? "Hide" : "Show"}
                >
                  {item.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => setEditing(item)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:border-accent"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this item?")) del.mutate(item.id!);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:border-destructive hover:text-destructive"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {(data?.length ?? 0) === 0 && (
            <div className="glass rounded-xl p-8 text-center text-sm text-muted-foreground">
              No items yet — click "Add new" to create one.
            </div>
          )}
        </div>
      )}

      {editing && (
        <ItemEditor
          fields={fields}
          item={editing}
          imageFolder={imageFolder}
          onClose={() => setEditing(null)}
          onSave={async (payload) => {
            await upsert.mutateAsync(payload);
            setEditing(null);
          }}
          saving={upsert.isPending}
        />
      )}
    </PageShell>
  );
}

function ItemEditor({
  fields,
  item,
  onClose,
  onSave,
  saving,
  imageFolder,
}: {
  fields: FieldDef[];
  item: Item;
  onClose: () => void;
  onSave: (payload: Item) => Promise<void> | void;
  saving: boolean;
  imageFolder?: string;
}) {
  const [form, setForm] = useState<Item>(item);
  useEffect(() => setForm(item), [item]);

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload: Item = { ...form };
          for (const f of fields) {
            if (f.type === "number") payload[f.key] = Number(payload[f.key] ?? 0);
            if (f.type === "csv" && typeof payload[f.key] === "string") {
              payload[f.key] = (payload[f.key] as string)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
            }
          }
          if (!payload.id) delete payload.id;
          Promise.resolve(onSave(payload)).catch((e: unknown) => toast.error((e as Error).message));
        }}
        className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            {item.id ? "Edit item" : "New item"}
          </h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((f) => {
            const val = form[f.key];
            if (f.type === "image") {
              return (
                <FieldRow key={f.key} label={f.label}>
                  <ImageUploader
                    value={(val as string) ?? ""}
                    onChange={(url) => set(f.key, url)}
                    folder={imageFolder}
                  />
                </FieldRow>
              );
            }
            if (f.type === "textarea") {
              return (
                <FieldRow key={f.key} label={f.label}>
                  <textarea
                    rows={3}
                    className={inputCls}
                    placeholder={f.placeholder}
                    value={(val as string) ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                  />
                </FieldRow>
              );
            }
            const displayVal = Array.isArray(val) ? val.join(", ") : (val ?? "");
            return (
              <FieldRow key={f.key} label={f.label}>
                <input
                  type={f.type === "number" ? "number" : "text"}
                  className={inputCls}
                  placeholder={f.placeholder}
                  value={displayVal as string | number}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              </FieldRow>
            );
          })}
          <FieldRow label="Display order">
            <input
              type="number"
              className={inputCls}
              value={(form.display_order as number) ?? 0}
              onChange={(e) => set("display_order", Number(e.target.value))}
            />
          </FieldRow>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.visible !== false}
              onChange={(e) => set("visible", e.target.checked)}
            />
            Visible on site
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-5 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] hover:scale-[1.02] disabled:opacity-60"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
