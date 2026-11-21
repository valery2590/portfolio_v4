// Repeat the list so one set is always wider than the viewport (the track scrolls by exactly one set).
function Set({ items, hidden }: { items: string[]; hidden?: boolean }) {
  const repeated = [...items, ...items];
  return (
    <div className="mq-set" aria-hidden={hidden || undefined}>
      {repeated.map((c, i) => (
        <span key={`${c}-${i}`} className="mq-item" aria-hidden={i >= items.length || undefined}>
          <span className="mq-name">{c}</span>
          <i />
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="marquee" role="region" aria-label={`${label}: ${items.join(", ")}`}>
      <div className="wrap">
        <span className="eyebrow">{label}</span>
      </div>
      <div className="mq">
        <div className="mq-track">
          <Set items={items} />
          <Set items={items} hidden />
        </div>
      </div>
    </div>
  );
}
