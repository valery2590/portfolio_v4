import es, { type Dict } from "@/dictionaries/es";
import en from "@/dictionaries/en";
import it from "@/dictionaries/it";

export const locales = ["es", "en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
export const SITE_URL = "https://valeryfigueroahuaman.com";

const dictionaries: Record<Locale, Dict> = { es, en, it };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
