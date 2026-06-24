import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/SignOutButton";

const ADMIN_NAV = [
  { href: "/admin", label: "לוח בקרה" },
  { href: "/admin/leads", label: "פניות" },
  { href: "/admin/services", label: "שירותים" },
  { href: "/admin/knowledge", label: "מאגר ידע (AI)" },
  { href: "/admin/settings", label: "הגדרות" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  // לא מחובר (או עמוד login) — מציגים את התוכן בלי מעטפת הניהול.
  if (!user) {
    return <div className="min-h-[70vh]">{children}</div>;
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row">
      {/* ניווט צד */}
      <aside className="md:w-56 md:shrink-0">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-4 text-lg font-extrabold text-brand-green">ניהול האתר</h2>
          <nav className="flex flex-col gap-1">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-brand-cream"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <SignOutButton />
            </div>
          </nav>
        </div>
      </aside>

      {/* תוכן */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
