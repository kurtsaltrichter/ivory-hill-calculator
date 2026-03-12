"use client";

import { useState, useMemo, useEffect } from "react";

const STATE_TAXES = {
  AL:{name:"Alabama",sui:0.027,suiWageBase:8000,sdi:0,sdiWageBase:0},
  AK:{name:"Alaska",sui:0.031,suiWageBase:49700,sdi:0,sdiWageBase:0},
  AZ:{name:"Arizona",sui:0.02,suiWageBase:8000,sdi:0,sdiWageBase:0},
  AR:{name:"Arkansas",sui:0.031,suiWageBase:10000,sdi:0,sdiWageBase:0},
  CA:{name:"California",sui:0.034,suiWageBase:7000,sdi:0,sdiWageBase:0},
  CO:{name:"Colorado",sui:0.017,suiWageBase:23800,sdi:0,sdiWageBase:0},
  CT:{name:"Connecticut",sui:0.029,suiWageBase:25000,sdi:0,sdiWageBase:0},
  DE:{name:"Delaware",sui:0.026,suiWageBase:10500,sdi:0,sdiWageBase:0},
  FL:{name:"Florida",sui:0.027,suiWageBase:7000,sdi:0,sdiWageBase:0},
  GA:{name:"Georgia",sui:0.027,suiWageBase:9500,sdi:0,sdiWageBase:0},
  HI:{name:"Hawaii",sui:0.024,suiWageBase:56700,sdi:0.005,sdiWageBase:56700},
  ID:{name:"Idaho",sui:0.026,suiWageBase:49900,sdi:0,sdiWageBase:0},
  IL:{name:"Illinois",sui:0.033,suiWageBase:13590,sdi:0,sdiWageBase:0},
  IN:{name:"Indiana",sui:0.025,suiWageBase:9500,sdi:0,sdiWageBase:0},
  IA:{name:"Iowa",sui:0.01,suiWageBase:38200,sdi:0,sdiWageBase:0},
  KS:{name:"Kansas",sui:0.027,suiWageBase:14000,sdi:0,sdiWageBase:0},
  KY:{name:"Kentucky",sui:0.027,suiWageBase:11100,sdi:0,sdiWageBase:0},
  LA:{name:"Louisiana",sui:0.027,suiWageBase:7700,sdi:0,sdiWageBase:0},
  ME:{name:"Maine",sui:0.022,suiWageBase:12000,sdi:0,sdiWageBase:0},
  MD:{name:"Maryland",sui:0.027,suiWageBase:8500,sdi:0,sdiWageBase:0},
  MA:{name:"Massachusetts",sui:0.027,suiWageBase:15000,sdi:0.0056,sdiWageBase:15000},
  MI:{name:"Michigan",sui:0.027,suiWageBase:9500,sdi:0,sdiWageBase:0},
  MN:{name:"Minnesota",sui:0.034,suiWageBase:42000,sdi:0,sdiWageBase:0},
  MS:{name:"Mississippi",sui:0.03,suiWageBase:14000,sdi:0,sdiWageBase:0},
  MO:{name:"Missouri",sui:0.027,suiWageBase:10000,sdi:0,sdiWageBase:0},
  MT:{name:"Montana",sui:0.024,suiWageBase:43000,sdi:0,sdiWageBase:0},
  NE:{name:"Nebraska",sui:0.012,suiWageBase:9000,sdi:0,sdiWageBase:0},
  NV:{name:"Nevada",sui:0.013,suiWageBase:40100,sdi:0,sdiWageBase:0},
  NH:{name:"New Hampshire",sui:0.027,suiWageBase:14000,sdi:0,sdiWageBase:0},
  NJ:{name:"New Jersey",sui:0.036,suiWageBase:42300,sdi:0.005,sdiWageBase:42300},
  NM:{name:"New Mexico",sui:0.033,suiWageBase:31700,sdi:0,sdiWageBase:0},
  NY:{name:"New York",sui:0.041,suiWageBase:12800,sdi:0.005,sdiWageBase:12800},
  NC:{name:"North Carolina",sui:0.012,suiWageBase:31400,sdi:0,sdiWageBase:0},
  ND:{name:"North Dakota",sui:0.014,suiWageBase:40800,sdi:0,sdiWageBase:0},
  OH:{name:"Ohio",sui:0.027,suiWageBase:9000,sdi:0,sdiWageBase:0},
  OK:{name:"Oklahoma",sui:0.027,suiWageBase:25700,sdi:0,sdiWageBase:0},
  OR:{name:"Oregon",sui:0.024,suiWageBase:54300,sdi:0.001,sdiWageBase:54300},
  PA:{name:"Pennsylvania",sui:0.037,suiWageBase:10000,sdi:0,sdiWageBase:0},
  RI:{name:"Rhode Island",sui:0.024,suiWageBase:29200,sdi:0.013,sdiWageBase:84000},
  SC:{name:"South Carolina",sui:0.027,suiWageBase:14000,sdi:0,sdiWageBase:0},
  SD:{name:"South Dakota",sui:0.012,suiWageBase:15000,sdi:0,sdiWageBase:0},
  TN:{name:"Tennessee",sui:0.027,suiWageBase:7000,sdi:0,sdiWageBase:0},
  TX:{name:"Texas",sui:0.027,suiWageBase:9000,sdi:0,sdiWageBase:0},
  UT:{name:"Utah",sui:0.027,suiWageBase:44800,sdi:0,sdiWageBase:0},
  VT:{name:"Vermont",sui:0.024,suiWageBase:16100,sdi:0,sdiWageBase:0},
  VA:{name:"Virginia",sui:0.027,suiWageBase:8000,sdi:0,sdiWageBase:0},
  WA:{name:"Washington",sui:0.011,suiWageBase:72800,sdi:0.0074,sdiWageBase:176100},
  WV:{name:"West Virginia",sui:0.027,suiWageBase:9000,sdi:0,sdiWageBase:0},
  WI:{name:"Wisconsin",sui:0.035,suiWageBase:14000,sdi:0,sdiWageBase:0},
  WY:{name:"Wyoming",sui:0.027,suiWageBase:29100,sdi:0,sdiWageBase:0},
  DC:{name:"Washington D.C.",sui:0.027,suiWageBase:9000,sdi:0,sdiWageBase:0},
};

const C = {
  navy1: "#1f2536",
  navy2: "#333b50",
  navy3: "#3a4359",
  green1: "#30b569",
  green2: "#48bb88",
  gray: "#d1d3d4",
  white: "#ffffff",
};

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtP = (n) => (n * 100).toFixed(1) + "%";

function IHLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="4" fill={C.green1} />
        <text
          x="18" y="25" textAnchor="middle" fill="white"
          fontSize="16" fontFamily="var(--font-nunito), sans-serif" fontWeight="800"
        >IH</text>
      </svg>
      <div>
        <div style={{ fontSize: "15px", fontWeight: "800", color: C.white, letterSpacing: "0.12em", fontFamily: "var(--font-nunito), sans-serif", lineHeight: 1 }}>
          IVORY HILL
        </div>
        <div style={{ fontSize: "8px", fontWeight: "600", color: C.green1, letterSpacing: "0.25em", fontFamily: "var(--font-nunito), sans-serif", marginTop: "2px" }}>
          WEALTH MANAGEMENT
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "baseline" }}>
        <span style={{ fontSize: "11px", color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-nunito), sans-serif", fontWeight: "600" }}>
          {label}
        </span>
        <span style={{ fontSize: "15px", fontWeight: "800", color: C.green1, fontFamily: "var(--font-nunito), sans-serif" }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: "relative", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: pct + "%", background: `linear-gradient(90deg,${C.green1},${C.green2})`, borderRadius: "3px", transition: "width 0.05s" }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: "absolute", top: "-8px", left: 0, width: "100%", opacity: 0, cursor: "pointer", height: "22px", margin: 0 }}
        />
        <div style={{ position: "absolute", top: "-5px", left: `calc(${pct}% - 8px)`, width: "16px", height: "16px", borderRadius: "50%", background: C.green1, border: `2px solid ${C.white}`, boxShadow: "0 2px 6px rgba(0,0,0,0.4)", pointerEvents: "none", transition: "left 0.05s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
        <span style={{ fontSize: "10px", color: "rgba(209,211,212,0.3)", fontFamily: "var(--font-nunito), sans-serif" }}>{format(min)}</span>
        <span style={{ fontSize: "10px", color: "rgba(209,211,212,0.3)", fontFamily: "var(--font-nunito), sans-serif" }}>{format(max)}</span>
      </div>
    </div>
  );
}

function LineItem({ label, value, muted, total }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: total ? "12px 0" : "8px 0", borderBottom: total ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ fontSize: total ? "13px" : "12px", color: muted ? "rgba(209,211,212,0.45)" : C.gray, fontFamily: "var(--font-nunito), sans-serif", fontWeight: total ? "700" : muted ? "400" : "500" }}>
        {label}
      </span>
      <span style={{ fontSize: total ? "15px" : "13px", fontWeight: total ? "800" : "600", color: total ? C.green1 : muted ? "rgba(209,211,212,0.55)" : C.white, fontFamily: "var(--font-nunito), sans-serif" }}>
        {fmt(value)}
      </span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "14px 0 6px" }}>
      <div style={{ width: "3px", height: "12px", background: C.green1, borderRadius: "2px" }} />
      <span style={{ fontSize: "9px", color: C.green1, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-nunito), sans-serif", fontWeight: "700" }}>
        {children}
      </span>
    </div>
  );
}

export default function Calculator() {
  const [salary, setSalary] = useState(100000);
  const [stateCode, setStateCode] = useState("MN");
  const [health, setHealth] = useState("single");
  const [match, setMatch] = useState(3);
  const [wc, setWc] = useState(0.008);
  const [equip, setEquip] = useState(3000);
  const [revenue, setRevenue] = useState(400000);
  const [tab, setTab] = useState("breakdown");
  const [pdfReady, setPdfReady] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let jspdfLoaded = false;
    let html2canvasLoaded = false;
    const check = () => { if (jspdfLoaded && html2canvasLoaded) setPdfReady(true); };
    const s1 = document.createElement("script");
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s1.onload = () => { jspdfLoaded = true; check(); };
    const s2 = document.createElement("script");
    s2.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s2.onload = () => { html2canvasLoaded = true; check(); };
    document.head.appendChild(s1);
    document.head.appendChild(s2);
  }, []);

  const healthOpts = {
    none: { label: "None", cost: 0 },
    single: { label: "Single", cost: 7500 },
    spouse: { label: "Emp + Spouse", cost: 14000 },
    family: { label: "Family", cost: 20000 },
  };

  const c = useMemo(() => {
    const st = STATE_TAXES[stateCode];
    const ss = Math.min(salary, 176100) * 0.062;
    const med = salary * 0.0145;
    const futa = Math.min(salary, 7000) * 0.006;
    const sui = Math.min(salary, st.suiWageBase) * st.sui;
    const sdi = st.sdi > 0 ? Math.min(salary, st.sdiWageBase) * st.sdi : 0;
    const hCost = healthOpts[health].cost;
    const ret = salary * (match / 100);
    const wcCost = salary * wc;
    const taxTotal = ss + med + futa + sui + sdi;
    const benTotal = hCost + ret + wcCost;
    const total = salary + taxTotal + benTotal + equip;
    const mult = total / salary;
    const pctRev = total / revenue;
    return {
      ss, med, futa, sui, sdi, hCost, ret, wcCost,
      taxTotal, benTotal, total, mult, pctRev,
      revenueNeeded: total / 0.25,
      stName: st.name,
      canAfford: pctRev <= 0.3,
      comfortable: pctRev <= 0.2,
    };
  }, [salary, stateCode, health, match, wc, equip, revenue]);

  const statusColor = c.comfortable ? C.green1 : c.canAfford ? "#f59e0b" : "#ef4444";
  const statusLabel = c.comfortable ? "Comfortable" : c.canAfford ? "Manageable" : "Stretched";

  const doExport = async () => {
    if (!pdfReady || !window.jspdf || !window.html2canvas) return;
    setExporting(true);
    try {
      const { jsPDF } = window.jspdf;
      const sc = c.comfortable ? "#30b569" : c.canAfford ? "#f59e0b" : "#ef4444";
      const statusLabel = c.comfortable ? "COMFORTABLE" : c.canAfford ? "MANAGEABLE" : "STRETCHED";
      const statusMsg = c.comfortable
        ? "At "+(c.pctRev*100).toFixed(0)+"% of revenue, this hire fits comfortably within sustainable range."
        : c.canAfford
        ? "Manageable — this role should generate or protect revenue within 6–12 months."
        : "You need "+fmt(c.revenueNeeded)+" in annual revenue to hit a healthy 25% labor cost ratio.";

      const lineRow = (label, val, indent) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:9px ${indent?"12px 9px 12px 20px":"12px"};border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="font-size:12px;color:rgba(209,211,212,${indent?"0.6":"0.85"});font-weight:${indent?"400":"500"};">${label}</span>
          <span style="font-size:13px;font-weight:700;color:${indent?"rgba(255,255,255,0.8)":"#fff"};background:rgba(255,255,255,0.04);padding:3px 10px;border-radius:4px;">${val}</span>
        </div>`;
      const secHead = (label) => `
        <div style="display:flex;align-items:center;gap:8px;padding:14px 12px 6px;background:rgba(48,181,105,0.06);border-left:3px solid #30b569;margin:8px 0 0;">
          <span style="font-size:8px;color:#30b569;letter-spacing:0.2em;font-weight:800;text-transform:uppercase;">${label}</span>
        </div>`;

      const barPct = Math.min(c.pctRev * 100, 100).toFixed(1);
      const surplusColor = (revenue >= c.revenueNeeded) ? "#30b569" : "#ef4444";
      const surplusVal = (revenue >= c.revenueNeeded ? "+" : "") + fmt(revenue - c.revenueNeeded);

      const el = document.createElement("div");
      el.style.cssText = "position:fixed;left:-9999px;top:0;width:1100px;background:#161d2e;font-family:Arial,sans-serif;padding-bottom:0;";
      el.innerHTML = `
        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#1f2a40 0%,#2a3550 100%);padding:26px 44px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #30b569;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:38px;height:38px;background:linear-gradient(135deg,#30b569,#48bb88);border-radius:8px;display:flex;align-items:center;justify-content:center;">
              <span style="color:#fff;font-size:14px;font-weight:900;letter-spacing:-1px;">IH</span>
            </div>
            <div>
              <div style="font-size:19px;font-weight:900;color:#fff;letter-spacing:0.14em;line-height:1;">IVORY HILL</div>
              <div style="font-size:8px;color:#30b569;letter-spacing:0.22em;font-weight:700;margin-top:3px;">WEALTH MANAGEMENT</div>
            </div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:15px;font-weight:700;color:#fff;letter-spacing:0.04em;">True Cost of Hire</div>
            <div style="font-size:9px;color:rgba(209,211,212,0.45);margin-top:4px;letter-spacing:0.08em;">EMPLOYER COST ANALYSIS</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:10px;color:rgba(209,211,212,0.5);letter-spacing:0.05em;">${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
            <div style="font-size:9px;color:rgba(48,181,105,0.6);margin-top:3px;">ivoryhill.com</div>
          </div>
        </div>

        <!-- HERO BAND -->
        <div style="background:linear-gradient(135deg,#243044 0%,#1e2a3d 100%);padding:28px 44px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <div>
            <div style="font-size:8.5px;color:#30b569;letter-spacing:0.22em;font-weight:800;margin-bottom:8px;">TOTAL ANNUAL EMPLOYER COST</div>
            <div style="font-size:52px;font-weight:900;color:#fff;line-height:1;letter-spacing:-1px;">${fmt(c.total)}</div>
            <div style="font-size:12px;color:rgba(209,211,212,0.5);margin-top:8px;">${fmt(salary)} base salary &nbsp;·&nbsp; ${c.stName}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:12px;">
            <div style="background:rgba(48,181,105,0.12);border:1px solid rgba(48,181,105,0.3);padding:10px 20px;border-radius:8px;text-align:center;">
              <div style="font-size:28px;font-weight:900;color:#30b569;line-height:1;">${c.mult.toFixed(2)}x</div>
              <div style="font-size:8px;color:rgba(48,181,105,0.7);letter-spacing:0.12em;margin-top:3px;">SALARY MULTIPLIER</div>
            </div>
            <div style="font-size:10px;color:rgba(209,211,212,0.4);text-align:right;">All-in cost including taxes,<br>benefits &amp; overhead</div>
          </div>
        </div>

        <!-- INPUT PILLS -->
        <div style="display:flex;gap:0;margin:0;border-bottom:1px solid rgba(255,255,255,0.06);">
          ${[["BASE SALARY",fmt(salary)],["401(K) MATCH",match+"%"],["HEALTH COVERAGE",healthOpts[health].label],["WORKERS COMP",(wc*100).toFixed(1)+"%"],["EQUIP / ONBOARD",fmt(equip)],["ANNUAL REVENUE",fmt(revenue)]].map(([l,v],i)=>`
            <div style="flex:1;padding:14px 12px;text-align:center;border-right:1px solid rgba(255,255,255,0.05);background:${i%2===0?"rgba(255,255,255,0.015)":"transparent"};">
              <div style="font-size:6.5px;color:#30b569;letter-spacing:0.18em;font-weight:800;margin-bottom:6px;">${l}</div>
              <div style="font-size:14px;font-weight:800;color:#fff;">${v}</div>
            </div>`).join("")}
        </div>

        <!-- TWO COLUMNS -->
        <div style="display:flex;gap:0;padding:0;">

          <!-- LEFT: COST BREAKDOWN -->
          <div style="flex:1;border-right:1px solid rgba(255,255,255,0.06);padding:24px 0 24px;">
            <div style="padding:0 24px 14px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="font-size:9px;color:#30b569;letter-spacing:0.2em;font-weight:800;">COST BREAKDOWN</div>
            </div>
            <div style="padding:0 12px;">
              ${secHead("BASE COMPENSATION")}
              ${lineRow("Base Salary", fmt(salary), false)}
              ${secHead("FEDERAL TAXES")}
              ${lineRow("Social Security (6.2%)", fmt(c.ss), true)}
              ${lineRow("Medicare (1.45%)", fmt(c.med), true)}
              ${lineRow("FUTA (0.6% on first $7,000)", fmt(c.futa), true)}
              ${secHead("STATE TAXES — "+stateCode+" ("+c.stName+")")}
              ${lineRow("State Unemployment ("+fmtP(STATE_TAXES[stateCode].sui)+", base "+fmt(STATE_TAXES[stateCode].suiWageBase)+")", fmt(c.sui), true)}
              ${c.sdi > 0 ? lineRow("State Disability ("+fmtP(STATE_TAXES[stateCode].sdi)+")", fmt(c.sdi), true) : ""}
              ${secHead("BENEFITS & OVERHEAD")}
              ${lineRow("Health & Dental — "+healthOpts[health].label, fmt(c.hCost), true)}
              ${lineRow("401(k) Employer Match ("+match+"%)", fmt(c.ret), true)}
              ${lineRow("Workers Compensation ("+(wc*100).toFixed(1)+"%)", fmt(c.wcCost), true)}
              ${lineRow("Equipment & Onboarding", fmt(equip), true)}
            </div>
            <div style="margin:16px 12px 0;padding:16px 18px;background:linear-gradient(135deg,rgba(48,181,105,0.12),rgba(48,181,105,0.06));border:1px solid rgba(48,181,105,0.3);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:14px;font-weight:900;color:#fff;letter-spacing:0.04em;">TOTAL EMPLOYER COST</span>
              <span style="font-size:22px;font-weight:900;color:#30b569;">${fmt(c.total)}</span>
            </div>
          </div>

          <!-- RIGHT: AFFORDABILITY -->
          <div style="flex:1;padding:24px 0 24px;">
            <div style="padding:0 24px 14px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="font-size:9px;color:#30b569;letter-spacing:0.2em;font-weight:800;">CAN YOU AFFORD IT?</div>
            </div>
            <div style="padding:16px 20px;">

              <!-- Verdict card -->
              <div style="background:linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));border:1.5px solid ${sc};border-radius:10px;padding:22px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden;">
                <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${sc};"></div>
                <div style="font-size:28px;font-weight:900;color:${sc};letter-spacing:0.08em;margin-bottom:8px;">${statusLabel}</div>
                <div style="font-size:13px;color:#d1d3d4;margin-bottom:6px;">${(c.pctRev*100).toFixed(1)}% of ${fmt(revenue)} annual revenue</div>
                <div style="font-size:11px;color:rgba(209,211,212,0.55);line-height:1.5;">${statusMsg}</div>
              </div>

              <!-- Progress bar -->
              <div style="margin-bottom:20px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span style="font-size:10px;color:rgba(209,211,212,0.55);">Labor Cost as % of Revenue</span>
                  <span style="font-size:11px;font-weight:800;color:${sc};">${(c.pctRev*100).toFixed(1)}%</span>
                </div>
                <div style="height:12px;background:rgba(255,255,255,0.07);border-radius:6px;overflow:hidden;position:relative;">
                  <div style="position:absolute;left:0;top:0;height:100%;width:20%;background:rgba(48,181,105,0.15);border-right:1px dashed rgba(48,181,105,0.4);"></div>
                  <div style="position:absolute;left:0;top:0;height:100%;width:30%;background:rgba(245,158,11,0.08);border-right:1px dashed rgba(245,158,11,0.4);"></div>
                  <div style="height:100%;width:${barPct}%;background:linear-gradient(90deg,${sc},${sc}cc);border-radius:6px;transition:width 0.3s;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:5px;">
                  <span style="font-size:7.5px;color:rgba(48,181,105,0.5);">● Comfortable ≤20%</span>
                  <span style="font-size:7.5px;color:rgba(245,158,11,0.5);">● Manageable ≤30%</span>
                  <span style="font-size:7.5px;color:rgba(239,68,68,0.5);">● Stretched &gt;30%</span>
                </div>
              </div>

              <!-- Metric cards grid -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                ${[
                  ["Revenue Needed", fmt(c.revenueNeeded), "for 25% labor ratio", "rgba(209,211,212,0.9)"],
                  ["Your Revenue", fmt(revenue), "current annual revenue", "rgba(209,211,212,0.9)"],
                  ["Surplus / Gap", surplusVal, "vs. 25% target", surplusColor],
                  ["Daily Cost", fmt(Math.round(c.total/260)), "per working day", "rgba(209,211,212,0.9)"],
                  ["Hourly Cost", fmt(Math.round(c.total/2080)), "per working hour", "rgba(209,211,212,0.9)"],
                  ["Monthly Cost", fmt(Math.round(c.total/12)), "per month all-in", "rgba(209,211,212,0.9)"],
                ].map(([l,v,sub,col])=>`
                  <div style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:14px 16px;">
                    <div style="font-size:18px;font-weight:900;color:${col};line-height:1;margin-bottom:4px;">${v}</div>
                    <div style="font-size:10px;font-weight:700;color:rgba(209,211,212,0.8);margin-bottom:2px;">${l}</div>
                    <div style="font-size:8.5px;color:rgba(209,211,212,0.35);">${sub}</div>
                  </div>`).join("")}
              </div>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background:linear-gradient(135deg,#151c2e,#1a2236);padding:14px 44px;border-top:2px solid #30b569;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:8.5px;color:rgba(209,211,212,0.35);">Estimates only — consult a CPA for precise figures. SUI/SDI reflect 2025 new employer averages.</span>
          <span style="font-size:8.5px;color:rgba(48,181,105,0.6);">ivoryhill.com &nbsp;|&nbsp; kurt@ivoryhill.com &nbsp;|&nbsp; 952.828.5336</span>
        </div>
      `;

      document.body.appendChild(el);
      const canvas = await window.html2canvas(el, {
        backgroundColor: "#161d2e",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: 1100,
        height: el.scrollHeight,
        windowWidth: 1100,
        windowHeight: el.scrollHeight,
      });
      document.body.removeChild(el);

      const imgData = canvas.toDataURL("image/png");
      const pdfW = 1056;
      const pdfH = Math.round((canvas.height / canvas.width) * pdfW);
      const doc = new jsPDF({ unit: "pt", format: [pdfW, pdfH], orientation: "landscape" });
      doc.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
      doc.save("ivory-hill-hire-cost-" + new Date().toISOString().slice(0, 10) + ".pdf");
    } catch (e) { console.error(e); }
    setExporting(false);
  };

  return (
    <div id="calc-root" style={{ minHeight: "100vh", background: C.navy1, fontFamily: "var(--font-nunito), sans-serif", paddingBottom: "48px" }}>

      {/* Nav */}
      <nav style={{ background: C.navy2, borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <IHLogo />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "11px", color: "rgba(209,211,212,0.35)", fontWeight: "600", letterSpacing: "0.1em" }}>
            TRUE COST OF HIRE
          </span>
          <button
            onClick={doExport}
            disabled={!pdfReady || exporting}
            style={{ display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", background: pdfReady ? `linear-gradient(135deg,${C.green1},${C.green2})` : "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: pdfReady ? C.white : C.gray, fontSize: "12px", fontWeight: "700", fontFamily: "inherit", cursor: pdfReady ? "pointer" : "not-allowed", letterSpacing: "0.05em", transition: "all 0.2s", boxShadow: pdfReady ? "0 2px 12px rgba(48,181,105,0.3)" : "none" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {!pdfReady ? "Loading..." : exporting ? "Generating..." : "Export PDF"}
          </button>
        </div>
      </nav>

      {/* Hero strip */}
      <div style={{ background: `linear-gradient(135deg,${C.navy2} 0%,${C.navy1} 100%)`, borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "32px 32px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "100%", background: "radial-gradient(ellipse at right,rgba(48,181,105,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: "900", color: C.white, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            True Cost of Hire Calculator
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(209,211,212,0.55)", margin: 0, fontWeight: "500" }}>
            All-in employer cost — federal & state taxes, benefits, 401(k), workers&apos; comp, and overhead
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: "960px", margin: "32px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>

        {/* LEFT: Inputs */}
        <div style={{ background: C.navy2, borderRadius: "16px", padding: "28px", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "10px", color: C.green1, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "700", marginBottom: "24px" }}>
            Configure Hire
          </div>
          <Slider label="Base Salary" value={salary} min={40000} max={300000} step={5000} onChange={setSalary} format={fmt} />
          <Slider label="401(k) Match" value={match} min={0} max={6} step={0.5} onChange={setMatch} format={(v) => v + "%"} />
          <Slider label="Workers' Comp Rate" value={wc} min={0.002} max={0.04} step={0.001} onChange={setWc} format={(v) => (v * 100).toFixed(1) + "%"} />
          <Slider label="Equipment & Onboarding" value={equip} min={0} max={15000} step={500} onChange={setEquip} format={fmt} />
          <Slider label="Business Annual Revenue" value={revenue} min={100000} max={2000000} step={25000} onChange={setRevenue} format={fmt} />

          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>State</div>
            <div style={{ position: "relative" }}>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                style={{ width: "100%", background: C.navy3, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: C.white, padding: "10px 36px 10px 14px", fontSize: "13px", fontFamily: "inherit", fontWeight: "500", cursor: "pointer", outline: "none", appearance: "none" }}
              >
                {Object.entries(STATE_TAXES).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([code, s]) => (
                  <option key={code} value={code}>{s.name}</option>
                ))}
              </select>
              <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="8" viewBox="0 0 12 8"><path fill={C.green1} d="M6 8L0 0h12z" /></svg>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "600", marginBottom: "10px" }}>
              Health Coverage (Employer Portion)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {Object.entries(healthOpts).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setHealth(k)}
                  style={{ padding: "10px 8px", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", border: health === k ? `1.5px solid ${C.green1}` : "1px solid rgba(255,255,255,0.08)", background: health === k ? "rgba(48,181,105,0.12)" : "rgba(255,255,255,0.03)", color: health === k ? C.green1 : C.gray, transition: "all 0.15s", textAlign: "center" }}
                >
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>{v.label}</div>
                  <div style={{ fontSize: "11px", marginTop: "2px", opacity: 0.7 }}>{v.cost > 0 ? fmt(v.cost) + "/yr" : "—"}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Hero number */}
          <div style={{ background: `linear-gradient(135deg,${C.navy2} 0%,${C.navy3} 100%)`, borderRadius: "16px", padding: "28px", border: "1px solid rgba(48,181,105,0.2)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: "radial-gradient(circle,rgba(48,181,105,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ fontSize: "10px", color: C.green1, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "700", marginBottom: "10px" }}>
              Total Annual Cost to Employer
            </div>
            <div style={{ fontSize: "clamp(34px,5vw,48px)", fontWeight: "900", color: C.white, lineHeight: 1, marginBottom: "10px" }}>
              {fmt(c.total)}
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "13px", color: C.gray }}><span style={{ color: C.green1, fontWeight: "700" }}>{c.mult.toFixed(2)}x</span> multiplier</span>
              <span style={{ fontSize: "13px", color: C.gray }}>{fmt(salary)} base</span>
              <span style={{ fontSize: "13px", color: C.gray }}>{c.stName}</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: C.navy1, borderRadius: "10px", padding: "4px", gap: "4px", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[["breakdown", "Cost Breakdown"], ["afford", "Can You Afford It?"]].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                style={{ flex: 1, padding: "9px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", border: "none", background: tab === k ? C.navy2 : "transparent", color: tab === k ? C.white : C.gray, transition: "all 0.15s", letterSpacing: "0.02em" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cost Breakdown */}
          {tab === "breakdown" && (
            <div style={{ background: C.navy2, borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "10px", color: C.green1, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "700", marginBottom: "4px" }}>
                Full Breakdown — {c.stName}
              </div>
              <LineItem label="Base Salary" value={salary} />
              <SectionLabel>Federal Taxes</SectionLabel>
              <LineItem label="Social Security (6.2%)" value={c.ss} muted />
              <LineItem label="Medicare (1.45%)" value={c.med} muted />
              <LineItem label="FUTA (0.6%)" value={c.futa} muted />
              <SectionLabel>State Taxes ({stateCode})</SectionLabel>
              <LineItem label={`SUI ${fmtP(STATE_TAXES[stateCode].sui)} — base ${fmt(STATE_TAXES[stateCode].suiWageBase)}`} value={c.sui} muted />
              {c.sdi > 0 && <LineItem label={`SDI ${fmtP(STATE_TAXES[stateCode].sdi)}`} value={c.sdi} muted />}
              <SectionLabel>Benefits & Overhead</SectionLabel>
              <LineItem label={`Health/Dental (${healthOpts[health].label})`} value={c.hCost} muted />
              <LineItem label={`401(k) Match (${match}%)`} value={c.ret} muted />
              <LineItem label={`Workers' Comp (${(wc * 100).toFixed(1)}%)`} value={c.wcCost} muted />
              <LineItem label="Equipment & Onboarding" value={equip} muted />
              <div style={{ height: "1px", background: `linear-gradient(90deg,${C.green1},transparent)`, margin: "12px 0" }} />
              <LineItem label="Total Employer Cost" value={c.total} total />
            </div>
          )}

          {/* Affordability */}
          {tab === "afford" && (
            <div style={{ background: C.navy2, borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "10px", color: C.green1, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "700", marginBottom: "20px" }}>
                Affordability Analysis
              </div>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "110px", height: "110px", borderRadius: "50%", border: `3px solid ${statusColor}`, background: `${statusColor}12`, marginBottom: "10px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: statusColor }}>{(c.pctRev * 100).toFixed(0)}%</div>
                  <div style={{ fontSize: "9px", color: statusColor, letterSpacing: "0.1em" }}>OF REVENUE</div>
                </div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: statusColor }}>{statusLabel}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                {[
                  { range: "<=20%", label: "Comfortable", color: C.green1, active: c.comfortable },
                  { range: "21-30%", label: "Manageable", color: "#f59e0b", active: !c.comfortable && c.canAfford },
                  { range: ">30%", label: "Stretched", color: "#ef4444", active: !c.canAfford },
                ].map((r) => (
                  <div key={r.label} style={{ padding: "12px 6px", borderRadius: "10px", textAlign: "center", background: r.active ? `${r.color}14` : "rgba(255,255,255,0.02)", border: `1.5px solid ${r.active ? r.color : "rgba(255,255,255,0.06)"}` }}>
                    <div style={{ fontSize: "12px", fontWeight: "800", color: r.active ? r.color : "rgba(209,211,212,0.2)" }}>{r.range}</div>
                    <div style={{ fontSize: "10px", color: r.active ? r.color : "rgba(209,211,212,0.2)", marginTop: "2px" }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: C.navy1, borderRadius: "10px", padding: "16px", marginBottom: "14px" }}>
                {[
                  ["Employee Total Cost", fmt(c.total), C.white],
                  ["Business Revenue", fmt(revenue), C.white],
                  ["Cost % of Revenue", (c.pctRev * 100).toFixed(1) + "%", statusColor],
                  ["Revenue Needed (25% ratio)", fmt(c.revenueNeeded), C.green1],
                ].map(([l, v, col]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: "12px", color: C.gray }}>{l}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: col }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px", background: `${statusColor}0e`, borderRadius: "10px", border: `1px solid ${statusColor}28` }}>
                <p style={{ margin: 0, fontSize: "12px", color: C.gray, lineHeight: "1.65" }}>
                  {c.comfortable
                    ? `At ${(c.pctRev * 100).toFixed(0)}% of revenue, this hire is within sustainable range. Current revenue supports this position without requiring immediate ROI from the new employee.`
                    : c.canAfford
                    ? `At ${(c.pctRev * 100).toFixed(0)}% of revenue, this hire is manageable but this role should generate or protect revenue within 6-12 months to stay sustainable.`
                    : `At ${(c.pctRev * 100).toFixed(0)}% of revenue, this hire creates real pressure. The business needs ${fmt(c.revenueNeeded)} in annual revenue to carry this position at a healthy 25% labor ratio.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth: "960px", margin: "24px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: C.navy2, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "11px", color: "rgba(209,211,212,0.3)", fontWeight: "500" }}>
            Estimates only. Consult a CPA. SUI/SDI rates reflect 2025 new employer averages by state.
          </span>
          <a href="https://ivoryhill.com" style={{ fontSize: "11px", color: "rgba(48,181,105,0.6)", fontWeight: "700", textDecoration: "none" }}>
            ivoryhill.com
          </a>
        </div>
      </div>
    </div>
  );
}
