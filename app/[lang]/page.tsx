import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseSection from "@/components/CaseSection";
import IntegrationMap from "@/components/IntegrationMap";
import Marquee from "@/components/Marquee";
import StackSection from "@/components/StackSection";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import BlogTeaser from "@/components/BlogTeaser";
import SiteFooter from "@/components/SiteFooter";

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
        <Marquee label={t.companies.label} items={t.companies.items} />
        <StackSection t={t.stack} />
        <BlogTeaser t={t.blog} lang={lang} />
        <Process t={t.process} />
        <Contact t={t.contact} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
