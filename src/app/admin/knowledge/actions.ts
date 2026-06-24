"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export async function createKnowledge(formData: FormData) {
  const supabase = createAdminClient();
  await supabase.from("knowledge_items").insert({
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    category: String(formData.get("category") ?? "") || null,
    is_published: true,
  });
  revalidatePath("/admin/knowledge");
}

export async function updateKnowledge(id: string, formData: FormData) {
  const supabase = createAdminClient();
  await supabase
    .from("knowledge_items")
    .update({
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      category: String(formData.get("category") ?? "") || null,
      is_published: formData.get("is_published") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath("/admin/knowledge");
}

export async function deleteKnowledge(id: string) {
  const supabase = createAdminClient();
  await supabase.from("knowledge_items").delete().eq("id", id);
  revalidatePath("/admin/knowledge");
}
