import React from "react";

export function Screen01Opening() {
  const milestones = [
    { year: "2014", role: "AUDIT", note: "Statutory Practice" },
    { year: "2017", role: "FINANCE", note: "Financial Control" },
    { year: "2021", role: "REPORTING", note: "Statutory & SAMA" },
    { year: "2023", role: "FP&A", note: "Al Rajhi Bank" },
    { year: "2025", role: "FLOOSS", note: "Fintech FP&A" },
  ];

  return (
    <section
      id="screen-01"
      className="relative w-full h-screen overflow-hidden bg-[#111513] text-[#F5F2EA] flex flex-col justify-between p-10 lg:p-14 select-none"
      style={{
        background:
          "radial-gradient(ellipse 95% 75% at 30% 35%, #152620 0%, #111513 85%)",
      }}
    >
      {/* Clean Top Header — Person & Accreditations Only */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4">
        <div className="text-sm font-semibold tracking-[0.2em] text-[#F5F2EA]">
          SAMEER MAJEED
        </div>
        <div className="text-xs tracking-[0.22em] text-[#B8A06A] font-mono font-medium">
          ACA · FIPA · FFA
        </div>
      </header>

      {/* Main Focal Point: Immersive Headline and Integrated Trajectory */}
      <main className="relative z-10 flex-1 flex flex-col justify-center my-auto max-w-7xl w-full mx-auto py-2">
        {/* Focal Element 1: Headline Lockup */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-mono tracking-[0.28em] text-[#B8A06A] uppercase font-bold mb-3">
            EXECUTIVE PORTFOLIO
          </div>

          <h1 className="text-7xl lg:text-[6.5rem] font-light tracking-[-0.04em] leading-[0.92] text-[#F5F2EA]">
            THE FINANCIAL <br />
            <span className="font-serif italic font-normal text-[#B8A06A]">
              JOURNEY
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-[#F5F2EA]/85 font-light leading-relaxed mt-5 max-w-2xl">
            A decade across audit, accounting, financial control and FP&amp;A.
          </p>
        </div>

        {/* Focal Element 2: Prominent Career Trajectory (Elevated & Integrated) */}
        <div className="relative w-full mt-4 pt-8">
          {/* Confident Flowing Trajectory Path */}
          <div className="relative w-full h-[140px]">
            <svg
              viewBox="0 0 1100 140"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="opLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B8A06A" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#B8A06A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#345B4B" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Bold Path Curve */}
              <path
                d="M 50,115 C 200,115 230,85 320,85 C 410,85 460,55 570,55 C 680,55 740,28 850,28 C 940,28 1000,10 1050,10"
                fill="none"
                stroke="url(#opLineGrad)"
                strokeWidth="4"
              />
            </svg>

            {/* Prominent Milestone Markers Across Trajectory */}
            <div className="absolute inset-0 grid grid-cols-5 gap-4">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="flex flex-col items-center text-center justify-end h-full"
                >
                  {/* Glowing Node */}
                  <div className="w-9 h-9 rounded-full bg-[#111513] border-[2.5px] border-[#B8A06A] flex items-center justify-center shadow-xl shadow-black mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#B8A06A]" />
                  </div>

                  {/* Year */}
                  <span className="text-xl font-bold font-mono tracking-wider text-[#B8A06A]">
                    {m.year}
                  </span>

                  {/* Stage Role */}
                  <span className="text-base font-bold tracking-[0.16em] text-[#F5F2EA] uppercase mt-1">
                    {m.role}
                  </span>

                  {/* Stage Context */}
                  <span className="text-xs font-mono text-[#F5F2EA]/65 mt-0.5">
                    {m.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-10 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
        <span>RIYADH, SAUDI ARABIA</span>
        <span className="text-[#B8A06A]">2014 — 2025+</span>
      </footer>
    </section>
  );
}
