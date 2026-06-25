"use client";

import { useState } from "react";
import ServiceFlipCard from "@/components/services/ServiceFlipCard";
import type { Service } from "@/types";

// רשת כרטיסי השירות — מנהלת state כך שרק כרטיס אחד פתוח בכל פעם.
export default function ServiceFlipGrid({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceFlipCard
          key={service.id}
          service={service}
          open={openId === service.id}
          onOpen={() => setOpenId(service.id)}
          onClose={() => setOpenId(null)}
        />
      ))}
    </div>
  );
}
