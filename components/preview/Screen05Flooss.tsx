import React from "react";
import Image from "next/image";

export function Screen05Flooss() {
  const capabilities = [
    {
      num: "01",
      name: "PLAN",
      desc: "Capital runway architecture, multi-year operating plans, and strategic capital allocation.",
    },
    {
      num: "02",
      name: "FORECAST",
      desc: "Dynamic rolling models calibrated to fintech transaction volumes and cost of capital.",
    },
    {
      num: "03",
      name: "ANALYZE",
      desc: "Cohort unit economics, payback velocity modeling, and contribution margin diagnostics.",
    },
    {
      num: "04",
      name: "REPORT",
      desc: "Board-level executive decks and investor-grade reporting delivering total transparency.",
    },
  ];

  return (
    <section
      id="screen-05"
      className="relative w-full h-screen overflow-hidden bg-[#F5F2EA] text-[#111513] flex flex-col justify-between p-10 lg:p-14 select-none"
    >
      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#111513]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#345B4B]" />
          <span className="text-xs font-bold tracking-[0.24em] text-[#345B4B] uppercase">
            Present Leadership · 2025 — PRESENT
          </span>
        </div>

        <div className="text-xs font-mono tracking-wider text-[#111513]/70">
          FLOOSS FINTECH · RIYADH
        </div>
      </header>

      {/* Main Grid: Left Breaking Silhouette (44%) + Right Authoritative Executive Profile (56%) */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto py-2">
        {/* Left Column: Sameer Physically Dominates — Cutout Visibly Breaks Outside Plane */}
        <div className="col-span-5 relative h-full flex items-end justify-center">
          {/* Deep-Green Architectural Plane BEHIND Him (Smaller footprint for deliberate breakout) */}
          <div
            className="absolute bottom-0 left-4 w-[74%] h-[78%] bg-[#13231E] rounded-t-[2px] shadow-2xl z-10"
            style={{
              boxShadow: "0 30px 60px -15px rgba(19, 35, 30, 0.4)",
            }}
          >
            {/* Elegant thin champagne top edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8A06A]" />
            <div className="absolute top-4 left-4 text-[10px] tracking-[0.25em] text-[#B8A06A]/40 font-mono uppercase">
              FINTECH FP&amp;A LEAD
            </div>
          </div>

          {/* Transparent Cutout Layered in Front (z-20) — Head and Shoulders Naturally Overlap and Escape Plane */}
          <div className="relative z-20 h-[98%] w-auto flex items-end justify-center">
            <Image
              src="/portrait/sameer-majeed.png"
              alt="Sameer Majeed, FP&A Manager at Flooss"
              width={660}
              height={880}
              priority
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>

        {/* Right Column: High-Impact Role, Massive Statement, Deliberate Capability System */}
        <div className="col-span-7 flex flex-col justify-center pl-4 pr-2">
          {/* Role Meta */}
          <div className="flex items-baseline gap-4 mb-2">
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#111513]">
              FLOOSS
            </h3>
            <span className="text-lg font-semibold tracking-[0.2em] text-[#B8A06A] uppercase">
              FP&amp;A MANAGER
            </span>
          </div>

          <div className="text-xs font-mono text-[#345B4B] font-bold tracking-wider mb-2">
            CURRENT ROLE · 2025 — PRESENT · RIYADH
          </div>

          {/* Dominant Editorial Statement */}
          <h2 className="text-7xl lg:text-[6.25rem] font-light tracking-[-0.04em] text-[#111513] leading-[0.88] my-3">
            PLANNING <br />
            WHAT COMES <br />
            <span className="font-serif italic font-normal text-[#345B4B]">
              NEXT.
            </span>
          </h2>

          {/* Integrated Capability System — Bold, Deliberate Spacing (No thin footer feel) */}
          <div className="mt-6 pt-5 border-t-2 border-[#111513]">
            <div className="grid grid-cols-4 gap-4">
              {capabilities.map((cap) => (
                <div key={cap.name} className="flex flex-col">
                  <div className="flex items-center justify-between pb-1 border-b border-[#111513]/20">
                    <span className="text-xs font-mono font-bold text-[#345B4B]">
                      {cap.num}
                    </span>
                    <span className="text-base font-bold tracking-[0.14em] text-[#111513] uppercase">
                      {cap.name}
                    </span>
                  </div>

                  <p className="text-xs text-[#111513]/80 font-light leading-relaxed mt-2">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-10 border-t border-[#111513]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#111513]/70">
        <span>VENTURE RUNWAY &amp; UNIT ECONOMICS</span>
        <span className="text-[#345B4B] font-bold">SCREEN 05 / 06</span>
      </footer>
    </section>
  );
}
