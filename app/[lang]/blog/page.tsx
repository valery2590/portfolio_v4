import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { POSTS } from "@/lib/blog";
import Header from "@/components/Header";
import SectionHead from "@/components/SectionHead";
import PostCard from "@/components/PostCard";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).blog;
  return {
    title: `${t.series} · Valery Figueroa Huaman`,
    description: t.lede,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog`])),
    },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header t={t} lang={lang} subpath="/blog" />
      <main>
        <section className="block blog-index">
          <div className="wrap">
            <SectionHead eyebrow={t.blog.eyebrow} title={t.blog.series} lede={t.blog.lede} />
            <div className="post-grid">
              {POSTS.map((p) => (
                <PostCard key={p.slug} post={p} lang={lang} t={t.blog} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter t={t} />
    </>
  );
}
