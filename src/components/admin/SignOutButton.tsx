"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-red-50 hover:text-red-600"
    >
      יציאה
    </button>
  );
}
