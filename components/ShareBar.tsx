"use client";

import { useState, useSyncExternalStore } from "react";

type Labels = { title: string; native: string; copy: string; copied: string };

/**
 * Share links for a blog article. Plain share URLs (no third-party scripts or trackers).
 * Where the browser supports the Web Share API (most phones), a native "Share…" button is added first.
 */
export default function ShareBar({ url, title, t }: { url: string; title: string; t: Labels }) {
  // Web Share API support never changes during a visit; false on the server, real value after hydration.
  const canShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === "function",
    () => false,
  );
  const [copied, setCopied] = useState(false);

  const u = encodeURIComponent(url);
  const links = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];

  const share = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissed by the user or not allowed: nothing to do.
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the other options still work.
    }
  };

  return (
    <div className="share" role="group" aria-label={t.title}>
      <span className="share-label">{t.title}</span>
      <div className="share-actions">
        {canShare && (
          <button type="button" className="share-btn primary" onClick={share}>
            {t.native}
          </button>
        )}
        {links.map((l) => (
          <a key={l.name} className="share-btn" href={l.href} target="_blank" rel="noopener noreferrer">
            {l.name}
          </a>
        ))}
        <button type="button" className="share-btn" onClick={copy} aria-live="polite">
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </div>
  );
}
