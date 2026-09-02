import type { MetadataRoute } from "next";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    ...navigation.map((item) => ({
      url: `${siteUrl}${item.href}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
