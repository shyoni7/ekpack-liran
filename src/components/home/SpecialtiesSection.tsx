import Link from "next/link";
import { Baby, Dog, GraduationCap } from "lucide-react";

// עמודי ההתמחות. הקישורים הפנימיים עם טקסט עוגן ממוקד עוזרים לגוגל
// להבין על מה כל עמוד מדבר.
const SPECIALTIES = [
  {
    href: "/dog-training",
    icon: Dog,
    title: "אילוף כלבים ותיקון התנהגות",
    text: "ציות בסיסי, כללי התנהגות בבית ובחוץ וטיפול בבעיות כמו משיכה ברצועה, נביחות יתר וחוסר שליטה מול כלבים אחרים.",
  },
  {
    href: "/puppy-boarding",
    icon: Baby,
    title: "פנסיון גורים",
    text: "אירוח המותאם לגור צעיר — חיברות נכון, ביסוס שגרה והרגלי ניקיון, והתחלה של אילוף בקצב שמתאים לגיל שלו.",
  },
  {
    href: "/trainer-courses",
    icon: GraduationCap,
    title: "הדרכות מאלפים והדרכות אילוף",
    text: "הדרכות לבעלי כלבים ולמאלפים, מבוססות עבודה מעשית מול כלבים אמיתיים בסביבה להקתית ומפוקחת.",
  },
];

export default function SpecialtiesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            ההתמחויות שלנו
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            מעבר לפנסיון ולמעון היום, אנחנו מתמחים בעבודה ההתנהגותית עצמה
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SPECIALTIES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                <Icon
                  className="h-10 w-10 text-brand-green"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-brand-green">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand-green">
                  קראו עוד ←
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
