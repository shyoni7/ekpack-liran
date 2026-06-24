"use client";

import { useState } from "react";

// הטמעת YouTube עם facade — טוען את ה-iframe רק בלחיצה (חוסך ביצועים).
function extractId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

export default function YouTubeEmbed({ url, title }: { url: string; title?: string }) {
  const [active, setActive] = useState(false);
  const id = extractId(url);
  if (!id) return null;

  if (active) {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title={title ?? "סרטון YouTube"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`נגן סרטון: ${title ?? "YouTube"}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title ?? "תצוגה מקדימה של סרטון"}
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
          ▶
        </span>
      </span>
    </button>
  );
}
