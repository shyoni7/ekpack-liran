"use client";

import { useState, useTransition } from "react";
import { updateService, deleteService } from "@/app/admin/services/actions";
import MediaUpload from "@/components/admin/MediaUpload";
import type { Service } from "@/types";

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-brand-green focus:outline-none";

export default function ServiceEditor({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(service.cover_image);
  const [localVideo, setLocalVideo] = useState<string | null>(service.local_video);

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      await updateService(service.id, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold text-foreground">{service.title}</span>
          {!service.is_published && (
            <span className="mr-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
              מוסתר
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-brand-green"
        >
          {open ? "סגור" : "עריכה"}
        </button>
      </div>

      {open && (
        <form action={onSubmit} className="mt-4 space-y-3">
          <input type="hidden" name="slug" value={service.slug} />
          <input type="hidden" name="cover_image" value={coverImage ?? ""} />
          <input type="hidden" name="local_video" value={localVideo ?? ""} />

          {/* מדיה */}
          <div className="grid gap-4 sm:grid-cols-2">
            <MediaUpload
              label="תמונת שער"
              folder="services"
              kind="image"
              value={coverImage}
              onChange={setCoverImage}
            />
            <MediaUpload
              label="סרטון מקומי (אופציונלי)"
              folder="services"
              kind="video"
              value={localVideo}
              onChange={setLocalVideo}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">שם השירות</label>
            <input name="title" defaultValue={service.title} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">תיאור קצר</label>
            <input
              name="short_description"
              defaultValue={service.short_description ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">תיאור מלא</label>
            <textarea
              name="full_description"
              defaultValue={service.full_description ?? ""}
              rows={4}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              יתרונות (שורה לכל יתרון)
            </label>
            <textarea
              name="benefits"
              defaultValue={service.benefits?.join("\n") ?? ""}
              rows={3}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={service.is_published}
              className="accent-brand-green"
            />
            מפורסם באתר
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {pending ? "שומר..." : "שמירה"}
            </button>
            {saved && <span className="text-sm text-brand-green">✓ נשמר</span>}
            <button
              type="button"
              onClick={() => {
                if (confirm(`למחוק את "${service.title}"?`)) {
                  startTransition(() => deleteService(service.id));
                }
              }}
              className="mr-auto text-sm text-red-600 hover:underline"
            >
              מחיקה
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
