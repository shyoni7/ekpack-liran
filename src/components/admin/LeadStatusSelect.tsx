"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/leads/actions";
import type { LeadStatus } from "@/types";

const OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "חדש" },
  { value: "in_progress", label: "בטיפול" },
  { value: "done", label: "טופל" },
];

export default function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => updateLeadStatus(id, e.target.value as LeadStatus))
      }
      className="rounded-lg border border-border px-2 py-1 text-sm focus:outline-none"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
