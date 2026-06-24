"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Home,
  BedDouble,
  Sun,
  Dog,
  Truck,
  Scissors,
  Bone,
  PawPrint,
  ChevronDown,
  Check,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

interface ServicesGridProps {
  services: Service[];
}

// אייקון Lucide לכל שירות לפי ה-slug (SVG עקבי, נגיש)
const ICONS: Record<string, LucideIcon> = {
  "long-term-boarding": Home,
  "short-term-boarding": BedDouble,
  daycare: Sun,
  "pack-activity": Dog,
  "vet-transport": Truck,
  grooming: Scissors,
  shop: Bone,
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-foreground">השירותים שלנו</h2>
        <p className="mt-2 text-muted">לחצו על כרטיס כדי לגלות עוד</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const isOpen = openId === service.id;
          const Icon = ICONS[service.slug] ?? PawPrint;
          return (
            <motion.div
              key={service.id}
              layout={!reduceMotion}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : service.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 p-5 text-right transition-colors hover:bg-brand-cream"
              >
                <Icon className="h-8 w-8 shrink-0 text-brand-green" aria-hidden="true" />
                <span className="flex-1 text-lg font-bold text-foreground">
                  {service.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  className="text-brand-green"
                  aria-hidden="true"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  >
                    <div className="border-t border-border px-5 pb-5 pt-3">
                      {service.short_description && (
                        <p className="text-sm text-muted">
                          {service.short_description}
                        </p>
                      )}
                      {service.benefits && service.benefits.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm text-foreground">
                          {service.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-4 inline-block rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                      >
                        קראו עוד
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
