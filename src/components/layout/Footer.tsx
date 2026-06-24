import Link from "next/link";
import { NAV_LINKS, SERVICES, SITE, whatsappLink } from "@/lib/site-config";

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
          </ul>
        </div>

        {/* שירותים */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">השירותים שלנו</h3>
          <ul className="space-y-2 text-sm text-muted">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand-green">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* יצירת קשר */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-foreground">צרו קשר</h3>
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

      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
