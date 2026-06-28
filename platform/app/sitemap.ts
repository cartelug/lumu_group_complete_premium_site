import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = ["/", "/services/", "/fleet/", "/about/", "/contact/"];
  const statics = staticPaths.map((p) => ({ url: `${base}${p}`, priority: p === "/" ? 1 : 0.8 }));
  const svc = getServices().map((s) => ({ url: `${base}/services/${s.slug}/`, priority: 0.7 }));
  return [...statics, ...svc];
}
