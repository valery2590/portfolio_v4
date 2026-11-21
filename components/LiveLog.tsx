"use client";

import { useEffect, useState } from "react";

type Line = { time: string; tag?: string; tone?: "in" | "out" | "t"; text: string; ok?: string };

const INITIAL: Line[] = [
  { time: "10:42:07", tag: "POST", tone: "in", text: "/webhook/whatsapp", ok: "200" },
  { time: "10:42:07", text: "signature ok · lead.normalized" },
  { time: "10:42:08", tag: "→ leadcars", tone: "in", text: "lead created", ok: "id 48213" },
  { time: "10:42:31", tag: "← hubspot", tone: "out", text: 'deal.stage = "appointment_confirmed"' },
  { time: "10:42:32", tag: "→ whatsapp", tone: "out", text: "template appointment_ok sent", ok: "✓" },
];

const EVENTS: Omit<Line, "time">[] = [
  { tag: "POST", tone: "in", text: "/webhook/chatbot", ok: "200" },
  { tag: "dedupe", tone: "t", text: "existing contact found" },
  { tag: "→ salesforce", tone: "in", text: "Lead updated", ok: "00Q8d…" },
  { tag: "retry 2/5", tone: "t", text: "zoho 503 · backoff 4s" },
  { tag: "→ zoho", tone: "in", text: "lead created", ok: "✓" },
  { tag: "← leadcars", tone: "out", text: 'status = "vehicle_available"' },
  { tag: "→ whatsapp", tone: "out", text: "template stock_ok sent", ok: "✓" },
  { tag: "POST", tone: "in", text: "/webhook/whatsapp · duplicate", ok: "skipped" },
  { tag: "← salesforce", tone: "out", text: 'stage = "Closed Won"' },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function LiveLog() {
  const [lines, setLines] = useState(INITIAL);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let sec = 10 * 3600 + 42 * 60 + 32;
    const id = setInterval(() => {
      sec += 2 + Math.floor(Math.random() * 9);
      const time = `${pad(Math.floor(sec / 3600) % 24)}:${pad(Math.floor(sec / 60) % 60)}:${pad(sec % 60)}`;
      const ev = EVENTS[i++ % EVENTS.length];
      setLines((prev) => [...prev.slice(-4), { time, ...ev }]);
    }, 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="log" aria-hidden="true">
      {lines.map((l, idx) => (
        <div key={`${l.time}-${idx}`}>
          <span className="t">{l.time}</span> {l.tag && <span className={l.tone}>{l.tag}</span>} {l.text}
          {l.ok && (
            <>
              {" · "}
              <span className="ok">{l.ok}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
