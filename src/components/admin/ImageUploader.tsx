import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage } from "@/lib/upload";
import { toast } from "sonner";

export function ImageUploader({
  value,
  onChange,
  folder,
}: {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > 5_000_000) {
      toast.error("Image must be under 5MB");
      return;
    }
    setBusy(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {value ? (
        <div className="relative">
          <img src={value} alt="" className="h-20 w-20 rounded-lg object-cover border border-white/10" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-destructive text-white"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div className="grid h-20 w-20 place-items-center rounded-lg border border-dashed border-white/20 bg-white/5 text-muted-foreground">
          <ImagePlus size={20} />
        </div>
      )}
      <label className="glass cursor-pointer rounded-lg px-4 py-2 text-sm hover:border-accent">
        {busy ? <Loader2 className="inline animate-spin" size={14} /> : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </label>
    </div>
  );
}
