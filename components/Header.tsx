import Link from "next/link";
import { locales, type Dict, type Locale } from "@/lib/i18n";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu, { type NavItem } from "./MobileMenu";

/** `subpath` keeps the visitor on the same page when switching language (e.g. "/blog/cache-cdn"). */
export default function Header({ t, lang, subpath = "" }: { t: Dict; lang: Locale; subpath?: string }) {
  const home = `/${lang}`;
  const items: NavItem[] = [
    { href: `${home}#caso`, label: t.nav.case },
    { href: `${home}#integraciones`, label: t.nav.integrations },
    { href: `${home}#stack`, label: t.nav.stack },
    { href: `${home}/blog`, label: t.nav.blog, page: true },
    { href: `${home}#sobre-mi`, label: t.nav.about },
    { href: `${home}#contacto`, label: t.nav.contact },
  ];
  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href={home} aria-label={t.nav.home}>
          <Logo />
          VFH
        </Link>
        <nav className="links" aria-label={t.nav.sections}>
          {items.map((it) =>
            it.page ? (
              <Link key={it.href} href={it.href}>
                {it.label}
              </Link>
            ) : (
              <a key={it.href} href={it.href}>
                {it.label}
              </a>
            ),
          )}
        </nav>
        <div className="header-actions">
          <div className="lang" role="group" aria-label={t.nav.language}>
            {locales.map((l) => (
              <Link key={l} href={`/${l}${subpath}`} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle label={t.nav.theme} />
          <MobileMenu items={items} label={t.nav.sections} openLabel={t.nav.menuOpen} closeLabel={t.nav.menuClose} />
        </div>
      </div>
    </header>
  );
}
