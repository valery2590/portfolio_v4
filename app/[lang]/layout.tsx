import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getDictionary, isLocale, locales, SITE_URL } from "@/lib/i18n";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

const THEME_SCRIPT = 'try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}';

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDEFF4" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1120" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      title: t.meta.title,
      description: t.meta.description,
      siteName: "Valery Figueroa Huaman",
      locale: lang,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    authors: [{ name: "Valery Figueroa Huaman", url: SITE_URL }],
  };
}

function personJsonLd(lang: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Valery Figueroa Huaman",
    url: `${SITE_URL}/${lang}`,
    jobTitle: "Software Solutions · Integrations Engineer",
    description,
    knowsLanguage: ["es", "en", "it"],
    knowsAbout: [
      "API integrations", "Webhooks", "CRM integration", "WhatsApp Business API",
      "Node.js", "PHP", "Python", "Google Cloud", "Firebase", "Salesforce", "HubSpot", "Zoho",
    ],
    sameAs: [
      "https://www.linkedin.com/in/valery-figueroa-huaman-01517982/",
      "https://github.com/valery2590",
    ],
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const jsonLd = personJsonLd(lang, getDictionary(lang).meta.description);

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint (see components/ThemeToggle.tsx) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
