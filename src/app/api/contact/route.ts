import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { createAdminClient } from "@/lib/supabase/server";

// Rate limiting פשוט בזיכרון (לכל instance). מספיק להגנה בסיסית מפני ספאם.
const RATE_LIMIT = 5; // בקשות
const WINDOW_MS = 60_000; // לדקה
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסו שוב בעוד דקה." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "ולידציה נכשלה" }, { status: 422 });
  }

  const data = parsed.data;

  // honeypot מולא → כנראה בוט. מחזירים הצלחה מדומה בלי לשמור.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = createAdminClient();

    // המרת slug ל-service_id
    let serviceId: string | null = null;
    if (data.service_slug) {
      const { data: svc } = await supabase
        .from("services")
        .select("id")
        .eq("slug", data.service_slug)
        .single();
      serviceId = svc?.id ?? null;
    }

    const { error } = await supabase.from("contact_leads").insert({
      owner_name: data.owner_name,
      phone: data.phone,
      city: data.city ?? null,
      dog_breed: data.dog_breed ?? null,
      dog_age: data.dog_age ?? null,
      neutered: data.neutered ?? null,
      friendly: data.friendly ?? null,
      service_id: serviceId,
      message: data.message ?? null,
      status: "new",
    });

    if (error) throw error;

    // TODO: התראת אימייל לבעל האתר (Resend) — בשלב הבא.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "שמירת הפנייה נכשלה" },
      { status: 500 }
    );
  }
}
