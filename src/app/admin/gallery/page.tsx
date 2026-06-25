import { createAdminClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";
import type { GalleryItem } from "@/types";

export const dynamic = "force-dynamic";

async function getGallery(): Promise<GalleryItem[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("display_order", { ascending: true });
    return (data as GalleryItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminGalleryPage() {
  const items = await getGallery();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-foreground">ניהול גלריה</h1>
      <p className="mb-6 text-sm text-muted">
        העלו תמונות וסרטונים, סדרו בקטגוריות, והסתירו/הציגו לפי הצורך.
      </p>
      <GalleryManager items={items} />
    </div>
  );
}
