"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavItem = { href: string; label: string; page?: boolean };

/** Hamburger menu shown below 760px. Closes on link tap, Escape or a tap outside. */
export default function MobileMenu({
  items,
  label,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  label: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="mobile-menu" ref={root}>
      <button
        type="button"
        className="burger"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <nav id="mobile-nav" className="mobile-nav" aria-label={label} hidden={!open}>
        {items.map((it) =>
          it.page ? (
            <Link key={it.href} href={it.href} onClick={close}>
              {it.label}
            </Link>
          ) : (
            <a key={it.href} href={it.href} onClick={close}>
              {it.label}
            </a>
          ),
        )}
      </nav>
    </div>
  );
}
