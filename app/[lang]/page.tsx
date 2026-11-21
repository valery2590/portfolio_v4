import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseSection from "@/components/CaseSection";
import IntegrationMap from "@/components/IntegrationMap";
import Marquee from "@/components/Marquee";
import StackSection from "@/components/StackSection";
import Process from "@/components/Process";
import Audience from "@/components/Audience";
import Contact from "@/components/Contact";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <Hero t={t} />
        <CaseSection t={t.case} />
        <IntegrationMap t={t.integrations} />
        <Marquee label={t.companies.label} />
        <StackSection t={t.stack} />
        <Process t={t.process} />
        <Audience t={t.audience} />
        <Contact t={t.contact} />
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Valery Figueroa Huaman. {t.footer.rights}</span>
          <span>Node.js · PHP · Python</span>
        </div>
      </footer>
    </>
  );
}
