import type { MetadataRoute } from "next";
import { primaryNav, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...primaryNav.map((item) => item.href)];
  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === "/events" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
