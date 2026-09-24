"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { AdaptiveNav } from "./AdaptiveNav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("scene-opening");
  const [isLightMode, setIsLightMode] = useState(false);

  // References for all major transition elements
  const openingHeadlineRef = useRef<HTMLDivElement>(null);
  const openingTrajectoryRef = useRef<HTMLDivElement>(null);
  const heroSurfaceRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLDivElement>(null);
  const heroPortraitRef = useRef<HTMLDivElement>(null);
  const heroGreenPlaneRef = useRef<HTMLDivElement>(null);

  // Experience Milestones
  const expPathRef = useRef<SVGPathElement>(null);
  const expM1Ref = useRef<HTMLDivElement>(null);
  const expM2Ref = useRef<HTMLDivElement>(null);
  const expM3Ref = useRef<HTMLDivElement>(null);
  const expM4Ref = useRef<HTMLDivElement>(null);
  const expM5Ref = useRef<HTMLDivElement>(null);

  // FP&A elements
  const fpaActualPathRef = useRef<SVGPathElement>(null);
  const fpaBudgetPathRef = useRef<SVGPathElement>(null);
  const fpaForecastPathRef = useRef<SVGPathElement>(null);
  const fpaForecastRibbonRef = useRef<SVGPolygonElement>(null);
  const fpaInfoRef = useRef<HTMLDivElement>(null);

  // Flooss elements
  const floossSurfaceRef = useRef<HTMLDivElement>(null);
  const floossPortraitRef = useRef<HTMLDivElement>(null);
  const floossContentRef = useRef<HTMLDivElement>(null);
  const floossCapRef = useRef<HTMLDivElement>(null);

  // Credentials Gallery elements
  const credsContainerRef = useRef<HTMLDivElement>(null);
  const cert1Ref = useRef<HTMLDivElement>(null);
  const cert2Ref = useRef<HTMLDivElement>(null);
  const cert3Ref = useRef<HTMLDivElement>(null);

  // Contact elements
  const contactSurfaceRef = useRef<HTMLDivElement>(null);
  const contactHeadlineRef = useRef<HTMLDivElement>(null);
  const contactDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Responsive Choreography using gsap.matchMedia
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1200px)",
        isTablet: "(min-width: 768px) and (max-width: 1199px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isTablet, isMobile, reduceMotion } =
          context.conditions as {
            isDesktop: boolean;
            isTablet: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

        if (reduceMotion) {
          // Keep static settled states when reduced motion is preferred
          return;
        }

        // =========================================================================
        // OPENING INITIAL ENTRANCE (Executes once on mount)
        // =========================================================================
        const openingTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        openingTl
          .fromTo(
            openingHeadlineRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1 }
          )
          .fromTo(
            ".opening-node",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.12, duration: 0.8 },
            "-=0.5"
          );

        // =========================================================================
        // DESKTOP & TABLET CINEMATIC PINNED CHOREOGRAPHY
        // =========================================================================
        if (isDesktop || isTablet) {
          const pinMultiplier = isTablet ? 0.75 : 1.0;

          // SECTION TRACKERS (Persistent Adaptive Navigation State)
          ScrollTrigger.create({
            trigger: "#scene-opening-stage",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveSection("scene-opening");
              setIsLightMode(false);
            },
            onEnterBack: () => {
              setActiveSection("scene-opening");
              setIsLightMode(false);
            },
          });

          ScrollTrigger.create({
            trigger: "#scene-hero-stage",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveSection("scene-hero");
              setIsLightMode(true);
            },
            onEnterBack: () => {
              setActiveSection("scene-hero");
              setIsLightMode(true);
            },
          });

          ScrollTrigger.create({
            trigger: "#scene-experience-stage",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveSection("scene-experience");
              setIsLightMode(false);
            },
            onEnterBack: () => {
              setActiveSection("scene-experience");
              setIsLightMode(false);
            },
          });

          ScrollTrigger.create({
            trigger: "#scene-fpa-stage",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveSection("scene-fpa");
              setIsLightMode(false);
            },
            onEnterBack: () => {
              setActiveSection("scene-fpa");
              setIsLightMode(false);
            },
          });

          ScrollTrigger.create({
            trigger: "#scene-flooss-stage",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveSection("scene-flooss");
              setIsLightMode(true);
            },
            onEnterBack: () => {
              setActiveSection("scene-flooss");
              setIsLightMode(true);
            },
          });

          ScrollTrigger.create({
            trigger: "#scene-credentials-stage",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveSection("scene-credentials");
              setIsLightMode(true);
            },
            onEnterBack: () => {
              setActiveSection("scene-credentials");
              setIsLightMode(true);
            },
          });

          ScrollTrigger.create({
            trigger: "#scene-contact-stage",
            start: "top center",
            end: "bottom bottom",
            onEnter: () => {
              setActiveSection("scene-contact");
              setIsLightMode(false);
            },
            onEnterBack: () => {
              setActiveSection("scene-contact");
              setIsLightMode(false);
            },
          });

          // -----------------------------------------------------------------------
          // SIGNATURE TRANSITION #1: OPENING -> HERO (Pinned 150vh)
          // -----------------------------------------------------------------------
          const trans1 = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-opening-stage",
              start: "top top",
              end: `+=${150 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          trans1
            // 0-20%: Trajectory moves toward camera, 2014 & 2017 drift left
            .to(".opening-early-node", { x: -35, opacity: 0.45, duration: 0.2 }, 0)
            .to(".opening-late-node", { scale: 1.1, opacity: 1, duration: 0.2 }, 0)
            // 20-40%: Opening headline moves upward ~10vh
            .to(openingHeadlineRef.current, { y: -80, opacity: 0.6, duration: 0.25 }, 0.15)
            // 35-65%: Warm ivory HERO surface enters from bottom OVER opening
            .fromTo(
              heroSurfaceRef.current,
              { yPercent: 100 },
              { yPercent: 0, ease: "none", duration: 0.5 },
              0.3
            )
            // 40-70%: Portrait enters from lower right (partially visible before opening exits)
            .fromTo(
              heroPortraitRef.current,
              { y: 130, x: 50, opacity: 0 },
              { y: 0, x: 0, opacity: 1, duration: 0.45 },
              0.35
            )
            // 60-85%: Name enters from lower left, opening headline exits upper left
            .fromTo(
              heroNameRef.current,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35 },
              0.55
            )
            .to(openingHeadlineRef.current, { y: -140, opacity: 0, duration: 0.3 }, 0.55)
            // Settled Hero breathing
            .to(heroPortraitRef.current, { y: -10, duration: 0.15 }, 0.85);

          // -----------------------------------------------------------------------
          // SIGNATURE TRANSITION #2: HERO -> EXPERIENCE (Pinned 130vh)
          // -----------------------------------------------------------------------
          const trans2 = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-hero-stage",
              start: "top top",
              end: `+=${130 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          trans2
            // Subtle depth in first 25%
            .to(heroPortraitRef.current, { y: -12, duration: 0.2 }, 0)
            .to(heroGreenPlaneRef.current, { y: 15, duration: 0.2 }, 0)
            // Architectural green plane expands horizontally across viewport
            .to(
              heroGreenPlaneRef.current,
              {
                scaleX: 4.5,
                scaleY: 1.3,
                transformOrigin: "right bottom",
                duration: 0.6,
                ease: "power2.inOut",
              },
              0.2
            )
            // Portrait shifts right and exits
            .to(heroPortraitRef.current, { x: 180, opacity: 0, duration: 0.45 }, 0.25)
            .to(heroNameRef.current, { x: -60, opacity: 0, duration: 0.4 }, 0.25)
            // As green plane covers screen, Experience intro begins appearing
            .fromTo(
              "#exp-anchor",
              { opacity: 0, x: -40 },
              { opacity: 1, x: 0, duration: 0.4 },
              0.55
            );

          // -----------------------------------------------------------------------
          // SCENE 03: EXPERIENCE MILESTONES (Pinned 380vh)
          // -----------------------------------------------------------------------
          const expTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-experience-stage",
              start: "top top",
              end: `+=${380 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          // SVG path draw length
          const pathLength = expPathRef.current?.getTotalLength() || 1000;
          gsap.set(expPathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          expTl
            // Stage 01 -> Stage 02
            .to(expPathRef.current, { strokeDashoffset: pathLength * 0.75, duration: 0.25 })
            .to(expM1Ref.current, { opacity: 0.45, scale: 0.9, duration: 0.15 }, 0.1)
            .fromTo(expM2Ref.current, { opacity: 0.4, scale: 0.9 }, { opacity: 1, scale: 1.05, duration: 0.2 }, 0.15)

            // Stage 02 -> Stage 03
            .to(expPathRef.current, { strokeDashoffset: pathLength * 0.5, duration: 0.25 })
            .to(expM2Ref.current, { opacity: 0.45, scale: 0.9, duration: 0.15 }, 0.35)
            .fromTo(expM3Ref.current, { opacity: 0.4, scale: 0.9 }, { opacity: 1, scale: 1.05, duration: 0.2 }, 0.4)

            // Stage 03 -> Stage 04
            .to(expPathRef.current, { strokeDashoffset: pathLength * 0.25, duration: 0.25 })
            .to(expM3Ref.current, { opacity: 0.45, scale: 0.9, duration: 0.15 }, 0.6)
            .fromTo(expM4Ref.current, { opacity: 0.4, scale: 0.9 }, { opacity: 1, scale: 1.05, duration: 0.2 }, 0.65)

            // Stage 04 -> Stage 05 (Present / Flooss)
            .to(expPathRef.current, { strokeDashoffset: 0, duration: 0.25 })
            .to(expM4Ref.current, { opacity: 0.45, scale: 0.9, duration: 0.15 }, 0.8)
            .fromTo(expM5Ref.current, { opacity: 0.4, scale: 0.9 }, { opacity: 1, scale: 1.1, duration: 0.25 }, 0.85);

          // -----------------------------------------------------------------------
          // SCENE 04: FP&A ART DIRECTION (Pinned 200vh)
          // -----------------------------------------------------------------------
          const fpaTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-fpa-stage",
              start: "top top",
              end: `+=${200 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          // Animate actual path draw
          fpaTl
            .fromTo("#fpa-headline", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2 }, 0)
            .fromTo(
              fpaActualPathRef.current,
              { strokeDasharray: 900, strokeDashoffset: 900 },
              { strokeDashoffset: 0, duration: 0.35, ease: "none" },
              0.15
            )
            .fromTo(
              fpaBudgetPathRef.current,
              { strokeDasharray: 900, strokeDashoffset: 900 },
              { strokeDashoffset: 0, duration: 0.3, ease: "none" },
              0.25
            )
            // Forecast curve draws boldly toward right edge
            .fromTo(
              fpaForecastPathRef.current,
              { strokeDasharray: 700, strokeDashoffset: 700 },
              { strokeDashoffset: 0, duration: 0.35, ease: "none" },
              0.45
            )
            .fromTo(
              fpaForecastRibbonRef.current,
              { opacity: 0, scaleX: 0, transformOrigin: "left center" },
              { opacity: 1, scaleX: 1, duration: 0.35 },
              0.5
            )
            .fromTo(fpaInfoRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3 }, 0.6)
            .fromTo(".fpa-disc-item", { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.25 }, 0.7);

          // -----------------------------------------------------------------------
          // SIGNATURE TRANSITION #3: FP&A -> FLOOSS (Pinned 160vh)
          // -----------------------------------------------------------------------
          const trans3 = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-flooss-stage",
              start: "top top",
              end: `+=${160 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          trans3
            // Ivory surface sweeps across following forecast trajectory
            .fromTo(
              floossSurfaceRef.current,
              { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
              { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.55, ease: "none" },
              0
            )
            // Sameer's Flooss portrait enters from left breaking plane
            .fromTo(floossPortraitRef.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.2)
            // Flooss content resolves
            .fromTo(floossContentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.4)
            // Sequential capability activation
            .fromTo(
              ".flooss-cap-item",
              { scale: 0.94, opacity: 0.5 },
              { scale: 1, opacity: 1, stagger: 0.1, duration: 0.35 },
              0.65
            );

          // -----------------------------------------------------------------------
          // SCENE 06: CREDENTIALS GALLERY (Pinned 240vh)
          // -----------------------------------------------------------------------
          const credsTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-credentials-stage",
              start: "top top",
              end: `+=${240 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          credsTl
            .fromTo("#creds-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2 }, 0)
            // Cert 1 dominant initially, then glides left as Cert 2 steps forward
            .to(cert1Ref.current, { x: -40, scale: 0.95, duration: 0.35 }, 0.2)
            .fromTo(cert2Ref.current, { scale: 0.92, y: 40 }, { scale: 1.05, y: -20, duration: 0.35 }, 0.2)
            // Cert 2 shifts as Cert 3 comes forward
            .to(cert2Ref.current, { x: -30, scale: 0.98, duration: 0.35 }, 0.55)
            .fromTo(cert3Ref.current, { scale: 0.92, y: 50 }, { scale: 1.04, y: 10, duration: 0.35 }, 0.55);

          // -----------------------------------------------------------------------
          // SCENE 07: CONTACT FINALE (Pinned 120vh)
          // -----------------------------------------------------------------------
          const contactTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#scene-contact-stage",
              start: "top top",
              end: `+=${120 * pinMultiplier}vh`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          contactTl
            // Darkness reclaims canvas smoothly (replaces ivory)
            .fromTo(
              contactSurfaceRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.45, ease: "none" },
              0
            )
            .fromTo(contactHeadlineRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.25)
        } else if (isMobile) {
          // Mobile Vertical Narrative (Natural Touch Scroll, No Pinning Traps)
          gsap.fromTo(
            heroSurfaceRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: "#scene-hero-stage",
                start: "top 80%",
              },
            }
          );

          gsap.fromTo(
            fpaActualPathRef.current,
            { strokeDasharray: 900, strokeDashoffset: 900 },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              scrollTrigger: {
                trigger: "#scene-fpa-stage",
                start: "top 70%",
              },
            }
          );
        }
      }
    );

    return () => {
      mm.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const milestones = [
    { year: "2014", role: "AUDIT", note: "Statutory Practice" },
    { year: "2017", role: "FINANCE", note: "Financial Control" },
    { year: "2021", role: "REPORTING", note: "Statutory & SAMA" },
    { year: "2023", role: "FP&A", note: "Al Rajhi Bank" },
    { year: "2025", role: "FLOOSS", note: "Fintech FP&A" },
  ];

  const careerStages = [
    {
      num: "01",
      stage: "FOUNDATION",
      period: "2014 — 2017",
      title: "Audit Associate",
      org: "Chartered Practice",
      desc: "Statutory audits & IFRS compliance",
      leftPercent: "0%",
      ref: expM1Ref,
    },
    {
      num: "02",
      stage: "CONTROL",
      period: "2017 — 2021",
      title: "Accounts & Finance",
      org: "Al-Bawani Group",
      desc: "Financial closing & GL governance",
      leftPercent: "13%",
      ref: expM2Ref,
    },
    {
      num: "03",
      stage: "REPORTING",
      period: "2021 — 2023",
      title: "Senior Financial Specialist",
      org: "Najm Insurance",
      desc: "Statutory statements & SAMA compliance",
      leftPercent: "26%",
      ref: expM3Ref,
    },
    {
      num: "04",
      stage: "FP&A",
      period: "2023 — 2025",
      title: "FP&A Specialist",
      org: "Al Rajhi Bank",
      desc: "Enterprise budgeting & rolling forecasts",
      leftPercent: "40%",
      ref: expM4Ref,
    },
    {
      num: "05",
      stage: "PRESENT",
      period: "2025 — PRESENT",
      title: "FP&A Manager",
      org: "Flooss Fintech",
      desc: "Fintech financial architecture & runway",
      leftPercent: "54%",
      ref: expM5Ref,
    },
  ];

  const disciplines = [
    "Enterprise Annual Budgeting",
    "Quarterly Rolling Forecasts",
    "Strategic Financial Analysis",
    "Executive Management Reporting",
  ];

  const floossCaps = [
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
    <div ref={containerRef} className="relative w-full bg-[#111513] text-[#F5F2EA] overflow-x-hidden">
      {/* Persistent Adaptive Navigation */}
      <AdaptiveNav activeSection={activeSection} isLightMode={isLightMode} />

      {/* ========================================================================= */}
      {/* 01 — OPENING & SIGNATURE TRANSITION #1 TO HERO                            */}
      {/* ========================================================================= */}
      <div id="scene-opening-stage" className="relative w-full h-screen overflow-hidden">
        {/* Dark Opening Canvas */}
        <section
          id="scene-opening"
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-10 lg:p-14 select-none z-10"
          style={{
            background: "radial-gradient(ellipse 95% 75% at 30% 35%, #152620 0%, #111513 85%)",
          }}
        >
          <header className="relative z-10 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4 pt-12">
            <div className="text-sm font-semibold tracking-[0.2em] text-[#F5F2EA]">SAMEER MAJEED</div>
            <div className="text-xs tracking-[0.22em] text-[#B8A06A] font-mono font-medium">ACA · FIPA · FFA</div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col justify-center my-auto max-w-7xl w-full mx-auto py-2">
            <div ref={openingHeadlineRef} className="max-w-3xl mb-6">
              <div className="text-xs font-mono tracking-[0.28em] text-[#B8A06A] uppercase font-bold mb-3">
                EXECUTIVE PORTFOLIO
              </div>
              <h1 className="text-7xl lg:text-[6.5rem] font-light tracking-[-0.04em] leading-[0.92] text-[#F5F2EA]">
                THE FINANCIAL <br />
                <span className="font-serif italic font-normal text-[#B8A06A]">JOURNEY</span>
              </h1>
              <p className="text-xl lg:text-2xl text-[#F5F2EA]/85 font-light leading-relaxed mt-5 max-w-2xl">
                A decade across audit, accounting, financial control and FP&amp;A.
              </p>
            </div>

            <div ref={openingTrajectoryRef} className="relative w-full mt-2 pt-6">
              <div className="relative w-full h-[140px]">
                <svg viewBox="0 0 1100 140" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path
                    d="M 50,115 C 200,115 230,85 320,85 C 410,85 460,55 570,55 C 680,55 740,28 850,28 C 940,28 1000,10 1050,10"
                    fill="none"
                    stroke="#B8A06A"
                    strokeWidth="4"
                  />
                </svg>

                <div className="absolute inset-0 grid grid-cols-5 gap-4">
                  {milestones.map((m, idx) => (
                    <div
                      key={m.year}
                      className={`opening-node ${idx < 2 ? "opening-early-node" : "opening-late-node"} flex flex-col items-center text-center justify-end h-full`}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#111513] border-[2.5px] border-[#B8A06A] flex items-center justify-center shadow-xl shadow-black mb-2">
                        <div className="w-3 h-3 rounded-full bg-[#B8A06A]" />
                      </div>
                      <span className="text-xl font-bold font-mono tracking-wider text-[#B8A06A]">{m.year}</span>
                      <span className="text-base font-bold tracking-[0.16em] text-[#F5F2EA] uppercase mt-1">
                        {m.role}
                      </span>
                      <span className="text-xs font-mono text-[#F5F2EA]/65 mt-0.5">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
            <span>RIYADH, SAUDI ARABIA</span>
            <span className="text-[#B8A06A]">2014 — 2025+</span>
          </footer>
        </section>

        {/* HERO SURFACE (Enters smoothly from bottom during Transition #1) */}
        <div
          ref={heroSurfaceRef}
          className="absolute inset-0 w-full h-full bg-[#F5F2EA] text-[#111513] z-20 flex flex-col justify-between p-10 lg:p-14 select-none"
        >
          <header className="relative z-10 flex items-center justify-between border-b border-[#111513]/15 pb-4 pt-12">
            <div className="text-xs font-bold tracking-[0.24em] text-[#345B4B] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#345B4B]" />
              Executive Profile
            </div>
            <div className="text-xs font-mono tracking-wider text-[#111513]/70">RIYADH, SAUDI ARABIA</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
            <div ref={heroNameRef} className="col-span-7 flex flex-col justify-center pr-4 max-w-[45vw]">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-10 bg-[#345B4B]" />
                <span className="text-xs font-bold tracking-[0.26em] text-[#345B4B] uppercase">FP&amp;A MANAGER</span>
              </div>
              <h2 className="text-7xl lg:text-[5.75rem] font-semibold tracking-[-0.04em] text-[#111513] leading-[0.9]">
                Sameer <br />
                <span className="text-[#13231E]">Majeed</span>
              </h2>
              <p className="text-2xl lg:text-[1.7rem] text-[#111513]/85 font-light leading-snug tracking-tight mt-6 max-w-xl">
                Financial planning and analysis with clarity, discipline and foresight.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="px-4 py-2 bg-[#13231E] text-[#F5F2EA] text-xs font-bold tracking-[0.2em] uppercase">
                  ACA
                </span>
                <span className="px-4 py-2 bg-[#13231E] text-[#F5F2EA] text-xs font-bold tracking-[0.2em] uppercase">
                  FIPA
                </span>
                <span className="px-4 py-2 bg-[#13231E] text-[#F5F2EA] text-xs font-bold tracking-[0.2em] uppercase">
                  FFA
                </span>
                <span className="text-xs font-mono text-[#111513]/70 ml-2">ICAP · IPA Australia · IFA UK</span>
              </div>
              <div className="mt-10 flex items-center gap-5">
                <a
                  href="#scene-experience"
                  className="px-10 py-4 bg-[#111513] text-[#F5F2EA] text-xs font-bold tracking-[0.24em] uppercase transition-colors hover:bg-[#13231E] shadow-md"
                >
                  VIEW EXPERIENCE
                </a>
                <a
                  href="#scene-contact"
                  className="px-10 py-4 border-2 border-[#111513] text-[#111513] text-xs font-bold tracking-[0.24em] uppercase transition-colors hover:bg-[#111513] hover:text-[#F5F2EA]"
                >
                  CONTACT
                </a>
              </div>
            </div>

            <div className="col-span-5 relative h-full flex items-end justify-center">
              <div
                ref={heroGreenPlaneRef}
                className="absolute bottom-0 right-4 w-[74%] h-[78%] bg-[#13231E] rounded-t-[2px] shadow-2xl z-10"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8A06A]" />
                <div className="absolute top-4 right-4 text-[10px] tracking-[0.25em] text-[#B8A06A]/40 font-mono uppercase">
                  LEADERSHIP
                </div>
              </div>

              <div ref={heroPortraitRef} className="relative z-20 h-[98%] w-auto flex items-end justify-center">
                <Image
                  src="/portrait/sameer-majeed.png"
                  alt="Sameer Majeed, FP&A Manager"
                  width={660}
                  height={880}
                  priority
                  className="h-full w-auto object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-t border-[#111513]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#111513]/60">
            <span>EXECUTIVE PORTFOLIO</span>
            <span className="text-[#345B4B] font-bold">SCREEN 02 / 06</span>
          </footer>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 02 — HERO STAGE (Anchors Transition #2 Green Plane Expansion)             */}
      {/* ========================================================================= */}
      <div id="scene-hero-stage" className="relative w-full h-[20vh] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 03 — EXPERIENCE: INTERACTIVE CAREER PROGRESSION                           */}
      {/* ========================================================================= */}
      <div id="scene-experience-stage" className="relative w-full h-screen overflow-hidden">
        <section
          id="scene-experience"
          className="relative w-full h-full flex flex-col justify-between p-10 lg:p-14 select-none"
          style={{
            background: "linear-gradient(145deg, #111513 0%, #13231E 60%, #111513 100%)",
          }}
        >
          <header className="relative z-10 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4 pt-12">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B8A06A] uppercase">
                Professional Experience
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#F5F2EA]/50">2014 — 2025+</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-6 items-center my-auto py-2">
            <div id="exp-anchor" className="col-span-4 flex flex-col justify-center pr-6">
              <div className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold mb-2">
                EXPERIENCE
              </div>
              <div className="text-8xl lg:text-[7rem] font-bold tracking-[-0.05em] text-[#F5F2EA] leading-[0.82]">
                10+ <br />
                <span className="text-[#B8A06A] font-light">YEARS</span>
              </div>
              <div className="text-base font-mono tracking-[0.2em] text-[#B8A06A] mt-5">2014 — PRESENT</div>
              <p className="text-xl text-[#F5F2EA]/85 font-light leading-relaxed mt-4 max-w-sm">
                A career spanning audit, financial control, management reporting and FP&amp;A.
              </p>
              <div className="mt-8 pt-6 border-t border-[#F5F2EA]/15 text-xs font-mono text-[#F5F2EA]/50">
                RIYADH, SAUDI ARABIA
              </div>
            </div>

            <div className="col-span-8 relative h-full flex flex-col justify-between py-2">
              <svg
                viewBox="0 0 850 480"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                preserveAspectRatio="none"
              >
                <path
                  ref={expPathRef}
                  d="M 50,35 C 180,35 180,130 260,130 C 350,130 350,225 440,225 C 540,225 540,325 630,325 C 720,325 730,420 800,420"
                  fill="none"
                  stroke="#B8A06A"
                  strokeWidth="3.5"
                />
              </svg>

              {careerStages.map((m) => (
                <div
                  key={m.num}
                  ref={m.ref}
                  className="relative z-10 flex items-start gap-4 transition-transform will-change-transform"
                  style={{ marginLeft: m.leftPercent }}
                >
                  <div className="mt-1 flex items-center justify-center rounded-full bg-[#111513] shadow-xl shrink-0 w-8 h-8 border-2 border-[#B8A06A]">
                    <div className="rounded-full w-2.5 h-2.5 bg-[#B8A06A]" />
                  </div>
                  <div className="max-w-lg">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono font-bold text-sm text-[#B8A06A]">{m.num}</span>
                      <span className="font-bold tracking-[0.16em] uppercase text-lg text-[#F5F2EA]">{m.stage}</span>
                      <span className="text-xs font-mono text-[#F5F2EA]/60">({m.period})</span>
                    </div>
                    <div className="font-semibold tracking-wide mt-0.5 text-base text-[#F5F2EA]">
                      {m.title} <span className="text-sm font-normal text-[#B8A06A]">· {m.org}</span>
                    </div>
                    <div className="text-xs text-[#F5F2EA]/70 font-light mt-0.5">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <footer className="relative z-10 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
            <span>STATUTORY AUDIT · CORPORATE CONTROL · REGULATORY REPORTING · ENTERPRISE FP&amp;A</span>
            <span className="text-[#B8A06A] font-bold">SCREEN 03 / 06</span>
          </footer>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 04 — FP&A: OVERARCHING ART DIRECTION                                      */}
      {/* ========================================================================= */}
      <div id="scene-fpa-stage" className="relative w-full h-screen overflow-hidden">
        <section
          id="scene-fpa"
          className="relative w-full h-full flex flex-col justify-between p-10 lg:p-14 select-none"
          style={{
            background: "radial-gradient(ellipse 90% 75% at 50% 50%, #152620 0%, #111513 85%)",
          }}
        >
          <header className="relative z-20 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4 pt-12">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B8A06A] uppercase">
                Financial Planning &amp; Analysis
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#F5F2EA]/50">AL RAJHI BANK · 2023 — 2025</div>
          </header>

          {/* Large Financial Graph Traveling Across Composition */}
          <div className="absolute inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 1440 700" className="w-full h-full overflow-visible opacity-90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="liveVariance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8A06A" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#B8A06A" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="liveForecast" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#345B4B" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4E876F" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              <line x1="80" y1="180" x2="1360" y2="180" stroke="#F5F2EA" strokeOpacity="0.04" strokeDasharray="6 6" />
              <line x1="80" y1="340" x2="1360" y2="340" stroke="#F5F2EA" strokeOpacity="0.04" strokeDasharray="6 6" />
              <line x1="80" y1="500" x2="1360" y2="500" stroke="#F5F2EA" strokeOpacity="0.04" strokeDasharray="6 6" />

              <line x1="720" y1="120" x2="720" y2="560" stroke="#B8A06A" strokeOpacity="0.25" strokeDasharray="4 4" />
              <text x="730" y="145" fill="#B8A06A" fontSize="12" fontFamily="monospace" letterSpacing="2" opacity="0.8">
                ROLLING HORIZON
              </text>

              <polygon
                ref={fpaForecastRibbonRef}
                points="720,280 880,220 1060,160 1240,110 1380,80 1380,360 1240,340 1060,320 880,300 720,280"
                fill="url(#liveForecast)"
              />

              <polygon
                points="100,520 240,460 380,410 520,355 640,310 720,280 720,330 640,365 520,405 380,450 240,490 100,535"
                fill="url(#liveVariance)"
              />

              <path
                ref={fpaBudgetPathRef}
                d="M 100,535 L 240,490 L 380,450 L 520,405 L 640,365 L 720,330 L 880,290 L 1060,250 L 1240,215 L 1380,185"
                fill="none"
                stroke="#B8A06A"
                strokeWidth="3"
                strokeDasharray="8 6"
              />

              <path
                ref={fpaActualPathRef}
                d="M 100,520 L 240,460 L 380,410 L 520,355 L 640,310 L 720,280"
                fill="none"
                stroke="#F5F2EA"
                strokeWidth="4.5"
              />

              <path
                ref={fpaForecastPathRef}
                d="M 720,280 L 880,245 L 1060,200 L 1240,155 L 1380,120"
                fill="none"
                stroke="#4E876F"
                strokeWidth="4.5"
                strokeDasharray="7 5"
              />

              <text x="360" y="390" fill="#F5F2EA" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                ACTUAL
              </text>
              <text x="360" y="475" fill="#B8A06A" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                BUDGET
              </text>
              <text x="960" y="190" fill="#4E876F" fontSize="14" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                FORECAST →
              </text>
            </svg>
          </div>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-between my-auto py-4">
            <div id="fpa-headline" className="col-span-7 flex flex-col justify-start pt-2">
              <span className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold mb-2">
                PAST DATA → ANALYSIS → FUTURE DIRECTION
              </span>
              <h2 className="text-6xl lg:text-[5.5rem] font-light tracking-[-0.04em] leading-[0.92] text-[#F5F2EA]">
                FROM REPORTING <br />
                <span className="font-serif italic font-normal text-[#B8A06A]">TO FORESIGHT.</span>
              </h2>
            </div>

            <div ref={fpaInfoRef} className="col-span-5 col-start-8 flex flex-col justify-end pb-2">
              <div className="text-xs font-mono text-[#B8A06A] tracking-[0.25em] uppercase font-bold mb-1">
                ENTERPRISE FP&amp;A
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F2EA]">AL RAJHI BANK</h3>
              <div className="text-base font-mono text-[#B8A06A] font-semibold mt-1">
                FP&amp;A SPECIALIST · 2023 — 2025
              </div>
              <div className="mt-6 space-y-2.5 pt-4 border-t border-[#F5F2EA]/20">
                {disciplines.map((item, idx) => (
                  <div key={item} className="fpa-disc-item flex items-center gap-3 text-lg text-[#F5F2EA]">
                    <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
                    <span className="font-medium tracking-wide">{item}</span>
                    <span className="text-xs font-mono text-[#B8A06A]/70 ml-auto">0{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <footer className="relative z-20 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
            <span>QUANTITATIVE MODELING &amp; SCENARIOS</span>
            <span className="text-[#B8A06A] font-bold">SCREEN 04 / 06</span>
          </footer>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 05 — FLOOSS / PRESENT (Signature Transition #3 Surface Reveal)            */}
      {/* ========================================================================= */}
      <div id="scene-flooss-stage" className="relative w-full h-screen overflow-hidden">
        <div
          ref={floossSurfaceRef}
          className="relative w-full h-full bg-[#F5F2EA] text-[#111513] flex flex-col justify-between p-10 lg:p-14 select-none"
        >
          <header className="relative z-10 flex items-center justify-between border-b border-[#111513]/15 pb-4 pt-12">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#345B4B]" />
              <span className="text-xs font-bold tracking-[0.24em] text-[#345B4B] uppercase">
                Present Leadership · 2025 — PRESENT
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#111513]/70">FLOOSS FINTECH · RIYADH</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto py-2">
            <div className="col-span-5 relative h-full flex items-end justify-center">
              <div
                className="absolute bottom-0 left-4 w-[74%] h-[78%] bg-[#13231E] rounded-t-[2px] shadow-2xl z-10"
                style={{ boxShadow: "0 30px 60px -15px rgba(19, 35, 30, 0.4)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8A06A]" />
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.25em] text-[#B8A06A]/40 font-mono uppercase">
                  FINTECH FP&amp;A LEAD
                </div>
              </div>

              <div ref={floossPortraitRef} className="relative z-20 h-[98%] w-auto flex items-end justify-center">
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

            <div ref={floossContentRef} className="col-span-7 flex flex-col justify-center pl-4 pr-2">
              <div className="flex items-baseline gap-4 mb-2">
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#111513]">FLOOSS</h3>
                <span className="text-lg font-semibold tracking-[0.2em] text-[#B8A06A] uppercase">FP&amp;A MANAGER</span>
              </div>
              <div className="text-xs font-mono text-[#345B4B] font-bold tracking-wider mb-2">
                CURRENT ROLE · 2025 — PRESENT · RIYADH
              </div>

              <h2 className="text-7xl lg:text-[6.25rem] font-light tracking-[-0.04em] text-[#111513] leading-[0.88] my-3">
                PLANNING <br />
                WHAT COMES <br />
                <span className="font-serif italic font-normal text-[#345B4B]">NEXT.</span>
              </h2>

              <div ref={floossCapRef} className="mt-6 pt-5 border-t-2 border-[#111513]">
                <div className="grid grid-cols-4 gap-4">
                  {floossCaps.map((cap) => (
                    <div key={cap.name} className="flooss-cap-item flex flex-col">
                      <div className="flex items-center justify-between pb-1 border-b border-[#111513]/20">
                        <span className="text-xs font-mono font-bold text-[#345B4B]">{cap.num}</span>
                        <span className="text-base font-bold tracking-[0.14em] text-[#111513] uppercase">
                          {cap.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#111513]/80 font-light leading-relaxed mt-2">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-t border-[#111513]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#111513]/70">
            <span>VENTURE RUNWAY &amp; UNIT ECONOMICS</span>
            <span className="text-[#345B4B] font-bold">SCREEN 05 / 06</span>
          </footer>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 06 — CREDENTIALS: HIERARCHICAL PINNED EXHIBITION GALLERY                  */}
      {/* ========================================================================= */}
      <div id="scene-credentials-stage" className="relative w-full h-screen overflow-hidden">
        <section
          id="scene-credentials"
          className="relative w-full h-full bg-[#F5F2EA] text-[#111513] flex flex-col justify-between p-10 lg:p-14 select-none"
        >
          <header className="relative z-10 flex items-center justify-between border-b border-[#111513]/15 pb-4 pt-12">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#345B4B]" />
              <span className="text-xs font-bold tracking-[0.24em] text-[#345B4B] uppercase">
                Professional Accreditations
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#111513]/70">CHARTERED STANDING &amp; FELLOWSHIPS</div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2">
            <div id="creds-heading" className="mb-4">
              <span className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold block mb-1">
                GOVERNANCE &amp; ACCREDITATIONS
              </span>
              <h2 className="text-5xl lg:text-6xl font-light tracking-[-0.035em] text-[#111513] leading-[0.96]">
                CREDENTIALS <br />
                <span className="font-serif italic font-normal text-[#345B4B]">&amp; CONTINUOUS LEARNING</span>
              </h2>
            </div>

            <div ref={credsContainerRef} className="grid grid-cols-12 gap-6 items-center pt-2 pb-2">
              {/* Cert 1 */}
              <div ref={cert1Ref} className="col-span-4 flex flex-col items-center text-center relative z-30">
                <div
                  className="relative w-[30vw] max-w-[390px] aspect-[3/4] bg-white shadow-2xl p-1.5 transition-transform"
                  style={{
                    boxShadow: "0 30px 60px -15px rgba(17, 21, 19, 0.28), 0 0 0 1px rgba(17, 21, 19, 0.08)",
                  }}
                >
                  <Image
                    src="/certificates/icap-associate.png"
                    alt="ICAP Associate Certificate"
                    width={420}
                    height={560}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <div className="text-lg font-bold tracking-wider text-[#111513]">ACA</div>
                  <div className="text-xs font-mono text-[#111513]/70 mt-0.5">
                    Institute of Chartered Accountants of Pakistan
                  </div>
                </div>
              </div>

              {/* Cert 2 */}
              <div ref={cert2Ref} className="col-span-4 flex flex-col items-center text-center relative z-20">
                <div
                  className="relative w-[26vw] max-w-[350px] aspect-[3/4] bg-white shadow-2xl p-1.5 transition-transform"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(17, 21, 19, 0.22), 0 0 0 1px rgba(17, 21, 19, 0.08)",
                  }}
                >
                  <Image
                    src="/certificates/socpa-associate.png"
                    alt="SOCPA Membership Certificate"
                    width={380}
                    height={510}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <div className="text-lg font-bold tracking-wider text-[#111513]">SOCPA</div>
                  <div className="text-xs font-mono text-[#345B4B] font-semibold mt-0.5">Associate</div>
                </div>
              </div>

              {/* Cert 3 */}
              <div ref={cert3Ref} className="col-span-4 flex flex-col items-center text-center relative z-20">
                <div
                  className="relative w-[28vw] max-w-[370px] aspect-[3/4] bg-white shadow-2xl p-1.5 transition-transform"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(17, 21, 19, 0.24), 0 0 0 1px rgba(17, 21, 19, 0.08)",
                  }}
                >
                  <Image
                    src="/certificates/fipa-fellow.png"
                    alt="FIPA Fellow Certificate"
                    width={400}
                    height={530}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <div className="text-lg font-bold tracking-wider text-[#111513]">FIPA · FFA</div>
                  <div className="text-xs font-mono text-[#345B4B] font-semibold mt-0.5">Fellow</div>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-t border-[#111513]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#111513]/70">
            <span>VERIFIED REGULATORY QUALIFICATIONS</span>
            <span className="text-[#345B4B] font-bold">SCREEN 06 / 06</span>
          </footer>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 07 — CONTACT: CULMINATING FINALE                                          */}
      {/* ========================================================================= */}
      <div id="scene-contact-stage" className="relative w-full h-screen overflow-hidden">
        <section
          ref={contactSurfaceRef}
          id="scene-contact"
          className="relative w-full h-full bg-[#111513] text-[#F5F2EA] flex flex-col justify-between p-10 lg:p-14 select-none"
          style={{
            background: "linear-gradient(155deg, #13231E 0%, #111513 100%)",
          }}
        >
          {/* Subtle Visual Echo of Sameer at Far-Right Edge */}
          <div className="absolute right-0 bottom-0 h-[92%] w-auto pointer-events-none opacity-[0.06] mix-blend-luminosity z-0 flex items-end">
            <Image
              src="/portrait/sameer-majeed.png"
              alt="Visual echo"
              width={600}
              height={800}
              className="h-full w-auto object-contain object-bottom"
            />
          </div>

          <header className="relative z-10 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4 pt-12">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
              <span className="text-xs font-semibold tracking-[0.24em] text-[#B8A06A] uppercase">
                Inquiries &amp; Advisory
              </span>
            </div>
            <div className="text-xs font-mono tracking-wider text-[#F5F2EA]/50">EXECUTIVE ENGAGEMENT</div>
          </header>

          <main className="relative z-10 flex-1 grid grid-cols-12 gap-10 items-center my-auto py-6">
            <div ref={contactHeadlineRef} className="col-span-6 flex flex-col justify-center pr-4">
              <span className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold mb-2">
                INITIATE ENGAGEMENT
              </span>
              <h2 className="text-7xl lg:text-[7.5rem] font-light tracking-[-0.04em] text-[#F5F2EA] leading-[0.88]">
                LET&apos;S <br />
                <span className="font-serif italic font-normal text-[#B8A06A]">CONNECT.</span>
              </h2>
            </div>

            <div
              ref={contactDetailsRef}
              className="col-span-6 flex flex-col justify-between pl-8 border-l border-[#F5F2EA]/15 space-y-8"
            >
              <div>
                <div className="text-2xl font-bold tracking-tight text-[#F5F2EA]">Sameer Majeed</div>
                <div className="text-sm font-mono text-[#B8A06A] font-semibold mt-0.5">
                  FP&amp;A Manager · Riyadh, Saudi Arabia
                </div>
                <div className="text-xs text-[#F5F2EA]/60 mt-0.5">Chartered Accountant · ACA · FIPA · FFA</div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono tracking-[0.2em] text-[#B8A06A] uppercase block">Direct Contact</span>
                <a
                  href="mailto:sameerpk_majeed@hotmail.com"
                  className="group relative inline-block text-2xl lg:text-3xl font-mono font-medium text-[#F5F2EA] hover:text-[#B8A06A] transition-colors break-all"
                >
                  sameerpk_majeed@hotmail.com
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#B8A06A]" />
                </a>
                <br />
                <a
                  href="https://linkedin.com/in/sameer-majeed-aca"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-base font-mono text-[#B8A06A] hover:underline pt-1"
                >
                  <span>linkedin.com/in/sameer-majeed-aca</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:sameerpk_majeed@hotmail.com?subject=Executive%20FP%26A%20Inquiry"
                  className="inline-block px-12 py-5 bg-[#B8A06A] text-[#111513] text-sm font-bold tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#F5F2EA] hover:scale-[1.02] shadow-2xl"
                >
                  START A CONVERSATION
                </a>
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
            <span>© 2025 SAMEER MAJEED</span>
            <span className="text-[#B8A06A] font-bold">FINAL CHAPTER</span>
          </footer>
        </section>
      </div>
    </div>
  );
}
