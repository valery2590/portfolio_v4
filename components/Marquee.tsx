const COMPANIES = ["Grupo Planeta", "Hyundai", "Educa Edtech", "EGO", "Easoft", "Tecnocasa"];

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div className="mq-set" aria-hidden={hidden || undefined}>
      {COMPANIES.map((c) => (
        <span key={c} className="mq-item">
          <span className="mq-name">{c}</span>
          <i />
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ label }: { label: string }) {
  return (
    <div className="marquee" role="region" aria-label={`${label}: ${COMPANIES.join(", ")}`}>
      <div className="wrap">
        <span className="eyebrow">{label}</span>
      </div>
      <div className="mq">
        <div className="mq-track">
          <Set />
          <Set hidden />
        </div>
      </div>
    </div>
  );
}
