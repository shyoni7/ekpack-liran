import HeroVideo from "@/components/home/HeroVideo";
import ServicesGrid from "@/components/home/ServicesGrid";
import AboutSection from "@/components/home/AboutSection";
import ContactForm from "@/components/contact/ContactForm";
import { getServices, getSiteSettings } from "@/lib/data";

export const revalidate = 60; // שולף תוכן עדכני מ-DB (סרטון hero, שירותים) כל דקה

export default async function HomePage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroVideo
        videoSrc={settings?.hero_video}
        posterSrc={settings?.hero_poster}
      />
      <ServicesGrid services={services} />
      <AboutSection />

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
