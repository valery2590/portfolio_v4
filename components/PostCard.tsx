import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { formatDate, readingMinutes, type Post } from "@/lib/blog";

export default function PostCard({ post, lang, t }: { post: Post; lang: Locale; t: Dict["blog"] }) {
  const c = post.content[lang];
  return (
    <Link className="post-card" href={`/${lang}/blog/${post.slug}`}>
      <span className="post-meta">
        <span className="post-num">#{post.number}</span>
        {formatDate(post.date, lang)} · {readingMinutes(c)} {t.minutes}
      </span>
      <h3>{c.title}</h3>
      <p>{c.description}</p>
      <span className="post-more">{t.read} →</span>
    </Link>
  );
}
