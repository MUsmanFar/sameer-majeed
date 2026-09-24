"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AdaptiveNav } from "./AdaptiveNav";
import { GlobalStage } from "./GlobalStage";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { CertificateModal, CertificateData } from "./CertificateModal";
import { MotionDebugHud } from "./MotionDebugHud";

export function CinematicMaster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("scene-entry");
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [activeToolkitSkill, setActiveToolkitSkill] = useState<number>(0);
  const [certModalIndex, setCertModalIndex] = useState(0);

  // 11 Stage Refs for GSAP Pinning
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

  // 5 Authenticated Certificates
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
  ];

  // Verified Role Mandates (LinkedIn / profile only — no invented KPIs)
  const roleRecords: Record<
    string,
    {
      role: string;
      company: string;
      location: string;
      period: string;
      responsibilities: string[];
    }
  > = {
    flooss: {
      role: "FP&A Manager",
      company: "Flooss",
      location: "Riyadh, Saudi Arabia",
      period: "Mar 2025 — Present",
      responsibilities: [
        "Monthly, quarterly and year-end financial reporting.",
        "Dashboards and KPIs for management visibility.",
        "Annual budgets and quarterly forecasts.",
        "Long-range financial plans and financial projections.",
        "Actual vs budget / forecast analysis.",
      ],
    },
    alrajhi: {
      role: "Financial Planning & Analysis Specialist",
      company: "Al Rajhi Bank",
      location: "Riyadh, Saudi Arabia",
      period: "Jan 2023 — Mar 2025",
      responsibilities: [
        "Annual and quarterly financial budgets.",
        "Executive collaboration on budget targets.",
        "Budget proposal evaluation.",
        "Financial forecasting.",
        "Cost estimates and financial assessments.",
        "Financial / budgetary risk analysis.",
        "Power BI dashboard coordination.",
      ],
    },
    zoom: {
      role: "Manager Accounts & Finance",
      company: "Zoom Marketing Oils",
      location: "Lahore, Pakistan",
      period: "Jul 2018 — Sep 2021",
      responsibilities: [
        "Financial reporting and budget management.",
        "Cash-flow management and bank financing / import LCs.",
        "Tax compliance and external audit coordination.",
        "SAP Business One and working capital management.",
      ],
    },
    varioline: {
      role: "Head of Accounts",
      company: "Varioline Services",
      location: "Lahore, Pakistan",
      period: "Nov 2017 — Jun 2018",
      responsibilities: [
        "Financial reporting and budget management.",
        "Cash-flow and working capital oversight.",
        "Coordination of accounting close and control processes.",
      ],
    },
    hassan: {
      role: "Audit Associate",
      company: "Hassan Naeem & Co · UHY",
      location: "Lahore, Pakistan",
      period: "2014 — 2017",
      responsibilities: [
        "Planned and executed audits in accordance with International Standards on Auditing.",
        "Evaluated internal controls and prepared recommendations for management.",
        "Reviewed financial reporting requirements including IFRS.",
        "Managed and delegated engagement work through planning, execution and finalization.",
        "Resolved accounting and technical issues raised by clients.",
      ],
    },
    najm: {
      role: "Financial Planning & Management Reporting Specialist",
      company: "Najm Company for Insurance Services",
      location: "Riyadh, Saudi Arabia",
      period: "Oct 2021 — Jan 2023",
      responsibilities: [
        "Monthly / quarterly / annual management financial statements.",
        "IFRS reporting and management reporting packages.",
        "Budget coordination and actual vs budget analysis.",
        "SAP process improvement.",
        "Chart of accounts / cost centres / profit centres.",
      ],
    },
  };

  const toolkitSkills = [
    { id: "fpa", name: "FP&A", asset: "/assets/3d/forecasting-curve.webp", pos: "top-[6%] left-[8%]", size: "w-16 h-16 lg:w-20 lg:h-20", desc: "Budgets, forecasts and performance analysis.", primary: true },
    { id: "budget", name: "BUDGETING", asset: "/assets/3d/budget-stack.webp", pos: "top-[8%] right-[10%]", size: "w-16 h-16 lg:w-20 lg:h-20", desc: "Annual and quarterly budget architectures.", primary: true },
    { id: "forecast", name: "FORECASTING", asset: "/assets/3d/planning-core.webp", pos: "top-[38%] left-[4%]", size: "w-14 h-14 lg:w-16 lg:h-16", desc: "Rolling forecasts and long-range plans.", primary: true },
    { id: "reporting", name: "FINANCIAL REPORTING", asset: "/assets/3d/reporting-tower.webp", pos: "top-[36%] right-[5%]", size: "w-14 h-14 lg:w-16 lg:h-16", desc: "IFRS and management reporting packages.", primary: true },
    { id: "variance", name: "VARIANCE ANALYSIS", asset: "/assets/3d/control-engine.webp", pos: "bottom-[28%] left-[10%]", size: "w-12 h-12 lg:w-14 lg:h-14", desc: "Actual vs budget and forecast drivers.", primary: false },
    { id: "ifrs", name: "IFRS", asset: "/assets/3d/audit-core.webp", pos: "bottom-[26%] right-[12%]", size: "w-12 h-12 lg:w-14 lg:h-14", desc: "Technical financial reporting standards.", primary: false },
    { id: "controls", name: "INTERNAL CONTROLS", asset: "/assets/3d/audit-core-open.webp", pos: "bottom-[8%] left-[18%]", size: "w-12 h-12 lg:w-14 lg:h-14", desc: "Control evaluation and governance.", primary: false },
    { id: "sap", name: "SAP ERP", asset: "/assets/3d/erp-network.webp", pos: "bottom-[8%] right-[20%]", size: "w-12 h-12 lg:w-14 lg:h-14", desc: "SAP Business One and ERP finance modules.", primary: false },
    { id: "powerbi", name: "POWER BI", asset: "/assets/3d/powerbi-prism.webp", pos: "top-[22%] left-[28%]", size: "w-12 h-12 lg:w-14 lg:h-14", desc: "Executive dashboards and automation.", primary: false },
    { id: "cashflow", name: "CASH FLOW", asset: "/assets/3d/cashflow-core.webp", pos: "top-[22%] right-[28%]", size: "w-12 h-12 lg:w-14 lg:h-14", desc: "Liquidity and banking facilities.", primary: false },
    { id: "wc", name: "WORKING CAPITAL", asset: "/assets/3d/budget-stack.webp", pos: "bottom-[42%] left-[22%]", size: "w-11 h-11 lg:w-12 lg:h-12", desc: "Receivables, payables and conversion cycles.", primary: false },
    { id: "stakeholder", name: "STAKEHOLDER MGMT", asset: "/assets/3d/analysis-prism.webp", pos: "bottom-[42%] right-[24%]", size: "w-11 h-11 lg:w-12 lg:h-12", desc: "Executive and cross-functional partnership.", primary: false },
  ];

  // Preloader and Single-Pass GSAP Choreography
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mm: gsap.MatchMedia | null = null;
    let isMounted = true;

    // Expose ScrollTrigger on window for testing & diagnostics
    (window as unknown as { ScrollTrigger?: unknown }).ScrollTrigger = ScrollTrigger;

    const runEngine = async () => {
      await document.fonts.ready;

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
        "/assets/3d/erp-network.webp",
        "/assets/3d/credential-pedestal.webp",
        "/certificates/icap-associate.png",
        "/certificates/socpa-associate.png",
        "/certificates/fipa-fellow.png",
        "/certificates/ffa-fellow.png",
        "/certificates/coursera-financial-accounting.png",
      ];

      await Promise.allSettled(
        criticalImages.map((src) => {
          const loadPromise = new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = src;
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          });
          const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 1200));
          return Promise.race([loadPromise, timeoutPromise]);
        })
      );

      if (!isMounted) return;

      const isDebug =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("debugMotion");

      mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

          if (isDesktop) {
            // ===================================================================
            // 00. SCENE ENTRY (+=800px)
            // Persistent Bridge: Glowing blue orbital trajectory persists into Hero
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
              },
            });

            entryTl
              .to("#scroll-enter-prompt", { opacity: 0, y: -8, duration: 0.1 }, 0)
              .to("#entry-career-orbit", { scale: 1.15, x: "-3vw", duration: 0.6, ease: "power1.inOut" }, 0)
              .to(".orbit-label-2014", { opacity: 0.35, x: -10, duration: 0.2 }, 0.1)
              .to(".orbit-label-2017", { opacity: 0.35, x: -5, duration: 0.2 }, 0.2)
              .to(".orbit-label-2021", { opacity: 0.35, duration: 0.2 }, 0.3)
              .to(".orbit-label-2023", { opacity: 0.35, duration: 0.2 }, 0.4)
              .fromTo(".orbit-label-2025", { scale: 1, color: "#3D73FF" }, { scale: 1.25, color: "#77A1FF", duration: 0.3 }, 0.5);

            // ===================================================================
            // 01. HERO CHAPTER (+=1200px)
            // Persistent Bridge: 3D glass sculpture persists into Audit Core
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
              },
            });

            heroTl
              .fromTo(
                heroSculptureRef.current,
                { scale: 0.95, rotateZ: -3, opacity: 0.9 },
                { scale: 1.08, rotateZ: 4, opacity: 1, duration: 0.55, ease: "power1.inOut" },
                0
              )
              .fromTo(
                "#hero-ten-monumental",
                { opacity: 0, scale: 0.8 },
                { opacity: 0.85, scale: 1.05, duration: 0.35, ease: "power2.out" },
                0.2
              )
              .to("#hero-ten-monumental", { opacity: 0, scale: 1.12, duration: 0.2 }, 0.55)
              // 65–78%: Sameer exits cleanly BEFORE audit enters
              .to(
                "#hero-portrait-anchor",
                { xPercent: 28, autoAlpha: 0, scale: 0.94, duration: 0.22, ease: "power1.in" },
                0.65
              )
              .to(
                "#hero-left-content",
                { autoAlpha: 0, y: -24, duration: 0.2, ease: "power1.in" },
                0.65
              )
              .to(
                heroSculptureRef.current,
                { opacity: 0.35, scale: 0.92, x: "4vw", duration: 0.25, ease: "power1.inOut" },
                0.78
              );

            // ===================================================================
            // 02. FOUNDATION & STATUTORY AUDIT (+=1000px)
            // Persistent Bridge: Audit Core geometry persists into Control Engine
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
              },
            });

            foundTl
              .fromTo(
                "#found-audit-closed",
                { scale: 0.95, rotateZ: -4, opacity: 0.9 },
                { scale: 1.08, rotateZ: 6, opacity: 1, duration: 0.45, ease: "power1.out" },
                0
              )
              .to(
                "#found-audit-closed",
                { opacity: 0, duration: 0.15 },
                0.42
              )
              .fromTo(
                "#found-audit-open",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1.08, duration: 0.25, ease: "power2.out" },
                0.42
              )
              .fromTo(
                ".found-spatial-label",
                { opacity: 0, x: -14 },
                { opacity: 1, x: 0, stagger: 0.08, duration: 0.25 },
                0.15
              )
              // Geometry stays locked on stage to hand off to Control
              .to(
                "#found-audit-open",
                { scale: 1.05, rotateZ: 2, duration: 0.3 },
                0.7
              );

            // ===================================================================
            // 03. FINANCIAL CONTROL & GOVERNANCE (+=1000px)
            // Persistent Bridge: Blue energy core persists into Riyadh flight curve
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
              },
            });

            ctrlTl
              .fromTo(
                "#ctrl-engine-obj",
                { scale: 0.95, rotateZ: -6, opacity: 0.9 },
                { scale: 1.08, rotateZ: 10, opacity: 1, duration: 0.55, ease: "power1.inOut" },
                0
              )
              .set("#ctrl-role-02 .ctrl-role-detail, #ctrl-role-03 .ctrl-role-detail", { height: 0, autoAlpha: 0 }, 0)
              .set("#ctrl-role-01 .ctrl-role-detail", { height: "auto", autoAlpha: 1 }, 0)
              .to("#ctrl-role-01", { opacity: 0.4, duration: 0.12 }, 0.28)
              .to("#ctrl-role-01 .ctrl-role-detail", { height: 0, autoAlpha: 0, duration: 0.15 }, 0.28)
              .to("#ctrl-role-02", { opacity: 1, duration: 0.12 }, 0.28)
              .to("#ctrl-role-02 .ctrl-role-detail", { height: "auto", autoAlpha: 1, duration: 0.18 }, 0.28)
              .to("#ctrl-role-02", { opacity: 0.4, duration: 0.12 }, 0.55)
              .to("#ctrl-role-02 .ctrl-role-detail", { height: 0, autoAlpha: 0, duration: 0.15 }, 0.55)
              .to("#ctrl-role-03", { opacity: 1, duration: 0.12 }, 0.55)
              .to("#ctrl-role-03 .ctrl-role-detail", { height: "auto", autoAlpha: 1, duration: 0.18 }, 0.55)
              .fromTo("#ctrl-engine-glow-mid", { opacity: 0 }, { opacity: 0.9, duration: 0.25 }, 0.28)
              .fromTo("#ctrl-engine-glow-full", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.12, duration: 0.35 }, 0.55);

            // ===================================================================
            // 04. RIYADH GEOGRAPHIC HUB (+=1200px)
            // Recomposed: Enormous Riyadh (58vw) center-right, Lahore recedes,
            // Reporting tower emerges before Riyadh exits!
            // ===================================================================
            const riyadhTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-riyadh",
                start: "top top",
                end: "+=600",
                pin: riyadhStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
              },
            });

            riyadhTl
              // Lahore recedes behind camera
              .fromTo(
                "#spatial-lahore-origin",
                { scale: 1, opacity: 0.8, x: 0 },
                { scale: 0.45, opacity: 0.15, x: -140, duration: 0.45, ease: "power1.inOut" },
                0
              )
              // Flight curve sweeps with intense glowing stroke
              .fromTo(
                "#spatial-flight-curve",
                { strokeDasharray: 900, strokeDashoffset: 900 },
                { strokeDashoffset: 0, duration: 0.5, ease: "none" },
                0.08
              )
              // Riyadh physically approaches viewer (scale up to monumental presence)
              .fromTo(
                "#spatial-riyadh-dest",
                { scale: 0.88, opacity: 0.6, x: 0 },
                { scale: 1.18, opacity: 1, x: "2vw", duration: 0.6, ease: "power1.out" },
                0.15
              )
              .fromTo(
                "#riyadh-heading-monument",
                { scale: 1 },
                { scale: 1.15, color: "#F4F6F8", duration: 0.5 },
                0.2
              )
              // Persistent Bridge: Reporting tower begins emerging BEFORE Riyadh exits!
              .fromTo(
                "#riyadh-reporting-emerge",
                { opacity: 0, x: 60, scale: 0.88 },
                { opacity: 0.75, x: 0, scale: 1.0, duration: 0.35, ease: "power2.out" },
                0.65
              );

            // ===================================================================
            // 05. FINANCIAL REPORTING TOWER (+=1200px)
            // Recomposed: 56vw, high-contrast white reflections & cobalt illumination,
            // Monthly, Quarterly, Annual animate around physical layers!
            // ===================================================================
            const reportingTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#scene-reporting",
                start: "top top",
                end: "+=1200",
                pin: reportingStageRef.current,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: isDebug,
              },
            });

            reportingTl
              .fromTo(
                "#reporting-tower-asset",
                { scale: 0.94, rotateZ: -4, opacity: 0.95 },
                { scale: 1.08, rotateZ: 8, opacity: 1, duration: 0.6, ease: "power1.inOut" },
                0
              )
              .fromTo("#rep-band-monthly", { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.2 }, 0.2)
              .fromTo("#rep-band-quarterly", { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.2 }, 0.38)
              .fromTo("#rep-band-annual", { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.2 }, 0.55);

            // ===================================================================
            // 06. FP&A DATA LANDSCAPE · AL RAJHI BANK (+=1200px)
            // Recomposed: forecasting-curve.webp as major physical sculpture (64vw)
            // with Actual/Budget/Forecast paths
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
              },
            });

            fpaTl
              .fromTo(fpaActualPathRef.current, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 0.35, ease: "none" }, 0.05)
              .fromTo(fpaBudgetPathRef.current, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 0.3, ease: "none" }, 0.15)
              .fromTo(fpaForecastPathRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.4, ease: "none" }, 0.25)
              .fromTo(fpaRibbonRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left center" }, { opacity: 0.95, scaleX: 1, duration: 0.35 }, 0.28)
              .fromTo(
                "#fpa-sculpture-asset",
                { scale: 0.92, opacity: 0.85 },
                { scale: 1.1, opacity: 1, duration: 0.55, ease: "power1.out" },
                0.1
              )
              .fromTo(
                "#scene-fpa .role-detail-list li",
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, stagger: 0.05, duration: 0.22 },
                0.3
              )
              // Persistent Bridge: Forecast line persists into Flooss strategic rail
              .fromTo(
                "#fpa-flooss-bridge-point",
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1.3, duration: 0.25 },
                0.75
              );

            // ===================================================================
            // 07. FLOOSS FINTECH LEADERSHIP (+=1200px)
            // Persistent Bridge: Sameer's portrait persists into Philosophy
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
              },
            });

            floossTl
              .fromTo("#flooss-planning-core", { rotateZ: -6, scale: 0.95 }, { rotateZ: 14, scale: 1.08, duration: 0.5 }, 0.05)
              .fromTo("#flooss-indicator-dot", { x: 0 }, { x: 380, duration: 0.5, ease: "none" }, 0.1)
              .to(".flooss-node-plan", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.1)
              .to(".flooss-node-plan", { color: "#F4F6F8", scale: 1, duration: 0.1 }, 0.2)
              .to(".flooss-node-fcst", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.2)
              .to(".flooss-node-fcst", { color: "#F4F6F8", scale: 1, duration: 0.1 }, 0.3)
              .to(".flooss-node-ana", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.3)
              .to(".flooss-node-ana", { color: "#F4F6F8", scale: 1, duration: 0.1 }, 0.4)
              .to(".flooss-node-rep", { color: "#3D73FF", scale: 1.05, duration: 0.1 }, 0.4)
              // Complete Flooss composition first — portrait exits before Philosophy headline
              .to("#flooss-portrait-anchor", { autoAlpha: 1, duration: 0.2 }, 0.35)
              .to("#flooss-copy-block", { autoAlpha: 1, duration: 0.2 }, 0.35)
              .to(
                "#flooss-portrait-anchor",
                { xPercent: 52, autoAlpha: 0, duration: 0.22, ease: "power1.in" },
                0.72
              )
              .to("#flooss-copy-block", { autoAlpha: 0, y: -16, duration: 0.2 }, 0.72)
              .to("#flooss-planning-core", { opacity: 0.15, scale: 0.9, duration: 0.2 }, 0.78);

            // ===================================================================
            // 08. EXECUTIVE PHILOSOPHY (+=900px)
            // Persistent Bridge: Blue prism light expands into Toolkit central prism
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
              },
            });

            philTl
              .fromTo(
                "#phil-content-wrap",
                { opacity: 0.55, y: 18 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
                0.05
              )
              .to("#phil-word-complexity", { color: "#77A1FF", duration: 0.35 }, 0.35)
              .fromTo(
                "#phil-soft-glow",
                { opacity: 0 },
                { opacity: 0.45, duration: 0.4 },
                0.4
              );

            // ===================================================================
            // 09. FINANCIAL TOOLKIT CONSTELLATION (+=1200px)
            // Recomposed: Constellation scaled 2x, occupying 65–75% of viewport
            // Central prism becomes certificate pedestal!
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
              },
            });

            toolkitTl
              .fromTo(
                "#toolkit-prism-core",
                { rotateZ: -10, scale: 0.95 },
                { rotateZ: 20, scale: 1.15, duration: 0.55, ease: "power1.inOut" },
                0
              )
              .fromTo(
                ".toolkit-mini-node",
                { opacity: 0.6, scale: 0.9 },
                { opacity: 1, scale: 1, stagger: 0.04, duration: 0.3 },
                0.15
              )
              // Central glass prism aligns into pedestal position
              .to(
                "#toolkit-prism-core",
                { scale: 1.05, y: 15, duration: 0.3 },
                0.7
              );

            // ===================================================================
            // 10. CREDENTIALS VAULT (+=1400px)
            // Recomposed: ONE dominant certificate (62vh), next (35vh), third deeper.
            // Pedestal light becomes contact light!
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
              },
            });

            const certMetaLabels = [
              '<span class="text-[#3D73FF] font-bold">01 / 05</span> · Associate Chartered Accountant · ICAP · 2024',
              '<span class="text-[#3D73FF] font-bold">02 / 05</span> · Associate Member · SOCPA · KSA',
              '<span class="text-[#3D73FF] font-bold">03 / 05</span> · Fellow Member · FIPA · IPA Australia · 2024',
              '<span class="text-[#3D73FF] font-bold">04 / 05</span> · Fellow Member · FFA · IFA UK · 2024',
              '<span class="text-[#3D73FF] font-bold">05 / 05</span> · Financial Accounting · UIUC · 2024',
            ];

            const setCertMeta = (i: number) => {
              const el = document.getElementById("cert-meta-active");
              if (el) el.innerHTML = certMetaLabels[i] || certMetaLabels[0];
            };

            credsTl
              .to("#cert-card-0", { x: "-28vw", z: 100, opacity: 0, rotateY: -6, duration: 0.2 }, 0.05)
              .to("#cert-card-1", { x: "0vw", z: 0, opacity: 1, scale: 1.0, rotateY: 0, duration: 0.2 }, 0.05)
              .to("#cert-card-2", { x: "22vw", z: -160, opacity: 0.65, scale: 0.78, duration: 0.2 }, 0.05)
              .call(() => setCertMeta(1), undefined, 0.12)

              .to("#cert-card-1", { x: "-28vw", z: 100, opacity: 0, rotateY: -6, duration: 0.2 }, 0.25)
              .to("#cert-card-2", { x: "0vw", z: 0, opacity: 1, scale: 1.0, rotateY: 0, duration: 0.2 }, 0.25)
              .to("#cert-card-3", { x: "22vw", z: -160, opacity: 0.65, scale: 0.78, duration: 0.2 }, 0.25)
              .call(() => setCertMeta(2), undefined, 0.32)

              .to("#cert-card-2", { x: "-28vw", z: 100, opacity: 0, rotateY: -6, duration: 0.2 }, 0.45)
              .to("#cert-card-3", { x: "0vw", z: 0, opacity: 1, scale: 1.0, rotateY: 0, duration: 0.2 }, 0.45)
              .to("#cert-card-4", { x: "22vw", z: -160, opacity: 0.65, scale: 0.78, duration: 0.2 }, 0.45)
              .call(() => setCertMeta(3), undefined, 0.52)

              .to("#cert-card-3", { x: "-28vw", z: 100, opacity: 0, rotateY: -6, duration: 0.2 }, 0.65)
              .to("#cert-card-4", { x: "0vw", z: 0, opacity: 1, scale: 1.0, rotateY: 0, duration: 0.2 }, 0.65)
              .call(() => setCertMeta(4), undefined, 0.72);

            // Persistent Navigation Synchronization: Always tracks visually dominant scene
            const chapterIds = [
              "scene-entry",
              "scene-hero",
              "scene-foundation",
              "scene-control",
              "scene-riyadh",
              "scene-reporting",
              "scene-fpa",
              "scene-flooss",
              "scene-philosophy",
              "scene-toolkit",
              "scene-credentials",
              "scene-contact",
            ];

            const updateActiveChapterByDominance = () => {
              const vh = window.innerHeight;
              let dominantId = chapterIds[0];
              let maxVisibleHeight = -1;

              for (const id of chapterIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(vh, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                if (visibleHeight > maxVisibleHeight) {
                  maxVisibleHeight = visibleHeight;
                  dominantId = id;
                }
              }

              setActiveSection((prev) => (prev !== dominantId ? dominantId : prev));
            };

            ScrollTrigger.create({
              onUpdate: updateActiveChapterByDominance,
            });

            window.addEventListener("scroll", updateActiveChapterByDominance, { passive: true });

            // Initial sync on mount
            updateActiveChapterByDominance();
          }
        }
      );

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
      {/* Motion Debug Diagnostic HUD */}
      <MotionDebugHud activeChapter={activeSection} />

      {/* 1. Global Persistent Stage Layer */}
      <GlobalStage currentScene={activeSection} />

      {/* 2. Desktop Scroll Progress Bar */}
      <ScrollProgress />

      {/* 3. Custom Interactive Cursor */}
      <CustomCursor />

      {/* 4. Executive Navigation */}
      <AdaptiveNav activeSection={activeSection} />

      {/* 5. Fullscreen Certificate Modal */}
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

      {/* ===================================================================== */}
      {/* 00. SCENE ENTRY (3D Career Orbit Sculpture + Spatial Milestones)       */}
      {/* ===================================================================== */}
      <section id="scene-entry" className="chapter-rail relative w-full">
        <div
          ref={entryStageRef}
          className="master-stage relative overflow-hidden flex flex-col justify-between select-none bg-[#050608] z-10"
        >
          <header className="relative z-10 flex items-center justify-between">
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
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 01. SCENE HERO (Independent Pinned Chapter)                            */}
      {/* ===================================================================== */}
      <section id="scene-hero" className="chapter-rail relative w-full">
        <div
          ref={heroStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between"
        >
          <header className="relative z-10 flex items-center justify-between">
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

            {/* Right: Bespoke 3D Glass Sculpture + Sameer's Full Portrait */}
            <div className="col-span-12 lg:col-span-5 relative h-full flex items-end justify-end">
              <div
                ref={heroSculptureRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 will-change-transform origin-center"
              >
                <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(61,115,255,0.28)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                <Image
                  src="/assets/3d/hero-sculpture.png"
                  alt="3D Glass Financial Sculpture"
                  width={750}
                  height={750}
                  priority
                  className="w-[110%] max-w-none h-auto object-contain drop-shadow-[0_0_45px_rgba(36,91,255,0.35)]"
                />
              </div>

              {/* 10+ Years Monumental Counter */}
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

              {/* Sameer's Portrait: Guaranteed Full Headroom (>80px clearance) */}
              <div
                id="hero-portrait-anchor"
                ref={heroPortraitRef}
                className="relative z-20 h-[min(68svh,640px)] max-h-[640px] w-auto flex items-end justify-end will-change-transform"
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
            <span className="text-[#3D73FF] font-bold">01 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 02. SCENE FOUNDATION (Independent Pinned Chapter)                      */}
      {/* ===================================================================== */}
      <section id="scene-foundation" className="chapter-rail relative w-full">
        <div
          ref={foundationStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between"
        >
          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                02 — FOUNDATION &amp; STATUTORY AUDIT
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">2014 — 2017 · LAHORE</div>
          </header>

          <main className="relative z-10">
            <div className="stage-grid">
            <div className="stage-copy col-span-12 lg:col-span-6">
              <span className="text-xs font-mono text-[#3D73FF] tracking-[0.25em] uppercase font-bold mb-2">
                {roleRecords.hassan.company} · {roleRecords.hassan.period} · LAHORE
              </span>
              <h2 className="font-bold tracking-tight text-[#F4F6F8]">
                AUDIT <br />
                <span className="text-[#AAB1BC] font-light">ASSOCIATE</span>
              </h2>

              <ul className="role-detail-list">
                {roleRecords.hassan.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {["INTERNAL CONTROLS", "IFRS REPORTING", "STATUTORY AUDIT"].map((title, idx) => (
                  <div key={title} className="found-spatial-label flex items-center gap-2 text-xs text-[#F4F6F8] opacity-0">
                    <span className="font-mono text-[#3D73FF] font-bold">0{idx + 1}</span>
                    <span className="font-semibold tracking-wide">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stage-visual col-span-12 lg:col-span-6">
              <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center will-change-transform pointer-events-none">
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
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>CHARTERED RIGOR</span>
            <span className="text-[#3D73FF] font-bold">02 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 03. SCENE CONTROL (Independent Pinned Chapter)                         */}
      {/* ===================================================================== */}
      <section id="scene-control" className="chapter-rail relative w-full">
        <div
          ref={controlStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between"
        >
          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                03 — FINANCIAL CONTROL &amp; LIQUIDITY GOVERNANCE
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">2017 — 2021 · 4 YEARS</div>
          </header>

          <main className="relative z-10">
            <div className="stage-grid">
            <div className="stage-copy col-span-12 lg:col-span-6">
              <span className="text-xs font-mono text-[#3D73FF] uppercase tracking-widest font-bold mb-2">
                VARIOLINE SERVICES &amp; ZOOM MARKETING OILS
              </span>
              <h2 className="font-bold tracking-tight text-[#F4F6F8]">
                FINANCIAL <br />
                <span className="text-[#AAB1BC]">CONTROL</span>
              </h2>
              <p className="text-sm text-[#AAB1BC] font-light leading-relaxed mt-3 max-w-lg">
                Head of Accounts → Deputy Manager → Manager Accounts &amp; Finance.
              </p>

              <div className="mt-4 space-y-3">
                <div id="ctrl-role-01" className="border-l border-[#3D73FF] pl-3">
                  <div className="text-[10px] font-mono text-[#3D73FF] tracking-wider">01 · NOV 2017 — JUN 2018</div>
                  <div className="text-base font-bold text-[#F4F6F8]">Head of Accounts · Varioline Services</div>
                  <ul className="ctrl-role-detail mt-1.5 space-y-1">
                    {roleRecords.varioline.responsibilities.map((r) => (
                      <li key={r} className="text-xs text-[#AAB1BC] font-light leading-snug pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.45em] before:w-1 before:h-1 before:rounded-full before:bg-[#3D73FF]/80">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="ctrl-role-02" className="border-l border-[#3D73FF] pl-3 opacity-40">
                  <div className="text-[10px] font-mono text-[#3D73FF] tracking-wider">02 · JUL 2018 — JAN 2021</div>
                  <div className="text-base font-bold text-[#F4F6F8]">Deputy Manager Finance · Zoom Marketing Oils</div>
                  <ul className="ctrl-role-detail mt-1.5 space-y-1">
                    {roleRecords.zoom.responsibilities.slice(0, 3).map((r) => (
                      <li key={r} className="text-xs text-[#AAB1BC] font-light leading-snug pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.45em] before:w-1 before:h-1 before:rounded-full before:bg-[#3D73FF]/80">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="ctrl-role-03" className="border-l border-[#3D73FF] pl-3 opacity-40">
                  <div className="text-[10px] font-mono text-[#3D73FF] tracking-wider">03 · JAN 2021 — SEP 2021</div>
                  <div className="text-base font-bold text-[#F4F6F8]">Manager Accounts &amp; Finance · Zoom Marketing Oils</div>
                  <ul className="ctrl-role-detail mt-1.5 space-y-1">
                    {roleRecords.zoom.responsibilities.slice(1).map((r) => (
                      <li key={r} className="text-xs text-[#AAB1BC] font-light leading-snug pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.45em] before:w-1 before:h-1 before:rounded-full before:bg-[#3D73FF]/80">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="stage-visual col-span-12 lg:col-span-6">
              <div
                id="ctrl-engine-obj"
                className="relative w-full max-w-[460px] aspect-square flex items-center justify-center will-change-transform pointer-events-none"
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
                  className="absolute inset-0 bg-radial from-[#77A1FF]/35 via-[#245BFF]/20 to-transparent opacity-0 rounded-full blur-3xl pointer-events-none"
                />
              </div>
            </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>FINANCIAL OPERATING SYSTEMS</span>
            <span className="text-[#3D73FF] font-bold">03 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 04. SCENE RIYADH (Recomposed: Enormous Riyadh 58vw center-right)       */}
      {/* ===================================================================== */}
      <section id="scene-riyadh" className="chapter-rail relative w-full">
        <div
          ref={riyadhStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between"
        >
          <header className="relative z-10 flex items-center justify-between">
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
                LAHORE, PAKISTAN → RIYADH, SAUDI ARABIA
              </span>
              <h2
                id="riyadh-heading-monument"
                className="text-6xl lg:text-[5.5rem] font-bold tracking-tight text-[#F4F6F8] leading-[0.92] will-change-transform"
              >
                LAHORE <br />
                <span className="text-[#3D73FF]">→ RIYADH.</span>
              </h2>
              <p className="text-lg text-[#AAB1BC] font-light leading-relaxed mt-6 max-w-lg">
                Bridging Pakistan financial control into Saudi reporting and FP&amp;A.
              </p>
            </div>

            {/* Spatial Flight Visual: Enormous Riyadh (58vw) Center-Right */}
            <div className="col-span-12 lg:col-span-7 relative h-full flex items-center justify-center">
              <div className="relative w-full h-[min(52vh,480px)] flex items-center justify-between">
                {/* Lahore recedes behind camera */}
                <div
                  id="spatial-lahore-origin"
                  className="relative w-36 h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center will-change-transform z-10"
                >
                  <Image
                    src="/assets/3d/lahore-origin.webp"
                    alt="Lahore Origin"
                    width={220}
                    height={220}
                    className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
                  />
                  <span className="text-xs font-mono text-[#AAB1BC] mt-2 font-bold tracking-wider">LAHORE 2014</span>
                </div>

                {/* Sweeping flight curve */}
                <svg className="flex-1 h-44 overflow-visible px-2 z-15">
                  <path
                    id="spatial-flight-curve"
                    d="M 10,90 Q 180,-30 360,90"
                    fill="none"
                    stroke="#3D73FF"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="drop-shadow-[0_0_18px_#3D73FF]"
                  />
                </svg>

                {/* Enormous Riyadh Destination Architecture (58vw) */}
                <div
                  id="spatial-riyadh-dest"
                  className="relative w-[58vw] max-w-[780px] h-[58vh] flex flex-col items-center justify-center will-change-transform z-20"
                >
                  <div className="absolute inset-0 bg-radial from-[#3D73FF]/25 via-[#245BFF]/10 to-transparent blur-3xl pointer-events-none" />
                  <Image
                    src="/assets/3d/riyadh-destination.webp"
                    alt="Riyadh Destination Architecture"
                    width={900}
                    height={900}
                    className="w-full h-full object-contain drop-shadow-[0_0_65px_rgba(61,115,255,0.55)]"
                  />
                  <span className="text-sm font-mono text-[#3D73FF] mt-2 font-bold tracking-widest uppercase">
                    RIYADH 2021 — PRESENT
                  </span>
                </div>

                {/* Persistent Bridge: Reporting tower emerging on right flank before exit */}
                <div
                  id="riyadh-reporting-emerge"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-72 opacity-0 pointer-events-none z-25 will-change-transform"
                >
                  <Image
                    src="/assets/3d/reporting-tower.webp"
                    alt="Reporting Tower Preview"
                    width={320}
                    height={480}
                    className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(61,115,255,0.4)]"
                  />
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>CROSS-BORDER EXPANSION</span>
            <span className="text-[#3D73FF] font-bold">04 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 05. SCENE REPORTING (56vw Tower, High Contrast & Cobalt Illumination)  */}
      {/* ===================================================================== */}
      <section id="scene-reporting" className="chapter-rail relative w-full">
        <div
          ref={reportingStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10"
        >
          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold mb-2">
                05 — NAJM · OCT 2021 — JAN 2023 · RIYADH
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">05 / 11</div>
          </header>

          <main className="relative z-10">
            <div className="stage-grid">
            <div className="stage-copy col-span-12 lg:col-span-5">
              <h2 className="font-bold tracking-tight text-[#F4F6F8]">
                <span className="block">FINANCIAL</span>
                <span className="block">REPORTING</span>
                <span className="block text-[#3D73FF]">CADENCE.</span>
              </h2>
              <p className="text-sm text-[#F4F6F8] font-medium mt-2 max-w-md">
                {roleRecords.najm.role}
              </p>
              <p className="text-xs font-mono text-[#3D73FF] mt-1">
                {roleRecords.najm.company} · {roleRecords.najm.period}
              </p>

              <div className="cadence-rail max-w-md">
                <div id="rep-band-monthly">
                  <div className="text-[10px] font-mono text-[#3D73FF] font-bold uppercase tracking-widest">Monthly</div>
                  <div className="text-sm font-semibold text-[#F4F6F8] mt-0.5">Management financial statements · IFRS</div>
                </div>
                <div id="rep-band-quarterly">
                  <div className="text-[10px] font-mono text-[#3D73FF] font-bold uppercase tracking-widest">Quarterly</div>
                  <div className="text-sm font-semibold text-[#F4F6F8] mt-0.5">Budget coordination · actual vs budget</div>
                </div>
                <div id="rep-band-annual">
                  <div className="text-[10px] font-mono text-[#3D73FF] font-bold uppercase tracking-widest">Annual</div>
                  <div className="text-sm font-semibold text-[#F4F6F8] mt-0.5">Chart of accounts · cost &amp; profit centres · SAP</div>
                </div>
              </div>

              <ul className="role-detail-list">
                {roleRecords.najm.responsibilities
                  .filter((item) => !item.toLowerCase().includes("monthly"))
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
            </div>

            <div className="stage-visual col-span-12 lg:col-span-7">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center will-change-transform pointer-events-none">
                <div className="absolute inset-[12%] bg-[radial-gradient(circle,rgba(61,115,255,0.28)_0%,transparent_70%)] blur-3xl pointer-events-none" />
                <Image
                  id="reporting-tower-asset"
                  src="/assets/3d/reporting-tower.webp"
                  alt="3D Reporting Tower Object"
                  width={900}
                  height={900}
                  className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(61,115,255,0.5)]"
                />
              </div>
            </div>
            </div>
          </main>

          <footer className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#AAB1BC]/80 tracking-wider">
            <span>REPORTING</span>
            <span className="text-[#3D73FF]">05 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 06. SCENE FP&A / AL RAJHI BANK (Major Physical Sculpture 64vw + Paths) */}
      {/* ===================================================================== */}
      <section id="scene-fpa" className="chapter-rail relative w-full">
        <div
          ref={fpaStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10"
        >
          <header className="relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                06 — AL RAJHI BANK · JAN 2023 — MAR 2025
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">06 / 11</div>
          </header>

          <div className="absolute inset-[12%_8%_16%_48%] z-0 pointer-events-none">
            <svg viewBox="0 0 900 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <path
                ref={fpaBudgetPathRef}
                d="M 40,420 L 180,380 L 340,340 L 500,290 L 660,250 L 820,220"
                fill="none"
                stroke="#AAB1BC"
                strokeWidth="2"
                strokeDasharray="7 5"
                opacity="0.7"
              />
              <path
                ref={fpaActualPathRef}
                d="M 40,400 L 180,350 L 340,300 L 500,240 L 620,200"
                fill="none"
                stroke="#F4F6F8"
                strokeWidth="3.5"
              />
              <path
                ref={fpaForecastPathRef}
                d="M 620,200 L 720,160 L 800,120 L 860,90"
                fill="none"
                stroke="#3D73FF"
                strokeWidth="4.5"
                className="drop-shadow-[0_0_12px_#3D73FF]"
              />
              <circle cx="860" cy="90" r="6" fill="#3D73FF" className="drop-shadow-[0_0_10px_#3D73FF]" />
              <text x="200" y="290" fill="#F4F6F8" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                ACTUAL
              </text>
              <text x="200" y="400" fill="#AAB1BC" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                BUDGET
              </text>
              <text x="700" y="70" fill="#3D73FF" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                FORECAST
              </text>
              <polygon ref={fpaRibbonRef} points="0,0" fill="transparent" />
            </svg>
          </div>

          <div
            id="fpa-sculpture-asset"
            className="absolute right-[5%] top-[26%] w-[42%] max-w-[520px] pointer-events-none z-[5] will-change-transform"
          >
            <div className="absolute inset-[10%] bg-[radial-gradient(circle,rgba(61,115,255,0.3)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <Image
              src="/assets/3d/forecasting-curve.webp"
              alt="3D Forecast Curve Sculpture"
              width={1000}
              height={700}
              className="w-full h-auto max-h-[46vh] object-contain drop-shadow-[0_0_50px_rgba(61,115,255,0.45)] opacity-90"
            />
            <div
              id="fpa-flooss-bridge-point"
              className="absolute right-[12%] top-[18%] w-3 h-3 rounded-full bg-[#3D73FF] shadow-[0_0_18px_#3D73FF] opacity-0 pointer-events-none"
            />
          </div>

          <main className="relative z-10">
            <div className="stage-grid">
            <div className="stage-copy col-span-12 lg:col-span-5">
              <h2 className="font-light tracking-[-0.04em] text-[#F4F6F8]">
                FROM REPORTING <br />
                <span className="font-bold text-[#3D73FF]">TO FORESIGHT.</span>
              </h2>

              <div className="mt-3 border-l border-[#3D73FF]/70 pl-3 max-w-md">
                <div className="text-sm font-bold text-[#F4F6F8]">
                  {roleRecords.alrajhi.role}
                </div>
                <p className="text-xs font-mono text-[#3D73FF] mt-1">
                  {roleRecords.alrajhi.company} · {roleRecords.alrajhi.period}
                </p>
              </div>

              <ul className="role-detail-list">
                {roleRecords.alrajhi.responsibilities.slice(0, 5).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-7 min-h-[30vh]" aria-hidden="true" />
            </div>
          </main>

          <footer className="relative z-20 flex items-center justify-between text-[10px] font-mono text-[#AAB1BC]/80 tracking-wider">
            <span>FP&amp;A</span>
            <span className="text-[#3D73FF]">06 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 07. SCENE FLOOSS (Independent Pinned Chapter)                          */}
      {/* ===================================================================== */}
      <section id="scene-flooss" className="chapter-rail relative w-full">
        <div
          ref={floossStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between"
        >
          {/* Sameer's Portrait: Human Focal Point (Guaranteed Full Headroom) */}
          <div
            id="flooss-portrait-anchor"
            ref={floossPortraitRef}
            className="absolute left-0 bottom-0 z-20 h-[min(52svh,460px)] max-h-[460px] w-auto flex items-end justify-start pl-6 lg:pl-10 will-change-transform pointer-events-none opacity-85"
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

          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                07 — FLOOSS · MAR 2025 — PRESENT
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#AAB1BC]">07 / 11</div>
          </header>

          <main className="relative z-10">
            <div className="stage-grid">
              <div className="col-span-12 lg:col-span-4 relative min-h-[24vh] flex items-center justify-center">
                <div
                  id="flooss-planning-core"
                  className="relative w-full max-w-[280px] flex items-center justify-center pointer-events-none will-change-transform"
                >
                  <Image
                    src="/assets/3d/planning-core.webp"
                    alt="3D Planning Core Asset"
                    width={680}
                    height={680}
                    className="w-full h-auto max-h-[36vh] object-contain drop-shadow-[0_0_45px_rgba(61,115,255,0.35)]"
                  />
                </div>
              </div>

              <div id="flooss-copy-block" className="stage-copy col-span-12 lg:col-span-8 z-10">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="text-3xl font-bold tracking-tight text-[#F4F6F8]">FLOOSS</h3>
                  <span className="text-sm font-semibold tracking-[0.18em] text-[#3D73FF] uppercase">FP&amp;A MANAGER</span>
                </div>
                <div className="text-xs font-mono text-[#AAB1BC] tracking-wider mb-2">
                  MAR 2025 — PRESENT · RIYADH, SAUDI ARABIA
                </div>

                <h2 className="font-light tracking-[-0.04em] text-[#F4F6F8]">
                  PLANNING WHAT COMES <span className="font-bold text-[#3D73FF]">NEXT.</span>
                </h2>

                <ul className="role-detail-list">
                  {roleRecords.flooss.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="relative mt-3 pt-3 border-t border-[#303640]/70">
                  <div
                    id="flooss-indicator-dot"
                    className="absolute top-[-4px] left-0 w-2 h-2 bg-[#3D73FF] rounded-full shadow-[0_0_12px_#3D73FF] will-change-transform"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { cls: "flooss-node-plan", name: "PLAN", desc: "Budgets & long-range" },
                      { cls: "flooss-node-fcst", name: "FORECAST", desc: "Quarterly forecasts" },
                      { cls: "flooss-node-ana", name: "ANALYZE", desc: "Actual vs budget" },
                      { cls: "flooss-node-rep", name: "REPORT", desc: "Month / quarter / year" },
                    ].map((cap, idx) => (
                      <div key={cap.name} className={`${cap.cls} flex flex-col`}>
                        <div className="flex items-center justify-between pb-0.5 border-b border-[#303640]/50">
                          <span className="text-[10px] font-mono font-bold text-[#3D73FF]">0{idx + 1}</span>
                          <span className="text-xs font-bold tracking-[0.1em] uppercase">{cap.name}</span>
                        </div>
                        <p className="text-[10px] text-[#AAB1BC] font-light mt-1">{cap.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>FINTECH STRATEGY HORIZON</span>
            <span className="text-[#3D73FF] font-bold">07 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 08. SCENE PHILOSOPHY (Independent Pinned Chapter)                      */}
      {/* ===================================================================== */}
      <section id="scene-philosophy" className="chapter-rail relative w-full">
        <div
          ref={philosophyStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10"
        >
          {/* Far-right silhouette only — never under the headline */}
          <div className="absolute right-[-2%] bottom-0 h-[68svh] w-auto opacity-[0.1] pointer-events-none z-0">
            <Image
              src="/portrait/sameer-majeed.png"
              alt=""
              width={500}
              height={700}
              className="h-full w-auto object-contain object-bottom mix-blend-luminosity"
            />
          </div>

          <div
            id="phil-soft-glow"
            className="absolute left-[18%] top-[42%] h-40 w-40 rounded-full bg-[#245BFF]/25 blur-3xl opacity-0 pointer-events-none"
          />

          <header className="relative z-10">
            <span className="text-xs font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold">
              08 — EXECUTIVE PHILOSOPHY
            </span>
          </header>

          <main id="phil-content-wrap" className="max-w-3xl my-auto will-change-transform relative z-10">
            <h2 className="text-5xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.08] text-[#F4F6F8]">
              CLARITY <br />
              BEFORE <br />
              <span id="phil-word-complexity" className="font-bold text-[#3D73FF] inline-block will-change-transform">
                COMPLEXITY.
              </span>
            </h2>
            <p id="phil-text-body" className="text-xl text-[#AAB1BC] font-light leading-relaxed mt-6 max-w-xl">
              A career shaped by disciplined reporting, financial planning and forward-looking analysis.
            </p>
          </main>

          <footer className="pt-3 text-xs font-mono text-[#AAB1BC] flex items-center justify-between relative z-10">
            <span>PHILOSOPHICAL ANCHOR</span>
            <span className="text-[#3D73FF] font-bold">08 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 09. SCENE TOOLKIT (Constellation Occupying 65–75% Viewport with Depth) */}
      {/* ===================================================================== */}
      <section id="scene-toolkit" className="chapter-rail relative w-full">
        <div
          ref={toolkitStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10 flex flex-col justify-between"
        >
          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                09 — FINANCIAL TOOLKIT CONSTELLATION
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">INTERACTIVE 3D DISCIPLINE</div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col justify-center items-center my-auto py-2 w-full">
            <div className="relative w-[92vw] max-w-7xl h-[72vh] flex items-center justify-center">
              {/* Central Optical Analysis Prism (Scaled 2.2x to 340px) */}
              <div
                id="toolkit-prism-core"
                className="absolute w-72 h-72 lg:w-88 lg:h-88 flex items-center justify-center pointer-events-none will-change-transform z-10"
              >
                <div className="absolute inset-0 bg-radial from-[#3D73FF]/30 via-[#245BFF]/10 to-transparent blur-3xl rounded-full" />
                <Image
                  src="/assets/3d/analysis-prism.webp"
                  alt="3D Optical Analysis Prism"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain drop-shadow-[0_0_65px_rgba(61,115,255,0.6)]"
                />
              </div>

              {/* Orbiting 3D Constellation Nodes Spread Across 70% Viewport Area */}
              <div className="absolute inset-0 pointer-events-auto">
                {toolkitSkills.map((sk, idx) => {
                  const isActive = activeToolkitSkill === idx;

                  return (
                    <button
                      key={sk.id}
                      onClick={() => setActiveToolkitSkill(idx)}
                      onMouseEnter={() => setActiveToolkitSkill(idx)}
                      className={`toolkit-mini-node absolute ${sk.pos} flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group cursor-pointer bg-[#0D1015]/85 border border-[#303640]/80 backdrop-blur-md ${
                        sk.primary ? "" : "scale-95"
                      } ${
                        isActive
                          ? "scale-115 z-35 border-[#3D73FF] shadow-[0_0_30px_rgba(61,115,255,0.5)]"
                          : sk.primary
                          ? "opacity-95 hover:opacity-100 hover:scale-105 z-25 hover:border-[#3D73FF]/60"
                          : "opacity-70 hover:opacity-100 hover:scale-105 z-15 hover:border-[#3D73FF]/40"
                      }`}
                    >
                      <div className={`relative ${sk.size} flex items-center justify-center shrink-0`}>
                        <Image
                          src={sk.asset}
                          alt={sk.name}
                          width={140}
                          height={140}
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(61,115,255,0.4)]"
                        />
                      </div>
                      <span
                        className={`text-xs font-mono tracking-wider font-semibold transition-colors ${
                          isActive ? "text-[#F4F6F8] font-bold" : "text-[#AAB1BC] group-hover:text-[#F4F6F8]"
                        }`}
                      >
                        {sk.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Concise Capability Guidance Line */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center max-w-xl z-30 bg-[#0D1015]/90 border border-[#303640]/60 backdrop-blur-md px-6 py-3 rounded-full">
                <span className="text-xs font-mono text-[#3D73FF] font-bold uppercase mr-2">
                  {toolkitSkills[activeToolkitSkill].name}:
                </span>
                <span className="text-xs text-[#F4F6F8] font-light">
                  {toolkitSkills[activeToolkitSkill].desc}
                </span>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-3 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>SPATIAL FINANCIAL CONSTELLATION</span>
            <span className="text-[#3D73FF] font-bold">09 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 10. SCENE CREDENTIALS (ONE Dominant Certificate: 62vh, Zero Collide)    */}
      {/* ===================================================================== */}
      <section id="scene-credentials" className="chapter-rail relative w-full">
        <div
          ref={credsStageRef}
          className="master-stage relative overflow-hidden select-none bg-[#050608] z-10"
        >
          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                10 — CREDENTIALS · 5 AUTHENTICATED
              </span>
            </div>
            <div className="text-xs font-mono text-[#AAB1BC]">10 / 11</div>
          </header>

          <main className="relative z-10 flex flex-col justify-center min-h-0">
            <div className="grid grid-cols-12 gap-6 items-end mb-4 shrink-0">
              <div className="col-span-12 lg:col-span-5">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#3D73FF] uppercase font-bold block mb-2">
                  Governance &amp; accreditations
                </span>
                <h2 className="text-4xl lg:text-[3.25rem] font-light tracking-[-0.035em] text-[#F4F6F8] leading-[1.05]">
                  CREDENTIALS <br />
                  <span className="font-bold text-[#3D73FF]">&amp; FELLOWSHIPS</span>
                </h2>
              </div>
              <div
                id="cert-meta-active"
                className="col-span-12 lg:col-span-7 text-left lg:text-right text-xs font-mono text-[#AAB1BC] tracking-wide"
              >
                <span className="text-[#3D73FF] font-bold">01 / 05</span>
                {" · "}
                Associate Chartered Accountant · ICAP · 2024
              </div>
            </div>

            <div
              className="relative w-full flex-1 min-h-[40vh] max-h-[46vh] flex items-center justify-center"
              style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-[42vw] max-w-[480px] aspect-[4/3] flex items-center justify-center opacity-80">
                  <div className="absolute inset-[15%] bg-[radial-gradient(circle,rgba(61,115,255,0.28)_0%,transparent_70%)] blur-3xl rounded-full" />
                  <Image
                    src="/assets/3d/credential-pedestal.webp"
                    alt=""
                    width={800}
                    height={900}
                    className="w-full h-full object-contain opacity-70"
                  />
                </div>
              </div>

              {certificates.map((cert, idx) => {
                const isFirst = idx === 0;
                const isSecond = idx === 1;
                const isThird = idx === 2;

                return (
                  <div
                    key={cert.id}
                    id={`cert-card-${idx}`}
                    data-cursor="view"
                    onClick={() => {
                      setCertModalIndex(idx);
                      setSelectedCert(cert);
                    }}
                    className={`absolute aspect-[3/4] p-1.5 cursor-pointer transition-all duration-300 hover:scale-[1.03] will-change-transform rounded-md shadow-2xl border ${
                      isFirst
                        ? "h-[44vh] max-h-[480px] w-auto border-[#3D73FF]/80 shadow-[0_0_28px_rgba(61,115,255,0.35)] z-30"
                        : isSecond
                        ? "h-[28vh] max-h-[280px] w-auto border-[#303640] hover:border-[#3D73FF]/60 z-20"
                        : isThird
                        ? "h-[20vh] max-h-[200px] w-auto border-[#303640]/80 z-10"
                        : "h-[14vh] max-h-[140px] w-auto border-[#303640]/60 z-[5]"
                    } bg-[#0A0C10]/95`}
                    style={{
                      transform: `translateZ(${
                        isFirst ? "0px" : isSecond ? "-160px" : isThird ? "-320px" : `${-160 * idx}px`
                      }) translateX(${
                        isFirst ? "0vw" : isSecond ? "22vw" : isThird ? "38vw" : `${18 * idx}vw`
                      })`,
                      opacity: isFirst ? 1 : isSecond ? 0.7 : isThird ? 0.4 : 0.2,
                    }}
                  >
                    <div className="relative w-full h-full bg-[#050608] rounded overflow-hidden flex items-center justify-center">
                      <Image
                        src={cert.img}
                        alt={cert.alt}
                        width={600}
                        height={800}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <footer className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#AAB1BC]/80 tracking-wider shrink-0 pt-2">
            <span>CREDENTIALS</span>
            <span className="text-[#3D73FF]">10 / 11</span>
          </footer>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 11. SCENE CONTACT — calm finale                                       */}
      {/* ===================================================================== */}
      <section id="scene-contact" className="chapter-rail relative w-full min-h-screen overflow-visible select-none">
        <div className="master-stage relative z-10 flex flex-col justify-between">
          <div className="absolute right-[4%] bottom-0 h-[82%] w-auto pointer-events-none z-0 flex items-end">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(61,115,255,0.22)_0%,transparent_70%)] blur-3xl" />
            <Image
              src="/portrait/sameer-majeed.png"
              alt="Sameer Majeed"
              width={650}
              height={850}
              className="h-full w-auto object-contain object-bottom opacity-30 mix-blend-luminosity"
            />
          </div>

          <header className="relative z-10 flex items-center justify-between pt-2">
            <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
              11 — CONTACT
            </span>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <h2 className="text-7xl lg:text-[7.5rem] font-light tracking-[-0.04em] text-[#F4F6F8] leading-[0.88]">
                LET&apos;S <br />
                <span className="font-bold text-[#3D73FF]">CONNECT.</span>
              </h2>

              <div className="mt-10 space-y-5">
                <div className="text-2xl font-bold tracking-tight text-[#F4F6F8]">Sameer Majeed</div>
                <a
                  href="mailto:sameerpk_majeed@hotmail.com"
                  className="group relative inline-block text-xl lg:text-2xl font-mono font-medium text-[#F4F6F8] hover:text-[#3D73FF] transition-colors break-all"
                >
                  sameerpk_majeed@hotmail.com
                  <span className="contact-email-underline absolute left-0 -bottom-1 h-px w-full bg-[#3D73FF]/70 origin-left" />
                </a>
                <div>
                  <a
                    href="https://www.linkedin.com/in/sameer-majeed-aca-fipa-ffa-85a38969/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-base font-mono text-[#3D73FF] hover:underline"
                  >
                    <span>LinkedIn</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 pt-4 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
            <span>© {new Date().getFullYear()} SAMEER MAJEED</span>
            <span className="text-[#3D73FF]">RIYADH, SAUDI ARABIA</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
