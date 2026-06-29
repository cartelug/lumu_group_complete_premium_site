import type { MetadataRoute } from "next";
import { getCars } from "@/lib/inventory";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    { url: `${base}/`, priority: 1 },
    ...getCars().map((c) => ({ url: `${base}/cars/${c.id}/`, priority: 0.8 })),
  ];
}
