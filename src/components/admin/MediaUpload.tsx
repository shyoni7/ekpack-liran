"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder: string; // תיקייה ב-bucket, למשל "services" / "gallery" / "site"
  kind?: "image" | "video";
  label?: string;
}

// העלאה ישירה מהדפדפן ל-Supabase Storage (bucket "media") — משתמש בסשן המנהל המחובר.
export default function MediaUpload({
  value,
  onChange,
  folder,
  kind = "image",
  label,
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch {
      setError("ההעלאה נכשלה. ודאו שהרצתם את storage-policies.sql ושאתם מחוברים.");
    } finally {
      setUploading(false);
      e.target.value = ""; // לאפשר העלאת אותו קובץ שוב
    }
  }

  const accept = kind === "video" ? "video/*" : "image/*";

  return (
    <div>
      {label && <label className="mb-1 block text-xs font-medium">{label}</label>}

      {value ? (
        <div className="relative inline-block">
          {kind === "video" ? (
            <video src={value} className="h-32 rounded-lg border border-border" controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="תצוגה מקדימה" className="h-32 rounded-lg border border-border object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="הסרה"
            className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-muted hover:border-brand-green hover:text-brand-green">
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-xs">מעלה...</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-xs">
                {kind === "video" ? "העלאת סרטון" : "העלאת תמונה"}
              </span>
            </>
          )}
          <input type="file" accept={accept} className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
