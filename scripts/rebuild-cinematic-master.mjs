import fs from "node:fs";
import path from "node:path";

const targetPath = path.join(process.cwd(), "components", "motion", "CinematicMaster.tsx");

const fileContent = `"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AdaptiveNav } from "./AdaptiveNav";
import { GlobalStage } from "./GlobalStage";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { CertificateModal, CertificateData } from "./CertificateModal";
import { RoleDetailsDrawer, RoleDetailData } from "./RoleDetailsDrawer";
import { MotionDebugHud } from "./MotionDebugHud";

export function CinematicMaster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("scene-entry");
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [activeRoleDrawer, setActiveRoleDrawer] = useState<RoleDetailData | null>(null);
  const [activeToolkitSkill, setActiveToolkitSkill] = useState<number>(0);
  const [certModalIndex, setCertModalIndex] = useState(0);

  // 11 Independent Stage Refs for GSAP Pinning (Phase 3 & 4)
  const entryStageRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const heroSculptureRef = useRef<HTMLDivElement>(null);
  const heroPortraitRef = useRef<HTMLDivElement>(null);
  const foundationStageRef = useRef<HTMLDivElement>(null);
  const controlStageRef = useRef<HTMLDivElement>(null);
  const riyadhStageRef = useRef<HTMLDivElement>(null);
  const reportingStageRef = useRef<HTMLDivElement>(null);
  const fpaStageRef = useRef<HTMLDivElement>(null);
  const floossStageRef = useRef<HTMLDivElement>(null);
  const floossPortraitRef = useRef<HTMLDivElement>(null);
  const philosophyStageRef = useRef<HTMLDivElement>(null);
  const toolkitStageRef = useRef<HTMLDivElement>(null);
  const credsStageRef = useRef<HTMLDivElement>(null);

  // FP&A SVG Paths
  const fpaActualPathRef = useRef<SVGPathElement>(null);
  const fpaBudgetPathRef = useRef<SVGPathElement>(null);
  const fpaForecastPathRef = useRef<SVGPathElement>(null);
  const fpaRibbonRef = useRef<SVGPolygonElement>(null);

  // All 5 Authenticated Certificates
  const certificates: CertificateData[] = [
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
      img: "/certificates/fipa-australia.png",
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
      img: "/certificates/ifa-uk.png",
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
      img: "/certificates/uiuc-accounting.png",
      alt: "UIUC Advanced Financial Accounting Certificate",
      details:
        "Complex financial consolidation, derivative & hedge accounting, multi-currency reporting, and specialized accounting transactions under US GAAP / IFRS.",
    },
  ];

  // Verified Role Mandates
  const roleRecords: Record<string, RoleDetailData> = {
    flooss: {
      title: "FP&A Manager",
      company: "Flooss Fintech",
      location: "Riyadh, Saudi Arabia",
      period: "Mar 2025 — Present",
      summary:
        "Leading financial planning, multi-currency capital runway modeling, cohort profitability analysis, and executive investor reporting for a high-growth regional fintech.",
      responsibilities: [
        "Architecting dynamic 3-year rolling financial models for board and regulatory submissions.",
        "Delivering cohort-level payback velocity and unit-economic margin insights across lending products.",
        "Managing banking liquidity facilities, regional treasury movements, and capital deployment.",
        "Automating cloud reporting pipelines integrating operational database metrics into real-time executive dashboards.",
      ],
      deliverables: [
        "3-Year Integrated Strategic Financial Model (P&L, Balance Sheet, Cash Flow)",
        "Fintech Cohort Payback & Customer Acquisition Cost (CAC) Margin Engine",
        "Monthly Board Investment Deck & SAMA Compliance Financial Submissions",
      ],
    },
    alrajhi: {
      title: "FP&A Specialist",
      company: "Al Rajhi Bank",
      location: "Riyadh, Saudi Arabia",
      period: "2023 — 2025",
      summary:
        "Spearheaded institutional annual budgeting, rolling quarterly forecast architecture, and executive variance reporting for one of the world's largest Islamic banking institutions.",
      responsibilities: [
        "Orchestrated multi-departmental institutional budgeting cycles spanning diverse operational business lines.",
        "Developed automated Microsoft Power BI reporting suites tracking OPEX, CAPEX, and margin variance drivers.",
        "Conducted strategic profitability analysis across branch networks, financing portfolios, and digital channels.",
        "Presented monthly variance analysis packages to senior executive committees to guide corrective capital allocation.",
      ],
      deliverables: [
        "Institutional Annual Operating Budget Model ($B+ Scale)",
        "Automated Enterprise Variance Intelligence & OPEX Dashboard Suite",
        "Quarterly Rolling Forecast Engine with Stress-Tested Rate Sensitivity",
      ],
    },
    zoom: {
      title: "Manager Accounts & Finance",
      company: "Zoom Marketing Oils",
      location: "Lahore / Regional Operations",
      period: "2018 — 2021",
      summary:
        "Promoted from Deputy Manager to Manager Accounts & Finance, governing enterprise liquidity, working capital facilities, banking import LCs, and ERP architecture.",
      responsibilities: [
        "Governed corporate debt facilities, bank relationship negotiations, and import Letters of Credit (LCs).",
        "Oversaw general ledger integrity, tax compliance (sales tax, income withholding), and external audit sign-offs.",
        "Directed the successful enterprise-wide implementation and go-live of SAP Business One ERP.",
        "Optimized cash conversion cycles and working capital through aggressive customer aging management.",
      ],
      deliverables: [
        "Enterprise SAP Business One Implementation & Data Migration",
        "Working Capital Financing & Bank LC Facility Optimization Program",
        "Statutory Tax Audit Approvals & IFRS-Compliant Financial Statements",
      ],
    },
    varioline: {
      title: "Head of Accounts",
      company: "Varioline Services",
      location: "Lahore, Pakistan",
      period: "2017 — 2018",
      summary:
        "Led corporate accounting department, monthly financial closing cycles, Oracle ERP ledger administration, and commercial credit control.",
      responsibilities: [
        "Supervised general ledger, AP, AR, and fixed asset accounting operations under strict monthly deadlines.",
        "Implemented standardized reconciliation controls across multi-bank operational accounts.",
        "Engineered customer credit scoring models and receivable aging schedules to curb bad-debt exposure.",
        "Formulated variance analysis reports comparing budgeted departmental expenses against operational actuals.",
      ],
      deliverables: [
        "Oracle ERP Financial Ledger Modernization & Internal Controls Overhaul",
        "Monthly Executive Financial Reporting Package & Cash Flow Projections",
        "Receivables Collection Cycle Acceleration from 75 to 48 Days",
      ],
    },
    hassan: {
      title: "Audit Associate (Chartered Training)",
      company: "Hassan Naeem & Co (UHY Chartered Accountants)",
      location: "Lahore, Pakistan",
      period: "2014 — 2017",
      summary:
        "Completed 3.5 years of rigorous chartered practice training executing statutory external audits under International Standards on Auditing (ISA) and IFRS.",
      responsibilities: [
        "Planned and executed statutory audits across manufacturing, retail, financial, and service sectors.",
        "Evaluated entity-level internal control environments and drafted formal management letters for boards.",
        "Audited complex financial statement disclosures, revenue recognition, inventory valuations, and tax provisions.",
        "Led audit teams on-site, managing fieldwork deliverables, working paper documentation, and partner reviews.",
      ],
      deliverables: [
        "50+ Statutory External Audit Engagements Completed Under ISA & IFRS",
        "Comprehensive Internal Control Deficiencies & Governance Reports",
        "ICAP Chartered Training Certification & Associate Membership Qualification",
      ],
    },
  };

  // 3D Financial Toolkit Items
  const toolkitSkills = [
    {
      id: "powerbi",
      name: "POWER BI & AUTOMATION",
      asset: "/assets/3d/powerbi-prism.webp",
      pos: "top-8 left-[18%]",
      desc: "Interactive variance tracking, DAX data modeling, and automated executive reporting pipelines.",
    },
    {
      id: "fpa",
      name: "FP&A & ROLLING FORECASTS",
      asset: "/assets/3d/forecasting-curve.webp",
      pos: "top-8 right-[18%]",
      desc: "Driver-based rolling forecasts, institutional OPEX/CAPEX budgets, and rate sensitivity models.",
    },
    {
      id: "budget",
      name: "BUDGETING & CAPITAL ALLOCATION",
      asset: "/assets/3d/budget-stack.webp",
      pos: "bottom-12 left-[20%]",
      desc: "Annual strategic budget architectures, zero-based cost reviews, and enterprise resource governance.",
    },
    {
      id: "cashflow",
      name: "CASH FLOW & BANKING",
      asset: "/assets/3d/cashflow-core.webp",
      pos: "top-24 right-[32%]",
      desc: "Working capital cycles, customer/vendor aging schedules, and import Letters of Credit.",
    },
    {
      id: "variance",
      name: "VARIANCE INTELLIGENCE",
      asset: "/assets/3d/control-engine.webp",
      pos: "bottom-28 left-[34%]",
      desc: "Isolating price, volume, and mix drivers behind budget deviations to guide capital deployment.",
    },
  ];

  // Phase 8: Comprehensive Preloader Before GSAP Initialization
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mm: gsap.MatchMedia | null = null;
    let isMounted = true;

    // Expose ScrollTrigger on window for diagnostic tools (Phase 12)
    (window as any).ScrollTrigger = ScrollTrigger;

    const runEngine = async () => {
      // 1. Wait for document fonts
      await document.fonts.ready;

      // 2. Preload critical images to prevent layout shift after trigger calculations
      const criticalImages = [
        "/portrait/sameer-majeed.png",
        "/assets/3d/career-orbit.webp",
        "/assets/3d/hero-sculpture.png",
        "/assets/3d/audit-core.webp",
        "/assets/3d/audit-core-open.webp",
        "/assets/3d/control-engine.webp",
        "/assets/3d/lahore-origin.webp",
        "/assets/3d/riyadh-destination.webp",
        "/assets/3d/reporting-tower.webp",
        "/assets/3d/forecasting-curve.webp",
        "/assets/3d/planning-core.webp",
        "/assets/3d/analysis-prism.webp",
        "/assets/3d/cashflow-core.webp",
        "/assets/3d/powerbi-prism.webp",
        "/assets/3d/budget-stack.webp",
        "/assets/3d/credential-pedestal.webp",
        "/certificates/icap-associate.png",
        "/certificates/socpa-associate.png",
        "/certificates/fipa-australia.png",
        "/certificates/ifa-uk.png",
        "/certificates/uiuc-accounting.png",
      ];

      await Promise.allSettled(
        criticalImages.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = src;
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          });
        })
      );

      if (!isMounted) return;

      const isDebug = new URLSearchParams(window.location.search).get("motionDebug") === "1";

      mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) return;

          // Initial entrance fade-in
          gsap.fromTo(
            "#entry-title-wrap",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
          );
          gsap.fromTo(
            "#entry-career-orbit",
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.1 }
          );

          if (isDesktop) {
            // ===================================================================
            // 00. ENTRY CHAPTER (+=800px)
            // ===================================================================
            const entryTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-entry",
                start: "top top",
                end: "+=800",
                pin: entryStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-entry"),
                onEnterBack: () => setActiveSection("scene-entry"),
              },
            });

            entryTl
              .to("#scroll-enter-prompt", { opacity: 0, y: -8, duration: 0.1 }, 0)
              .to("#entry-career-orbit", { scale: 1.15, x: "-4vw", y: "-2vh", duration: 0.6, ease: "power1.inOut" }, 0)
              .to(".orbit-label-2014", { opacity: 0.25, x: -15, duration: 0.2 }, 0.1)
              .to(".orbit-label-2017", { opacity: 0.25, x: -10, duration: 0.2 }, 0.2)
              .to(".orbit-label-2021", { opacity: 0.25, x: -5, duration: 0.2 }, 0.3)
              .to(".orbit-label-2023", { opacity: 0.25, duration: 0.2 }, 0.4)
              .fromTo(".orbit-label-2025", { scale: 1, color: "#3D73FF" }, { scale: 1.2, color: "#77A1FF", duration: 0.3 }, 0.5)
              .fromTo(
                "#entry-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3, ease: "power2.in" },
                0.7
              );

            // ===================================================================
            // 01. HERO CHAPTER (+=1200px)
            // ===================================================================
            const heroTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-hero",
                start: "top top",
                end: "+=1200",
                pin: heroStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-hero"),
                onEnterBack: () => setActiveSection("scene-hero"),
              },
            });

            heroTl
              .fromTo(
                "#hero-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(
                heroSculptureRef.current,
                { scale: 0.9, rotateZ: -4 },
                { scale: 1.12, rotateZ: 8, duration: 0.5, ease: "power1.inOut" },
                0.15
              )
              .fromTo(
                "#hero-ten-monumental",
                { opacity: 0, scale: 0.8 },
                { opacity: 0.85, scale: 1.05, duration: 0.35, ease: "power2.out" },
                0.25
              )
              .to(
                "#hero-ten-monumental",
                { opacity: 0, scale: 1.15, duration: 0.2 },
                0.65
              )
              .fromTo(
                "#hero-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 02. FOUNDATION & STATUTORY AUDIT (+=1000px)
            // ===================================================================
            const foundTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-foundation",
                start: "top top",
                end: "+=1000",
                pin: foundationStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-foundation"),
                onEnterBack: () => setActiveSection("scene-foundation"),
              },
            });

            foundTl
              .fromTo(
                "#found-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(
                "#found-audit-closed",
                { scale: 0.9, rotateZ: -6, opacity: 0.6 },
                { scale: 1.05, rotateZ: 8, opacity: 1, duration: 0.4, ease: "power1.out" },
                0.1
              )
              .to(
                "#found-audit-closed",
                { opacity: 0, duration: 0.15 },
                0.45
              )
              .fromTo(
                "#found-audit-open",
                { opacity: 0, scale: 0.92 },
                { opacity: 1, scale: 1.08, duration: 0.25, ease: "power2.out" },
                0.45
              )
              .fromTo(
                ".found-spatial-label",
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0, stagger: 0.08, duration: 0.25 },
                0.2
              )
              .fromTo(
                "#found-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 03. FINANCIAL CONTROL & GOVERNANCE (+=1000px)
            // ===================================================================
            const ctrlTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-control",
                start: "top top",
                end: "+=1000",
                pin: controlStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-control"),
                onEnterBack: () => setActiveSection("scene-control"),
              },
            });

            ctrlTl
              .fromTo(
                "#ctrl-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(
                "#ctrl-engine-obj",
                { scale: 0.88, rotateZ: -8 },
                { scale: 1.08, rotateZ: 14, duration: 0.5, ease: "power1.inOut" },
                0.1
              )
              .to("#ctrl-role-01", { opacity: 0.45, duration: 0.15 }, 0.3)
              .to("#ctrl-role-02", { opacity: 1, duration: 0.15 }, 0.3)
              .to("#ctrl-role-02", { opacity: 0.45, duration: 0.15 }, 0.55)
              .to("#ctrl-role-03", { opacity: 1, duration: 0.15 }, 0.55)
              .fromTo(
                "#ctrl-engine-glow-mid",
                { opacity: 0 },
                { opacity: 0.9, duration: 0.2 },
                0.3
              )
              .fromTo(
                "#ctrl-engine-glow-full",
                { opacity: 0 },
                { opacity: 1, duration: 0.2 },
                0.55
              )
              .fromTo(
                "#ctrl-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 04. RIYADH GEOGRAPHIC HUB (+=1100px)
            // ===================================================================
            const riyadhTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-riyadh",
                start: "top top",
                end: "+=1100",
                pin: riyadhStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-riyadh"),
                onEnterBack: () => setActiveSection("scene-riyadh"),
              },
            });

            riyadhTl
              .fromTo(
                "#riyadh-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .to("#spatial-lahore-origin", { scale: 0.8, x: -60, opacity: 0.25, duration: 0.35 }, 0.1)
              .fromTo(
                "#spatial-flight-curve",
                { strokeDasharray: 800, strokeDashoffset: 800 },
                { strokeDashoffset: 0, duration: 0.45, ease: "none" },
                0.15
              )
              .fromTo(
                "#spatial-riyadh-dest",
                { scale: 0.88, opacity: 0.2 },
                { scale: 1.08, opacity: 1, duration: 0.45, ease: "power1.out" },
                0.25
              )
              .fromTo(
                "#riyadh-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 05. FINANCIAL REPORTING TOWER (+=1100px)
            // ===================================================================
            const reportingTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-reporting",
                start: "top top",
                end: "+=1100",
                pin: reportingStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-reporting"),
                onEnterBack: () => setActiveSection("scene-reporting"),
              },
            });

            reportingTl
              .fromTo(
                "#reporting-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(
                "#reporting-tower-asset",
                { scale: 0.88, rotateZ: -6 },
                { scale: 1.05, rotateZ: 10, duration: 0.5, ease: "power1.inOut" },
                0.1
              )
              .fromTo("#rep-band-monthly", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.15 }, 0.25)
              .fromTo("#rep-band-quarterly", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.15 }, 0.4)
              .fromTo("#rep-band-annual", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.15 }, 0.55)
              .fromTo(
                "#reporting-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 06. FP&A DATA LANDSCAPE · AL RAJHI BANK (+=1200px)
            // ===================================================================
            const fpaTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-fpa",
                start: "top top",
                end: "+=1200",
                pin: fpaStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-fpa"),
                onEnterBack: () => setActiveSection("scene-fpa"),
              },
            });

            fpaTl
              .fromTo(
                "#fpa-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(fpaActualPathRef.current, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 0.35, ease: "none" }, 0.08)
              .fromTo(fpaBudgetPathRef.current, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 0.3, ease: "none" }, 0.18)
              .fromTo(fpaForecastPathRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.4, ease: "none" }, 0.28)
              .fromTo(fpaRibbonRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left center" }, { opacity: 0.9, scaleX: 1, duration: 0.35 }, 0.3)
              .fromTo("#fpa-sculpture-asset", { scale: 0.88, opacity: 0.5 }, { scale: 1.05, opacity: 1, duration: 0.45 }, 0.2)
              .fromTo(".fpa-open-point", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.25 }, 0.35)
              .fromTo(
                "#fpa-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 07. FLOOSS FINTECH LEADERSHIP (+=1200px)
            // ===================================================================
            const floossTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-flooss",
                start: "top top",
                end: "+=1200",
                pin: floossStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-flooss"),
                onEnterBack: () => setActiveSection("scene-flooss"),
              },
            });

            floossTl
              .fromTo(
                "#flooss-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo("#flooss-planning-core", { rotateZ: -6, scale: 0.92 }, { rotateZ: 18, scale: 1.1, duration: 0.45 }, 0.1)
              // Transform indicator dot with xPercent instead of left to prevent layout thrashing (Phase 7)
              .fromTo("#flooss-indicator-dot", { x: 0 }, { x: 380, duration: 0.45, ease: "none" }, 0.1)
              .to(".flooss-node-plan", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.1)
              .to(".flooss-node-plan", { color: "#F4F6F8", scale: 1, duration: 0.1 }, 0.2)
              .to(".flooss-node-fcst", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.2)
              .to(".flooss-node-fcst", { color: "#F4F6F8", scale: 1, duration: 0.1 }, 0.3)
              .to(".flooss-node-ana", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.3)
              .to(".flooss-node-ana", { color: "#F4F6F8", scale: 1, duration: 0.1 }, 0.4)
              .to(".flooss-node-rep", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.4)
              .fromTo(
                "#flooss-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 08. EXECUTIVE PHILOSOPHY (+=900px)
            // ===================================================================
            const philTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-philosophy",
                start: "top top",
                end: "+=900",
                pin: philosophyStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-philosophy"),
                onEnterBack: () => setActiveSection("scene-philosophy"),
              },
            });

            philTl
              .fromTo(
                "#phil-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(
                "#phil-content-wrap",
                { opacity: 0.4, scale: 0.94 },
                { opacity: 1, scale: 1.0, duration: 0.35, ease: "power1.out" },
                0.1
              )
              .to(
                "#phil-word-complexity",
                { scale: 2.2, color: "#77A1FF", duration: 0.35 },
                0.35
              )
              .fromTo(
                "#phil-blue-portal",
                { scale: 0.6, opacity: 0 },
                { scale: 18, opacity: 0.9, duration: 0.3 },
                0.55
              )
              .fromTo(
                "#phil-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.2, ease: "power2.in" },
                0.8
              );

            // ===================================================================
            // 09. FINANCIAL TOOLKIT CONSTELLATION (+=1200px)
            // ===================================================================
            const toolkitTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-toolkit",
                start: "top top",
                end: "+=1200",
                pin: toolkitStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-toolkit"),
                onEnterBack: () => setActiveSection("scene-toolkit"),
              },
            });

            toolkitTl
              .fromTo(
                "#toolkit-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .fromTo(
                "#toolkit-prism-core",
                { rotateZ: -12, scale: 0.88 },
                { rotateZ: 24, scale: 1.12, duration: 0.5 },
                0.1
              )
              .fromTo(
                ".toolkit-mini-node",
                { opacity: 0.4, scale: 0.88 },
                { opacity: 1, scale: 1, stagger: 0.04, duration: 0.3 },
                0.2
              )
              .fromTo(
                "#toolkit-cover-out",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
                0.75
              );

            // ===================================================================
            // 10. CREDENTIALS VAULT (+=1400px)
            // ===================================================================
            const credsTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-credentials",
                start: "top top",
                end: "+=1400",
                pin: credsStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
                onEnter: () => setActiveSection("scene-credentials"),
                onEnterBack: () => setActiveSection("scene-credentials"),
              },
            });

            credsTl
              .fromTo(
                "#creds-cover-in",
                { opacity: 1, scale: 1 },
                { opacity: 0, scale: 1.06, duration: 0.25, ease: "power2.out" },
                0
              )
              .to("#cert-card-0", { x: "-28vw", z: 120, opacity: 0, rotateY: -8, duration: 0.2 }, 0.05)
              .to("#cert-card-1", { x: "0vw", z: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.2 }, 0.05)
              .to("#cert-card-2", { x: "22vw", z: -160, opacity: 0.65, scale: 0.85, duration: 0.2 }, 0.05)

              .to("#cert-card-1", { x: "-28vw", z: 120, opacity: 0, rotateY: -8, duration: 0.2 }, 0.25)
              .to("#cert-card-2", { x: "0vw", z: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.2 }, 0.25)
              .to("#cert-card-3", { x: "22vw", z: -160, opacity: 0.65, scale: 0.85, duration: 0.2 }, 0.25)

              .to("#cert-card-2", { x: "-28vw", z: 120, opacity: 0, rotateY: -8, duration: 0.2 }, 0.45)
              .to("#cert-card-3", { x: "0vw", z: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.2 }, 0.45)
              .to("#cert-card-4", { x: "22vw", z: -160, opacity: 0.65, scale: 0.85, duration: 0.2 }, 0.45)

              .to("#cert-card-3", { x: "-28vw", z: 120, opacity: 0, rotateY: -8, duration: 0.2 }, 0.65)
              .to("#cert-card-4", { x: "0vw", z: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.2 }, 0.65);
          }
        }
      );

      // Single initial refresh after frame settlement (Phase 8)
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    };

    void runEngine();

    return () => {
      isMounted = false;
      if (mm) mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050608] text-[#F4F6F8] overflow-x-hidden font-sans">
      {/* Motion Debug Diagnostic HUD (Phase 12) */}
      <MotionDebugHud activeChapter={activeSection} />

      {/* 1. Global Persistent Stage Layer */}
      <GlobalStage currentScene={activeSection} />

      {/* 2. Ultra-Thin Desktop Scroll Progress */}
      <ScrollProgress />

      {/* 3. Restrained Custom Cursor */}
      <CustomCursor />

      {/* 4. Adaptive Navigation with 12 Chapters */}
      <AdaptiveNav activeSection={activeSection} />

      {/* 5. Fullscreen Certificate Modal Viewer with Zoom Controls */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
        currentIndex={certModalIndex + 1}
        totalCount={certificates.length}
        onNext={() => {
          const next = (certModalIndex + 1) % certificates.length;
          setCertModalIndex(next);
          setSelectedCert(certificates[next]);
        }}
        onPrev={() => {
          const prev = (certModalIndex - 1 + certificates.length) % certificates.length;
          setCertModalIndex(prev);
          setSelectedCert(certificates[prev]);
        }}
      />

      {/* 6. Progressive Role Details Drawer */}
      <RoleDetailsDrawer
        roleData={activeRoleDrawer}
        onClose={() => setActiveRoleDrawer(null)}
      />

      {/* ===================================================================== */}
      {/* 00. SCENE ENTRY (3D Career Orbit Sculpture + Spatial Milestones)       */}
      {/* ===================================================================== */}
      <section id="scene-entry" className="relative w-full">
        <div
          ref={entryStageRef}
          className="w-full h-[100svh] relative overflow-hidden flex flex-col justify-between p-8 lg:p-14 select-none bg-[#050608] z-10"
        >
          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#F4F6F8]">SAMEER MAJEED</span>
            </div>
            <div className="text-xs tracking-[0.24em] text-[#3D73FF] font-mono font-medium">
              ACA · FIPA · FFA · SOCPA
            </div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col justify-center my-auto max-w-7xl w-full mx-auto py-2">
            <div id="entry-title-wrap" className="max-w-3xl mb-2 will-change-transform">
              <h1 className="text-6xl lg:text-[6.25rem] font-light tracking-[-0.04em] leading-[0.92] text-[#F4F6F8]">
                THE FINANCIAL <br />
                <span className="font-semibold text-[#3D73FF]">JOURNEY</span>
              </h1>
              <p className="text-xl lg:text-2xl text-[#AAB1BC] font-light leading-relaxed mt-3 max-w-2xl">
                A decade across audit, technical accounting, financial control and FP&amp;A.
              </p>
            </div>

            {/* 3D Career Orbit Sculpture */}
            <div className="relative w-full flex items-center justify-center my-auto -mt-2">
              <div
                id="entry-career-orbit"
                className="relative w-[72vw] max-w-[1140px] h-[36vh] max-h-[400px] flex items-center justify-center will-change-transform"
              >
                <Image
                  src="/assets/3d/career-orbit.webp"
                  alt="3D Career Orbit Sculpture"
                  width={1600}
                  height={800}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_0_55px_rgba(61,115,255,0.45)]"
                />

                <div className="absolute inset-0 pointer-events-none">
                  <div className="orbit-label-2014 absolute bottom-4 left-[10%] text-left">
                    <span className="text-xs font-mono font-bold text-[#3D73FF] block">2014</span>
                    <span className="text-sm font-bold tracking-wider text-[#F4F6F8] uppercase">AUDIT</span>
                  </div>
                  <div className="orbit-label-2017 absolute bottom-14 left-[34%] text-left">
                    <span className="text-xs font-mono font-bold text-[#3D73FF] block">2017</span>
                    <span className="text-sm font-bold tracking-wider text-[#F4F6F8] uppercase">CONTROL</span>
                  </div>
                  <div className="orbit-label-2021 absolute bottom-22 left-[56%] text-left">
                    <span className="text-xs font-mono font-bold text-[#3D73FF] block">2021</span>
                    <span className="text-sm font-bold tracking-wider text-[#F4F6F8] uppercase">REPORTING</span>
                  </div>
                  <div className="orbit-label-2023 absolute top-14 right-[24%] text-left">
                    <span className="text-xs font-mono font-bold text-[#3D73FF] block">2023</span>
                    <span className="text-sm font-bold tracking-wider text-[#F4F6F8] uppercase">FP&amp;A</span>
                  </div>
                  <div className="orbit-label-2025 absolute top-4 right-[8%] text-left">
                    <span className="text-xs font-mono font-bold text-[#77A1FF] block">2025</span>
                    <span className="text-sm font-bold tracking-wider text-[#F4F6F8] uppercase">FLOOSS</span>
                    <div
                      id="entry-blue-beacon-bloom"
                      className="w-4 h-4 rounded-full bg-[#3D73FF] shadow-[0_0_25px_#3D73FF] opacity-0 -mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>RIYADH, SAUDI ARABIA</span>
            <div id="scroll-enter-prompt" className="flex items-center gap-2 text-[#3D73FF] font-bold">
              <span>SCROLL TO EXPLORE</span>
              <span className="animate-bounce">↓</span>
            </div>
            <span>2014 — PRESENT</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Hero */}
          <div
            id="entry-cover-out"
            className="absolute inset-0 z-30 bg-[#0D1015] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 01. SCENE HERO (Independent Pinned Chapter)                            */}
      {/* ===================================================================== */}
      <section id="scene-hero" className="relative w-full">
        <div
          ref={heroStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#0D1015] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Entry */}
          <div
            id="hero-cover-in"
            className="absolute inset-0 z-30 bg-[#0D1015] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="text-xs font-bold tracking-[0.24em] text-[#3D73FF] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF]" />
              01 — EXECUTIVE PROFILE
            </div>
            <div className="text-xs font-mono tracking-wider text-[#AAB1BC]">RIYADH · SAUDI ARABIA</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div id="hero-left-content" className="col-span-12 lg:col-span-7 flex flex-col justify-center pr-4">
              <div className="text-xs font-bold tracking-[0.26em] text-[#3D73FF] uppercase mb-2">
                FP&amp;A MANAGER
              </div>

              <h2 className="text-6xl lg:text-[5.75rem] font-bold tracking-[-0.04em] text-[#F4F6F8] leading-[0.92]">
                SAMEER <br />
                <span className="text-[#AAB1BC]">MAJEED</span>
              </h2>

              <p className="text-xl lg:text-2xl text-[#AAB1BC] font-light leading-snug tracking-tight mt-6 max-w-xl">
                Financial planning and analysis with clarity, discipline and foresight.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 bg-[#171B22] border border-[#303640] text-[#F4F6F8] text-xs font-bold tracking-[0.2em] uppercase rounded">
                  ACA
                </span>
                <span className="px-3.5 py-1.5 bg-[#171B22] border border-[#303640] text-[#F4F6F8] text-xs font-bold tracking-[0.2em] uppercase rounded">
                  FIPA
                </span>
                <span className="px-3.5 py-1.5 bg-[#171B22] border border-[#303640] text-[#F4F6F8] text-xs font-bold tracking-[0.2em] uppercase rounded">
                  FFA
                </span>
                <span className="px-3.5 py-1.5 bg-[#171B22] border border-[#303640] text-[#3D73FF] text-xs font-bold tracking-[0.2em] uppercase rounded">
                  SOCPA
                </span>
                <span className="text-xs font-mono text-[#AAB1BC] ml-2">ICAP · IPA AU · IFA UK</span>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <a
                  href="#scene-foundation"
                  className="px-9 py-4 bg-[#245BFF] text-[#F4F6F8] text-xs font-bold tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#3D73FF] hover:scale-[1.03] shadow-[0_0_25px_rgba(36,91,255,0.4)] rounded"
                >
                  EXPLORE THE JOURNEY
                </a>
                <a
                  href="#scene-contact"
                  className="group px-9 py-4 border border-[#303640] text-[#F4F6F8] text-xs font-bold tracking-[0.24em] uppercase transition-all duration-300 hover:border-[#3D73FF] hover:text-[#3D73FF] flex items-center gap-2 rounded bg-[#171B22]/50"
                >
                  <span>CONTACT</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            {/* Right: Bespoke 3D Glass Sculpture + Sameer's Full Portrait (Full Headroom, No Cropping) */}
            <div className="col-span-12 lg:col-span-5 relative h-full flex items-end justify-end">
              <div
                ref={heroSculptureRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 will-change-transform origin-center"
              >
                <Image
                  src="/assets/3d/hero-sculpture.png"
                  alt="3D Glass Financial Sculpture"
                  width={750}
                  height={750}
                  priority
                  className="w-[110%] max-w-none h-auto object-contain drop-shadow-[0_0_45px_rgba(36,91,255,0.3)]"
                />
              </div>

              {/* 10+ Years Monumental Scroll Emerge */}
              <div
                id="hero-ten-monumental"
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-0 z-15"
              >
                <div className="text-8xl lg:text-[11rem] font-black text-[#F4F6F8]/80 tracking-tighter leading-none">
                  10+
                </div>
                <div id="hero-years-sub" className="text-lg font-mono tracking-[0.3em] text-[#3D73FF] font-bold uppercase">
                  YEARS ACROSS FINANCE
                </div>
              </div>

              {/* Sameer's Portrait: Guaranteed Full Face, Hair & Headroom (>80px clearance) */}
              <div
                ref={heroPortraitRef}
                className="relative z-20 h-[78svh] max-h-[760px] w-auto flex items-end justify-end will-change-transform"
              >
                <Image
                  src="/portrait/sameer-majeed.png"
                  alt="Sameer Majeed, FP&A Manager"
                  width={660}
                  height={880}
                  priority
                  className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>EXECUTIVE PORTFOLIO</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 01 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Foundation */}
          <div
            id="hero-cover-out"
            className="absolute inset-0 z-30 bg-[#0D1015] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 02. SCENE FOUNDATION (Independent Pinned Chapter)                      */}
      {/* ===================================================================== */}
      <section id="scene-foundation" className="relative w-full">
        <div
          ref={foundationStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#0D1015] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Hero */}
          <div
            id="found-cover-in"
            className="absolute inset-0 z-30 bg-[#0D1015] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                02 — FOUNDATION &amp; STATUTORY AUDIT
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">2014 — 2017 · LAHORE</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-mono text-[#3D73FF] tracking-[0.25em] uppercase font-bold mb-2">
                HASSAN NAEEM &amp; CO (UHY) · CHARTERED PRACTICE
              </span>
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#F4F6F8]">
                AUDIT <br />
                <span className="text-[#AAB1BC] font-light">ASSOCIATE</span>
              </h2>
              <p className="text-lg text-[#AAB1BC] font-light leading-relaxed mt-5 max-w-xl">
                3.5 years of rigorous chartered training executing statutory audits under International Standards on Auditing (ISA) and IFRS frameworks.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { title: "INTERNAL CONTROLS", desc: "Entity-level control evaluation & board recommendations" },
                  { title: "IFRS STANDARDS", desc: "Complex financial statement review & statutory disclosures" },
                  { title: "STATUTORY AUDIT", desc: "ISA audit execution, engagement leadership & technical resolution" },
                ].map((item, idx) => (
                  <div key={item.title} className="found-spatial-label flex items-start gap-3 text-sm text-[#F4F6F8]">
                    <span className="font-mono text-xs text-[#3D73FF] font-bold mt-0.5">0{idx + 1}</span>
                    <div>
                      <span className="font-bold text-[#F4F6F8]">{item.title}</span>
                      <span className="text-[#AAB1BC] font-light ml-2">— {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setActiveRoleDrawer(roleRecords.hassan)}
                  className="px-6 py-3 rounded bg-[#171B22] border border-[#3D73FF]/50 text-xs font-mono tracking-widest text-[#F4F6F8] hover:bg-[#3D73FF] transition-all uppercase flex items-center gap-2"
                >
                  <span>VIEW ROLE DETAILS</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            {/* Right: Audit Core 3D Object */}
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative">
              <div className="relative w-[54vw] max-w-[620px] aspect-square flex items-center justify-center will-change-transform pointer-events-none">
                <Image
                  id="found-audit-closed"
                  src="/assets/3d/audit-core.webp"
                  alt="3D Audit Core Object Closed"
                  width={680}
                  height={680}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_60px_rgba(61,115,255,0.4)]"
                />
                <Image
                  id="found-audit-open"
                  src="/assets/3d/audit-core-open.webp"
                  alt="3D Audit Core Object Open"
                  width={680}
                  height={680}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_60px_rgba(61,115,255,0.5)] opacity-0"
                />
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>CHARTERED RIGOR</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 02 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Control */}
          <div
            id="found-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 03. SCENE CONTROL (Independent Pinned Chapter)                         */}
      {/* ===================================================================== */}
      <section id="scene-control" className="relative w-full">
        <div
          ref={controlStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Foundation */}
          <div
            id="ctrl-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                03 — FINANCIAL CONTROL &amp; LIQUIDITY GOVERNANCE
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">2017 — 2021 · 4 YEARS</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-mono text-[#3D73FF] uppercase tracking-widest font-bold mb-2">
                VARIOLINE SERVICES &amp; ZOOM MARKETING OILS
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8]">
                FINANCIAL <br />
                <span className="text-[#AAB1BC]">CONTROL</span>
              </h2>
              <p className="text-base text-[#AAB1BC] font-light leading-relaxed mt-4">
                Advancing from Head of Accounts to Manager Accounts &amp; Finance, governing working capital, bank debt facilities, import LCs, and ERP implementation.
              </p>

              {/* 3 Role States */}
              <div className="mt-8 space-y-4">
                <div id="ctrl-role-01" className="border-l-2 border-[#3D73FF] pl-4">
                  <div className="text-xs font-mono text-[#3D73FF]">01 · 2017 — 2018</div>
                  <div className="text-xl font-bold text-[#F4F6F8]">Head of Accounts · Varioline Services</div>
                  <div className="text-xs text-[#AAB1BC] font-light mt-1">
                    Financial reporting, Oracle ERP GL/AP, monthly closing, and customer/vendor aging analysis.
                  </div>
                </div>

                <div id="ctrl-role-02" className="border-l-2 border-[#3D73FF] pl-4 opacity-40">
                  <div className="text-xs font-mono text-[#3D73FF]">02 · 2018 — 2021</div>
                  <div className="text-xl font-bold text-[#F4F6F8]">Deputy Manager Finance · Zoom Marketing Oils</div>
                  <div className="text-xs text-[#AAB1BC] font-light mt-1">
                    Banking import LCs, corporate debt facilities, working capital budgets, and tax e-filing.
                  </div>
                </div>

                <div id="ctrl-role-03" className="border-l-2 border-[#3D73FF] pl-4 opacity-40">
                  <div className="text-xs font-mono text-[#3D73FF]">03 · 2021</div>
                  <div className="text-xl font-bold text-[#F4F6F8]">Manager Accounts &amp; Finance · Zoom Marketing Oils</div>
                  <div className="text-xs text-[#AAB1BC] font-light mt-1">
                    Enterprise liquidity governance, stakeholder management, and SAP Business One go-live oversight.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setActiveRoleDrawer(roleRecords.zoom)}
                  className="px-5 py-2.5 rounded bg-[#171B22] border border-[#303640] hover:border-[#3D73FF] text-xs font-mono text-[#F4F6F8] transition-colors"
                >
                  VIEW ZOOM MANDATE ↗
                </button>
                <button
                  onClick={() => setActiveRoleDrawer(roleRecords.varioline)}
                  className="px-5 py-2.5 rounded bg-[#171B22] border border-[#303640] hover:border-[#3D73FF] text-xs font-mono text-[#F4F6F8] transition-colors"
                >
                  VIEW VARIOLINE MANDATE ↗
                </button>
              </div>
            </div>

            {/* Right: Control Engine 3D Asset */}
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative">
              <div
                id="ctrl-engine-obj"
                className="relative w-[48vw] max-w-[580px] aspect-square flex items-center justify-center will-change-transform pointer-events-none"
              >
                <Image
                  src="/assets/3d/control-engine.webp"
                  alt="3D Control Engine Object"
                  width={680}
                  height={680}
                  className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(61,115,255,0.45)]"
                />
                <div
                  id="ctrl-engine-glow-mid"
                  className="absolute inset-0 bg-radial from-[#3D73FF]/20 to-transparent opacity-0 rounded-full blur-2xl pointer-events-none"
                />
                <div
                  id="ctrl-engine-glow-full"
                  className="absolute inset-0 bg-radial from-[#77A1FF]/30 via-[#245BFF]/20 to-transparent opacity-0 rounded-full blur-3xl pointer-events-none"
                />
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>FINANCIAL OPERATING SYSTEMS</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 03 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Riyadh */}
          <div
            id="ctrl-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 04. SCENE RIYADH (Independent Pinned Chapter)                          */}
      {/* ===================================================================== */}
      <section id="scene-riyadh" className="relative w-full">
        <div
          ref={riyadhStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Control */}
          <div
            id="riyadh-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                04 — GEOGRAPHIC EVOLUTION · LAHORE ➔ RIYADH
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">2021 — 2023 · SAUDI ARABIA</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold mb-2">
                CROSS-BORDER CAREER EXPANSION
              </span>
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#F4F6F8]">
                RIYADH <br />
                <span className="text-[#3D73FF]">SCALE.</span>
              </h2>
              <p className="text-lg text-[#AAB1BC] font-light leading-relaxed mt-6">
                Relocating into the financial heart of the GCC to lead enterprise financial planning and multi-entity consolidation in Saudi Arabia.
              </p>
            </div>

            {/* Spatial Flight Visual */}
            <div className="col-span-12 lg:col-span-7 relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-2xl h-[420px] flex items-center justify-between">
                <div id="spatial-lahore-origin" className="relative w-44 h-44 flex flex-col items-center justify-center will-change-transform">
                  <Image
                    src="/assets/3d/lahore-origin.webp"
                    alt="Lahore Origin"
                    width={220}
                    height={220}
                    className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
                  />
                  <span className="text-xs font-mono text-[#AAB1BC] mt-2 font-bold tracking-wider">LAHORE 2014</span>
                </div>

                <svg className="flex-1 h-32 overflow-visible px-4">
                  <path
                    id="spatial-flight-curve"
                    d="M 10,70 Q 150,-20 300,70"
                    fill="none"
                    stroke="#3D73FF"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="drop-shadow-[0_0_12px_#3D73FF]"
                  />
                </svg>

                <div id="spatial-riyadh-dest" className="relative w-52 h-52 flex flex-col items-center justify-center will-change-transform">
                  <Image
                    src="/assets/3d/riyadh-destination.webp"
                    alt="Riyadh Destination"
                    width={260}
                    height={260}
                    className="w-full h-full object-contain drop-shadow-[0_0_45px_rgba(61,115,255,0.4)]"
                  />
                  <span className="text-xs font-mono text-[#3D73FF] mt-2 font-bold tracking-wider">RIYADH 2021 — NOW</span>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>CROSS-BORDER EXPANSION</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 04 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Reporting */}
          <div
            id="riyadh-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 05. SCENE REPORTING (Independent Pinned Chapter)                       */}
      {/* ===================================================================== */}
      <section id="scene-reporting" className="relative w-full">
        <div
          ref={reportingStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Riyadh */}
          <div
            id="reporting-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                05 — FINANCIAL REPORTING CADENCE
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">IFRS &amp; ZAKAT RIGOR</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold mb-2">
                RECURRING EXECUTIVE VISIBILITY
              </span>
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#F4F6F8]">
                FINANCIAL <br />
                <span className="text-[#AAB1BC]">CADENCE</span>
              </h2>
              <p className="text-lg text-[#AAB1BC] font-light leading-relaxed mt-5 max-w-xl">
                Establishing automated monthly closes, rolling quarterly forecasts, and board-ready statutory reporting packages under IFRS standards.
              </p>

              <div className="mt-8 space-y-3">
                <div id="rep-band-monthly" className="p-4 rounded bg-[#171B22]/80 border-l-4 border-[#3D73FF] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#3D73FF] font-bold uppercase">MONTHLY CLOSING</div>
                    <div className="text-base font-bold text-[#F4F6F8]">General Ledger Integrity &amp; Variance Review</div>
                  </div>
                  <span className="text-xs font-mono text-[#AAB1BC]">DAY +5</span>
                </div>

                <div id="rep-band-quarterly" className="p-4 rounded bg-[#171B22]/80 border-l-4 border-[#3D73FF] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#3D73FF] font-bold uppercase">QUARTERLY PACKAGES</div>
                    <div className="text-base font-bold text-[#F4F6F8]">Rolling Forecasts &amp; Board Investor Decks</div>
                  </div>
                  <span className="text-xs font-mono text-[#AAB1BC]">DAY +12</span>
                </div>

                <div id="rep-band-annual" className="p-4 rounded bg-[#171B22]/80 border-l-4 border-[#3D73FF] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#3D73FF] font-bold uppercase">ANNUAL AUDIT</div>
                    <div className="text-base font-bold text-[#F4F6F8]">Statutory Audit &amp; Zakat / CIT Filing</div>
                  </div>
                  <span className="text-xs font-mono text-[#AAB1BC]">DAY +30</span>
                </div>
              </div>
            </div>

            {/* Right: 3D Reporting Tower */}
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative">
              <div className="relative w-[48vw] max-w-[560px] aspect-square flex items-center justify-center will-change-transform pointer-events-none">
                <Image
                  id="reporting-tower-asset"
                  src="/assets/3d/reporting-tower.webp"
                  alt="3D Reporting Tower Object"
                  width={680}
                  height={680}
                  className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(61,115,255,0.45)]"
                />
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>REPORTING: WHAT HAPPENED</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 05 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to FP&A */}
          <div
            id="reporting-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 06. SCENE FP&A / AL RAJHI BANK (Independent Pinned Chapter)            */}
      {/* ===================================================================== */}
      <section id="scene-fpa" className="relative w-full">
        <div
          ref={fpaStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Reporting */}
          <div
            id="fpa-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="relative z-20 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                06 — FP&amp;A DATA LANDSCAPE · AL RAJHI BANK
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">2023 — 2025 · RIYADH</div>
          </header>

          {/* SVG Line Paths Passing Behind & In Front of 3D Sculpture */}
          <div className="absolute inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 1440 700" className="w-full h-full overflow-visible opacity-90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fpaRibbonGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#245BFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3D73FF" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <polygon
                ref={fpaRibbonRef}
                points="720,280 880,220 1060,160 1240,110 1440,70 1440,370 1240,340 1060,320 880,300 720,280"
                fill="url(#fpaRibbonGrad)"
              />

              <path
                ref={fpaBudgetPathRef}
                d="M 60,540 L 220,490 L 380,450 L 540,400 L 720,330 L 900,280 L 1080,240 L 1260,200 L 1440,170"
                fill="none"
                stroke="#AAB1BC"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />

              <path
                ref={fpaActualPathRef}
                d="M 60,520 L 220,455 L 380,405 L 540,350 L 720,280"
                fill="none"
                stroke="#F4F6F8"
                strokeWidth="4"
              />

              <path
                ref={fpaForecastPathRef}
                d="M 720,280 L 900,240 L 1080,195 L 1260,150 L 1440,110"
                fill="none"
                stroke="#3D73FF"
                strokeWidth="5"
                className="drop-shadow-[0_0_15px_#3D73FF]"
              />

              <text x="360" y="380" fill="#F4F6F8" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                ACTUAL
              </text>
              <text x="360" y="480" fill="#AAB1BC" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                BUDGET
              </text>
              <text x="960" y="180" fill="#3D73FF" fontSize="14" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                FORECAST → FUTURE
              </text>
            </svg>
          </div>

          {/* Integrated Physical 3D Forecast Curve Asset */}
          <div
            id="fpa-sculpture-asset"
            className="absolute right-[8vw] top-[18vh] w-[58vw] max-w-[680px] pointer-events-none z-10 will-change-transform"
          >
            <Image
              src="/assets/3d/forecasting-curve.webp"
              alt="3D Forecast Curve Sculpture"
              width={900}
              height={600}
              className="w-full h-auto object-contain drop-shadow-[0_0_45px_rgba(61,115,255,0.45)]"
            />
          </div>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-between my-auto py-4">
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-start pt-2">
              <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold mb-2">
                HISTORICAL ACTUALS → VARIANCE ANALYSIS → FORWARD GUIDANCE
              </span>
              <h2 className="text-5xl lg:text-[5.25rem] font-light tracking-[-0.04em] leading-[0.92] text-[#F4F6F8]">
                FROM REPORTING <br />
                <span className="font-bold text-[#3D73FF]">TO FORESIGHT.</span>
              </h2>

              <div className="mt-8 border-l-2 border-[#3D73FF] pl-4 max-w-md">
                <div className="text-xs font-mono text-[#3D73FF] font-bold uppercase">
                  VARIANCE INTELLIGENCE
                </div>
                <p className="text-xs text-[#AAB1BC] font-light mt-1">
                  Isolating operational price, volume and mix variances between Actuals and Budget to guide strategic capital deployment.
                </p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col justify-end pb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-px bg-[#3D73FF]" />
                <span className="text-xs font-mono text-[#3D73FF] tracking-widest uppercase font-bold">
                  INSTITUTIONAL MANDATE
                </span>
              </div>
              <h3 className="text-4xl font-bold text-[#F4F6F8]">AL RAJHI BANK</h3>
              <div className="text-sm font-mono text-[#3D73FF] font-semibold mt-1">
                FP&amp;A SPECIALIST · 2023 — 2025 · RIYADH
              </div>

              <div className="mt-6 space-y-2.5">
                {[
                  "ANNUAL INSTITUTIONAL BUDGETING",
                  "QUARTERLY ROLLING FORECASTS",
                  "FINANCIAL VARIANCE ANALYSIS",
                  "MICROSOFT POWER BI DASHBOARDS",
                ].map((item, idx) => (
                  <div key={item} className="fpa-open-point flex items-center gap-3 text-sm text-[#F4F6F8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D73FF]" />
                    <span className="font-mono tracking-wider">{item}</span>
                    <span className="text-xs font-mono text-[#AAB1BC] ml-auto">0{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setActiveRoleDrawer(roleRecords.alrajhi)}
                  className="px-5 py-2.5 rounded bg-[#171B22] border border-[#3D73FF]/50 text-xs font-mono text-[#F4F6F8] hover:bg-[#3D73FF] transition-colors flex items-center gap-2"
                >
                  <span>VIEW ROLE DETAILS</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </main>

          <footer className="relative z-20 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>FULL-SCREEN DATA LANDSCAPE</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 06 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Flooss */}
          <div
            id="fpa-cover-out"
            className="absolute inset-0 z-30 bg-[#0D1015] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 07. SCENE FLOOSS (Independent Pinned Chapter)                          */}
      {/* ===================================================================== */}
      <section id="scene-flooss" className="relative w-full">
        <div
          ref={floossStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#0D1015] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from FP&A */}
          <div
            id="flooss-cover-in"
            className="absolute inset-0 z-30 bg-[#0D1015] pointer-events-none"
          />

          {/* Sameer's Portrait: Human Focal Point (Guaranteed Full Headroom) */}
          <div
            ref={floossPortraitRef}
            className="absolute left-0 bottom-0 z-20 h-[78svh] max-h-[760px] w-auto flex items-end justify-start pl-8 lg:pl-16 will-change-transform pointer-events-none"
          >
            <Image
              src="/portrait/sameer-majeed.png"
              alt="Sameer Majeed, FP&A Manager at Flooss"
              width={660}
              height={880}
              priority
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            />
          </div>

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                07 — PRESENT LEADERSHIP · 2025 — PRESENT
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#AAB1BC]">FLOOSS FINTECH · RIYADH</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto py-2">
            <div className="col-span-12 lg:col-span-5 relative h-full flex items-center justify-center">
              <div
                id="flooss-planning-core"
                className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform z-0"
              >
                <Image
                  src="/assets/3d/planning-core.webp"
                  alt="3D Planning Core Asset"
                  width={680}
                  height={680}
                  className="w-[90%] h-auto object-contain drop-shadow-[0_0_45px_rgba(61,115,255,0.35)]"
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center pl-4 pr-2 z-10">
              <div className="flex items-baseline gap-4 mb-1">
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F6F8]">FLOOSS</h3>
                <span className="text-lg font-semibold tracking-[0.2em] text-[#3D73FF] uppercase">FP&amp;A MANAGER</span>
              </div>
              <div className="text-xs font-mono text-[#AAB1BC] tracking-wider mb-2">
                MAR 2025 — PRESENT · RIYADH, SAUDI ARABIA
              </div>

              <h2 className="text-6xl lg:text-[5.5rem] font-light tracking-[-0.04em] text-[#F4F6F8] leading-[0.9] my-2">
                PLANNING <br />
                WHAT COMES <br />
                <span className="font-bold text-[#3D73FF]">NEXT.</span>
              </h2>

              <div className="mt-4">
                <button
                  onClick={() => setActiveRoleDrawer(roleRecords.flooss)}
                  className="px-5 py-2.5 rounded bg-[#171B22] border border-[#3D73FF]/60 text-xs font-mono tracking-wider text-[#F4F6F8] hover:bg-[#3D73FF] transition-all uppercase inline-flex items-center gap-2"
                >
                  <span>VIEW FLOOSS MANDATE &amp; RESPONSIBILITIES</span>
                  <span>↗</span>
                </button>
              </div>

              {/* 4 Spatial Stations Along Perspective Rail */}
              <div className="relative mt-8 pt-5 border-t border-[#303640]">
                <div
                  id="flooss-indicator-dot"
                  className="absolute top-[-5px] left-0 w-3 h-3 bg-[#3D73FF] rounded-full shadow-[0_0_12px_#3D73FF] will-change-transform"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { cls: "flooss-node-plan", name: "PLAN", desc: "Capital runway architecture & multi-year models" },
                    { cls: "flooss-node-fcst", name: "FORECAST", desc: "Dynamic rolling cohort models responsive to velocity" },
                    { cls: "flooss-node-ana", name: "ANALYZE", desc: "Cohort unit economics & payback velocity" },
                    { cls: "flooss-node-rep", name: "REPORT", desc: "Executive board decks & investor transparency" },
                  ].map((cap, idx) => (
                    <div key={cap.name} className={\`\${cap.cls} flex flex-col transition-all duration-300\`}>
                      <div className="flex items-center justify-between pb-1 border-b border-[#303640]/60">
                        <span className="text-xs font-mono font-bold text-[#3D73FF]">0{idx + 1}</span>
                        <span className="text-base font-bold tracking-[0.14em] uppercase">{cap.name}</span>
                      </div>
                      <p className="text-xs text-[#AAB1BC] font-light leading-relaxed mt-2">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>FINTECH STRATEGY HORIZON</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 07 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Philosophy */}
          <div
            id="flooss-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 08. SCENE PHILOSOPHY (Independent Pinned Chapter)                      */}
      {/* ===================================================================== */}
      <section id="scene-philosophy" className="relative w-full">
        <div
          ref={philosophyStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-20"
        >
          {/* Phase 14: Transition Cover In from Flooss */}
          <div
            id="phil-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="pt-10">
            <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold">
              08 — EXECUTIVE PHILOSOPHY
            </span>
          </header>

          <main id="phil-content-wrap" className="max-w-3xl my-auto will-change-transform">
            <h2 className="text-5xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.02] text-[#F4F6F8]">
              CLARITY <br />
              BEFORE <br />
              <span
                id="phil-word-complexity"
                className="font-bold text-[#3D73FF] inline-block will-change-transform origin-center"
              >
                COMPLEXITY.
              </span>
            </h2>
            <p
              id="phil-text-body"
              className="text-xl text-[#AAB1BC] font-light leading-relaxed mt-6 max-w-xl will-change-transform"
            >
              A career shaped by disciplined reporting, rigorous financial planning and forward-looking analysis.
            </p>
          </main>

          <footer className="pt-3 text-xs font-mono text-[#AAB1BC] flex items-center justify-between">
            <span>PHILOSOPHICAL ANCHOR</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 08 / 11</span>
          </footer>

          {/* Portal Expansion inside COMPLEXITY */}
          <div
            id="phil-blue-portal"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#245BFF] opacity-0 blur-3xl pointer-events-none z-25 will-change-transform"
          />

          {/* Phase 14: Transition Cover Out to Toolkit */}
          <div
            id="phil-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 09. SCENE TOOLKIT (Independent Pinned Chapter)                         */}
      {/* ===================================================================== */}
      <section id="scene-toolkit" className="relative w-full">
        <div
          ref={toolkitStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Philosophy */}
          <div
            id="toolkit-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                09 — FINANCIAL TOOLKIT CONSTELLATION
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">INTERACTIVE 3D DISCIPLINE</div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col justify-center items-center my-auto py-2">
            <div className="relative w-full max-w-5xl h-[480px] flex items-center justify-center">
              {/* Central Optical Analysis Prism */}
              <div
                id="toolkit-prism-core"
                className="absolute w-44 h-44 flex items-center justify-center pointer-events-none will-change-transform z-10"
              >
                <Image
                  src="/assets/3d/analysis-prism.webp"
                  alt="3D Optical Analysis Prism"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain drop-shadow-[0_0_45px_rgba(61,115,255,0.45)]"
                />
              </div>

              {/* Orbiting 3D Miniature Assets */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                {toolkitSkills.map((sk, idx) => {
                  const isActive = activeToolkitSkill === idx;

                  return (
                    <button
                      key={sk.id}
                      onClick={() => setActiveToolkitSkill(idx)}
                      onMouseEnter={() => setActiveToolkitSkill(idx)}
                      className={\`toolkit-mini-node absolute \${sk.pos} flex items-center gap-3 p-2 rounded-lg transition-all duration-300 group cursor-pointer \${
                        isActive
                          ? "scale-110 z-30 drop-shadow-[0_0_20px_#3D73FF]"
                          : "opacity-75 hover:opacity-100 hover:scale-105 z-20"
                      }\`}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <Image
                          src={sk.asset}
                          alt={sk.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className={\`text-xs font-mono tracking-wider font-semibold transition-colors \${
                          isActive ? "text-[#F4F6F8] font-bold" : "text-[#AAB1BC] group-hover:text-[#F4F6F8]"
                        }\`}
                      >
                        {sk.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Concise Capability Guidance Line */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center max-w-lg z-30">
                <div className="text-xs font-mono text-[#3D73FF] font-bold uppercase mb-1">
                  {toolkitSkills[activeToolkitSkill].name}
                </div>
                <p className="text-sm text-[#F4F6F8]/90 font-light leading-relaxed">
                  {toolkitSkills[activeToolkitSkill].desc}
                </p>
                <div className="text-[10px] font-mono text-[#AAB1BC] mt-2">EXPLORE INTERACTIVE 3D NODES</div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>SPATIAL FINANCIAL CONSTELLATION</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 09 / 11</span>
          </footer>

          {/* Phase 14: Transition Cover Out to Credentials */}
          <div
            id="toolkit-cover-out"
            className="absolute inset-0 z-30 bg-[#050608] opacity-0 pointer-events-none"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 10. SCENE CREDENTIALS (Independent Pinned Chapter)                     */}
      {/* ===================================================================== */}
      <section id="scene-credentials" className="relative w-full">
        <div
          ref={credsStageRef}
          className="w-full h-[100svh] relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between p-8 lg:p-14"
        >
          {/* Phase 14: Transition Cover In from Toolkit */}
          <div
            id="creds-cover-in"
            className="absolute inset-0 z-30 bg-[#050608] pointer-events-none"
          />

          <header className="relative z-10 flex items-center justify-between pt-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                10 — CREDENTIALS VAULT · 5 AUTHENTICATED CERTIFICATES
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#AAB1BC]">
              <span className="font-bold text-[#3D73FF]">ALL 5 AUTHENTICATED</span>
              <span>CLICK TO EXPAND FULLSCREEN</span>
            </div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2">
            <div className="mb-2">
              <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold block mb-1">
                GOVERNANCE &amp; ACCREDITATIONS
              </span>
              <h2 className="text-4xl lg:text-5xl font-light tracking-[-0.035em] text-[#F4F6F8]">
                CREDENTIALS <br />
                <span className="font-bold text-[#3D73FF]">&amp; CHARTERED FELLOWSHIPS</span>
              </h2>
            </div>

            {/* Pinned 3D Exhibition with Pedestal */}
            <div
              className="relative w-full h-[470px] flex items-center justify-center pt-2 pb-2"
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-[48vw] max-w-[580px] aspect-[4/3] flex items-center justify-center">
                  <Image
                    src="/assets/3d/credential-pedestal.webp"
                    alt="3D Floating Certificate Pedestal"
                    width={800}
                    height={900}
                    className="w-full h-full object-contain drop-shadow-[0_0_55px_rgba(36,91,255,0.4)]"
                  />
                </div>
              </div>

              {/* 5 Real Certificates */}
              {certificates.map((cert, idx) => (
                <div
                  key={cert.id}
                  id={\`cert-card-\${idx}\`}
                  data-cursor="view"
                  onClick={() => {
                    setCertModalIndex(idx);
                    setSelectedCert(cert);
                  }}
                  className="absolute w-[28vw] max-w-[360px] aspect-[3/4] p-1.5 cursor-pointer transition-all duration-300 hover:scale-105 will-change-transform rounded shadow-2xl border border-[#303640] hover:border-[#3D73FF] bg-[#0D1015] z-10"
                  style={{
                    transform: \`translateZ(\${idx === 0 ? "0px" : \`\${-180 * idx}px\`}) translateX(\${idx === 0 ? "0vw" : \`\${22 * idx}vw\`})\`,
                    opacity: idx === 0 ? 1 : Math.max(0.25, 0.75 - idx * 0.18),
                  }}
                >
                  <div className="relative w-full h-full bg-[#050608] rounded overflow-hidden p-1 flex items-center justify-center">
                    <Image
                      src={cert.img}
                      alt={cert.alt}
                      width={550}
                      height={750}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-2">
              <div id="cert-meta-active" className="text-sm font-mono text-[#3D73FF] font-bold uppercase tracking-widest">
                01 / 05 · ASSOCIATE CHARTERED ACCOUNTANT (ACA · ICAP)
              </div>
              <div className="text-xs text-[#AAB1BC] mt-0.5">CLICK ANY CERTIFICATE FOR FULLSCREEN HIGH-RES INSPECTION</div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>VERIFIED CREDENTIAL ARCHIVE</span>
            <span className="text-[#3D73FF] font-bold">CHAPTER 10 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 11. SCENE CONTACT (Cinematic Black Finale)                             */}
      {/* ===================================================================== */}
      <section id="scene-contact" className="relative w-full min-h-screen bg-[#050608] flex flex-col justify-between p-8 lg:p-14 overflow-hidden select-none">
        <div className="absolute right-0 bottom-0 h-[88%] w-auto pointer-events-none z-0 flex items-end">
          <div className="absolute inset-0 bg-radial from-[#3D73FF]/15 to-transparent blur-3xl" />
          <Image
            src="/portrait/sameer-majeed.png"
            alt="Visual echo"
            width={600}
            height={800}
            className="h-full w-auto object-contain object-bottom opacity-20 mix-blend-luminosity"
          />
        </div>

        <header className="relative z-10 flex items-center justify-between pt-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF]" />
            <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
              11 — INITIATE EXECUTIVE ENGAGEMENT
            </span>
          </div>
          <div className="text-xs font-mono text-[#AAB1BC]">EXECUTIVE DIALOGUE</div>
        </header>

        <main className="relative z-10 flex-1 grid grid-cols-12 gap-10 items-center my-auto py-8">
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center pr-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold mb-2">
              CONTACT &amp; ADVISORY
            </span>
            <h2 className="text-7xl lg:text-[7.5rem] font-light tracking-[-0.04em] text-[#F4F6F8] leading-[0.88]">
              LET&apos;S <br />
              <span className="font-bold text-[#3D73FF]">CONNECT.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between pl-0 lg:pl-8 space-y-8">
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#F4F6F8]">Sameer Majeed</div>
              <div className="text-sm font-mono text-[#3D73FF] font-semibold mt-0.5">
                FP&amp;A Manager · Riyadh, Saudi Arabia
              </div>
              <div className="text-xs font-mono text-[#AAB1BC] mt-0.5">
                Chartered Accountant · ACA · FIPA · FFA · SOCPA
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono tracking-[0.2em] text-[#AAB1BC] uppercase block">
                Direct Email
              </span>
              <a
                href="mailto:sameerpk_majeed@hotmail.com"
                className="group relative inline-block text-2xl lg:text-3xl font-mono font-medium text-[#F4F6F8] hover:text-[#3D73FF] transition-colors break-all"
              >
                sameerpk_majeed@hotmail.com
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#3D73FF]" />
              </a>
              <br />
              <a
                href="https://linkedin.com/in/sameer-majeed-aca"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-mono text-[#3D73FF] hover:underline pt-1"
              >
                <span>linkedin.com/in/sameer-majeed-aca</span>
                <span>↗</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="mailto:sameerpk_majeed@hotmail.com?subject=Executive%20FP%26A%20Inquiry"
                className="inline-flex items-center justify-center px-10 py-5 bg-[#245BFF] hover:bg-[#3D73FF] text-[#F4F6F8] text-xs font-mono tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(36,91,255,0.45)] rounded"
              >
                START A CONVERSATION →
              </a>
            </div>
          </div>
        </main>

        <footer className="relative z-10 pt-4 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#AAB1BC] gap-2">
          <span>© {new Date().getFullYear()} SAMEER MAJEED · ALL RIGHTS RESERVED</span>
          <span className="text-[#3D73FF]">RIYADH, KINGDOM OF SAUDI ARABIA</span>
        </footer>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(targetPath, fileContent, "utf-8");
console.log("CinematicMaster.tsx successfully rewritten with Phase 3, 4, 5, 6, 7, 8, 14 architecture!");
