import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/data";
import { SERVICE_SEO, SITE_URL, whatsappLink } from "@/lib/site-config";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";

export const revalidate = 60; // ISR — רענון כל דקה

// תיאור קצר מה-DB עדיף כשיש בו ממש תוכן; שורה בת כמה מילים קצרה מדי
// בשביל תקציר בתוצאות החיפוש, ואז נופלים לתיאור ה-SEO המוכן.
const MIN_META_DESCRIPTION = 70;

function seoDescription(
  slug: string,
  shortDescription: string | null
): string | undefined {
  const fallback = SERVICE_SEO[slug]?.description;
  if (shortDescription && shortDescription.length >= MIN_META_DESCRIPTION) {
    return shortDescription;
  }
  return fallback ?? shortDescription ?? undefined;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "שירות לא נמצא", robots: { index: false } };

  const seo = SERVICE_SEO[slug];
  const description = seoDescription(slug, service.short_description);
  const path = `/services/${slug}`;

  return {
    title: seo?.title ?? service.title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: `${seo?.title ?? service.title} | E.K.PACK`,
      description,
      url: `${SITE_URL}${path}`,
      type: "article",
      ...(service.cover_image && { images: [service.cover_image] }),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const seo = SERVICE_SEO[slug];
  const path = `/services/${slug}`;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd
        data={[
          serviceJsonLd({
            name: seo?.heading ?? service.title,
            description:
              seoDescription(slug, service.short_description) ?? service.title,
            url: `${SITE_URL}${path}`,
            image: service.cover_image,
          }),
          breadcrumbJsonLd([
            { name: "בית", path: "/" },
            { name: "השירותים שלנו", path: "/services" },
            { name: service.title, path },
          ]),
        ]}
      />

      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-brand-green hover:underline">
              בית
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href="/services"
              className="hover:text-brand-green hover:underline"
            >
              השירותים שלנו
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="font-medium text-foreground">{service.title}</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-extrabold text-foreground">{service.title}</h1>

      {service.short_description && (
        <p className="mt-3 text-lg text-muted">{service.short_description}</p>
      )}

      {/* תקציר ממוקד מילות מפתח — מוצג רק כשאין תיאור מלא מהאדמין,
          כדי שהעמוד לא יישאר עם שורה בודדת של תוכן. */}
      {!service.full_description && seo?.description && (
        <p className="mt-3 leading-relaxed text-muted">{seo.description}</p>
      )}

      {/* סרטון מקומי */}
      {service.local_video && (
        <video
          className="mt-8 w-full rounded-2xl"
          controls
          playsInline
          poster={service.cover_image ?? undefined}
        >
          <source src={service.local_video} />
        </video>
      )}

      {/* תיאור מלא */}
      {service.full_description && (
        <div className="mt-8 whitespace-pre-line leading-relaxed text-foreground">
          {service.full_description}
        </div>
      )}

      {/* יתרונות */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-foreground">יתרונות השירות</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {service.benefits.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg bg-brand-cream p-3 text-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* מחירון */}
      {service.price_data && service.price_data.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-foreground">מחירון</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-right text-sm">
              <tbody>
                {service.price_data.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium text-foreground">{row.label}</td>
                    <td className="p-3 font-bold text-brand-green">{row.price}</td>
                    {row.note && <td className="p-3 text-muted">{row.note}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* סרטוני YouTube */}
      {service.youtube_links && service.youtube_links.length > 0 && (
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {service.youtube_links.map((url, i) => (
            <YouTubeEmbed key={i} url={url} title={service.title} />
          ))}
        </section>
      )}

      {/* גלריה */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-foreground">גלריה</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {service.gallery.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img}
                alt={`${service.title} ${i + 1}`}
                className="aspect-square w-full rounded-xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 flex flex-col gap-3 rounded-2xl bg-brand-green/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-foreground">
          מעוניינים בשירות הזה?
        </p>
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-brand-green px-6 py-2 font-semibold text-white hover:bg-brand-green-dark"
          >
            צרו קשר
          </Link>
          <a
            href={whatsappLink(`היי, אשמח לפרטים על "${service.title}"`)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-brand-green px-6 py-2 font-semibold text-brand-green hover:bg-brand-green hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </article>
  );
}
