import type { Locale } from "./i18n";
import cacheCdn from "@/content/blog/cache-cdn";

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; text: string }
  | { t: "quote"; text: string };

export type PostContent = { title: string; description: string; tags: string[]; body: Block[] };

export type Post = {
  slug: string;
  /** Number inside the "Integraciones sin drama" series. */
  number: number;
  date: string; // ISO yyyy-mm-dd
  /** LinkedIn post URL, if published there. */
  linkedin?: string;
  content: Record<Locale, PostContent>;
};

// Newest first.
export const POSTS: Post[] = [cacheCdn];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function readingMinutes(c: PostContent): number {
  const text = c.body
    .map((b) => ("text" in b ? b.text : b.items.join(" ")))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function formatDate(iso: string, lang: Locale): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" });
}
