import type { Dict } from "@/lib/i18n";

export default function SiteFooter({ t }: { t: Dict }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} Valery Figueroa Huaman. {t.footer.rights}
        </span>
        <span>Node.js · PHP · Python</span>
      </div>
    </footer>
  );
}
