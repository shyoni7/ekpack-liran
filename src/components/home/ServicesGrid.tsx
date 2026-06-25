"use client";

import Link from "next/link";
import {
  Home,
  BedDouble,
  Sun,
  Dog,
  Truck,
  Scissors,
  Bone,
  PawPrint,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

interface ServicesGridProps {
  services: Service[];
}

// אייקון Lucide לכל שירות לפי ה-slug
const ICONS: Record<string, LucideIcon> = {
  "long-term-boarding": Home,
  "short-term-boarding": BedDouble,
  daycare: Sun,
  "pack-activity": Dog,
  "vet-transport": Truck,
  grooming: Scissors,
  shop: Bone,
};

// קבוצת גוון לכל שירות
type GroupKey = "olive" | "turquoise" | "lilac";
const SERVICE_GROUP: Record<string, GroupKey> = {
  "long-term-boarding": "olive",
  "short-term-boarding": "olive",
  daycare: "olive",
  "pack-activity": "turquoise",
  "vet-transport": "turquoise",
  grooming: "lilac",
  shop: "lilac",
};

// פלטות פסטל לכל קבוצה (front בהיר עם טקסט כהה; back כהה עם טקסט לבן — שתיהן עוברות ניגודיות)
const GROUP: Record<
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

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-foreground">השירותים שלנו</h2>
        <p className="mt-2 text-muted">העבירו עכבר על כרטיס (או הקישו) כדי לגלות עוד</p>
      </div>

      {/* מקרא קבוצות גוונים */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
        {(Object.keys(GROUP) as GroupKey[]).map((key) => (
          <span key={key} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: GROUP[key].chip }}
              aria-hidden="true"
            />
            {GROUP[key].label}
          </span>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = ICONS[service.slug] ?? PawPrint;
          const g = GROUP[SERVICE_GROUP[service.slug] ?? "olive"];
          return (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              aria-label={`${service.title} — לעמוד השירות`}
              className="group block h-72 rounded-2xl [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <div className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                {/* פנים הכרטיס */}
                <div
                  className="absolute inset-0 flex flex-col rounded-2xl border p-4 shadow-sm [backface-visibility:hidden]"
                  style={{ background: g.front, color: g.frontText, borderColor: g.border }}
                >
                  {/* מקום לתמונה — placeholder עד שתועלה תמונת שער */}
                  <div
                    className="flex flex-1 items-center justify-center overflow-hidden rounded-xl"
                    style={{ background: "rgba(255,255,255,0.45)" }}
                  >
                    {service.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={service.cover_image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 opacity-60">
                        <Icon className="h-10 w-10" aria-hidden="true" />
                        <span className="text-xs font-medium">תמונה בקרוב</span>
                      </div>
                    )}
                  </div>
                  {/* כותרת */}
                  <div className="mt-3 flex items-center justify-center gap-2 text-center">
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="text-base font-extrabold leading-tight">{service.title}</span>
                  </div>
                </div>

                {/* גב הכרטיס */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{ background: g.back, borderColor: g.border }}
                >
                  <span className="text-lg font-extrabold">{service.title}</span>
                  {service.short_description && (
                    <p className="text-sm leading-relaxed opacity-95">{service.short_description}</p>
                  )}
                  <span className="mt-1 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold">
                    קראו עוד ←
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
