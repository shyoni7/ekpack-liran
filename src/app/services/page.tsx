import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import ServiceFlipGrid from "@/components/services/ServiceFlipGrid";
import ServiceLegend from "@/components/services/ServiceLegend";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description:
    "פנסיון ארוך וקצר טווח, מעון יום, אילוף ותיקון התנהגות, פעילות להקתית, הסעות לווטרינר, תספורת ומכירת מזון.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-foreground">השירותים שלנו</h1>
        <p className="mt-3 text-muted">
          רחפו או הקישו על כרטיס לפרטים והזמנה — תחת קורת גג אחת
        </p>
      </div>

      <ServiceLegend />
      <ServiceFlipGrid services={services} />
    </div>
  );
}
