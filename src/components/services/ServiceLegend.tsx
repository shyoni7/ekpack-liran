import { GROUP, type GroupKey } from "@/lib/service-style";

// מקרא קבוצות הגוונים (פנסיון / פעילות / טיפוח)
export default function ServiceLegend() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
      {(Object.keys(GROUP) as GroupKey[]).map((key) => (
        <span key={key} className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ background: GROUP[key].chip }}
            aria-hidden="true"
          />
          {GROUP[key].label}
        </span>
      ))}
    </div>
  );
}
