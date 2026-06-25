"use client";

import { useState, useTransition } from "react";
import { updateSettings } from "@/app/admin/settings/actions";
import MediaUpload from "@/components/admin/MediaUpload";
import type { SiteSettings } from "@/types";

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-brand-green focus:outline-none";

export default function SettingsForm({
  settings,
  hoursText,
}: {
  settings: SiteSettings | null;
  hoursText: string;
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [logo, setLogo] = useState<string | null>(settings?.logo ?? null);
  const [heroVideo, setHeroVideo] = useState<string | null>(settings?.hero_video ?? null);
  const [heroPoster, setHeroPoster] = useState<string | null>(settings?.hero_poster ?? null);

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      await updateSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <form
      action={onSubmit}
      className="max-w-lg space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <input type="hidden" name="logo" value={logo ?? ""} />
      <input type="hidden" name="hero_video" value={heroVideo ?? ""} />
      <input type="hidden" name="hero_poster" value={heroPoster ?? ""} />

      {/* מדיה */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MediaUpload label="לוגו" folder="site" kind="image" value={logo} onChange={setLogo} />
        <MediaUpload label="סרטון Hero" folder="site" kind="video" value={heroVideo} onChange={setHeroVideo} />
        <MediaUpload label="תמונת Poster ל-Hero" folder="site" kind="image" value={heroPoster} onChange={setHeroPoster} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">טלפון</label>
        <input name="phone" defaultValue={settings?.phone ?? ""} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">
          מספר WhatsApp (פורמט 972XXXXXXXXX)
        </label>
        <input name="whatsapp" defaultValue={settings?.whatsapp ?? ""} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">כתובת</label>
        <input name="address" defaultValue={settings?.address ?? ""} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">שעות פעילות</label>
        <textarea
          name="opening_hours"
          defaultValue={hoursText}
          rows={3}
          placeholder="לדוגמה: א'-ה' 08:00-18:00, ו' 08:00-13:00"
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-green px-6 py-2.5 font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
        >
          {pending ? "שומר..." : "שמירת הגדרות"}
        </button>
        {saved && <span className="text-sm text-brand-green">✓ נשמר</span>}
      </div>
    </form>
  );
}
