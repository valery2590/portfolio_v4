import Link from "next/link";
import { locales, type Dict, type Locale } from "@/lib/i18n";
import Logo from "./Logo";

/** `subpath` keeps the visitor on the same page when switching language (e.g. "/blog/cache-cdn"). */
export default function Header({ t, lang, subpath = "" }: { t: Dict; lang: Locale; subpath?: string }) {
  const home = `/${lang}`;
  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href={home} aria-label={t.nav.home}>
          <Logo />
          VFH
        </Link>
        <nav className="links" aria-label={t.nav.sections}>
          <a href={`${home}#caso`}>{t.nav.case}</a>
          <a href={`${home}#integraciones`}>{t.nav.integrations}</a>
          <a href={`${home}#stack`}>{t.nav.stack}</a>
          <Link href={`${home}/blog`}>{t.nav.blog}</Link>
          <a href={`${home}#sobre-mi`}>{t.nav.about}</a>
          <a href={`${home}#contacto`}>{t.nav.contact}</a>
        </nav>
        <div className="lang" role="group" aria-label={t.nav.language}>
          {locales.map((l) => (
            <Link key={l} href={`/${l}${subpath}`} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
