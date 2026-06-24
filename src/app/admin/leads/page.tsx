import { createAdminClient } from "@/lib/supabase/server";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import type { ContactLead } from "@/types";

export const dynamic = "force-dynamic";

async function getLeads(): Promise<ContactLead[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as ContactLead[]) ?? [];
  } catch {
    return [];
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-foreground">פניות שהתקבלו</h1>

      {leads.length === 0 ? (
        <p className="text-muted">עדיין לא התקבלו פניות.</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-foreground">{lead.owner_name}</span>
                  <a
                    href={`tel:${lead.phone}`}
                    className="mr-2 text-sm text-brand-blue hover:underline"
                  >
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">
                    {new Date(lead.created_at).toLocaleDateString("he-IL")}
                  </span>
                  <LeadStatusSelect id={lead.id} status={lead.status} />
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                {lead.city && <span>עיר: {lead.city}</span>}
                {lead.dog_breed && <span>גזע: {lead.dog_breed}</span>}
                {lead.dog_age && <span>גיל: {lead.dog_age}</span>}
                {lead.neutered != null && <span>מסורס: {lead.neutered ? "כן" : "לא"}</span>}
                {lead.friendly != null && <span>חברותי: {lead.friendly ? "כן" : "לא"}</span>}
              </div>

              {lead.message && (
                <p className="mt-2 rounded-lg bg-brand-cream p-2 text-sm text-foreground">
                  {lead.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
