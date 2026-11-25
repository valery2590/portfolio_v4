/** Shared helpers for images rendered with next/og (Satori). */

export const OG_COLORS = {
  bg: "#0D1120",
  surface: "#161B2D",
  line: "#262D44",
  ink: "#E7EAF3",
  muted: "#98A0B6",
  wire: "#4A5372",
  accent: "#8D89FF",
  signal: "#FF9A55",
  ok: "#3DD68C",
};

/** Fetch a Google Font subset (only the glyphs we render) as TTF for Satori. */
export async function loadFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

type Font = { name: string; data: ArrayBuffer; weight: 400 | 500 | 800; style: "normal" };

/** Display (Bricolage 800), body (IBM Plex Sans 400) and mono (JetBrains Mono 500), subset to `text`. */
export async function brandFonts(text: string): Promise<Font[]> {
  const [display, body, mono] = await Promise.all([
    loadFont("Bricolage+Grotesque", 800, text),
    loadFont("IBM+Plex+Sans", 400, text),
    loadFont("JetBrains+Mono", 500, text),
  ]);
  return [
    display && { name: "Display", data: display, weight: 800 as const, style: "normal" as const },
    body && { name: "Body", data: body, weight: 400 as const, style: "normal" as const },
    mono && { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as Font[];
}

/** Splits `text` around `highlight` so the highlighted part can be coloured. */
export function splitHighlight(text: string, highlight?: string): [string, string, string] {
  if (!highlight) return [text, "", ""];
  const i = text.indexOf(highlight);
  if (i < 0) return [text, "", ""];
  return [text.slice(0, i), highlight, text.slice(i + highlight.length)];
}
