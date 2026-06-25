"use client";

import { useState, useTransition } from "react";
import { Trash2, Eye, EyeOff } from "lucide-react";
import MediaUpload from "@/components/admin/MediaUpload";
import {
  createGalleryItem,
  deleteGalleryItem,
  toggleGalleryPublish,
} from "@/app/admin/gallery/actions";
import type { GalleryItem } from "@/types";

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-brand-green focus:outline-none";

function AddForm({ onDone }: { onDone: () => void }) {
  const [pending, startTransition] = useTransition();
  const [kind, setKind] = useState<"image" | "video">("image");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  function submit() {
    if (!fileUrl) return;
    startTransition(async () => {
      await createGalleryItem({
        type: kind,
        title: title || null,
        category: category || null,
        file_url: fileUrl,
        youtube_url: null,
      });
      onDone();
    });
  }

  return (
    <div className="space-y-3 rounded-xl bg-brand-cream p-4">
      <div className="flex gap-2 text-sm">
        {(["image", "video"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => { setKind(k); setFileUrl(null); }}
            className={`rounded-full px-3 py-1 font-medium ${
              kind === k ? "bg-brand-green text-white" : "bg-white text-muted"
            }`}
          >
            {k === "image" ? "תמונה" : "סרטון"}
          </button>
        ))}
      </div>

      <MediaUpload folder="gallery" kind={kind} value={fileUrl} onChange={setFileUrl} />

      <input
        placeholder="כותרת (אופציונלי)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
      />
      <input
        placeholder="קטגוריה (אופציונלי) — לדוגמה: פעילות, אילוף"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={inputClass}
      />

      <button
        type="button"
        onClick={submit}
        disabled={pending || !fileUrl}
        className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {pending ? "מוסיף..." : "הוספה לגלריה"}
      </button>
    </div>
  );
}

export default function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [adding, setAdding] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <div className="space-y-5">
      {adding ? (
        <AddForm onDone={() => setAdding(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white"
        >
          + הוספת פריט לגלריה
        </button>
      )}

      {items.length === 0 ? (
        <p className="text-muted">הגלריה ריקה. הוסיפו תמונות וסרטונים.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative aspect-square bg-brand-cream">
                {item.type === "video" && item.file_url ? (
                  <video src={item.file_url} className="h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnail ?? item.file_url ?? ""}
                    alt={item.title ?? "פריט גלריה"}
                    className="h-full w-full object-cover"
                  />
                )}
                {!item.is_published && (
                  <span className="absolute right-1 top-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-700">
                    מוסתר
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="truncate text-xs text-muted">
                  {item.category ?? item.title ?? "—"}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label={item.is_published ? "הסתרה" : "הצגה"}
                    onClick={() =>
                      startTransition(() =>
                        toggleGalleryPublish(item.id, !item.is_published)
                      )
                    }
                    className="text-muted hover:text-brand-green"
                  >
                    {item.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    aria-label="מחיקה"
                    onClick={() => {
                      if (confirm("למחוק פריט זה?")) {
                        startTransition(() => deleteGalleryItem(item.id));
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
