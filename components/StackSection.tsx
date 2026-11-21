"use client";

import { useMemo, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { highlight, SNIPPETS, TABS, type Tab } from "@/lib/snippets";
import SectionHead from "./SectionHead";

type T = Dict["stack"];
type TileDef = { id: string; glyph: string; color: string; tab?: Tab; name: (t: T) => string; sub: (t: T) => string };

const GROUPS: { key: keyof T["groups"]; tiles: TileDef[] }[] = [
  {
    key: "languages",
    tiles: [
      { id: "js", glyph: "JS", color: "var(--t-js)", tab: "node", name: () => "JavaScript", sub: (t) => t.tiles.js },
      { id: "node", glyph: "NO", color: "var(--t-node)", tab: "node", name: () => "Node.js", sub: (t) => t.tiles.node },
      { id: "php", glyph: "PHP", color: "var(--t-php)", tab: "php", name: () => "PHP", sub: (t) => t.tiles.php },
      { id: "py", glyph: "PY", color: "var(--t-py)", tab: "python", name: () => "Python", sub: (t) => t.tiles.py },
    ],
  },
  {
    key: "robustness",
    tiles: [
      { id: "hmac", glyph: "#", color: "var(--t-n8n)", tab: "node", name: (t) => t.tiles.hmac[0], sub: (t) => t.tiles.hmac[1] },
      { id: "idem", glyph: "1×", color: "var(--t-make)", tab: "php", name: (t) => t.tiles.idem[0], sub: (t) => t.tiles.idem[1] },
      { id: "queue", glyph: "↻", color: "var(--t-zap)", tab: "python", name: (t) => t.tiles.queue[0], sub: (t) => t.tiles.queue[1] },
      { id: "tests", glyph: "✓", color: "var(--c-msg)", tab: "tests", name: (t) => t.tiles.tests[0], sub: (t) => t.tiles.tests[1] },
      { id: "logs", glyph: "!", color: "var(--c-sup)", name: (t) => t.tiles.logs[0], sub: (t) => t.tiles.logs[1] },
    ],
  },
  {
    key: "cloud",
    tiles: [
      { id: "gcp", glyph: "GC", color: "var(--c-sup)", name: () => "Google Cloud", sub: (t) => t.tiles.gcp },
      { id: "fb", glyph: "FB", color: "var(--c-mkt)", name: () => "Firebase", sub: (t) => t.tiles.fb },
      { id: "api", glyph: "{ }", color: "var(--c-crm)", name: () => "REST · GraphQL", sub: (t) => t.tiles.api },
      { id: "hooks", glyph: "⇄", color: "var(--c-msg)", name: () => "Webhooks", sub: (t) => t.tiles.hooks },
      { id: "oauth", glyph: "⚿", color: "var(--c-inm)", name: () => "OAuth 2.0", sub: (t) => t.tiles.oauth },
    ],
  },
];

export default function StackSection({ t }: { t: T }) {
  const [tab, setTab] = useState<Tab>("node");
  const [tile, setTile] = useState<string>("node");
  const snippet = SNIPPETS[tab];
  const html = useMemo(() => highlight(snippet.code), [snippet]);

  const selectTab = (next: Tab) => {
    setTab(next);
    setTile(next === "python" ? "py" : next);
  };

  return (
    <section className="block" id="stack">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        <div className="stack-grid">
          <div className="editor">
            <div className="ed-bar">
              <div className="ed-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className="ed-tabs" role="tablist" aria-label={t.tabsAria}>
                {TABS.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    id={`tab-${x.id}`}
                    aria-selected={tab === x.id}
                    aria-controls="code-panel"
                    onClick={() => selectTab(x.id)}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="ed-file">{snippet.file}</div>
            <pre
              className="code"
              id="code-panel"
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="ed-status">
              <span>{snippet.runtime}</span>
              <span className="ok">{snippet.status}</span>
            </div>
          </div>

          <div className="tile-groups">
            {GROUPS.map((g) => (
              <div key={g.key}>
                <h3>{t.groups[g.key]}</h3>
                <div className="tiles">
                  {g.tiles.map((x) => {
                    const content = (
                      <>
                        <span className="glyph">{x.glyph}</span>
                        <span>
                          <b>{x.name(t)}</b>
                          <small>{x.sub(t)}</small>
                        </span>
                      </>
                    );
                    const style = { "--t": x.color } as React.CSSProperties;
                    return x.tab ? (
                      <button
                        key={x.id}
                        type="button"
                        className="tile"
                        style={style}
                        aria-pressed={tile === x.id}
                        onClick={() => {
                          setTab(x.tab!);
                          setTile(x.id);
                        }}
                      >
                        {content}
                      </button>
                    ) : (
                      <div key={x.id} className="tile" style={style}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="also">{t.also}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
