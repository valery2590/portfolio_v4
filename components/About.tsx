import type { Dict } from "@/lib/i18n";
import Image from "next/image";
import SectionHead from "./SectionHead";

const LINKEDIN = "https://www.linkedin.com/in/valeryfigueroahuaman/";

export default function About({ t }: { t: Dict["about"] }) {
  return (
    <section className="block" id="sobre-mi">
      <div className="wrap about">
        <figure className="about-photo">
          <Image src="/about/valery.jpg" alt={t.photoAlt} width={620} height={928} sizes="(min-width: 900px) 420px, 100vw" />
        </figure>
        <div className="about-body">
          <SectionHead eyebrow={t.eyebrow} title={t.title} />
          {t.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="about-facts">
            {t.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="about-timeline">
            <span className="step-label">{t.timelineLabel}</span>
            <ol>
              {t.timeline.map((e) => (
                <li key={e.y}>
                  <time>{e.y}</time>
                  <span>{e.r}</span>
                </li>
              ))}
            </ol>
            <div className="about-actions">
              <a className="btn-cv" href={t.cvHref} download>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.cvCta}
              </a>
              <a className="about-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                {t.linkedinCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
