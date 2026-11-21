"use client";

import { useEffect, useRef } from "react";
import type { Dict } from "@/lib/i18n";

const PATHS = {
  l1: "M140 82 C180 82 170 210 210 210",
  l2: "M140 202 C175 202 175 210 210 210",
  l3: "M140 322 C180 322 170 210 210 210",
  r1: "M350 210 C390 210 380 62 420 62",
  r2: "M350 210 C390 210 380 152 420 152",
  r3: "M350 210 C390 210 380 242 420 242",
  r4: "M350 210 C390 210 380 332 420 332",
};

const SOURCES = [
  { y: 60, name: "Chatbot", sub: "trigger", color: "var(--accent)" },
  { y: 180, name: "WhatsApp", sub: "business api", color: "var(--ok)" },
  { y: 300, name: "", sub: "webhook", color: "var(--wire)" },
];
const TARGETS = [
  { y: 40, name: "LeadCars" },
  { y: 130, name: "HubSpot" },
  { y: 220, name: "Salesforce" },
  { y: 310, name: "Zoho" },
];

// [path, begin, reverse]
const PACKETS: [keyof typeof PATHS, number, boolean][] = [
  ["l1", 0, false],
  ["l2", 0.8, false],
  ["l3", 1.6, false],
  ["r1", 0.4, false],
  ["r3", 1.2, false],
  ["r4", 2.0, false],
  ["r2", 0.2, true],
  ["l2", 1.5, true],
];

export default function FlowCanvas({ t }: { t: Dict["canvas"] }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pauseAnimations();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 560 400" aria-hidden="true" className="flow">
      <defs>
        {Object.entries(PATHS).map(([id, d]) => (
          <path key={id} id={`fc-${id}`} d={d} />
        ))}
      </defs>
      {Object.keys(PATHS).map((id) => (
        <use key={id} href={`#fc-${id}`} className="wire" />
      ))}

      {SOURCES.map((s) => (
        <g className="node" key={s.y}>
          <rect x="10" y={s.y} width="130" height="44" rx="10" />
          <circle cx="30" cy={s.y + 22} r="7" fill={s.color} />
          <text className="name" x="44" y={s.y + 20}>{s.name || t.form}</text>
          <text className="sub" x="44" y={s.y + 34}>{s.sub}</text>
        </g>
      ))}

      <g className="node hub">
        <rect x="210" y="170" width="140" height="80" rx="14" />
        <text className="name" x="280" y="206" textAnchor="middle">Middleware</text>
        <text className="sub" x="280" y="226" textAnchor="middle">Node · PHP · Python</text>
      </g>

      {TARGETS.map((n) => (
        <g className="node" key={n.y}>
          <rect x="420" y={n.y} width="130" height="44" rx="10" />
          <text className="name" x="436" y={n.y + 20}>{n.name}</text>
          <text className="sub" x="436" y={n.y + 34}>crm</text>
        </g>
      ))}

      {PACKETS.map(([p, begin, reverse], i) => (
        <circle key={i} r="4.5" className={reverse ? "pkt-out" : "pkt-in"}>
          <animateMotion
            dur={reverse ? "2.6s" : "2.4s"}
            begin={`${begin}s`}
            repeatCount="indefinite"
            {...(reverse ? { keyPoints: "1;0", keyTimes: "0;1", calcMode: "linear" } : {})}
          >
            <mpath href={`#fc-${p}`} />
          </animateMotion>
        </circle>
      ))}

      <g className="legend">
        <circle cx="216" cy="384" r="4" className="pkt-in" />
        <text x="226" y="388">{t.legendIn}</text>
        <circle cx="312" cy="384" r="4" className="pkt-out" />
        <text x="322" y="388">{t.legendOut}</text>
      </g>
    </svg>
  );
}
