import { createAdminClient } from "@/lib/supabase/server";
import ServiceEditor from "@/components/admin/ServiceEditor";
import type { Service } from "@/types";

export const dynamic = "force-dynamic";

async function getAllServices(): Promise<Service[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order");
    return (data as Service[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-foreground">ניהול שירותים</h1>
      {services.length === 0 ? (
        <p className="text-muted">
          לא נמצאו שירותים. ודאו שהרצתם את schema.sql ב-Supabase.
        </p>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <ServiceEditor key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}
