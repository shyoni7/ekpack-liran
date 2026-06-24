"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const supabase = createAdminClient();
  await supabase.from("site_settings").upsert({
    id: 1,
    phone: String(formData.get("phone") ?? "") || null,
    whatsapp: String(formData.get("whatsapp") ?? "") || null,
    address: String(formData.get("address") ?? "") || null,
    opening_hours: { text: String(formData.get("opening_hours") ?? "") },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
