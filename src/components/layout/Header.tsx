"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint } from "lucide-react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site-config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // עמוד נוכחי: התאמה מדויקת לבית, prefix לשאר
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-brand-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* לוגו */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-2xl font-extrabold tracking-tight text-brand-green">
            E.K.<span className="text-brand-teal">PACK</span>
          </span>
          <span className="hidden items-center gap-1 text-sm text-muted sm:inline-flex">
            <PawPrint className="h-4 w-4" aria-hidden="true" /> {SITE.tagline}
          </span>
        </Link>

        {/* ניווט דסקטופ */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                isActive(link.href)
                  ? "text-brand-green underline decoration-2 underline-offset-8"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            דברו איתנו
          </a>
        </nav>

        {/* כפתור המבורגר */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground md:hidden"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* תפריט מובייל */}
      {open && (
        <nav className="border-t border-border bg-brand-cream px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-2 py-2.5 text-base font-medium ${
                  isActive(link.href)
                    ? "bg-brand-green/10 text-brand-green"
                    : "text-foreground hover:bg-brand-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-brand-green px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              דברו איתנו ב-WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
