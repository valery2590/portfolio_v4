"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Dict } from "@/lib/i18n";
import SectionHead from "./SectionHead";

type CatId = "crm" | "msg" | "sup" | "mkt" | "inm";

const CATS: { id: CatId; color: string; tools: string[] }[] = [
  { id: "crm", color: "var(--c-crm)", tools: ["Salesforce", "HubSpot", "Zoho", "LeadCars", "JSONLead"] },
  { id: "msg", color: "var(--c-msg)", tools: ["WhatsApp Business", "Google Chat", "Chatbots"] },
  { id: "sup", color: "var(--c-sup)", tools: ["Zendesk", "Freshdesk", "Linear"] },
  { id: "mkt", color: "var(--c-mkt)", tools: ["ActiveCampaign", "Mailchimp"] },
  { id: "inm", color: "var(--c-inm)", tools: ["Inmobalia", "Casafari", "Vitec"] },
];

const CX = 500, CY = 310, RX1 = 165, RY1 = 125, RX2 = 300, RY2 = 238;
const f = (n: number) => n.toFixed(1);

type Tool = { cat: CatId; name: string; d: string; x: number; y: number; lx: number; ly: number; anchor: "start" | "end" | "middle"; off: number };
type CatNode = { id: CatId; x: number; y: number; w: number };

function layout(names: Record<CatId, string>) {
  const total = CATS.reduce((s, c) => s + c.tools.length, 0) + CATS.length;
  const step = (Math.PI * 2) / total;
  const start = -Math.PI / 2 - step * 1.5;
  let slot = 0;
  const tools: Tool[] = [];
  const cats: CatNode[] = [];

  for (const cat of CATS) {
    const angles = cat.tools.map(() => start + step * (slot++ + 0.5));
    slot++; // gap between categories
    const ca = angles.reduce((a, b) => a + b, 0) / angles.length;
    const kx = CX + RX1 * Math.cos(ca), ky = CY + RY1 * Math.sin(ca);
    cats.push({ id: cat.id, x: kx, y: ky, w: names[cat.id].length * 7.6 + 30 });

    cat.tools.forEach((name, i) => {
      const a = angles[i];
      const cos = Math.cos(a), sin = Math.sin(a);
      const x = CX + RX2 * cos, y = CY + RY2 * sin;
      const c1x = kx + 60 * Math.cos(ca), c1y = ky + 60 * Math.sin(ca);
      const c2x = CX + (RX2 - 70) * cos, c2y = CY + (RY2 - 60) * sin;
      const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
      tools.push({
        cat: cat.id,
        name,
        d: `M${CX} ${CY} L${f(kx)} ${f(ky)} C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(x)} ${f(y)}`,
        x, y,
        anchor,
        lx: x + (anchor === "middle" ? 0 : cos > 0 ? 14 : -14),
        ly: y + (anchor === "middle" ? (sin < 0 ? -16 : 26) : 5),
        off: i / cat.tools.length,
      });
    });
  }
  return { tools, cats };
}

export default function IntegrationMap({ t }: { t: Dict["integrations"] }) {
  const names = useMemo(
    () => Object.fromEntries(CATS.map((c) => [c.id, t.cats[c.id].name])) as Record<CatId, string>,
    [t]
  );
  const { tools, cats } = useMemo(() => layout(names), [names]);
  const color = (id: CatId) => CATS.find((c) => c.id === id)!.color;

  const [active, setActive] = useState<CatId>("crm");
  // Reduced-motion preference, read without a setState-in-effect (false on the server).
  const reduce = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const auto = useRef(true);
  const hovering = useRef(false);
  const activeRef = useRef(active);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pkRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Cycle categories until the visitor picks one.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!auto.current || hovering.current) return;
      setActive((cur) => CATS[(CATS.findIndex((c) => c.id === cur) + 1) % CATS.length].id);
    }, 3800);
    return () => clearInterval(id);
  }, [reduce]);

  // Packets travelling along the active category's wires.
  useEffect(() => {
    if (reduce) return;
    const lens = pathRefs.current.map((p) => p?.getTotalLength() ?? 0);
    let raf = 0;
    const tick = (now: number) => {
      tools.forEach((tool, i) => {
        const path = pathRefs.current[i], pk = pkRefs.current[i];
        if (!path || !pk) return;
        const on = tool.cat === activeRef.current;
        pk.style.display = on ? "" : "none";
        if (!on) return;
        const pt = path.getPointAtLength((((now / 1000) * 0.42 + tool.off) % 1) * lens[i]);
        pk.setAttribute("cx", String(pt.x));
        pk.setAttribute("cy", String(pt.y));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tools, reduce]);

  const pick = (id: CatId) => {
    auto.current = false;
    setActive(id);
  };

  // Draw inactive wires first so the active ones sit on top.
  const order = tools.map((_, i) => i).sort((a, b) => Number(tools[a].cat === active) - Number(tools[b].cat === active));

  return (
    <section className="block" id="integraciones">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

        <div className="filters" role="group" aria-label={t.filterAria}>
          {CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              style={{ "--c": c.color } as React.CSSProperties}
              onClick={() => pick(c.id)}
            >
              <i />
              {t.cats[c.id].name} <small>{c.tools.length}</small>
            </button>
          ))}
        </div>

        <div className="map-box">
          <div className="map-scroll">
            <svg
              id="map"
              viewBox="0 0 1000 620"
              role="img"
              aria-label={t.mapAria}
              onMouseEnter={() => (hovering.current = true)}
              onMouseLeave={() => (hovering.current = false)}
            >
              <g>
                {order.map((i) => {
                  const tool = tools[i];
                  return (
                    <path
                      key={tool.name}
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      d={tool.d}
                      className={`w${tool.cat === active ? " on" : ""}`}
                      style={{ "--c": color(tool.cat) } as React.CSSProperties}
                    />
                  );
                })}
              </g>
              <g>
                {cats.map((c) => (
                  <g
                    key={c.id}
                    className={`cat${c.id === active ? "" : " dim"}`}
                    style={{ "--c": color(c.id) } as React.CSSProperties}
                    onClick={() => pick(c.id)}
                  >
                    <rect x={f(c.x - c.w / 2)} y={f(c.y - 16)} width={f(c.w)} height="32" rx="16" />
                    <text x={f(c.x)} y={f(c.y + 4.5)} textAnchor="middle">{names[c.id]}</text>
                  </g>
                ))}
              </g>
              <g>
                {tools.map((tool) => (
                  <g
                    key={tool.name}
                    className={`tool${tool.cat === active ? "" : " dim"}`}
                    style={{ "--c": color(tool.cat) } as React.CSSProperties}
                    onClick={() => pick(tool.cat)}
                  >
                    <circle cx={f(tool.x)} cy={f(tool.y)} r="7" />
                    <text x={f(tool.lx)} y={f(tool.ly)} textAnchor={tool.anchor}>{tool.name}</text>
                  </g>
                ))}
              </g>
              <g>
                {tools.map((tool, i) => (
                  <circle
                    key={tool.name}
                    ref={(el) => {
                      pkRefs.current[i] = el;
                    }}
                    r="5"
                    className="pk"
                    fill={color(tool.cat)}
                    style={{ display: "none" }}
                  />
                ))}
              </g>
              <g className="hub">
                <circle className="ring" cx={CX} cy={CY} r="78" />
                <circle cx={CX} cy={CY} r="64" />
                <text x={CX} y={CY - 2} className="hub-name">Middleware</text>
                <text x={CX} y={CY + 16} className="hub-sub">Node · PHP · Python</text>
              </g>
            </svg>
          </div>
          <div className="map-foot" style={{ "--c": color(active) } as React.CSSProperties} aria-live="polite">
            <b>{t.cats[active].name}</b>
            <span>{t.cats[active].desc}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
