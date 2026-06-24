import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const services = await getServices();

  const staticRoutes = ["", "/services", "/gallery", "/contact", "/privacy"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes];
}
