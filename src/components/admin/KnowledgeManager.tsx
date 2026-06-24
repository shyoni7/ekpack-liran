"use client";

import { useState, useTransition } from "react";
import {
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
} from "@/app/admin/knowledge/actions";
import type { KnowledgeItem } from "@/types";

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-brand-green focus:outline-none";

function ItemForm({
  item,
  onDone,
}: {
  item?: KnowledgeItem;
  onDone?: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function action(formData: FormData) {
    startTransition(async () => {
      if (item) await updateKnowledge(item.id, formData);
      else await createKnowledge(formData);
      onDone?.();
    });
  }

  return (
    <form action={action} className="space-y-3 rounded-xl bg-brand-cream p-4">
      <input
        name="title"
        placeholder="כותרת (לדוגמה: שעות פעילות)"
        defaultValue={item?.title ?? ""}
        required
        className={inputClass}
      />
      <input
        name="category"
        placeholder="קטגוריה (אופציונלי)"
        defaultValue={item?.category ?? ""}
        className={inputClass}
      />
      <textarea
        name="content"
        placeholder="התוכן שהסוכן ישתמש בו..."
        defaultValue={item?.content ?? ""}
        rows={4}
        required
        className={inputClass}
      />
      {item && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={item.is_published}
            className="accent-brand-green"
          />
          פעיל (זמין לסוכן)
        </label>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "שומר..." : item ? "עדכון" : "הוספה"}
      </button>
    </form>
  );
}

export default function KnowledgeManager({ items }: { items: KnowledgeItem[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      {/* הוספה */}
      {adding ? (
        <ItemForm onDone={() => setAdding(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white"
        >
          + הוספת פריט ידע
        </button>
      )}

      {/* רשימה */}
      {items.length === 0 ? (
        <p className="text-muted">
          מאגר הידע ריק. הוסיפו מידע כדי שהסוכן יוכל לענות על שאלות.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) =>
            editingId === item.id ? (
              <ItemForm key={item.id} item={item} onDone={() => setEditingId(null)} />
            ) : (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">
                    {item.title}
                    {item.category && (
                      <span className="mr-2 text-xs text-muted">({item.category})</span>
                    )}
                    {!item.is_published && (
                      <span className="mr-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                        מוסתר
                      </span>
                    )}
                  </span>
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setEditingId(item.id)}
                      className="text-brand-green"
                    >
                      עריכה
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("למחוק פריט זה?")) {
                          startTransition(() => deleteKnowledge(item.id));
                        }
                      }}
                      className="text-red-600"
                    >
                      מחיקה
                    </button>
                  </div>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">
                  {item.content}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
