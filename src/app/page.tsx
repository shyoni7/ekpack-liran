import type { Metadata } from "next";
import HeroVideo from "@/components/home/HeroVideo";
import ServicesGrid from "@/components/home/ServicesGrid";
import AboutSection from "@/components/home/AboutSection";
import SpecialtiesSection from "@/components/home/SpecialtiesSection";
import FaqSection from "@/components/home/FaqSection";
import ContactForm from "@/components/contact/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { getServices, getSiteSettings } from "@/lib/data";
import { HOME_FAQS } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";

export const revalidate = 60; // שולף תוכן עדכני מ-DB (סרטון hero, שירותים) כל דקה

export const metadata: Metadata = {
  description:
    "פנסיון כלבים, פנסיון גורים ומעון יום לכלבים, בשילוב אילוף כלבים ותיקון התנהגות ופעילות להקתית. סביבה ביתית, להקתית ומפוקחת.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <HeroVideo
        videoSrc={settings?.hero_video}
        posterSrc={settings?.hero_poster}
      />
      <ServicesGrid services={services} />
      <SpecialtiesSection />
      <AboutSection />
      <FaqSection faqs={HOME_FAQS} />

      {/* יצירת קשר */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-foreground">דברו איתנו</h2>
          <p className="mt-2 text-muted">
            השאירו פרטים ונחזור אליכם בהקדם, או פנו אלינו ישירות ב-WhatsApp
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
