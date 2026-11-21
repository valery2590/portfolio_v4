import Link from "next/link";
import { locales, type Dict, type Locale } from "@/lib/i18n";
import Logo from "./Logo";

export default function Header({ t, lang }: { t: Dict; lang: Locale }) {
  return (
    <header className="top">
      <div className="wrap">
        <a className="logo" href="#inicio" aria-label={t.nav.home}>
          <Logo />
          VFH
        </a>
        <nav className="links" aria-label={t.nav.sections}>
          <a href="#caso">{t.nav.case}</a>
          <a href="#integraciones">{t.nav.integrations}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#proceso">{t.nav.process}</a>
          <a href="#contacto">{t.nav.contact}</a>
        </nav>
        <div className="lang" role="group" aria-label={t.nav.language}>
          {locales.map((l) => (
            <Link key={l} href={`/${l}`} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
