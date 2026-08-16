// בוני סימון מובנה (JSON-LD, schema.org) — עוזרים לגוגל להבין מי העסק,
// אילו שירותים הוא נותן ואיפה, ומזכים בתוצאות עשירות בחיפוש.

import { BUSINESS, SITE, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site-config";

// מזהה יציב לעסק, כך שכל הישויות בסימון מצביעות לאותו גוף.
const BUSINESS_ID = `${SITE_URL}/#business`;

function telephone(): string | undefined {
  if (BUSINESS.phone) return BUSINESS.phone;
  // ברירת המחדל של site-config היא מספר דמה — עדיף בלי טלפון מאשר עם מספר שגוי.
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "972500000000") return undefined;
  return `+${WHATSAPP_NUMBER}`;
}

// כתובת נכללת רק כשיש בה תוכן אמיתי — סימון עם שדות ריקים פוגע באמון של גוגל.
function postalAddress() {
  const { street, city, region, postalCode, country } = BUSINESS;
  if (!street && !city) return undefined;
  return {
    "@type": "PostalAddress",
    ...(street && { streetAddress: street }),
    ...(city && { addressLocality: city }),
    ...(region && { addressRegion: region }),
    ...(postalCode && { postalCode }),
    addressCountry: country,
  };
}

export function localBusinessJsonLd() {
  const address = postalAddress();
  const phone = telephone();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    legalName: BUSINESS.legalName,
    description: SITE.description,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "₪₪",
    ...(phone && { telephone: phone }),
    ...(address && { address }),
    ...(BUSINESS.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.lat,
        longitude: BUSINESS.geo.lng,
      },
    }),
    ...(BUSINESS.areasServed.length > 0 && {
      areaServed: BUSINESS.areasServed.map((name) => ({
        "@type": "Place",
        name,
      })),
    }),
    ...(BUSINESS.socialLinks.length > 0 && { sameAs: BUSINESS.socialLinks }),
    knowsAbout: [
      "פנסיון כלבים",
      "פנסיון גורים",
      "מעון יום לכלבים",
      "אילוף כלבים",
      "תיקון התנהגות כלבים",
      "פעילות להקת כלבים",
      "הדרכות מאלפים",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    url: SITE_URL,
    inLanguage: "he-IL",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: input.name,
    ...(input.image && { image: input.image }),
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "Country",
      name: "ישראל",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
    },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
