import type { Dict } from "@/lib/i18n";
import SectionHead from "./SectionHead";

export default function Process({ t }: { t: Dict["process"] }) {
  return (
    <section className="block" id="proceso">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="process">
          {t.steps.map((s, i) => (
            <article key={s.h}>
              <span className="step-label">
                {t.stepLabel} {i + 1}
              </span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
