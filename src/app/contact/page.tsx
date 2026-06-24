import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "השאירו פרטים ונחזור אליכם, או פנו אלינו ב-WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-foreground">צרו קשר</h1>
        <p className="mt-3 text-muted">
          נשמח לשמוע מכם! מלאו את הטופס ונחזור אליכם בהקדם.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-[#25D366] px-6 py-2 font-semibold text-white"
        >
          או דברו איתנו ב-WhatsApp
        </a>
      </div>
      <ContactForm />
    </div>
  );
}
