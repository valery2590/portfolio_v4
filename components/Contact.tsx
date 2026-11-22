import type { Dict } from "@/lib/i18n";
import CopyButton from "./CopyButton";

const EMAIL = "valeryfigueroah@gmail.com";

const LINKS = [
  { label: "LinkedIn", value: "valeryfigueroahuaman", href: "https://www.linkedin.com/in/valeryfigueroahuaman/" },
  { label: "GitHub", value: "valery2590", href: "https://github.com/valery2590" },
  { label: "WhatsApp", value: "+34 680 535 856", href: "https://wa.me/34680535856" },
];

export default function Contact({ t }: { t: Dict["contact"] }) {
  return (
    <section className="contact" id="contacto">
      <div className="wrap">
        <div>
          <h2>{t.title}</h2>
          <p>{t.lede}</p>
        </div>
        <div className="channels">
          <div className="channel">
            <span className="ch-label">{t.email}</span>
            <span className="ch-value">
              <a className="v" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <CopyButton text={EMAIL} label={t.copy} done={t.copied} />
            </span>
          </div>
          <a className="channel" href={t.cvHref} download>
            <span className="ch-label">{t.cv}</span>
            <span className="v">{t.cvValue} ↓</span>
          </a>
          {LINKS.map((l) => (
            <a key={l.label} className="channel" href={l.href} target="_blank" rel="noopener noreferrer">
              <span className="ch-label">{l.label}</span>
              <span className="v">{l.value} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
