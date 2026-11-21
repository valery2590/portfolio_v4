import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/lib/i18n";
import { POSTS } from "@/lib/blog";

function entry(path: string, lastModified: Date): MetadataRoute.Sitemap[number][] {
  return locales.map((l) => ({
    url: `${SITE_URL}/${l}${path}`,
    lastModified,
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${path}`])) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entry("", now),
    ...entry("/blog", now),
    ...POSTS.flatMap((p) => entry(`/blog/${p.slug}`, new Date(`${p.date}T12:00:00Z`))),
  ];
}
