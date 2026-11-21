"use client";

import { useState } from "react";

export default function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the address stays selectable as plain text.
    }
  };

  return (
    <button type="button" className="copy" onClick={copy}>
      {copied ? done : label}
    </button>
  );
}
