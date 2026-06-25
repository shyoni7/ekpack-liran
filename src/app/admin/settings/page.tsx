import { createAdminClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";
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

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  const hours =
    (settings?.opening_hours as { text?: string } | null)?.text ?? "";

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-foreground">הגדרות האתר</h1>
      <SettingsForm settings={settings} hoursText={hours} />
    </div>
  );
}
