import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faq";

// שאלות נפוצות. התוכן נמצא ב-DOM גם כשהפריט סגור, כדי שגוגל יסרוק אותו.
export default function FaqSection({
  faqs,
  title = "שאלות נפוצות",
}: {
  faqs: Faq[];
  title?: string;
}) {
  return (
    <section className="bg-brand-cream py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-extrabold text-foreground">
          {title}
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-card p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                <h3 className="text-base">{faq.question}</h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-brand-green transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
