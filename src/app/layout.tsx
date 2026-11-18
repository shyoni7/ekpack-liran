import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/chat/ChatWidget";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { SEO_KEYWORDS, SITE, SITE_URL } from "@/lib/site-config";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "פנסיון כלבים ומעון יום | אילוף ותיקון התנהגות | E.K.PACK",
    template: "%s | E.K.PACK",
  },
  description: SITE.description,
  keywords: SEO_KEYWORDS,
  // ה-canonical מוגדר בכל עמוד בנפרד — הגדרה כאן הייתה עוברת בירושה
  // לכל העמודים וגורמת לכולם להצביע על עמוד הבית.
  openGraph: {
    title: "פנסיון כלבים ומעון יום | אילוף ותיקון התנהגות | E.K.PACK",
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "פנסיון כלבים ומעון יום | E.K.PACK",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
