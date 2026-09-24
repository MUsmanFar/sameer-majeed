import React from "react";

export function Screen04FPA() {
  const disciplines = [
    "Enterprise Annual Budgeting",
    "Quarterly Rolling Forecasts",
    "Strategic Financial Analysis",
    "Executive Management Reporting",
  ];

  return (
    <section
      id="screen-04"
      className="relative w-full h-screen overflow-hidden bg-[#111513] text-[#F5F2EA] flex flex-col justify-between p-10 lg:p-14 select-none"
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 50% 50%, #152620 0%, #111513 85%)",
      }}
    >
      {/* Top Header */}
      <header className="relative z-20 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
          <span className="text-xs font-semibold tracking-[0.24em] text-[#B8A06A] uppercase">
            Financial Planning &amp; Analysis
          </span>
        </div>

        <div className="text-xs font-mono tracking-wider text-[#F5F2EA]/50">
          AL RAJHI BANK · 2023 — 2025
        </div>
      </header>

      {/* Full-Canvas Editorial Financial Art Direction SVG (Spans Across Composition) */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 1440 700"
          className="w-full h-full overflow-visible opacity-90"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Subtle Variance Shading Between Actual & Budget */}
            <linearGradient id="editorialVariance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8A06A" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#B8A06A" stopOpacity="0.02" />
            </linearGradient>

            {/* Expressive Forward Forecast Predictive Ribbon */}
            <linearGradient id="editorialForecast" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#345B4B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4E876F" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Subdued Minimalist Horizontal Flow Guidelines */}
          <line x1="80" y1="180" x2="1360" y2="180" stroke="#F5F2EA" strokeOpacity="0.04" strokeDasharray="6 6" />
          <line x1="80" y1="340" x2="1360" y2="340" stroke="#F5F2EA" strokeOpacity="0.04" strokeDasharray="6 6" />
          <line x1="80" y1="500" x2="1360" y2="500" stroke="#F5F2EA" strokeOpacity="0.04" strokeDasharray="6 6" />

          {/* Forecast Horizon Anchor Line */}
          <line x1="720" y1="120" x2="720" y2="560" stroke="#B8A06A" strokeOpacity="0.25" strokeDasharray="4 4" />
          <text x="730" y="145" fill="#B8A06A" fontSize="12" fontFamily="monospace" letterSpacing="2" opacity="0.8">
            ROLLING HORIZON
          </text>

          {/* Forecast Expanding Corridor (Extending Confidently Toward the Future / Right Edge) */}
          <polygon
            points="720,280 880,220 1060,160 1240,110 1380,80 1380,360 1240,340 1060,320 880,300 720,280"
            fill="url(#editorialForecast)"
          />

          {/* Subtle Shaded Variance Delta between Actual and Budget */}
          <polygon
            points="100,520 240,460 380,410 520,355 640,310 720,280 720,330 640,365 520,405 380,450 240,490 100,535"
            fill="url(#editorialVariance)"
          />

          {/* BUDGET Path (Dashed Reference Baseline) */}
          <path
            d="M 100,535 L 240,490 L 380,450 L 520,405 L 640,365 L 720,330 L 880,290 L 1060,250 L 1240,215 L 1380,185"
            fill="none"
            stroke="#B8A06A"
            strokeWidth="3"
            strokeDasharray="8 6"
          />

          {/* ACTUAL Path (Confident Bold Solid Ivory Trajectory) */}
          <path
            d="M 100,520 L 240,460 L 380,410 L 520,355 L 640,310 L 720,280"
            fill="none"
            stroke="#F5F2EA"
            strokeWidth="4.5"
          />

          {/* FORECAST Path (Most Expressive Trajectory — Extending Toward Right Edge) */}
          <path
            d="M 720,280 L 880,245 L 1060,200 L 1240,155 L 1380,120"
            fill="none"
            stroke="#4E876F"
            strokeWidth="4.5"
            strokeDasharray="7 5"
          />

          {/* Direct On-Path Text Labels (Art Direction) */}
          <text x="360" y="390" fill="#F5F2EA" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
            ACTUAL
          </text>

          <text x="360" y="475" fill="#B8A06A" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
            BUDGET
          </text>

          <text x="960" y="190" fill="#4E876F" fontSize="14" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
            FORECAST →
          </text>

          {/* Historical Data Nodes */}
          {[
            { cx: 100, cy: 520 },
            { cx: 240, cy: 460 },
            { cx: 380, cy: 410 },
            { cx: 520, cy: 355 },
            { cx: 640, cy: 310 },
            { cx: 720, cy: 280 },
          ].map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r="6" fill="#111513" stroke="#F5F2EA" strokeWidth="3" />
          ))}

          {/* Future Projection Nodes */}
          {[
            { cx: 880, cy: 245 },
            { cx: 1060, cy: 200 },
            { cx: 1240, cy: 155 },
            { cx: 1380, cy: 120 },
          ].map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r="5" fill="#111513" stroke="#4E876F" strokeWidth="2.5" />
          ))}
        </svg>
      </div>

      {/* Foreground Content: Upper-Left Headline + Lower-Right Al Rajhi Bank */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-between my-auto py-4">
        {/* Upper-Left Dominant Statement */}
        <div className="col-span-7 flex flex-col justify-start pt-2">
          <span className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold mb-2">
            PAST DATA → ANALYSIS → FUTURE DIRECTION
          </span>

          <h2 className="text-6xl lg:text-[5.5rem] font-light tracking-[-0.04em] leading-[0.92] text-[#F5F2EA]">
            FROM REPORTING <br />
            <span className="font-serif italic font-normal text-[#B8A06A]">
              TO FORESIGHT.
            </span>
          </h2>
        </div>

        {/* Lower-Right Substantially Larger Al Rajhi Bank Block */}
        <div className="col-span-5 col-start-8 flex flex-col justify-end pb-2">
          <div className="text-xs font-mono text-[#B8A06A] tracking-[0.25em] uppercase font-bold mb-1">
            ENTERPRISE FP&amp;A
          </div>

          <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F2EA]">
            AL RAJHI BANK
          </h3>

          <div className="text-base font-mono text-[#B8A06A] font-semibold mt-1">
            FP&amp;A SPECIALIST · 2023 — 2025
          </div>

          {/* Four Clean Readable Disciplines */}
          <div className="mt-6 space-y-2.5 pt-4 border-t border-[#F5F2EA]/20">
            {disciplines.map((item, idx) => (
              <div key={item} className="flex items-center gap-3 text-lg text-[#F5F2EA]">
                <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
                <span className="font-medium tracking-wide">{item}</span>
                <span className="text-xs font-mono text-[#B8A06A]/70 ml-auto">
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-20 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
        <span>QUANTITATIVE MODELING &amp; SCENARIOS</span>
        <span className="text-[#B8A06A] font-bold">SCREEN 04 / 06</span>
      </footer>
    </section>
  );
}
