import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "גלריה",
  description: "תמונות וסרטונים מהחיים בפנסיון E.K.PACK.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-foreground">גלריה</h1>
        <p className="mt-3 text-muted">רגעים מהחיים בפנסיון</p>
      </div>
      <GalleryGrid items={items} />
    </div>
  );
}
