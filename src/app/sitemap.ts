import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data";
import { LANDING_PAGES, SITE_URL } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  const lastModified = new Date();

  // עמוד הבית ראשון בעדיפות, אחריו עמודי הנחיתה של מילות המפתח.
  const home = {
    url: `${SITE_URL}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const landingRoutes = LANDING_PAGES.map((page) => ({
    url: `${SITE_URL}${page.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const secondaryRoutes = ["/services", "/gallery", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const privacyRoute = {
    url: `${SITE_URL}/privacy`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  };

  return [
    home,
    ...landingRoutes,
    ...serviceRoutes,
    ...secondaryRoutes,
    privacyRoute,
  ];
}
