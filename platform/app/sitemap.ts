import type { MetadataRoute } from "next";
import { getVehicles, getProperties } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = ["/", "/auto-dealers/", "/real-estate/", "/about/", "/contact/"];
  const statics = staticPaths.map((p) => ({ url: `${base}${p}`, priority: p === "/" ? 1 : 0.8 }));
  const vehicles = getVehicles().map((v) => ({ url: `${base}/vehicles/${v.slug}/`, priority: 0.7 }));
  const properties = getProperties().map((p) => ({ url: `${base}/properties/${p.slug}/`, priority: 0.7 }));
  return [...statics, ...vehicles, ...properties];
}
