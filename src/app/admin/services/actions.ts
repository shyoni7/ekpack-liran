"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

// עדכון שדות טקסט של שירות + יתרונות (שורה לכל יתרון) + מצב פרסום.
export async function updateService(id: string, formData: FormData) {
  const supabase = createAdminClient();

  const benefitsRaw = String(formData.get("benefits") ?? "").trim();
  const benefits = benefitsRaw
    ? benefitsRaw.split("\n").map((b) => b.trim()).filter(Boolean)
    : null;

  await supabase
    .from("services")
    .update({
      title: String(formData.get("title") ?? ""),
      short_description: String(formData.get("short_description") ?? "") || null,
      full_description: String(formData.get("full_description") ?? "") || null,
      benefits,
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${formData.get("slug")}`);
}

export async function deleteService(id: string) {
  const supabase = createAdminClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
