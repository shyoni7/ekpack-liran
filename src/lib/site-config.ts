// קונפיגורציה סטטית של האתר. ברירות מחדל — ניתנות לדריסה מ-site_settings ב-DB.

export const SITE = {
  name: "E.K.PACK",
  tagline: "פנסיון ומעון יום לכלבים",
  description:
    "פנסיון ומעון יום לכלבים המתמחה באילוף ותיקון התנהגות. סביבה חמה, ביתית ומקצועית.",
};

export const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/services", label: "השירותים שלנו" },
  { href: "/gallery", label: "גלריה" },
  { href: "/contact", label: "צור קשר" },
];

// 7 השירותים מהאפיון (משמש כ-fallback / ניווט; המקור האמיתי הוא טבלת services)
export const SERVICES = [
  { slug: "long-term-boarding", title: "פנסיון ארוך טווח ותיקון התנהגותי" },
  { slug: "short-term-boarding", title: "פנסיון קצר טווח" },
  { slug: "daycare", title: "מעון יום" },
  { slug: "pack-activity", title: "פעילות להקתית" },
  { slug: "vet-transport", title: "שירותי הסעה לווטרינריה" },
  { slug: "grooming", title: "פינת תספורת" },
  { slug: "shop", title: "מכירת מזון ומוצרים" },
];

// מספר WhatsApp מ-env (פורמט בינלאומי ללא +)
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972500000000";

export function whatsappLink(message?: string): string {
  const text = message ?? "היי, הגעתי מהאתר ואשמח לקבל פרטים על השירותים שלכם 🐾";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
