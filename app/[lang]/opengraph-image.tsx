import { ImageResponse } from "next/og";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Valery Figueroa Huaman";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Fetch a Google Font subset (only the glyphs we render) as TTF for Satori. */
async function loadFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

const C = {
  bg: "#0D1120",
  surface: "#161B2D",
  ink: "#E7EAF3",
  muted: "#98A0B6",
  wire: "#4A5372",
  accent: "#8D89FF",
  signal: "#FF9A55",
  ok: "#3DD68C",
};

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "es");
  const title = `${t.hero.titleA} ${t.hero.titleEm}`;
  const sources = ["Chatbot", "WhatsApp", "Webhook"];
  const targets = ["LeadCars", "HubSpot", "Salesforce", "Zoho"];
  const tagline = "Node.js · PHP · Python";
  const name = "Valery Figueroa Huaman";

  const allText = title + name + tagline + sources.join("") + targets.join("") + "Middleware valeryfigueroahuaman.com";
  const [display, mono] = await Promise.all([
    loadFont("Bricolage+Grotesque", 800, allText),
    loadFont("JetBrains+Mono", 500, allText),
  ]);
  const fonts = [
    display && { name: "Display", data: display, weight: 800 as const, style: "normal" as const },
    mono && { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 800 | 500; style: "normal" }[];

  const node = (label: string, dot?: string) => (
    <div
      key={label}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12,
        background: C.surface, border: `1.5px solid ${C.wire}`, color: C.ink, fontSize: 20, fontFamily: "Mono",
      }}
    >
      {dot && <div style={{ width: 12, height: 12, borderRadius: 6, background: dot }} />}
      {label}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "56px 64px", background: C.bg, color: C.ink,
          backgroundImage: `radial-gradient(${C.surface} 2px, transparent 2px)`, backgroundSize: "28px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Mono", fontSize: 22, color: C.muted }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.ok }} />
          {name}
        </div>

        <div style={{ display: "flex", fontFamily: "Display", fontSize: 72, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {sources.map((s, i) => node(s, [C.accent, C.ok, C.signal][i]))}
          </div>
          <div style={{ display: "flex", flex: 1, height: 2, margin: "0 18px", borderTop: `2px dashed ${C.wire}` }} />
          <div
            style={{
              display: "flex", padding: "14px 22px", borderRadius: 14, background: C.accent, color: C.bg,
              fontFamily: "Display", fontSize: 26,
            }}
          >
            Middleware
          </div>
          <div style={{ display: "flex", flex: 1, height: 2, margin: "0 18px", borderTop: `2px dashed ${C.wire}` }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {targets.slice(0, 2).map((x) => node(x))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 22, color: C.muted }}>
          <span>{tagline}</span>
          <span style={{ color: C.accent }}>valeryfigueroahuaman.com</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
