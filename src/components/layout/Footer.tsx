import Link from "next/link";
import {
  BUSINESS,
  LANDING_PAGES,
  NAV_LINKS,
  SERVICES,
  SITE,
  whatsappLink,
} from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-brand-brown/5">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        {/* מותג */}
        <div>
          <span className="text-xl font-extrabold text-brand-green">
            E.K.<span className="text-brand-teal">PACK</span>
          </span>
          <p className="mt-2 text-sm text-muted">{SITE.description}</p>
        </div>

        {/* ניווט */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">ניווט</h3>
          <ul className="space-y-2 text-sm text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-green">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-brand-green">
                מדיניות פרטיות
              </Link>
            </li>
          </ul>
        </div>

        {/* שירותים */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">השירותים שלנו</h3>
          <ul className="space-y-2 text-sm text-muted">
            {SERVICES.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand-green">
                  {s.title}
                </Link>
              </li>
            ))}
            {LANDING_PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="hover:text-brand-green">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* יצירת קשר */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">צרו קשר</h3>

          {/* שם, כתובת וטלפון — גוגל מצליב את הפרטים האלה מול פרופיל העסק */}
          {(BUSINESS.street || BUSINESS.city) && (
            <address className="mb-3 not-italic text-sm leading-relaxed text-muted">
              {BUSINESS.street && <span className="block">{BUSINESS.street}</span>}
              {BUSINESS.city && <span className="block">{BUSINESS.city}</span>}
            </address>
          )}

          {BUSINESS.phone && (
            <p className="mb-3 text-sm text-muted">
              <a
                href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
                className="hover:text-brand-green"
              >
                {BUSINESS.phone}
              </a>
            </p>
          )}

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-border py-4 text-center text-xs text-muted sm:flex-row sm:justify-center sm:gap-3">
        <span>© {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.</span>
        <Link href="/privacy" className="hover:text-brand-green hover:underline">
          מדיניות פרטיות
        </Link>
      </div>
    </footer>
  );
}
