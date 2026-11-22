import type { Dict } from "@/lib/i18n";
import Image from "next/image";
import SectionHead from "./SectionHead";

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
        </div>
      </div>
    </section>
  );
}
