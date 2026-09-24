"use client";

import React, { useState } from "react";

interface SkillItem {
  id: string;
  name: string;
  category: "FP&A & MODELING" | "GOVERNANCE & IFRS" | "SYSTEMS & ERP";
  level: string;
  description: string;
  iconSymbol: string;
}

export function FinancialToolkit() {
  const [activeSkill, setActiveSkill] = useState<string>("fpa");

  const skills: SkillItem[] = [
    {
      id: "fpa",
      name: "Financial Planning & Analysis",
      category: "FP&A & MODELING",
      level: "Core Discipline",
      description:
        "Multi-year business modeling, annual operating plans, rolling forecasts, unit economics, capital runway analysis, and variance intelligence connecting past performance to forward guidance.",
      iconSymbol: "FP&A",
    },
    {
      id: "budgeting",
      name: "Enterprise Annual Budgeting",
      category: "FP&A & MODELING",
      level: "Leadership Mastery",
      description:
        "Building and steering institutional budgets across business divisions, setting viable expenditure targets, executive presentations, and cross-departmental alignment.",
      iconSymbol: "AOP",
    },
    {
      id: "forecasting",
      name: "Rolling Quarterly Forecasts",
      category: "FP&A & MODELING",
      level: "Dynamic Modeling",
      description:
        "Responsive financial re-forecasting adapting to macroeconomic shifts, cohort behavior, interest rate fluctuations, and burn rate optimizations.",
      iconSymbol: "FCST",
    },
    {
      id: "variance",
      name: "Variance & Ratio Analysis",
      category: "FP&A & MODELING",
      level: "Analytical Rigor",
      description:
        "Isolating operational price/volume/mix drivers behind deviations from budget and forecast; delivering proactive corrective recommendations to senior executives.",
      iconSymbol: "VAR",
    },
    {
      id: "ifrs",
      name: "IFRS Financial Reporting",
      category: "GOVERNANCE & IFRS",
      level: "Statutory Standard",
      description:
        "Comprehensive execution of monthly, quarterly and annual management financial statements under International Financial Reporting Standards and SAMA regulatory oversight.",
      iconSymbol: "IFRS",
    },
    {
      id: "controls",
      name: "Internal Controls & Audit",
      category: "GOVERNANCE & IFRS",
      level: "Chartered Rigor",
      description:
        "Drafting and evaluating entity-level control environments, segregation of duties, chart of accounts governance, and direct liaison with external Big 4 / statutory auditors.",
      iconSymbol: "CTRL",
    },
    {
      id: "banking",
      name: "Cash Flow & Bank Debt Facilities",
      category: "GOVERNANCE & IFRS",
      level: "Liquidity Oversight",
      description:
        "Managing working capital cycles, aging analysis of payables/receivables, debt covenants, and import Letters of Credit (LCs) negotiation with corporate banking partners.",
      iconSymbol: "LIQ",
    },
    {
      id: "sap",
      name: "SAP ERP Architecture",
      category: "SYSTEMS & ERP",
      level: "Enterprise Scale",
      description:
        "Hands-on execution in SAP Business One and enterprise SAP modules: General Ledger, Analytical Accounting, Purchasing & Procurement, and cost/profit center restructuring.",
      iconSymbol: "SAP",
    },
    {
      id: "powerbi",
      name: "Power BI & Management Dashboards",
      category: "SYSTEMS & ERP",
      level: "Executive Visuals",
      description:
        "Translating complex general ledger data into dynamic, C-suite visual dashboards with KPI alerts, revenue cohort breakdowns, and real-time variance tracking.",
      iconSymbol: "PBI",
    },
  ];

  const selected = skills.find((s) => s.id === activeSkill) || skills[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 lg:p-14 select-none">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#303640] pb-4 pt-8">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF] shadow-[0_0_10px_#3D73FF]" />
          <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
            08 — FINANCIAL TOOLKIT &amp; EXECUTIVE COMPETENCY
          </span>
        </div>
        <div className="text-xs font-mono text-[#AAB1BC] tracking-wider">
          VERIFIED SKILLS · 10+ YEARS EXPERIENCE
        </div>
      </header>

      {/* Main Content Area: 3D Spatial Matrix + Active Inspector */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto py-6">
        {/* Left 3D Grid of Capability Tiles */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-3.5">
          {skills.map((skill) => {
            const isCurrent = skill.id === activeSkill;
            return (
              <button
                key={skill.id}
                onClick={() => setActiveSkill(skill.id)}
                className={`relative p-4 rounded-xl text-left transition-all duration-300 flex flex-col justify-between h-32 border ${
                  isCurrent
                    ? "bg-[#171B22] border-[#3D73FF] shadow-[0_0_25px_rgba(61,115,255,0.25)] scale-[1.02]"
                    : "bg-[#0D1015]/80 border-[#303640]/70 hover:border-[#AAB1BC]/50 hover:bg-[#171B22]/60"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isCurrent
                        ? "bg-[#245BFF] text-[#F4F6F8]"
                        : "bg-[#171B22] text-[#AAB1BC]"
                    }`}
                  >
                    {skill.iconSymbol}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? "bg-[#3D73FF]" : "bg-transparent"
                    }`}
                  />
                </div>

                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#AAB1BC] uppercase">
                    {skill.category}
                  </div>
                  <div
                    className={`text-sm font-semibold tracking-tight leading-snug mt-0.5 line-clamp-2 ${
                      isCurrent ? "text-[#F4F6F8]" : "text-[#AAB1BC]"
                    }`}
                  >
                    {skill.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Capability Inspector */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#303640] pt-6 lg:pt-0">
          <div className="p-8 rounded-2xl bg-[#0D1015] border border-[#303640] relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#245BFF]/15 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#3D73FF] tracking-widest uppercase">
                {selected.category}
              </span>
              <span className="text-xs font-mono text-[#AAB1BC]">·</span>
              <span className="text-xs font-mono text-[#AAB1BC]">{selected.level}</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#F4F6F8]">
              {selected.name}
            </h3>

            <p className="text-base text-[#AAB1BC] font-light leading-relaxed mt-4">
              {selected.description}
            </p>

            <div className="mt-8 pt-5 border-t border-[#303640]/60 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
              <span>CORE ASSET OF SAMEER MAJEED</span>
              <span className="text-[#3D73FF] font-semibold">CLICK ANY TILE TO EXPLORE</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#303640] pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
        <span>INTELLIGENT FINANCIAL ARCHITECTURE</span>
        <span className="text-[#3D73FF] font-bold">DISCIPLINE · FORESIGHT · SYSTEMS</span>
      </footer>
    </div>
  );
}
