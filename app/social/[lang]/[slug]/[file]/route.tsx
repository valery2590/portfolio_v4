import { ImageResponse } from "next/og";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getPost, POSTS, type Post } from "@/lib/blog";
import { brandFonts, OG_COLORS as C, splitHighlight } from "@/lib/og";

/**
 * Generated assets for each blog post, so a post can be published from anywhere (even a phone):
 *   /social/<lang>/<slug>/square.png   LinkedIn image, 1200×1200
 *   /social/<lang>/<slug>/story.png    Instagram story, 1080×1920 (space left for the link sticker)
 *   /social/<lang>/<slug>/linkedin.txt LinkedIn text; blank lines carry U+2800 so LinkedIn keeps them on paste
 */
const FILES = ["square.png", "story.png", "linkedin.txt"] as const;
type File = (typeof FILES)[number];

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => POSTS.flatMap((p) => FILES.map((file) => ({ lang, slug: p.slug, file }))));
}

const STORY_HINT = { es: "↑ artículo completo en la web", en: "↑ full article on the web", it: "↑ articolo completo sul web" };
const NEW = { es: "Nuevo", en: "New", it: "Nuovo" };

function Headline({ hook, highlight, size }: { hook: string; highlight?: string; size: number }) {
  const [a, b, c] = splitHighlight(hook, highlight);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Display", fontSize: size, lineHeight: 1.02, letterSpacing: -size * 0.03 }}>
      {a && <span style={{ color: C.ink, whiteSpace: "pre-wrap" }}>{a}</span>}
      {b && <span style={{ color: C.accent, whiteSpace: "pre-wrap" }}>{b}</span>}
      {c && <span style={{ color: C.ink, whiteSpace: "pre-wrap" }}>{c}</span>}
    </div>
  );
}

function Points({ points, size }: { points: string[]; size: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: size * 0.7, width: "100%" }}>
      {points.map((p) => (
        <div key={p} style={{ display: "flex", gap: size * 0.7, fontFamily: "Body", fontSize: size, lineHeight: 1.35, color: "#C3C8D8" }}>
          <span style={{ fontFamily: "Mono", color: C.accent }}>→</span>
          <span style={{ display: "flex", flex: 1 }}>{p}</span>
        </div>
      ))}
    </div>
  );
}

const dotted = { backgroundColor: C.bg, backgroundImage: `radial-gradient(${C.surface} 2px, transparent 2px)`, backgroundSize: "28px 28px" };

function square(post: Post, lang: keyof typeof NEW, series: string) {
  const c = post.content[lang];
  const tags = c.tags.slice(0, 2).map((t) => `#${t.replace(/\s+/g, "")}`).join(" · ");
  return (
    <div style={{ ...dotted, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, color: C.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 24, color: C.muted }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.ok }} />
          {`${series} · #${post.number}`}
        </div>
        <span>Valery Figueroa Huaman</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
        <Headline hook={c.social.hook} highlight={c.social.highlight} size={c.social.hook.length > 70 ? 70 : 80} />
        <div style={{ display: "flex", flexDirection: "column", background: C.surface, border: `2px solid ${C.line}`, borderRadius: 24, padding: "40px 44px" }}>
          <Points points={c.social.points} size={32} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 24, color: C.muted }}>
        <span>{tags}</span>
        <span style={{ color: C.accent }}>valeryfigueroahuaman.com</span>
      </div>
    </div>
  );
}

function story(post: Post, lang: keyof typeof NEW, series: string) {
  const c = post.content[lang];
  return (
    <div style={{ ...dotted, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "250px 90px 300px", color: C.ink }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        <div style={{ display: "flex", alignSelf: "flex-start", alignItems: "center", gap: 14, fontFamily: "Mono", fontSize: 30, color: C.accent, background: "rgba(141,137,255,0.14)", padding: "14px 26px", borderRadius: 999 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: C.ok }} />
          {`${NEW[lang]} · ${series} #${post.number}`}
        </div>
        <Headline hook={c.social.hook} highlight={c.social.highlight} size={c.social.hook.length > 70 ? 92 : 108} />
      </div>
      <Points points={c.social.points} size={40} />
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", height: 150 }} />
        <div style={{ display: "flex", justifyContent: "center", fontFamily: "Mono", fontSize: 30, color: C.muted }}>{STORY_HINT[lang]}</div>
      </div>
    </div>
  );
}

type Params = { params: Promise<{ lang: string; slug: string; file: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { lang, slug, file } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post || !FILES.includes(file as File)) return new Response("Not found", { status: 404 });
  const c = post.content[lang];

  if (file === "linkedin.txt") {
    if (!c.linkedin) return new Response("Not found", { status: 404 });
    const text = c.linkedin
      .split("\n")
      .map((l) => (l.trim() === "" ? "⠀" : l))
      .join("\n");
    return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const series = getDictionary(lang).blog.series;
  const glyphs = [c.social.hook, ...c.social.points, ...c.tags, series, NEW[lang], STORY_HINT[lang], "Valery Figueroa Huaman valeryfigueroahuaman.com #·→↑0123456789"].join(" ");
  const fonts = await brandFonts(glyphs);

  if (file === "square.png") return new ImageResponse(square(post, lang, series), { width: 1200, height: 1200, fonts });
  return new ImageResponse(story(post, lang, series), { width: 1080, height: 1920, fonts });
}
