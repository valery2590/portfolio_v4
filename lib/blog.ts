import type { Locale } from "./i18n";
import cacheCdn from "@/content/blog/cache-cdn";
import leadScoring from "@/content/blog/lead-scoring";

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; text: string }
  | { t: "quote"; text: string };

/** Short texts used by the generated social images (/social/<lang>/<slug>/square.png, story.png). */
export type Social = {
  /** Headline on the image (a strong, short phrase: ~6-14 words). */
  hook: string;
  /** Exact substring of `hook` painted in the accent colour. */
  highlight?: string;
  /** 3-4 short takeaways (max ~60 characters each). */
  points: string[];
};

export type PostContent = {
  title: string;
  description: string;
  tags: string[];
  body: Block[];
  social: Social;
  /** Ready-to-post LinkedIn text. Blank lines are kept on paste via /social/<lang>/<slug>/linkedin.txt. */
  linkedin?: string;
};

export type Post = {
  slug: string;
  /** Number inside the "Integraciones sin drama" series. */
  number: number;
  date: string; // ISO yyyy-mm-dd
  /** LinkedIn post URL, if published there. */
  linkedinUrl?: string;
  /** True when hand-made images live in public/blog/<slug>-<lang>.png instead of the generated ones. */
  customImage?: boolean;
  content: Record<Locale, PostContent>;
};

// Newest first.
export const POSTS: Post[] = [leadScoring, cacheCdn];

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

/** Image used for link previews and the LinkedIn post. */
export function postImage(post: Post, lang: Locale): string {
  return post.customImage ? `/blog/${post.slug}-${lang}.png` : `/social/${lang}/${post.slug}/square.png`;
}
