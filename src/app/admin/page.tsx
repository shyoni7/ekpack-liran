import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";

async function getStats() {
  try {
    const supabase = createAdminClient();
    const [leads, newLeads, services, knowledge, unanswered] = await Promise.all([
      supabase.from("contact_leads").select("id", { count: "exact", head: true }),
      supabase
        .from("contact_leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("knowledge_items").select("id", { count: "exact", head: true }),
      supabase
        .from("unanswered_questions")
        .select("id", { count: "exact", head: true })
        .eq("status", "open"),
    ]);
    return {
      leads: leads.count ?? 0,
      newLeads: newLeads.count ?? 0,
      services: services.count ?? 0,
      knowledge: knowledge.count ?? 0,
      unanswered: unanswered.count ?? 0,
    };
  } catch {
    return { leads: 0, newLeads: 0, services: 0, knowledge: 0, unanswered: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "פניות חדשות", value: stats.newLeads, href: "/admin/leads", accent: "text-brand-green" },
    { label: 'סה"כ פניות', value: stats.leads, href: "/admin/leads", accent: "text-foreground" },
    { label: "שירותים פעילים", value: stats.services, href: "/admin/services", accent: "text-brand-blue" },
    { label: "פריטי מאגר ידע", value: stats.knowledge, href: "/admin/knowledge", accent: "text-brand-teal" },
    { label: "שאלות ללא מענה (AI)", value: stats.unanswered, href: "/admin/knowledge", accent: "text-brand-brown" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-foreground">לוח בקרה</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`text-4xl font-extrabold ${c.accent}`}>{c.value}</div>
            <div className="mt-1 text-sm text-muted">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
