import Link from "next/link";
import type { Metadata } from "next";
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
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description:
    "פנסיון ארוך וקצר טווח, מעון יום, אילוף ותיקון התנהגות, פעילות להקתית, הסעות לווטרינר, תספורת ומכירת מזון.",
};

const ICONS: Record<string, LucideIcon> = {
  "long-term-boarding": Home,
  "short-term-boarding": BedDouble,
  daycare: Sun,
  "pack-activity": Dog,
  "vet-transport": Truck,
  grooming: Scissors,
  shop: Bone,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-foreground">השירותים שלנו</h1>
        <p className="mt-3 text-muted">
          כל מה שהכלב שלכם צריך — תחת קורת גג אחת
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = ICONS[service.slug] ?? PawPrint;
          return (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Icon className="h-10 w-10 text-brand-green" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-foreground group-hover:text-brand-green">
                {service.title}
              </h2>
              {service.short_description && (
                <p className="mt-2 flex-1 text-sm text-muted">
                  {service.short_description}
                </p>
              )}
              <span className="mt-4 text-sm font-semibold text-brand-green">
                קראו עוד ←
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
