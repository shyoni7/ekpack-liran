import Link from "next/link";
import { Check } from "lucide-react";
import FaqSection from "@/components/home/FaqSection";
import type { Faq } from "@/lib/faq";
import { whatsappLink } from "@/lib/site-config";

export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LandingContent {
  breadcrumb: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  faqs: Faq[];
  whatsappMessage: string;
  /** קישורים פנימיים לעמודים קרובים — עוזרים לגוגל להבין את הקשר ביניהם */
  related?: { href: string; label: string }[];
}

// שלד משותף לעמודי הנחיתה של מילות המפתח.
export default function LandingPage({ content }: { content: LandingContent }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* פירורי לחם — ניווט וגם סימון היררכיה לגוגל */}
      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-brand-green hover:underline">
              בית
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="font-medium text-foreground">{content.breadcrumb}</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-extrabold leading-tight text-foreground">
        {content.h1}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{content.intro}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(content.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brand-green px-6 py-3 text-center font-semibold text-white hover:bg-brand-green-dark"
        >
          דברו איתנו בוואטסאפ
        </a>
        <Link
          href="/contact"
          className="rounded-full border-2 border-brand-green px-6 py-3 text-center font-semibold text-brand-green hover:bg-brand-green hover:text-white"
        >
          השאירו פרטים
        </Link>
      </div>

      {content.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-bold text-foreground">
            {section.heading}
          </h2>

          {section.paragraphs?.map((text) => (
            <p key={text} className="mt-3 leading-relaxed text-muted">
              {text}
            </p>
          ))}

          {section.bullets && (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 rounded-lg bg-brand-cream p-3 text-sm text-foreground"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {content.related && content.related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-foreground">שירותים קשורים</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {content.related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-brand-green hover:text-brand-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {content.faqs.length > 0 && (
        <div className="mt-12 -mx-4 sm:mx-0 sm:overflow-hidden sm:rounded-2xl">
          <FaqSection faqs={content.faqs} />
        </div>
      )}

      <section className="mt-12 flex flex-col gap-3 rounded-2xl bg-brand-green/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-foreground">
          רוצים לשמוע עוד?
        </p>
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-brand-green px-6 py-2 font-semibold text-white hover:bg-brand-green-dark"
          >
            צרו קשר
          </Link>
          <a
            href={whatsappLink(content.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-brand-green px-6 py-2 font-semibold text-brand-green hover:bg-brand-green hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
