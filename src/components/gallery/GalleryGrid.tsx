"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("הכל");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => it.category && set.add(it.category));
    return ["הכל", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(
    () =>
      activeCategory === "הכל"
        ? items
        : items.filter((it) => it.category === activeCategory),
    [items, activeCategory]
  );

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-muted">
        הגלריה תתעדכן בקרוב בתמונות וסרטונים מהפנסיון
      </p>
    );
  }

  return (
    <>
      {/* סינון לפי קטגוריה */}
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-brand-green text-white"
                  : "bg-card text-muted hover:bg-brand-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* רשת תמונות */}
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(item)}
            className="relative block w-full overflow-hidden rounded-xl"
          >
            {item.type === "video" && !item.thumbnail && item.file_url ? (
              <>
                <video
                  src={item.file_url}
                  className="w-full transition-transform hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
                {/* אייקון play על גבי תצוגת הסרטון */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white">
                    ▶
                  </span>
                </span>
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail ?? item.file_url ?? ""}
                alt={item.title ?? "תמונה מהגלריה"}
                className="w-full transition-transform hover:scale-105"
                loading="lazy"
              />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              aria-label="סגור"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white"
              onClick={() => setLightbox(null)}
            >
              <X className="h-7 w-7" />
            </button>
            <div className="max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              {lightbox.type === "video" && lightbox.file_url ? (
                <video src={lightbox.file_url} controls autoPlay className="max-h-[90vh] rounded-xl" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lightbox.file_url ?? lightbox.thumbnail ?? ""}
                  alt={lightbox.title ?? "תמונה מוגדלת"}
                  className="max-h-[90vh] rounded-xl object-contain"
                />
              )}
              {lightbox.title && (
                <p className="mt-2 text-center text-white">{lightbox.title}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
