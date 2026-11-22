"use client";

/**
 * Light/dark toggle. The page starts following the OS setting; once the visitor
 * picks a theme it is stored in localStorage and applied before paint by the
 * inline script in app/[lang]/layout.tsx (no flash). The visible icon is chosen
 * purely by CSS, so server and client render the same markup.
 */
const COLORS = { light: "#EDEFF4", dark: "#0D1120" } as const;

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the choice still applies to this page view.
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", COLORS[next]));
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {/* Sun: shown in dark mode (click → light) */}
      <svg className="i-sun" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {/* Moon: shown in light mode (click → dark) */}
      <svg className="i-moon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
