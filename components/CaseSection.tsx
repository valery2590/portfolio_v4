"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import SectionHead from "./SectionHead";

type Crm = "leadcars" | "hubspot" | "salesforce" | "zoho";
type Json = string | number | { [k: string]: Json };

const LEAD = { first: "Lucía", last: "Martín", phone: "+34611222812", interest: "SUV híbrido" };

const MAPS: Record<Crm, { name: string; method: string; path: string; body: Record<string, Json> }> = {
  leadcars: {
    name: "LeadCars",
    method: "POST",
    path: "/leads",
    body: { nombre: `${LEAD.first} ${LEAD.last}`, telefono: LEAD.phone, vehiculo_interes: LEAD.interest, origen: "whatsapp" },
  },
  hubspot: {
    name: "HubSpot",
    method: "POST",
    path: "/crm/v3/objects/contacts",
    body: { properties: { firstname: LEAD.first, lastname: LEAD.last, phone: LEAD.phone, product_interest: LEAD.interest, hs_lead_source: "whatsapp" } },
  },
  salesforce: {
    name: "Salesforce",
    method: "POST",
    path: "/services/data/v60.0/sobjects/Lead",
    body: { FirstName: LEAD.first, LastName: LEAD.last, MobilePhone: LEAD.phone, Product_Interest__c: LEAD.interest, LeadSource: "WhatsApp" },
  },
  zoho: {
    name: "Zoho",
    method: "POST",
    path: "/crm/v5/Leads",
    body: { data: { First_Name: LEAD.first, Last_Name: LEAD.last, Mobile: LEAD.phone, Interes: LEAD.interest, Lead_Source: "WhatsApp" } },
  },
};

function JsonView({ value, indent = "" }: { value: Record<string, Json>; indent?: string }) {
  const entries = Object.entries(value);
  const inner = indent + "  ";
  return (
    <>
      {"{\n"}
      {entries.map(([k, v], i) => (
        <span key={k}>
          {inner}
          <span className="k">&quot;{k}&quot;</span>:{" "}
          {typeof v === "object" ? <JsonView value={v} indent={inner} /> : <span className="s">&quot;{String(v)}&quot;</span>}
          {i < entries.length - 1 ? ",\n" : "\n"}
        </span>
      ))}
      {indent + "}"}
    </>
  );
}

export default function CaseSection({ t }: { t: Dict["case"] }) {
  const [crm, setCrm] = useState<Crm>("leadcars");
  const m = MAPS[crm];

  return (
    <section className="block" id="caso">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

        <div className="case">
          <div className="lane">
            <h3>
              <span className="dir in">{t.inTag}</span> {t.inTitle}
            </h3>
            <ol className="steps in">
              {t.inSteps.map((s, i) => (
                <li key={s.b}>
                  <div>
                    <b>{s.b}</b>
                    <span>{i === t.inSteps.length - 1 ? t.crmLabels[crm] : s.s}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lane">
            <h3>
              <span className="dir out">{t.outTag}</span> {t.outTitle}
            </h3>
            <ol className="steps out">
              {t.outSteps.map((s) => (
                <li key={s.b}>
                  <div>
                    <b>{s.b}</b>
                    <span>{s.s}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lane payload-lane">
          <div className="picker" role="group" aria-label={t.pickerAria}>
            <span className="lbl">{t.pickerLabel}</span>
            {(Object.keys(MAPS) as Crm[]).map((id) => (
              <button key={id} type="button" aria-pressed={crm === id} onClick={() => setCrm(id)}>
                {MAPS[id].name}
              </button>
            ))}
          </div>
          <pre className="payload">
            <span className="c">{`// normalized lead → ${crm}`}</span>
            {"\n"}
            <span className="m">{m.method}</span> {m.path}
            {"\n"}
            <JsonView value={m.body} />
          </pre>
          <p className="case-note">{t.note}</p>
        </div>
      </div>
    </section>
  );
}
