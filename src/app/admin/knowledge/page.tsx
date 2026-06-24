import { createAdminClient } from "@/lib/supabase/server";
import KnowledgeManager from "@/components/admin/KnowledgeManager";
import type { KnowledgeItem } from "@/types";

export const dynamic = "force-dynamic";

async function getKnowledge(): Promise<KnowledgeItem[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("knowledge_items")
      .select("*")
      .order("updated_at", { ascending: false });
    return (data as KnowledgeItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminKnowledgePage() {
  const items = await getKnowledge();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-foreground">
        מאגר הידע של הסוכן
      </h1>
      <p className="mb-6 text-sm text-muted">
        המידע כאן הוא הבסיס היחיד שעליו עונה סוכן ה-AI. ככל שהמידע מדויק ומלא יותר,
        כך התשובות טובות יותר.
      </p>
      <KnowledgeManager items={items} />
    </div>
  );
}
