import { createAdminClient } from "@/lib/supabase/server";
import { updateSettings } from "./actions";
import type { SiteSettings } from "@/types";

export const dynamic = "force-dynamic";

async function getSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    return (data as SiteSettings) ?? null;
  } catch {
    return null;
  }
}

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-brand-green focus:outline-none";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  const hours =
    (settings?.opening_hours as { text?: string } | null)?.text ?? "";

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-foreground">הגדרות האתר</h1>
      <form
        action={updateSettings}
        className="max-w-lg space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">טלפון</label>
          <input name="phone" defaultValue={settings?.phone ?? ""} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            מספר WhatsApp (פורמט 972XXXXXXXXX)
          </label>
          <input
            name="whatsapp"
            defaultValue={settings?.whatsapp ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">כתובת</label>
          <input name="address" defaultValue={settings?.address ?? ""} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">שעות פעילות</label>
          <textarea
            name="opening_hours"
            defaultValue={hours}
            rows={3}
            placeholder="לדוגמה: א'-ה' 08:00-18:00, ו' 08:00-13:00"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-green px-6 py-2.5 font-semibold text-white hover:bg-brand-green-dark"
        >
          שמירת הגדרות
        </button>
      </form>
    </div>
  );
}
