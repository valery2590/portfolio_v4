import type { Dict } from "@/lib/i18n";
import SectionHead from "./SectionHead";

export default function Audience({ t }: { t: Dict["audience"] }) {
  return (
    <section className="block">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="audience">
          {[t.team, t.project].map((a) => (
            <div className="aud" key={a.h}>
              <h3>{a.h}</h3>
              <p>{a.p}</p>
              <ul>
                {a.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
