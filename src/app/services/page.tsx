import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import ServiceFlipGrid from "@/components/services/ServiceFlipGrid";
import ServiceLegend from "@/components/services/ServiceLegend";

export const metadata: Metadata = {
  title: "שירותים לכלבים — פנסיון, מעון יום ואילוף",
  description:
    "פנסיון כלבים ארוך וקצר טווח, מעון יום לכלבים, אילוף ותיקון התנהגות, פעילות להקת כלבים, הסעות לווטרינר, תספורת ומכירת מזון — תחת קורת גג אחת.",
  keywords: [
    "פנסיון כלבים",
    "מעון יום לכלבים",
    "אילוף כלבים",
    "פעילות להקת כלבים",
  ],
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-foreground">
          השירותים שלנו לכלבים
        </h1>
        <p className="mt-3 text-muted">
          פנסיון, מעון יום, אילוף ותיקון התנהגות ופעילות להקתית — תחת קורת גג אחת
        </p>
      </div>

      <ServiceLegend />
      <ServiceFlipGrid services={services} />
    </div>
  );
}
