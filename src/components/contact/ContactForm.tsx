"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { SERVICES } from "@/lib/site-config";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";
const labelClass = "mb-1 block text-sm font-medium text-foreground";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // ולידציה ב-blur, לא בכל הקלדה (inline-validation)
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      reset();
    } catch {
      setServerError("אירעה שגיאה בשליחת הטופס. נסו שוב או פנו אלינו ב-WhatsApp.");
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-green bg-brand-green/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-green" aria-hidden="true" />
        <h3 className="mt-3 text-xl font-bold text-brand-green">הפנייה נשלחה בהצלחה!</h3>
        <p className="mt-2 text-muted">נחזור אליכם בהקדם. תודה שפניתם ל-E.K.PACK</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium text-brand-green underline"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
      noValidate
    >
      {/* honeypot — מוסתר מבני אדם */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="owner_name">שם בעל הכלב *</label>
          <input
            id="owner_name"
            autoComplete="name"
            aria-invalid={!!errors.owner_name}
            className={inputClass}
            {...register("owner_name")}
          />
          {errors.owner_name && (
            <p role="alert" className="mt-1 text-xs text-red-600">{errors.owner_name.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">טלפון *</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && (
            <p role="alert" className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="city">עיר מגורים</label>
          <input id="city" autoComplete="address-level2" className={inputClass} {...register("city")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="dog_breed">סוג / גזע הכלב</label>
          <input id="dog_breed" className={inputClass} {...register("dog_breed")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="dog_age">גיל הכלב</label>
          <input id="dog_age" className={inputClass} {...register("dog_age")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="service_slug">השירות המבוקש</label>
          <select id="service_slug" className={inputClass} {...register("service_slug")}>
            <option value="">בחרו שירות</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" {...register("neutered")} className="accent-brand-green" />
          הכלב מסורס / מעוקר
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" {...register("friendly")} className="accent-brand-green" />
          הכלב חברותי
        </label>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">הודעה (לא חובה)</label>
        <textarea id="message" rows={4} className={inputClass} {...register("message")} />
      </div>

      <label className="flex items-start gap-2 text-sm text-foreground">
        <input type="checkbox" {...register("privacy")} className="mt-1 accent-brand-green" />
        <span>קראתי ואני מאשר/ת את מדיניות הפרטיות *</span>
      </label>
      {errors.privacy && (
        <p role="alert" className="text-xs text-red-600">{errors.privacy.message}</p>
      )}

      {serverError && (
        <p role="alert" className="text-sm text-red-600">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {isSubmitting ? "שולח..." : "שליחת פנייה"}
      </button>
    </form>
  );
}
