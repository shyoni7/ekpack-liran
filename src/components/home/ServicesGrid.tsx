import ServiceFlipGrid from "@/components/services/ServiceFlipGrid";
import ServiceLegend from "@/components/services/ServiceLegend";
import type { Service } from "@/types";

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold text-foreground">השירותים שלנו</h2>
        <p className="mt-2 text-muted">רחפו או הקישו על כרטיס לפרטים והזמנה</p>
      </div>

      <ServiceLegend />
      <ServiceFlipGrid services={services} />
    </section>
  );
}
