import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { POSTS } from "@/lib/blog";
import SectionHead from "./SectionHead";
import PostCard from "./PostCard";

export default function BlogTeaser({ t, lang }: { t: Dict["blog"]; lang: Locale }) {
  if (POSTS.length === 0) return null;
  return (
    <section className="block" id="blog">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.series} lede={t.lede} />
        <div className="post-grid">
          {POSTS.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} lang={lang} t={t} />
          ))}
        </div>
        <Link className="btn ghost blog-all" href={`/${lang}/blog`}>
          {t.all} →
        </Link>
      </div>
    </section>
  );
}
