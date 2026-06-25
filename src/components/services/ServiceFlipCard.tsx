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
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";
import { GROUP, SERVICE_GROUP } from "@/lib/service-style";
import { whatsappLink } from "@/lib/site-config";

const ICONS: Record<string, LucideIcon> = {
  "long-term-boarding": Home,
  "short-term-boarding": BedDouble,
  daycare: Sun,
  "pack-activity": Dog,
  "vet-transport": Truck,
  grooming: Scissors,
  shop: Bone,
};

interface ServiceFlipCardProps {
  service: Service;
  open: boolean; // נשלט מבחוץ — רק כרטיס אחד פתוח בכל פעם
  onOpen: () => void;
  onClose: () => void;
}

export default function ServiceFlipCard({
  service,
  open,
  onOpen,
  onClose,
}: ServiceFlipCardProps) {
  // flip בנגיעה (מובייל) נשלט ב-prop `open`. ב-hover/focus מטופל ע"י Tailwind.
  const Icon = ICONS[service.slug] ?? PawPrint;
  const g = GROUP[SERVICE_GROUP[service.slug] ?? "olive"];

  return (
    <div className="group h-80 [perspective:1200px]">
      <div
        className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        style={open ? { transform: "rotateY(180deg)" } : undefined}
      >
        {/* ===== חזית ===== */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${service.title} — הצגת פרטים`}
          className="absolute inset-0 flex flex-col rounded-2xl border p-4 text-center shadow-sm [backface-visibility:hidden] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
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
          <div className="mt-3 flex items-center justify-center gap-2">
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="text-base font-extrabold leading-tight">{service.title}</span>
          </div>
          <span className="mt-1 text-xs opacity-70">רחפו או הקישו לפרטים</span>
        </button>

        {/* ===== גב ===== */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl border p-5 text-center text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: g.back, borderColor: g.border }}
        >
          {/* כפתור חזרה (בעיקר למובייל) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="חזרה לחזית הכרטיס"
            className="absolute left-3 top-3 rounded-full p-1 text-white/80 hover:text-white focus:outline-none"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>

          <h3 className="mt-1 text-lg font-extrabold">{service.title}</h3>
          {service.short_description && (
            <p className="mt-2 text-sm leading-relaxed opacity-95">
              {service.short_description}
            </p>
          )}

          {/* יתרונות מקוצרים (אם קיימים) */}
          {service.benefits && service.benefits.length > 0 && (
            <ul className="mt-2 space-y-1 text-right text-xs opacity-95">
              {service.benefits.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span aria-hidden="true">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* פעולות */}
          <div className="mt-auto flex flex-col gap-2 pt-3">
            <a
              href={whatsappLink(`היי, אשמח להזמין / לקבל פרטים על "${service.title}"`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-foreground transition-transform hover:scale-105"
            >
              להזמנה בוואטסאפ
            </a>
            <Link
              href={`/services/${service.slug}`}
              className="rounded-full border border-white/60 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              קרא עוד ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
