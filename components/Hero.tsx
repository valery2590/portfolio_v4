import type { Dict } from "@/lib/i18n";
import FlowCanvas from "./FlowCanvas";
import LiveLog from "./LiveLog";

export default function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  return (
    <section className="hero" id="inicio">
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1>
            {h.titleA} <em>{h.titleEm}</em>
          </h1>
          <p className="lede">{h.lede}</p>
          <div className="ctas">
            <a className="btn primary" href="#contacto">{h.ctaPrimary}</a>
            <a className="btn ghost" href="#caso">{h.ctaSecondary}</a>
          </div>
          <div className="facts">
            {h.facts.map((f) => (
              <span key={f.b}>
                <b>{f.b}</b> {f.t}
              </span>
            ))}
          </div>
        </div>

        <figure className="canvas" aria-label={t.canvas.aria}>
          <div className="canvas-bar">
            <span>{t.canvas.file}</span>
            <span className="run">{t.canvas.status}</span>
          </div>
          <FlowCanvas t={t.canvas} />
          <LiveLog />
        </figure>
      </div>
    </section>
  );
}
