export type ChapterId =
  | "scene-entry"
  | "scene-hero"
  | "scene-foundation"
  | "scene-control"
  | "scene-riyadh"
  | "scene-reporting"
  | "scene-fpa"
  | "scene-flooss"
  | "scene-philosophy"
  | "scene-toolkit"
  | "scene-credentials"
  | "scene-contact";

export const CHAPTERS = [
  { id: "scene-entry" as const, num: "00", name: "INTRO" },
  { id: "scene-hero" as const, num: "01", name: "SAMEER" },
  { id: "scene-foundation" as const, num: "02", name: "FOUNDATION" },
  { id: "scene-control" as const, num: "03", name: "CONTROL" },
  { id: "scene-riyadh" as const, num: "04", name: "RIYADH" },
  { id: "scene-reporting" as const, num: "05", name: "REPORTING" },
  { id: "scene-fpa" as const, num: "06", name: "FP&A" },
  { id: "scene-flooss" as const, num: "07", name: "FLOOSS" },
  { id: "scene-philosophy" as const, num: "08", name: "PHILOSOPHY" },
  { id: "scene-toolkit" as const, num: "09", name: "TOOLKIT" },
  { id: "scene-credentials" as const, num: "10", name: "CREDENTIALS" },
  { id: "scene-contact" as const, num: "11", name: "CONTACT" },
];

/** One continuous polyline that morphs through the career — viewBox 0 0 1600 900 */
export const SIGNAL_PATHS: Record<ChapterId, string> = {
  "scene-entry":
    "M 120 720 C 280 680, 420 620, 560 540 S 820 360, 980 280 S 1280 160, 1480 120",
  "scene-hero":
    "M 80 640 C 320 600, 480 520, 640 400 S 980 220, 1180 280 S 1380 420, 1520 360",
  "scene-foundation":
    "M 200 200 C 360 280, 520 360, 720 420 S 1040 480, 1280 520 S 1420 560, 1500 640",
  "scene-control":
    "M 180 700 C 340 560, 520 400, 760 360 S 1080 340, 1240 280 S 1400 200, 1500 140",
  "scene-riyadh":
    "M 80 620 C 280 580, 460 480, 700 360 S 1020 200, 1240 160 S 1420 140, 1540 120",
  "scene-reporting":
    "M 640 760 L 640 560 L 780 480 L 780 320 L 920 240 L 920 120",
  "scene-fpa":
    "M 80 620 C 260 580, 420 500, 620 420 S 980 240, 1240 140 S 1420 80, 1540 50",
  "scene-flooss":
    "M 420 520 C 620 500, 820 480, 1020 460 S 1280 440, 1480 420",
  "scene-philosophy":
    "M 200 450 L 900 450",
  "scene-toolkit":
    "M 200 450 C 400 420, 600 400, 800 450 S 1100 520, 1400 450",
  "scene-credentials":
    "M 200 760 C 480 740, 760 720, 1040 700 S 1320 680, 1480 660",
  "scene-contact":
    "M 80 520 L 720 520",
};

export const SIGNAL_ORDER: ChapterId[] = CHAPTERS.map((c) => c.id);

export const CERTIFICATES = [
  {
    id: "icap",
    title: "Associate Chartered Accountant (ACA)",
    issuer: "The Institute of Chartered Accountants of Pakistan (ICAP)",
    standing: "Admitted as Associate Member · Aug 2024",
    credentialId: "Membership No. 12797",
    img: "/certificates/icap-associate.png",
    alt: "ICAP Associate Certificate",
    details:
      "Comprehensive statutory audit execution, IFRS technical financial reporting compliance, corporate governance standards, and professional ethical code adherence.",
  },
  {
    id: "socpa",
    title: "Associate Member (SOCPA)",
    issuer: "Saudi Organization for Chartered and Professional Accountants (SOCPA)",
    standing: "Active Professional Standing · KSA",
    credentialId: "Associate Member",
    img: "/certificates/socpa-associate.png",
    alt: "SOCPA Associate Certificate",
    details:
      "Saudi financial compliance, Zakat & CIT tax reporting frameworks, IFRS standards adoption in Saudi Arabia, and corporate governance alignment.",
  },
  {
    id: "fipa",
    title: "Fellow Member (FIPA)",
    issuer: "Institute of Public Accountants (IPA Australia)",
    standing: "Admitted as Fellow · Oct 2024",
    credentialId: "Member ID: 310860",
    img: "/certificates/fipa-fellow.png",
    alt: "IPA Australia Fellow Certificate",
    details:
      "International accounting governance, senior executive leadership accreditation, global public accountant representation, and high-level ethical standards.",
  },
  {
    id: "ffa",
    title: "Fellow Member (FFA)",
    issuer: "Institute of Financial Accountants (IFA United Kingdom)",
    standing: "Admitted as Fellow · Oct 2024",
    credentialId: "Member ID: 310860",
    img: "/certificates/ffa-fellow.png",
    alt: "IFA UK Fellow Certificate",
    details:
      "UK & international financial accounting discipline, cross-border corporate governance, management reporting frameworks, and strategic financial control.",
  },
  {
    id: "uiuc",
    title: "Financial Accounting: Advanced Topics",
    issuer: "University of Illinois Urbana-Champaign (UIUC)",
    standing: "Academic Certificate of Completion · Mar 2024",
    credentialId: "Course Record",
    img: "/certificates/coursera-financial-accounting.png",
    alt: "UIUC Advanced Financial Accounting Certificate",
    details:
      "Complex financial consolidation, derivative & hedge accounting, multi-currency reporting, and specialized accounting transactions under US GAAP / IFRS.",
  },
] as const;

export const TOOLKIT_SKILLS = [
  {
    id: "powerbi",
    name: "POWER BI & AUTOMATION",
    asset: "/assets/3d/powerbi-prism.webp",
    x: 18,
    y: 18,
    desc: "Interactive variance tracking, DAX data modeling, and automated executive reporting pipelines.",
  },
  {
    id: "fpa",
    name: "FP&A & ROLLING FORECASTS",
    asset: "/assets/3d/forecasting-curve.webp",
    x: 82,
    y: 16,
    desc: "Driver-based rolling forecasts, institutional OPEX/CAPEX budgets, and rate sensitivity models.",
  },
  {
    id: "cashflow",
    name: "CASH FLOW & BANKING",
    asset: "/assets/3d/cashflow-core.webp",
    x: 84,
    y: 78,
    desc: "Working capital cycles, customer/vendor aging schedules, and import Letters of Credit.",
  },
  {
    id: "budget",
    name: "BUDGETING & ALLOCATION",
    asset: "/assets/3d/budget-stack.webp",
    x: 16,
    y: 80,
    desc: "Annual strategic budget architectures, zero-based cost reviews, and enterprise resource governance.",
  },
  {
    id: "variance",
    name: "VARIANCE INTELLIGENCE",
    asset: "/assets/3d/control-engine.webp",
    x: 12,
    y: 48,
    desc: "Isolating price, volume, and mix drivers behind budget deviations to guide capital deployment.",
  },
  {
    id: "erp",
    name: "ERP INFRASTRUCTURE",
    asset: "/assets/3d/erp-network.webp",
    x: 88,
    y: 48,
    desc: "SAP Business One, Oracle Financials, and automated enterprise data reconciliation.",
  },
  {
    id: "audit",
    name: "IFRS & STATUTORY AUDIT",
    asset: "/assets/3d/audit-core.webp",
    x: 32,
    y: 28,
    desc: "ISA statutory audit rigor, technical disclosure compliance, and internal control reviews.",
  },
  {
    id: "modeling",
    name: "CAPITAL RUNWAY MODELING",
    asset: "/assets/3d/planning-core.webp",
    x: 68,
    y: 72,
    desc: "Fintech unit economics, multi-currency treasury movements, and investor capital decks.",
  },
] as const;

export const ROLE_RECORDS = {
  flooss: {
    role: "FP&A Manager",
    company: "Flooss Fintech",
    location: "Riyadh, Saudi Arabia",
    period: "Mar 2025 — Present",
    type: "Executive Leadership",
    summary:
      "Leading financial planning, multi-currency capital runway modeling, cohort profitability analysis, and executive investor reporting for a high-growth regional fintech.",
    responsibilities: [
      "Architecting dynamic 3-year rolling financial models for board and regulatory submissions.",
      "Delivering cohort-level payback velocity and unit-economic margin insights across lending products.",
      "Managing banking liquidity facilities, regional treasury movements, and capital deployment.",
      "Automating cloud reporting pipelines integrating operational database metrics into real-time executive dashboards.",
    ],
    skills: [
      "Financial Modeling",
      "Cohort Unit Economics",
      "Fintech Runway Architecture",
      "Investor Decks & Board Reporting",
      "Treasury & Liquidity Management",
    ],
  },
  alrajhi: {
    role: "FP&A Specialist",
    company: "Al Rajhi Bank",
    location: "Riyadh, Saudi Arabia",
    period: "2023 — 2025",
    type: "Institutional Banking",
    summary:
      "Architected annual institutional budget cycles, rolling quarterly forecasts, variance analysis, and Power BI executive dashboards for the world's largest Islamic bank.",
    responsibilities: [
      "Constructed institutional rolling forecast models across consumer, corporate, and digital banking verticals.",
      "Engineered automated Microsoft Power BI executive reporting dashboards tracking OPEX, CAPEX, and net margins.",
      "Formulated variance analysis reports comparing actual performance against strategic enterprise targets.",
      "Partnered with cross-functional business heads to optimize resource allocation and cost efficiencies.",
    ],
    skills: [
      "Microsoft Power BI",
      "Institutional Budgeting",
      "Rolling Forecasts",
      "Variance Analysis",
      "Enterprise Cost Governance",
    ],
  },
  zoom: {
    role: "Manager Accounts & Finance",
    company: "Zoom Marketing Oils",
    location: "Lahore, Pakistan",
    period: "2021",
    type: "Financial Control",
    summary:
      "Owned end-to-end financial control, statutory reporting, tax, banking, and SAP Business One operations.",
    responsibilities: [
      "Directed monthly closing cycles, management accounts, and statutory financial statements.",
      "Governed working capital, vendor/customer aging, and banking facilities.",
      "Led SAP Business One finance modules and external audit liaison.",
    ],
    skills: ["Financial Control", "SAP Business One", "Statutory Reporting", "Tax Compliance", "Working Capital"],
  },
  hassan: {
    role: "Audit Associate",
    company: "Hassan Naeem & Co",
    location: "Lahore, Pakistan",
    period: "2014 — 2017",
    type: "Statutory Audit",
    summary:
      "Completed 3.5 years of rigorous chartered practice training executing statutory external audits under International Standards on Auditing (ISA) and IFRS.",
    responsibilities: [
      "Planned and executed statutory audits across manufacturing, retail, financial, and service sectors.",
      "Evaluated entity-level internal control environments and drafted formal management letters for boards.",
      "Audited complex financial statement disclosures, revenue recognition, inventory valuations, and tax provisions.",
      "Led audit teams on-site, managing fieldwork deliverables, working paper documentation, and partner reviews.",
    ],
    skills: [
      "International Standards on Auditing (ISA)",
      "IFRS Technical Compliance",
      "Internal Control Evaluation",
      "Statutory Audit Fieldwork",
      "Working Paper Documentation",
    ],
  },
} as const;
