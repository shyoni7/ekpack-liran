import type { Metadata } from "next";
import { SITE, LEGAL, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: `מדיניות הפרטיות של ${SITE.name} — איזה מידע נאסף, למה, ומהן זכויותיכם לפי חוק הגנת הפרטיות.`,
};

// כותרת סקשן
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-2 space-y-2 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-foreground">מדיניות פרטיות</h1>
      <p className="mt-2 text-sm text-muted">עודכן לאחרונה: {LEGAL.lastUpdated}</p>

      <p className="mt-6 leading-relaxed text-foreground">
        אנו ב-{SITE.name} (להלן: "אנחנו" או "העסק") מכבדים את פרטיותכם ומחויבים
        להגן על המידע האישי שתמסרו לנו. מדיניות זו מסבירה איזה מידע אנו אוספים,
        למה, כיצד אנו שומרים עליו, ומהן זכויותיכם לפי חוק הגנת הפרטיות,
        התשמ"א-1981 והתקנות מכוחו (לרבות תיקון 13).
      </p>

      <Section title="1. מי אחראי על המידע (בעל השליטה במאגר)">
        <p>
          בעל השליטה במאגר המידע הוא <strong>{LEGAL.controllerName}</strong>.
          {LEGAL.address && <> כתובת: {LEGAL.address}.</>} ניתן ליצור קשר בנושאי
          פרטיות באמצעות אימייל:{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-brand-green underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </Section>

      <Section title="2. איזה מידע אנו אוספים">
        <p>כאשר אתם פונים אלינו דרך טופס יצירת הקשר, אנו אוספים את הפרטים הבאים:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>שם בעל הכלב ומספר טלפון (פרטי חובה ליצירת קשר).</li>
          <li>עיר מגורים, סוג/גזע הכלב, גיל הכלב, האם מסורס, האם חברותי.</li>
          <li>השירות המבוקש והודעה חופשית (ככל שתבחרו למסור).</li>
          <li>
            במידה ותשתמשו בעוזר הווירטואלי (צ'אט) — תוכן השיחה עשוי להישמר לצורך
            שיפור השירות, בהתאם למדיניות זו.
          </li>
        </ul>
        <p>
          איננו אוספים מידע רגיש מעבר לנדרש ליצירת קשר ולמתן השירות, ואיננו מבקשים
          מידע פיננסי בטופס.
        </p>
      </Section>

      <Section title="3. מטרת איסוף המידע">
        <p>המידע נאסף ומשמש אך ורק למטרות הבאות:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>יצירת קשר עמכם ומענה לפנייתכם.</li>
          <li>מתן מידע על השירותים והתאמתם לצרכים של הכלב שלכם.</li>
          <li>ניהול הקשר השוטף ומתן השירות בפועל.</li>
          <li>שיפור האתר והשירות (לרבות מאגר הידע של העוזר הווירטואלי).</li>
        </ul>
      </Section>

      <Section title="4. מסירת המידע היא מרצון">
        <p>
          מסירת המידע תלויה ברצונכם החופשי ואינכם חייבים על פי חוק למסור אותו. עם
          זאת, ללא הפרטים המסומנים כחובה (שם וטלפון) לא נוכל ליצור עמכם קשר או
          לטפל בפנייתכם.
        </p>
      </Section>

      <Section title="5. למי המידע מועבר">
        <p>
          איננו מוכרים ואיננו משכירים את המידע האישי שלכם לצדדים שלישיים. המידע
          עשוי להיות מאוחסן ומעובד אצל ספקי תשתית ושירות הפועלים מטעמנו (כגון
          שירותי אחסון נתונים וענן), בכפוף להתחייבותם לאבטחת מידע. ייתכן ונעביר
          מידע אם נחויב לכך על פי דין או דרישת רשות מוסמכת.
        </p>
      </Section>

      <Section title="6. אבטחת מידע">
        <p>
          אנו נוקטים באמצעים סבירים לאבטחת המידע מפני גישה, שימוש או חשיפה בלתי
          מורשים, בהתאם לתקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017. יחד עם זאת,
          אין באפשרותנו להבטיח חסינות מוחלטת מפני חדירה.
        </p>
      </Section>

      <Section title="7. זכויותיכם">
        <p>בהתאם לחוק, עומדות לכם הזכויות הבאות:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>זכות עיון</strong> — לבקש לעיין במידע השמור עליכם.
          </li>
          <li>
            <strong>זכות תיקון</strong> — לבקש לתקן מידע שאינו נכון, שלם או מדויק.
          </li>
          <li>
            <strong>זכות מחיקה</strong> — לבקש להסיר את המידע ממאגר הפניות שלנו.
          </li>
        </ul>
        <p>
          למימוש זכויותיכם ניתן לפנות אלינו באימייל{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-brand-green underline">
            {LEGAL.email}
          </a>
          .
        </p>
      </Section>

      <Section title="8. שמירת המידע">
        <p>
          אנו שומרים את המידע למשך הזמן הדרוש למטרות שלשמן נאסף, או כפי שנדרש על פי
          דין. בתום התקופה המידע יימחק או יישמר באופן שאינו מזהה אתכם.
        </p>
      </Section>

      <Section title="9. עוגיות (Cookies)">
        <p>
          האתר עשוי לעשות שימוש בעוגיות טכניות חיוניות לתפעולו התקין. אנו לא עושים
          שימוש בעוגיות פרסום או מעקב צד-שלישי ללא הסכמתכם.
        </p>
      </Section>

      <Section title="10. שינויים במדיניות">
        <p>
          אנו רשאים לעדכן מדיניות זו מעת לעת. הנוסח המעודכן יפורסם בעמוד זה עם
          תאריך עדכון חדש.
        </p>
      </Section>

      <Section title="11. יצירת קשר">
        <p>
          בכל שאלה בנושא פרטיות ניתן לפנות אלינו באימייל{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-brand-green underline">
            {LEGAL.email}
          </a>{" "}
          או{" "}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green underline"
          >
            ב-WhatsApp
          </a>
          .
        </p>
      </Section>
    </div>
  );
}
