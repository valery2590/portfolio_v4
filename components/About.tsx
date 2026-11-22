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
            <a className="about-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              {t.linkedinCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
