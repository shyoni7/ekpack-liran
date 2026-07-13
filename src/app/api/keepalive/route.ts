import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// Keep-alive ל-Supabase: פרויקט חינמי מושהה אחרי 7 ימים בלי בקשות API.
// Vercel Cron קורא לכאן פעם ביום (ראו vercel.json) ומריץ שאילתה קטנה,
// כך שהפרויקט תמיד נחשב פעיל ולא נרדם שוב.
export async function GET(req: Request) {
  // אם מוגדר CRON_SECRET, Vercel שולח אותו אוטומטית — דוחים קריאות זרות.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("site_settings")
      .select("id")
      .eq("id", 1)
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, pinged_at: new Date().toISOString() });
  } catch {
    return NextResponse.json(
      { ok: false, error: "supabase unreachable" },
      { status: 500 }
    );
  }
}
