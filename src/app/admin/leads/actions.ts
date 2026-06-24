"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/types";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = createAdminClient();
  await supabase.from("contact_leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
