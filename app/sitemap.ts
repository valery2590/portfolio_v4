import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: `${SITE_URL}/${l}`,
    lastModified: new Date(),
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}`])) },
  }));
}
