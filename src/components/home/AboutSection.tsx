import { Heart, GraduationCap, House } from "lucide-react";

// סקשן קצר "אודות E.K.PACK" בעמוד הבית.
const FEATURES = [
  { icon: Heart, title: "יחס אישי", text: "כל כלב מקבל תשומת לב ומעקב צמוד" },
  { icon: GraduationCap, title: "מקצועיות", text: "אילוף ותיקון התנהגות בשיטות מוכחות" },
  { icon: House, title: "סביבה ביתית", text: "מרחב חם ובטוח, לא כלוב" },
];

export default function AboutSection() {
  return (
    <section className="bg-brand-cream py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-extrabold text-foreground">על E.K.PACK</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          ב-E.K.PACK אנחנו מאמינים שכל כלב ראוי לבית חם, מקצועי ומלא אהבה גם כשאתם
          לא בסביבה. אנחנו מתמחים בפנסיון, מעון יום, ובמיוחד באילוף ותיקון
          התנהגות — בסביבה בטוחה, להקתית ומפוקחת.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl bg-card p-6 shadow-sm">
                <Icon className="mx-auto h-10 w-10 text-brand-green" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
