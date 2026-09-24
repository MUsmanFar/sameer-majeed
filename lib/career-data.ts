export type CareerRole = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  yearLabel: string;
  logo: string;
  responsibilities: string[];
};

export type CertificateRecord = {
  id: string;
  title: string;
  issuer: string;
  standing: string;
  date: string;
  credentialId?: string;
  img: string;
  alt: string;
  details: string;
};

export const PROFILE = {
  name: "Sameer Majeed",
  credentials: "ACA · FIPA · FFA",
  title: "FP&A Manager",
  subtitle: "Chartered Accountant · Financial Strategy & Analysis",
  location: "Riyadh, Saudi Arabia",
  email: "sameerpk_majeed@hotmail.com",
  linkedIn: "https://www.linkedin.com/in/sameer-majeed-aca-fipa-ffa-85a38969/",
  about:
    "I am passionate qualified chartered accountant with more than ten years of diversified experiences in Finance, Accounts and Audit with strong record of leadership and delivery of services in multicultural working environment, combining broad exposure in relevant fields.",
  services: [
    "Financial Consulting",
    "Accounting",
    "Financial Accounting",
    "Financial Advisory",
    "Budgeting",
    "Financial Analysis",
    "Financial Planning",
    "Financial Reporting",
  ] as const,
};

export const ROLES: CareerRole[] = [
  {
    id: "flooss",
    company: "Flooss",
    role: "Financial Planning and Analysis Manager",
    period: "Mar 2025 — Present",
    location: "Riyadh, Saudi Arabia",
    yearLabel: "2025",
    logo: "/logos/FLOOSS-Logo-01.png",
    responsibilities: [
      "Prepare and present monthly, quarterly, and year-end financial reports for senior management.",
      "Develop dashboards and KPIs to monitor business performance.",
      "Prepare Annual Budgets, Quarterly Forecasts, and long-range financial plans.",
      "Track actual performance against budget/forecast and explain key variances.",
      "Prepare comprehensive financial projections based on reasonable assumptions.",
    ],
  },
  {
    id: "alrajhi",
    company: "Al Rajhi Bank",
    role: "Financial Planning and Analysis Specialist",
    period: "Jan 2023 — Mar 2025",
    location: "Riyadh, Saudi Arabia",
    yearLabel: "2023",
    logo: "/logos/alrajhi-bank.jpg",
    responsibilities: [
      "Develop, present, and oversee financial budgets on an annual and quarterly basis.",
      "Collaborate with executives, project managers, and cross-departmental leadership to set budget targets.",
      "Evaluate budget proposals and financial requests for viability.",
      "Forecast financial needs throughout the year.",
      "Track results and compare them to key financial targets.",
      "Prepare cost estimates and plans, while providing necessary reporting, documentation, and financial assessments.",
      "Identify, flag, and analyze potential financial and budgetary risks.",
      "Provide financial summaries, reports, and recommendations as needed.",
      "Coordinate with the technical team to prepare the Dashboard for Power BI Tools.",
    ],
  },
  {
    id: "najm",
    company: "Najm Company for Insurance Services",
    role: "Financial Planning and Management Reporting Specialist",
    period: "Oct 2021 — Jan 2023",
    location: "Riyadh, Saudi Arabia",
    yearLabel: "2021",
    logo: "/logos/Najm-Company-logo.jpg",
    responsibilities: [
      "Preparation of monthly, quarterly, and annual Management Financial Statements as per IFRSs.",
      "Enhancing the quality of monthly management reporting.",
      "Implementing procedures to ensure effective and efficient operations of the Finance Department.",
      "Generate various analyses and financial reports as per the requirements of higher management.",
      "Analyses of Actual reports with the Budgeted/Forecasted Reports.",
      "Coordinating with the Budgeting team to prepare budgets based on some reasonable basis.",
      "Supporting the SAP Coordinator to improve the processes of the Planning, Finance and Control Department.",
      "Monitor SAP system performance across purchasing/procurement, general accounting, analytical accounting, and reports.",
      "Maintain the chart of accounts, including creating new accounts, cost centers, profit centers, etc.",
    ],
  },
  {
    id: "zoom-manager",
    company: "Zoom Marketing Oils",
    role: "Manager Accounts & Finance",
    period: "Jan 2021 — Sep 2021",
    location: "Lahore, Punjab, Pakistan",
    yearLabel: "2021",
    logo: "/logos/Zoom-Marketing-Oils.png",
    responsibilities: [
      "Led accounts and finance through a period of widening operational responsibility.",
      "Stakeholder management and regulatory requirements across the finance function.",
    ],
  },
  {
    id: "zoom-deputy",
    company: "Zoom Marketing Oils",
    role: "Deputy Manager Finance",
    period: "Jul 2018 — Jan 2021",
    location: "Lahore District, Punjab, Pakistan",
    yearLabel: "2018",
    logo: "/logos/Zoom-Marketing-Oils.png",
    responsibilities: [
      "Developing and updating accounting, finance, and management procedures and policies.",
      "Ensure the pricing mechanism for petroleum products suggested by OGRA on a monthly basis.",
      "Monthly and periodic reporting to management / CEO.",
      "Supervision of dealings with banks for financing import LCs, SECP, and other government organizations.",
      "Managing cash flows, profit and loss, as well as working capital budgets.",
      "Arranging new sources of finance for a company's debt facilities.",
      "Ensure compliance with banking regulations.",
      "Liaison with external auditors for smooth conduct of statutory audit.",
      "Supervision of Income Tax & Sales Tax affairs specific to the petroleum industry.",
      "Review and e-file monthly sales tax return and withholding tax statements.",
      "Supervision of implementation of accounting software (SAP Business One).",
    ],
  },
  {
    id: "varioline",
    company: "Varioline Services",
    role: "Head of Accounts",
    period: "Nov 2017 — Jun 2018",
    location: "Lahore, Pakistan",
    yearLabel: "2017",
    logo: "/logos/Varioline-Services.png",
    responsibilities: [
      "Providing and interpreting financial information.",
      "Conducting reviews and evaluations for cost reduction opportunities.",
      "Producing accurate financial reports.",
      "Managing budgets.",
      "Managing the accurate and timely monthly, quarterly, and year-end closing.",
      "Liaison with external auditors for smooth conduct of statutory audit.",
      "Preparing Aging Analysis of customers as well as vendors for maintaining cash flow cycle.",
      "Review and e-file monthly sales tax return and withholding tax statements.",
      "Ensuring compliance with corporate and tax laws and preparing replies against queries raised by such authorities.",
      "Managing the General Ledger, Accounts Receivable, Accounts Payable, and Inventory module of ERP Oracle-based software.",
    ],
  },
  {
    id: "hassan",
    company: "Hassan Naeem & Co (UHY)",
    role: "Audit Associate",
    period: "Jun 2014 — Nov 2017",
    location: "Lahore, Pakistan",
    yearLabel: "2014",
    logo: "/logos/UHY_Logo.jpg",
    responsibilities: [
      "Planning and execution of audit in accordance with International Standards on Auditing.",
      "Evaluation of internal controls and drafting recommendations to the management and those charged with governance.",
      "Managing and delegating work to engagement team members for multiple engagements from planning to finalization.",
      "Preparing and critically reviewing the final deliverables to ensure they fully meet the IFRS and local financial reporting requirements.",
      "Supervised and reviewed the work of engagement team and provided them timely feedback and training.",
      "Resolution of accounting/technical issues raised by clients.",
      "Ensuring appropriate level of communication, interaction, and collaboration between the engagement team members.",
      "Keep up-to-date with any changes or planned changes to accounting standards and other pronouncements.",
    ],
  },
];

/** Unique employers for logo strip — same visual box size for all */
export const EMPLOYERS = [
  { id: "hassan", name: "Hassan Naeem & Co (UHY)", logo: "/logos/UHY_Logo.jpg" },
  { id: "varioline", name: "Varioline Services", logo: "/logos/Varioline-Services.png" },
  { id: "zoom", name: "Zoom Marketing Oils", logo: "/logos/Zoom-Marketing-Oils.png" },
  { id: "najm", name: "Najm Company for Insurance Services", logo: "/logos/Najm-Company-logo.jpg" },
  { id: "alrajhi", name: "Al Rajhi Bank", logo: "/logos/alrajhi-bank.jpg" },
  { id: "flooss", name: "Flooss", logo: "/logos/FLOOSS-Logo-01.png" },
] as const;
export const CERTIFICATES: CertificateRecord[] = [
  {
    id: "icap",
    title: "Associate Chartered Accountant (ACA)",
    issuer: "The Institute of Chartered Accountants of Pakistan (ICAP)",
    standing: "Admitted as Associate · 20 Aug 2024",
    date: "Aug 2024",
    credentialId: "Membership No. 12797",
    img: "/certificates/icap-associate.png",
    alt: "ICAP Associate Certificate",
    details: "Admitted as an Associate of The Institute of Chartered Accountants of Pakistan.",
  },
  {
    id: "socpa",
    title: "Associate Member (SOCPA)",
    issuer: "Saudi Organization for Chartered and Professional Accountants",
    standing: "Certificate period · 03/03/2023 — 03/03/2024",
    date: "Mar 2023",
    credentialId: "Membership No. 133181",
    img: "/certificates/socpa-associate.png",
    alt: "SOCPA Associate Certificate",
    details: "Active Associate membership certificate issued by SOCPA.",
  },
  {
    id: "fipa",
    title: "Fellow Member (FIPA)",
    issuer: "Institute of Public Accountants (IPA Australia)",
    standing: "Admitted 15 Mar 2022",
    date: "Mar 2022",
    credentialId: "Member No. 330909",
    img: "/certificates/fipa-fellow.png",
    alt: "IPA Australia Fellow Certificate",
    details: "Admitted as a Fellow of the Institute of Public Accountants, Melbourne, Australia.",
  },
  {
    id: "ffa",
    title: "Fellow Member (FFA)",
    issuer: "Institute of Financial Accountants (IFA United Kingdom)",
    standing: "Admitted 15 Mar 2022",
    date: "Mar 2022",
    credentialId: "IPA330909",
    img: "/certificates/ffa-fellow.png",
    alt: "IFA UK Fellow Certificate",
    details: "Admitted as a Fellow of the Institute of Financial Accountants.",
  },
  {
    id: "coursera",
    title: "Financial Accounting: Advanced Topics",
    issuer: "University of Illinois Urbana-Champaign (Coursera)",
    standing: "Completed 10 Jul 2021",
    date: "Jul 2021",
    credentialId: "coursera.org/verify/G3V44P73DPXB",
    img: "/certificates/coursera-financial-accounting.png",
    alt: "UIUC Advanced Financial Accounting Certificate",
    details: "Online non-credit course authorized by University of Illinois at Urbana-Champaign.",
  },
];

export const CONTINUITY_NODES = [
  "AUDIT",
  "ACCOUNTING",
  "FINANCIAL CONTROL",
  "REPORTING",
  "PLANNING",
  "FP&A",
  "FINTECH",
] as const;

export const INTELLIGENCE_TERMS = [
  "FP&A",
  "FORECASTING",
  "BUDGETING",
  "FINANCIAL MODELLING",
  "MANAGEMENT REPORTING",
  "FINANCIAL ANALYSIS",
  "ACCOUNTING",
  "AUDIT",
  "IFRS",
  "SAP",
  "ERP",
  "STAKEHOLDER MANAGEMENT",
] as const;

export const OPERATING_SYSTEM = [
  "PLAN",
  "MEASURE",
  "ANALYZE",
  "CONTROL",
  "REPORT",
  "ADVISE",
] as const;

export const CONSTELLATION_YEARS = [
  { year: "2014", roleId: "hassan" },
  { year: "2017", roleId: "varioline" },
  { year: "2018", roleId: "zoom-deputy" },
  { year: "2021", roleId: "najm" },
  { year: "2023", roleId: "alrajhi" },
  { year: "2025", roleId: "flooss" },
  { year: "NOW", roleId: "flooss" },
] as const;

export const CHAPTERS = [
  { id: "ch-ledger", num: "00", name: "Opening" },
  { id: "ch-hero", num: "01", name: "Home" },
  { id: "ch-arc", num: "02", name: "Process" },
  { id: "ch-employers", num: "03", name: "Employers" },
  { id: "ch-gate", num: "04", name: "Gate" },
  { id: "ch-foundation", num: "05", name: "UHY" },
  { id: "ch-varioline", num: "06", name: "Varioline" },
  { id: "ch-zoom-deputy", num: "07", name: "Zoom" },
  { id: "ch-zoom-manager", num: "08", name: "Zoom Mgr" },
  { id: "ch-saudi", num: "09", name: "Najm" },
  { id: "ch-fpa", num: "10", name: "Al Rajhi" },
  { id: "ch-flooss", num: "11", name: "Flooss" },
  { id: "ch-credentials", num: "12", name: "Credentials" },
  { id: "ch-contact", num: "13", name: "Contact" },
] as const;

/** Editorial journey framing — narrative only, no invented metrics */
export const JOURNEY = {
  opening: {
    eyebrow: "A CAREER IN CLARITY / 01",
    line: "Every forecast starts with a foundation.",
    support: "From audit discipline to fintech FP&A — one connected journey.",
  },
  chapters: {
    foundation: {
      tag: "01 / EARLY FOUNDATIONS",
      title: "Before the forecast,",
      italic: "there was the foundation.",
      bridge: "LAHORE → CONTROL",
      story:
        "Audit associateship at Hassan Naeem & Co (UHY) formed the discipline behind every later close, control, and forecast.",
    },
    control: {
      tag: "02 / BUILT THROUGH EXPERIENCE",
      title: "From ledgers to",
      italic: "leadership.",
      bridge: "CONTROL → RIYADH",
      story:
        "Varioline and Zoom Marketing Oils widened the scope — accounts leadership, cash discipline, and operational finance.",
    },
    saudi: {
      tag: "03 / A NEW CHAPTER",
      title: "Riyadh.",
      italic: "Reporting with purpose.",
      bridge: "REPORTING → PLANNING",
      story:
        "Najm Company for Insurance Services marked the move into Saudi Arabia — management reporting layered monthly, quarterly, and annual.",
    },
    fpa: {
      tag: "04 / FINANCIAL PLANNING",
      title: "From explaining the past",
      italic: "to planning what comes next.",
      bridge: "PLANNING → FP&A",
      story:
        "At Al Rajhi Bank, the work shifted fully into budgets, forecasts, variance narratives, and Power BI dashboards.",
    },
    flooss: {
      tag: "05 / THE SIGNATURE CHAPTER",
      title: "Finance, at the",
      italic: "speed of fintech.",
      bridge: "FP&A → FINTECH",
      story:
        "Flooss brings the full arc together — reporting cadence, planning cycles, and performance clarity inside a fintech environment.",
    },
  },
} as const;

export function getRole(id: string) {
  return ROLES.find((r) => r.id === id);
}
