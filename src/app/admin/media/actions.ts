"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";

// מייצר signed upload URL להעלאה ישירה מהדפדפן ל-Storage.
// השרת מאמת שהמשתמש מחובר (דרך ה-cookie) ואז מייצר את האישור עם service role.
export async function createUploadUrl(
  folder: string,
  ext: string
): Promise<{ path: string; token: string } | { error: string }> {
  // אימות שהמבקש הוא מנהל מחובר
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "עליך להתחבר מחדש" };
  } catch {
    return { error: "אימות נכשל" };
  }

  const safeExt = (ext || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${folder}/${crypto.randomUUID()}.${safeExt}`;

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("media")
    .createSignedUploadUrl(path);

  if (error || !data) return { error: "יצירת אישור ההעלאה נכשלה" };
  return { path: data.path, token: data.token };
}
