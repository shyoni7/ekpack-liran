// סגנון משותף לכרטיסי השירות — קבוצות גוונים (משמש בבית וב-/services).

export type GroupKey = "olive" | "turquoise" | "lilac";

// שיוך כל שירות לקבוצת גוון
export const SERVICE_GROUP: Record<string, GroupKey> = {
  "long-term-boarding": "olive",
  "short-term-boarding": "olive",
  daycare: "olive",
  "pack-activity": "turquoise",
  "vet-transport": "turquoise",
  grooming: "lilac",
  shop: "lilac",
};

// פלטות פסטל (front בהיר/טקסט כהה, back כהה/טקסט לבן — שתיהן עוברות ניגודיות AA)
export const GROUP: Record<
  GroupKey,
  { label: string; front: string; frontText: string; back: string; border: string; chip: string }
> = {
  olive: {
    label: "פנסיון ומעון",
    front: "linear-gradient(135deg, #eef2dd 0%, #dbe6bd 100%)",
    frontText: "#54632f",
    back: "linear-gradient(135deg, #8a9b54 0%, #5f6f37 100%)",
    border: "#c4d49a",
    chip: "#7a8c4f",
  },
  turquoise: {
    label: "פעילות והסעות",
    front: "linear-gradient(135deg, #dcf2f0 0%, #b8e6e2 100%)",
    frontText: "#1d6f6a",
    back: "linear-gradient(135deg, #3fb3ab 0%, #18857e 100%)",
    border: "#a6dcd8",
    chip: "#2c9d95",
  },
  lilac: {
    label: "טיפוח ומזון",
    front: "linear-gradient(135deg, #ece4f6 0%, #dccff0 100%)",
    frontText: "#5f4788",
    back: "linear-gradient(135deg, #a98ccb 0%, #7d5aa8 100%)",
    border: "#cdbbe6",
    chip: "#8a6bb0",
  },
};

export function groupForSlug(slug: string) {
  return GROUP[SERVICE_GROUP[slug] ?? "olive"];
}
