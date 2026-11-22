import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, SITE_URL } from "@/lib/i18n";
import { formatDate, getPost, POSTS, readingMinutes } from "@/lib/blog";
import Header from "@/components/Header";
import Prose from "@/components/Prose";
import ShareBar from "@/components/ShareBar";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return locales.flatMap((lang) => POSTS.map((p) => ({ lang, slug: p.slug })));
}

export const dynamicParams = false;

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) return {};
  const c = post.content[lang];
  const image = `/blog/${post.slug}-${lang}.png`;
  return {
    title: `${c.title} · Valery Figueroa Huaman`,
    description: c.description,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/${slug}`])),
    },
    openGraph: { type: "article", title: c.title, description: c.description, publishedTime: post.date, images: [{ url: image, width: 1200, height: 1200 }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: [image] },
  };
}

export default async function BlogPost({ params }: Params) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) notFound();
  const t = getDictionary(lang);
  const c = post.content[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: c.title,
    description: c.description,
    datePublished: post.date,
    inLanguage: lang,
    image: `${SITE_URL}/blog/${post.slug}-${lang}.png`,
    url: `${SITE_URL}/${lang}/blog/${slug}`,
    author: { "@type": "Person", name: "Valery Figueroa Huaman", url: `${SITE_URL}/${lang}` },
  };

  return (
    <>
      <Header t={t} lang={lang} subpath={`/blog/${slug}`} />
      <main>
        <article className="article">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <div className="wrap article-wrap">
            <Link className="back" href={`/${lang}/blog`}>
              ← {t.blog.series}
            </Link>
            <span className="eyebrow">
              {t.blog.series} · #{post.number}
            </span>
            <h1>{c.title}</h1>
            <p className="article-lede">{c.description}</p>
            <p className="post-meta">
              {formatDate(post.date, lang)} · {readingMinutes(c)} {t.blog.minutes}
            </p>
            <Prose blocks={c.body} />
            <ShareBar
              url={`${SITE_URL}/${lang}/blog/${slug}`}
              title={c.title}
              t={{ title: t.blog.share, native: t.blog.shareNative, copy: t.blog.copyLink, copied: t.blog.linkCopied }}
            />
            <div className="article-end">
              <p>{t.blog.endNote}</p>
              <div className="ctas">
                <a className="btn primary" href={`/${lang}#contacto`}>{t.hero.ctaPrimary}</a>
                <Link className="btn ghost" href={`/${lang}/blog`}>{t.blog.all}</Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter t={t} />
    </>
  );
}
