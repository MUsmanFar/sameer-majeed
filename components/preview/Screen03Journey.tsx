import React from "react";

export function Screen03Journey() {
  const milestones = [
    {
      num: "01",
      stage: "FOUNDATION",
      period: "2014 — 2017",
      title: "Audit Associate",
      org: "Chartered Practice",
      desc: "Statutory audits & IFRS compliance",
      leftPercent: "0%",
      isCurrent: false,
    },
    {
      num: "02",
      stage: "CONTROL",
      period: "2017 — 2021",
      title: "Accounts & Finance",
      org: "Al-Bawani Group",
      desc: "Financial closing & GL governance",
      leftPercent: "13%",
      isCurrent: false,
    },
    {
      num: "03",
      stage: "REPORTING",
      period: "2021 — 2023",
      title: "Senior Financial Specialist",
      org: "Najm Insurance",
      desc: "Statutory statements & SAMA compliance",
      leftPercent: "26%",
      isCurrent: false,
    },
    {
      num: "04",
      stage: "FP&A",
      period: "2023 — 2025",
      title: "FP&A Specialist",
      org: "Al Rajhi Bank",
      desc: "Enterprise budgeting & rolling forecasts",
      leftPercent: "40%",
      isCurrent: false,
    },
    {
      num: "05",
      stage: "PRESENT",
      period: "2025 — PRESENT",
      title: "FP&A Manager",
      org: "Flooss Fintech",
      desc: "Fintech financial architecture & runway",
      leftPercent: "54%",
      isCurrent: true,
    },
  ];

  return (
    <section
      id="screen-03"
      className="relative w-full h-screen overflow-hidden bg-[#111513] text-[#F5F2EA] flex flex-col justify-between p-10 lg:p-14 select-none"
      style={{
        background:
          "linear-gradient(145deg, #111513 0%, #13231E 60%, #111513 100%)",
      }}
    >
      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
          <span className="text-xs font-semibold tracking-[0.24em] text-[#B8A06A] uppercase">
            Professional Experience
          </span>
        </div>

        <div className="text-xs font-mono tracking-wider text-[#F5F2EA]/50">
          2014 — 2025+
        </div>
      </header>

      {/* Main Grid: Left Massive Anchor (32%) + Right Strong Diagonal Career Progression (68%) */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-6 items-center my-auto py-2">
        {/* Left Anchor Column (~32% -> 4 of 12 cols): Commanding 10+ YEARS */}
        <div className="col-span-4 flex flex-col justify-center pr-6">
          <div className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold mb-2">
            EXPERIENCE
          </div>

          <div className="text-8xl lg:text-[7rem] font-bold tracking-[-0.05em] text-[#F5F2EA] leading-[0.82]">
            10+ <br />
            <span className="text-[#B8A06A] font-light">YEARS</span>
          </div>

          <div className="text-base font-mono tracking-[0.2em] text-[#B8A06A] mt-5">
            2014 — PRESENT
          </div>

          <p className="text-xl text-[#F5F2EA]/85 font-light leading-relaxed mt-4 max-w-sm">
            A career spanning audit, financial control, management reporting and FP&amp;A.
          </p>

          <div className="mt-8 pt-6 border-t border-[#F5F2EA]/15 text-xs font-mono text-[#F5F2EA]/50">
            RIYADH, SAUDI ARABIA
          </div>
        </div>

        {/* Right Column (~68% -> 8 of 12 cols): 40-50% Larger Diagonal Milestones */}
        <div className="col-span-8 relative h-full flex flex-col justify-between py-2">
          {/* Confident Thick Architectural Spline Connecting Milestones */}
          <svg
            viewBox="0 0 850 480"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              d="M 50,35 C 180,35 180,130 260,130 C 350,130 350,225 440,225 C 540,225 540,325 630,325 C 720,325 730,420 800,420"
              fill="none"
              stroke="#B8A06A"
              strokeWidth="3.5"
              strokeOpacity="0.4"
            />
            <path
              d="M 50,35 C 180,35 180,130 260,130 C 350,130 350,225 440,225 C 540,225 540,325 630,325 C 720,325 730,420 800,420"
              fill="none"
              stroke="#345B4B"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              strokeOpacity="0.7"
            />
          </svg>

          {/* Five Substantially Larger Milestones (Zero Cards, Zero Table Rows) */}
          {milestones.map((m) => (
            <div
              key={m.num}
              className={`relative z-10 flex items-start gap-4 transition-transform hover:translate-x-1 ${
                m.isCurrent ? "scale-105 origin-left" : ""
              }`}
              style={{ marginLeft: m.leftPercent }}
            >
              {/* Confident Milestone Pin */}
              <div
                className={`mt-1 flex items-center justify-center rounded-full bg-[#111513] shadow-xl shrink-0 ${
                  m.isCurrent
                    ? "w-9 h-9 border-[3px] border-[#B8A06A]"
                    : "w-8 h-8 border-2 border-[#B8A06A]/80"
                }`}
              >
                <div
                  className={`rounded-full ${
                    m.isCurrent ? "w-3.5 h-3.5 bg-[#B8A06A]" : "w-2.5 h-2.5 bg-[#B8A06A]"
                  }`}
                />
              </div>

              {/* Milestone Content Block (35-50% Larger Scale) */}
              <div className="max-w-lg">
                <div className="flex items-baseline gap-3">
                  <span
                    className={`font-mono font-bold ${
                      m.isCurrent ? "text-base text-[#B8A06A]" : "text-sm text-[#B8A06A]"
                    }`}
                  >
                    {m.num}
                  </span>
                  <span
                    className={`font-bold tracking-[0.16em] uppercase ${
                      m.isCurrent
                        ? "text-2xl text-[#F5F2EA]"
                        : "text-lg text-[#F5F2EA]"
                    }`}
                  >
                    {m.stage}
                  </span>
                  <span className="text-xs font-mono text-[#F5F2EA]/60">
                    ({m.period})
                  </span>
                </div>

                <div
                  className={`font-semibold tracking-wide mt-0.5 ${
                    m.isCurrent ? "text-xl text-[#F5F2EA]" : "text-base text-[#F5F2EA]"
                  }`}
                >
                  {m.title}{" "}
                  <span className="text-sm font-normal text-[#B8A06A]">
                    · {m.org}
                  </span>
                </div>

                <div className="text-xs text-[#F5F2EA]/70 font-light mt-0.5">
                  {m.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-10 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
        <span>STATUTORY AUDIT · CORPORATE CONTROL · REGULATORY REPORTING · ENTERPRISE FP&amp;A</span>
        <span className="text-[#B8A06A] font-bold">SCREEN 03 / 06</span>
      </footer>
    </section>
  );
}
