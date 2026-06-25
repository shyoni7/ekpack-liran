"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export async function createGalleryItem(data: {
  type: "image" | "video" | "youtube";
  title: string | null;
  category: string | null;
  file_url: string | null;
  youtube_url: string | null;
}) {
  const supabase = createAdminClient();
  await supabase.from("gallery_items").insert({
    type: data.type,
    title: data.title,
    category: data.category,
    file_url: data.file_url,
    youtube_url: data.youtube_url,
    thumbnail: data.type === "image" ? data.file_url : null,
    is_published: true,
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryItem(id: string) {
  const supabase = createAdminClient();
  await supabase.from("gallery_items").delete().eq("id", id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleGalleryPublish(id: string, isPublished: boolean) {
  const supabase = createAdminClient();
  await supabase.from("gallery_items").update({ is_published: isPublished }).eq("id", id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
