export const careerChapters = [
  {
    id: "foundation",
    index: "01",
    era: "Foundation",
    years: "2014 — 2017",
    title: ["Audit", "Associate"],
    company: "Hassan Naeem & Co",
    location: "Lahore, Pakistan",
    sentence: "Built the foundation in audit, controls and financial reporting.",
    layout: "left" as const,
    roles: [{ year: "2014", title: "Audit Associate", company: "Hassan Naeem & Co" }],
  },
  {
    id: "control",
    index: "02",
    era: "Control",
    years: "2017 — 2021",
    title: ["Finance", "Control"],
    company: "Varioline · Zoom Marketing Oils",
    location: "Lahore, Pakistan",
    sentence: "Grew from accounts leadership into full financial control.",
    layout: "right" as const,
    roles: [
      { year: "2017", title: "Head of Accounts", company: "Varioline Services" },
      { year: "2018", title: "Deputy Manager Finance", company: "Zoom Marketing Oils" },
      { year: "2021", title: "Manager Accounts & Finance", company: "Zoom Marketing Oils" },
    ],
  },
  {
    id: "reporting",
    index: "03",
    era: "Reporting",
    years: "2021 — 2023",
    title: ["Management", "Reporting"],
    company: "Najm Company for Insurance Services",
    location: "Riyadh, Saudi Arabia",
    sentence: "Moved to Riyadh and into IFRS management reporting, budgeting and SAP.",
    layout: "center" as const,
    roles: [{ year: "2021", title: "Financial Planning & Management Reporting Specialist", company: "Najm" }],
  },
] as const;

export const milestones = [
  { year: "2014", label: "Start" },
  { year: "2021", label: "Riyadh" },
  { year: "2023", label: "FP&A" },
  { year: "2025", label: "Flooss" },
] as const;

export const presentCapabilities = ["Planning", "Forecasting", "Performance", "Analysis"] as const;
