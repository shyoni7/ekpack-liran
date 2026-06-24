// ===== Domain types for E.K.PACK =====

export interface PriceRow {
  label: string;
  price: string;
  note?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  benefits: string[] | null;
  price_data: PriceRow[] | null;
  cover_image: string | null;
  local_video: string | null;
  youtube_links: string[] | null;
  gallery: string[] | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export type GalleryItemType = "image" | "video" | "youtube";

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  title: string | null;
  category: string | null;
  file_url: string | null;
  youtube_url: string | null;
  thumbnail: string | null;
  display_order: number;
  is_published: boolean;
}

export type LeadStatus = "new" | "in_progress" | "done";

export interface ContactLead {
  id: string;
  owner_name: string;
  phone: string;
  city: string | null;
  dog_breed: string | null;
  dog_age: string | null;
  neutered: boolean | null;
  friendly: boolean | null;
  service_id: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface OpeningHours {
  [day: string]: { open: string; close: string } | null;
}

export interface SiteSettings {
  id: number;
  logo: string | null;
  hero_video: string | null;
  hero_poster: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  opening_hours: OpeningHours | null;
  social_links: Record<string, string> | null;
  seo_defaults: { title?: string; description?: string } | null;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string | null;
  source_url: string | null;
  is_published: boolean;
  updated_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
