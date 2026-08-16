import Link from "next/link";
import { PawPrint } from "lucide-react";
import { SITE } from "@/lib/site-config";

interface HeroVideoProps {
  videoSrc?: string | null;
  posterSrc?: string | null;
}

// Hero ברוחב מלא עם סרטון רקע מתנגן אוטומטית (muted, loop). נופל לרקע צבעוני אם אין סרטון.
export default function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* רקע: סרטון או gradient מותג */}
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc ?? undefined}
        >
          <source src={videoSrc} />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-teal to-brand-blue" />
      )}

      {/* שכבת כהות לקריאות */}
      <div className="absolute inset-0 bg-black/40" />

      {/* תוכן */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        {/* ה-H1 נושא את שם המותג יחד עם מילת המפתח המרכזית — גוגל קורא את שניהם */}
        <h1 className="font-extrabold leading-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl">{SITE.name}</span>
          <span className="mt-4 block text-xl font-bold sm:text-2xl md:text-3xl">
            פנסיון כלבים ומעון יום לכלבים
          </span>
        </h1>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-lg font-medium sm:text-xl">
          אילוף כלבים, תיקון התנהגות ופעילות להקתית — בבית חם ומקצועי
          <PawPrint className="h-5 w-5" aria-hidden="true" />
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/services"
            className="w-full rounded-full bg-brand-green px-8 py-3 text-base font-semibold shadow-lg transition-colors hover:bg-brand-green-dark sm:w-auto"
          >
            לשירותים שלנו
          </Link>
          <Link
            href="/contact"
            className="w-full rounded-full border-2 border-white bg-white/10 px-8 py-3 text-base font-semibold backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
          >
            דברו איתנו
          </Link>
        </div>
      </div>
    </section>
  );
}
