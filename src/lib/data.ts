import { createClient } from "@/lib/supabase/server";
import { SERVICES } from "@/lib/site-config";
import type { Service, GalleryItem, SiteSettings } from "@/types";

// בודק אם Supabase מוגדר. מאפשר build/preview גם ללא חיבור DB.
function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// fallback: 7 השירותים מהקונפיג הסטטי כ-Service חלקיים.
function fallbackServices(): Service[] {
  return SERVICES.map((s, i) => ({
    id: s.slug,
    title: s.title,
    slug: s.slug,
    short_description: null,
    full_description: null,
    benefits: null,
    price_data: null,
    cover_image: null,
    local_video: null,
    youtube_links: null,
    gallery: null,
    display_order: i + 1,
    is_published: true,
    created_at: new Date().toISOString(),
  }));
}

export async function getServices(): Promise<Service[]> {
  if (!isConfigured()) return fallbackServices();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("display_order");
    if (error || !data || data.length === 0) return fallbackServices();
    return data as Service[];
  } catch {
    return fallbackServices();
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isConfigured()) {
    return fallbackServices().find((s) => s.slug === slug) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    if (error || !data) {
      return fallbackServices().find((s) => s.slug === slug) ?? null;
    }
    return data as Service;
  } catch {
    return fallbackServices().find((s) => s.slug === slug) ?? null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (error || !data) return null;
    return data as SiteSettings;
  } catch {
    return null;
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("is_published", true)
      .order("display_order");
    if (error || !data) return [];
    return data as GalleryItem[];
  } catch {
    return [];
  }
}
