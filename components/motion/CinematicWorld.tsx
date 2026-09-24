"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, MorphSVGPlugin } from "@/lib/gsap";
import { AdaptiveNav } from "./AdaptiveNav";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { CertificateModal, CertificateData } from "./CertificateModal";
import { RoleDetailsDrawer, RoleDetailData } from "./RoleDetailsDrawer";
import { MotionDebugHud } from "./MotionDebugHud";
import { FinancialSignal } from "./FinancialSignal";
import {
  CHAPTERS,
  CERTIFICATES,
  ROLE_RECORDS,
  SIGNAL_ORDER,
  SIGNAL_PATHS,
  TOOLKIT_SKILLS,
  type ChapterId,
} from "@/lib/cinematic-data";

gsap.registerPlugin(MorphSVGPlugin);

const SCRUB = 0.65;
const CHAPTER_VH = 100; // scroll height per chapter in vh units

export function CinematicWorld() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<ChapterId>("scene-entry");
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [certModalIndex, setCertModalIndex] = useState(0);
  const [activeRoleDrawer, setActiveRoleDrawer] = useState<RoleDetailData | null>(null);
  const [activeToolkit, setActiveToolkit] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let mm: gsap.MatchMedia | null = null;
    let mounted = true;

    (window as unknown as { ScrollTrigger?: unknown }).ScrollTrigger = ScrollTrigger;

    const boot = async () => {
      await document.fonts.ready;
      if (!mounted || !trackRef.current || !viewportRef.current) return;

      const isDebug = new URLSearchParams(window.location.search).has("debugMotion");

      mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = SIGNAL_ORDER.map((id) => document.querySelector(`[data-chapter="${id}"]`));
        const core = document.getElementById("signal-core");
        const glow = document.getElementById("signal-glow");
        const head = document.getElementById("signal-head");
        const branches = document.getElementById("signal-branches");

        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: SCRUB,
            invalidateOnRefresh: true,
            markers: isDebug,
            onUpdate: (self) => {
              const idx = Math.min(
                SIGNAL_ORDER.length - 1,
                Math.max(0, Math.round(self.progress * (SIGNAL_ORDER.length - 1))),
              );
              setActiveSection(SIGNAL_ORDER[idx]);
            },
          },
        });

        const seg = 1; // each chapter = 1 timeline unit

        // Seed signal at entry path
        if (core && glow) {
          gsap.set([core, glow], { morphSVG: SIGNAL_PATHS["scene-entry"] });
        }

        SIGNAL_ORDER.forEach((id, i) => {
          const next = SIGNAL_ORDER[i + 1];
          const panel = panels[i];
          const nextPanel = panels[i + 1];
          const t0 = i * seg;

          // Chapter-specific world motion (0–55%)
          buildChapterMotion(tl, id, t0, seg);

          // Crossfade coexistence (55–90%) — both worlds visible; signal morphs into next
          if (next && nextPanel && panel) {
            tl.to(panel, { autoAlpha: 0, duration: seg * 0.4 }, t0 + seg * 0.55);
            tl.fromTo(
              nextPanel,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: seg * 0.4 },
              t0 + seg * 0.55,
            );

            if (core && glow) {
              tl.to(core, { morphSVG: SIGNAL_PATHS[next], duration: seg * 0.45 }, t0 + seg * 0.55);
              tl.to(glow, { morphSVG: SIGNAL_PATHS[next], duration: seg * 0.45 }, t0 + seg * 0.55);
            }
          }
        });

        // Head follows path endpoint approximately
        if (head) {
          tl.to(head, { attr: { cx: 720, cy: 520 }, duration: seg * 2 }, 10 * seg);
        }

        // Toolkit branches
        if (branches) {
          const toolkitIndex = SIGNAL_ORDER.indexOf("scene-toolkit");
          tl.fromTo(
            branches,
            { opacity: 0 },
            { opacity: 1, duration: seg * 0.4 },
            toolkitIndex * seg + seg * 0.2,
          );
          tl.to(branches, { opacity: 0, duration: seg * 0.25 }, (toolkitIndex + 1) * seg * 0.9);
        }

        // Contact underline = signal as horizontal line (already morph target)
        return () => {
          tl.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(".chapter-panel", { clearProps: "all" });
        SIGNAL_ORDER.forEach((id) => {
          ScrollTrigger.create({
            trigger: `[data-chapter="${id}"]`,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };

    void boot();

    return () => {
      mounted = false;
      mm?.revert();
    };
  }, []);

  const certificates = CERTIFICATES as unknown as CertificateData[];

  return (
    <div className="relative w-full bg-[#050608] text-[#F4F6F8] font-sans">
      <MotionDebugHud activeChapter={activeSection} />
      <ScrollProgress />
      <CustomCursor />
      <AdaptiveNav activeSection={activeSection} />

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

      <RoleDetailsDrawer roleData={activeRoleDrawer} onClose={() => setActiveRoleDrawer(null)} />

      {/* Scroll energy — desktop drives fixed viewport */}
      <div
        ref={trackRef}
        id="cinematic-track"
        className="relative w-full hidden lg:block"
        style={{ height: `${CHAPTERS.length * CHAPTER_VH}vh` }}
        aria-hidden="true"
      />

      {/* ===== PERSISTENT CINEMATIC VIEWPORT ===== */}
      <div ref={viewportRef} className="cinematic-viewport lg:fixed">
        {/* 01 Atmosphere */}
        <div className="layer z-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 30%, #0D1015 0%, #050608 85%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 65% 35%, rgba(36, 91, 255, 0.2) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 160px 40px rgba(5, 6, 8, 0.9)" }}
          />
        </div>

        {/* 02 Financial Signal — behind typography, in front of deep atmosphere */}
        <div className="layer z-[2] hidden lg:block mix-blend-screen opacity-90">
          <FinancialSignal />
        </div>

        {/* 03–06 Chapter worlds share the same stage */}
        <div className="layer layer-interactive z-[5]">
          <EntryChapter />
          <HeroChapter />
          <FoundationChapter onOpenRole={() => setActiveRoleDrawer(ROLE_RECORDS.hassan as unknown as RoleDetailData)} />
          <ControlChapter
            onOpenZoom={() => setActiveRoleDrawer(ROLE_RECORDS.zoom as unknown as RoleDetailData)}
          />
          <RiyadhChapter />
          <ReportingChapter />
          <FpaChapter onOpenRole={() => setActiveRoleDrawer(ROLE_RECORDS.alrajhi as unknown as RoleDetailData)} />
          <FloossChapter onOpenRole={() => setActiveRoleDrawer(ROLE_RECORDS.flooss as unknown as RoleDetailData)} />
          <PhilosophyChapter />
          <ToolkitChapter active={activeToolkit} setActive={setActiveToolkit} />
          <CredentialsChapter
            certificates={certificates}
            onOpen={(cert, idx) => {
              setCertModalIndex(idx);
              setSelectedCert(cert);
            }}
          />
          <ContactChapter />
        </div>
      </div>

      {/* Mobile: natural document flow height */}
      <div className="lg:hidden h-0" aria-hidden="true" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Chapter motion builders                                                     */
/* -------------------------------------------------------------------------- */

function buildChapterMotion(tl: gsap.core.Timeline, id: ChapterId, t0: number, seg: number) {
  const dur = seg * 0.55;

  switch (id) {
    case "scene-entry":
      tl.to("#obj-orbit", { scale: 1.12, xPercent: -4, duration: dur }, t0);
      tl.to(".orbit-label-2014", { opacity: 0.35, duration: dur * 0.3 }, t0);
      tl.to(".orbit-label-2025", { scale: 1.2, color: "#77A1FF", duration: dur * 0.4 }, t0 + dur * 0.5);
      tl.to("#obj-orbit", { scale: 1.35, rotateY: 12, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-hero":
      tl.fromTo("#obj-sculpture", { scale: 0.92, xPercent: 8 }, { scale: 1.05, xPercent: 0, duration: dur }, t0);
      tl.fromTo("#obj-portrait-hero", { xPercent: 6, opacity: 0.85 }, { xPercent: 0, opacity: 1, duration: dur }, t0);
      tl.to("#obj-sculpture", { xPercent: -6, scale: 0.95, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-foundation":
      tl.fromTo("#obj-audit-closed", { autoAlpha: 1, scale: 0.95 }, { scale: 1.08, rotateZ: 4, duration: dur * 0.5 }, t0);
      tl.to("#obj-audit-closed", { autoAlpha: 0, duration: dur * 0.2 }, t0 + dur * 0.45);
      tl.fromTo("#obj-audit-open", { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1.08, duration: dur * 0.3 }, t0 + dur * 0.45);
      tl.to("#obj-audit-open", { rotateZ: -8, scale: 0.9, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-control":
      tl.fromTo("#obj-control", { scale: 0.92, rotateZ: -8 }, { scale: 1.1, rotateZ: 10, duration: dur }, t0);
      tl.to("#ctrl-zone-1", { opacity: 1, duration: dur * 0.2 }, t0);
      tl.to("#ctrl-zone-1", { opacity: 0.4, duration: dur * 0.15 }, t0 + dur * 0.35);
      tl.to("#ctrl-zone-2", { opacity: 1, duration: dur * 0.15 }, t0 + dur * 0.35);
      tl.to("#ctrl-zone-2", { opacity: 0.4, duration: dur * 0.15 }, t0 + dur * 0.6);
      tl.to("#ctrl-zone-3", { opacity: 1, duration: dur * 0.15 }, t0 + dur * 0.6);
      tl.to("#obj-control", { scale: 1.4, opacity: 0.5, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-riyadh":
      tl.to("#obj-lahore", { scale: 0.5, xPercent: -30, opacity: 0.2, duration: dur }, t0);
      tl.fromTo("#obj-riyadh", { scale: 0.85, opacity: 0.7 }, { scale: 1.15, opacity: 1, duration: dur }, t0);
      tl.to("#ghost-riyadh", { opacity: 0.08, scale: 1.05, duration: dur }, t0);
      tl.to("#obj-riyadh", { scaleY: 1.2, scaleX: 0.7, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-reporting":
      tl.fromTo("#obj-reporting", { scale: 0.9, rotateZ: -4 }, { scale: 1.08, rotateZ: 6, duration: dur }, t0);
      tl.fromTo("#rep-m", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur * 0.25 }, t0 + dur * 0.2);
      tl.fromTo("#rep-q", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur * 0.25 }, t0 + dur * 0.35);
      tl.fromTo("#rep-a", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur * 0.25 }, t0 + dur * 0.5);
      tl.to("#obj-reporting", { rotateX: 55, yPercent: -10, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-fpa":
      tl.fromTo("#obj-forecast", { scale: 0.9, opacity: 0.8 }, { scale: 1.12, opacity: 1, duration: dur }, t0);
      tl.fromTo("#fpa-actual", { strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: dur * 0.5 }, t0);
      tl.fromTo("#fpa-budget", { strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: dur * 0.45 }, t0 + dur * 0.15);
      tl.fromTo("#fpa-forecast", { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: dur * 0.5 }, t0 + dur * 0.25);
      tl.to("#obj-forecast", { xPercent: 18, scale: 0.85, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-flooss":
      tl.fromTo("#obj-planning", { rotateZ: -8, scale: 0.92 }, { rotateZ: 14, scale: 1.1, duration: dur }, t0);
      tl.fromTo("#obj-portrait-flooss", { xPercent: -4 }, { xPercent: 0, duration: dur }, t0);
      tl.to("#flooss-rail-dot", { x: 320, duration: dur, ease: "none" }, t0);
      break;
    case "scene-philosophy":
      // NO blue rectangle — beam contracts, subtle illuminate COMPLEXITY
      tl.to("#phil-beam", { scaleX: 0.35, opacity: 1, duration: dur * 0.5 }, t0);
      tl.to("#phil-complexity", { color: "#77A1FF", duration: dur * 0.4 }, t0 + dur * 0.3);
      tl.fromTo("#obj-prism-seed", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 0.85, scale: 0.7, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-toolkit":
      tl.fromTo("#obj-prism", { rotateZ: -12, scale: 0.9 }, { rotateZ: 16, scale: 1.12, duration: dur }, t0);
      tl.fromTo(".toolkit-node", { opacity: 0.5, scale: 0.9 }, { opacity: 1, scale: 1, stagger: 0.04, duration: dur * 0.5 }, t0 + dur * 0.15);
      tl.to("#obj-prism", { yPercent: 8, scale: 1.0, duration: seg * 0.35 }, t0 + dur);
      break;
    case "scene-credentials":
      tl.to("#cert-0", { xPercent: -40, opacity: 0, duration: dur * 0.35 }, t0 + dur * 0.15);
      tl.to("#cert-1", { xPercent: 0, opacity: 1, scale: 1, duration: dur * 0.35 }, t0 + dur * 0.15);
      tl.to("#cert-1", { xPercent: -40, opacity: 0, duration: dur * 0.3 }, t0 + dur * 0.55);
      tl.to("#cert-2", { xPercent: 0, opacity: 1, scale: 1, duration: dur * 0.3 }, t0 + dur * 0.55);
      break;
    case "scene-contact":
      tl.fromTo("#contact-underline", { scaleX: 0 }, { scaleX: 1, duration: dur * 0.5 }, t0);
      tl.fromTo("#obj-portrait-contact", { opacity: 0.1, xPercent: 8 }, { opacity: 0.28, xPercent: 0, duration: dur }, t0);
      break;
  }
}

/* -------------------------------------------------------------------------- */
/* Chapter panels                                                              */
/* -------------------------------------------------------------------------- */

function EntryChapter() {
  return (
    <section data-chapter="scene-entry" id="scene-entry" className="chapter-panel is-live" aria-label="Opening">
      <div className="composition relative h-full">
        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,14svh)] z-30 max-w-[min(42rem,48%)]">
          <p className="type-kicker mb-4">THE FINANCIAL SIGNAL</p>
          <h1 className="type-display text-[#F4F6F8]">
            THE FINANCIAL <br />
            <span className="font-semibold text-[#3D73FF]">JOURNEY</span>
          </h1>
          <p className="type-body mt-5 max-w-xl">
            A decade across audit, technical accounting, financial control and FP&amp;A.
          </p>
        </div>

        <div className="absolute inset-x-[6%] bottom-[10%] top-[36%] z-[3] flex items-center justify-center object-scale-short">
          <div id="obj-orbit" className="relative h-full w-full max-w-[1100px] will-change-transform">
            <Image
              src="/assets/3d/career-orbit.webp"
              alt=""
              fill
              priority
              className="object-contain opacity-95 drop-shadow-[0_0_60px_rgba(61,115,255,0.55)]"
              sizes="70vw"
            />
            <div className="absolute inset-0">
              <div className="orbit-label-2014 absolute bottom-[8%] left-[8%]">
                <span className="block text-xs font-mono font-bold text-[#3D73FF]">2014</span>
                <span className="text-sm font-bold uppercase tracking-wider">AUDIT</span>
              </div>
              <div className="orbit-label-2017 absolute bottom-[22%] left-[30%]">
                <span className="block text-xs font-mono font-bold text-[#3D73FF]">2017</span>
                <span className="text-sm font-bold uppercase tracking-wider">CONTROL</span>
              </div>
              <div className="orbit-label-2021 absolute bottom-[38%] left-[52%]">
                <span className="block text-xs font-mono font-bold text-[#3D73FF]">2021</span>
                <span className="text-sm font-bold uppercase tracking-wider">REPORTING</span>
              </div>
              <div className="orbit-label-2023 absolute right-[22%] top-[28%]">
                <span className="block text-xs font-mono font-bold text-[#3D73FF]">2023</span>
                <span className="text-sm font-bold uppercase tracking-wider">FP&amp;A</span>
              </div>
              <div className="orbit-label-2025 absolute right-[6%] top-[8%]">
                <span className="block text-xs font-mono font-bold text-[#77A1FF]">2025</span>
                <span className="text-sm font-bold uppercase tracking-wider">FLOOSS</span>
              </div>
            </div>
          </div>
        </div>

        <p className="type-kicker absolute bottom-[max(48px,5svh)] left-[clamp(24px,4vw,80px)] z-30 text-[#3D73FF]/80">
          SCROLL TO FOLLOW THE SIGNAL ↓
        </p>
      </div>
    </section>
  );
}

function HeroChapter() {
  return (
    <section data-chapter="scene-hero" id="scene-hero" className="chapter-panel" aria-label="Sameer Majeed">
      <div className="composition relative h-full">
        <div
          id="obj-sculpture"
          className="absolute right-[2%] top-[10%] bottom-[2%] z-[4] w-[min(48vw,720px)] will-change-transform object-scale-short"
        >
          <Image
            src="/assets/3d/hero-sculpture.png"
            alt=""
            fill
            className="object-contain object-right drop-shadow-[0_0_40px_rgba(61,115,255,0.25)]"
            sizes="48vw"
          />
        </div>

        <div
          id="obj-portrait-hero"
          className="absolute bottom-0 right-[6%] z-20 h-[86%] w-[min(40vw,540px)] will-change-transform"
        >
          <Image
            src="/portrait/sameer-majeed.png"
            alt="Sameer Majeed, FP&A Manager"
            fill
            priority
            className="object-contain object-bottom"
            sizes="40vw"
          />
        </div>

        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,16svh)] z-30 max-w-[min(36rem,42%)]">
          <p className="type-kicker">FP&amp;A MANAGER · RIYADH</p>
          <h2 className="type-section mt-4 font-semibold tracking-[-0.05em]">
            SAMEER
            <span className="block">MAJEED</span>
          </h2>
          <p className="type-role mt-3 text-[#3D73FF]">ACA · FIPA · FFA</p>
          <p className="type-body mt-3 max-w-sm">
            10+ years across Audit · Accounting · Finance · FP&amp;A
          </p>
          <a
            href="#scene-foundation"
            className="type-kicker mt-6 inline-flex w-fit border-b border-[#3D73FF]/50 pb-1 text-[#F4F6F8]"
          >
            EXPLORE EXPERIENCE
          </a>
        </div>
      </div>
    </section>
  );
}

function FoundationChapter({ onOpenRole }: { onOpenRole: () => void }) {
  return (
    <section data-chapter="scene-foundation" id="scene-foundation" className="chapter-panel" aria-label="Audit Associate">
      <div className="composition relative h-full">
        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,16svh)] z-30 max-w-[min(34rem,40%)]">
          <p className="type-kicker">01 / FOUNDATION · 2014 — 2017</p>
          <h2 className="type-section mt-4">
            AUDIT
            <span className="block font-semibold">ASSOCIATE</span>
          </h2>
          <p className="type-role mt-4">Hassan Naeem &amp; Co</p>
          <p className="type-kicker mt-2 text-[#AAB1BC]">Lahore, Pakistan</p>
          <p className="type-body mt-6 max-w-md">
            Built the foundation in audit, controls and financial reporting.
          </p>
          <button
            type="button"
            onClick={onOpenRole}
            className="type-kicker mt-8 w-fit border border-[#3D73FF]/40 px-5 py-3 hover:bg-[#3D73FF]/15"
          >
            VIEW ROLE DETAILS ↗
          </button>
        </div>

        <div className="absolute bottom-[12%] right-[4%] top-[16%] w-[min(48vw,680px)] object-scale-short">
          <div id="obj-audit-closed" className="absolute inset-0 will-change-transform">
            <Image src="/assets/3d/audit-core.webp" alt="" fill className="object-contain" sizes="48vw" />
          </div>
          <div id="obj-audit-open" className="absolute inset-0 opacity-0 will-change-transform">
            <Image src="/assets/3d/audit-core-open.webp" alt="" fill className="object-contain" sizes="48vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlChapter({ onOpenZoom }: { onOpenZoom: () => void }) {
  return (
    <section data-chapter="scene-control" id="scene-control" className="chapter-panel" aria-label="Finance Control">
      <div className="composition relative h-full">
        <div className="absolute left-[4%] top-[16%] bottom-[14%] w-[min(46vw,640px)] object-scale-short">
          <div id="obj-control" className="relative h-full w-full will-change-transform">
            <Image src="/assets/3d/control-engine.webp" alt="" fill className="object-contain" sizes="46vw" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(61,115,255,0.25),transparent_60%)] opacity-60" />
          </div>
        </div>

        <div className="absolute right-[clamp(24px,4vw,80px)] top-[max(96px,16svh)] z-30 max-w-[min(34rem,42%)]">
          <p className="type-kicker">02 / CONTROL · 2017 — 2021</p>
          <h2 className="type-section mt-4">
            FINANCE
            <span className="block font-semibold">CONTROL</span>
          </h2>
          <div className="mt-8 space-y-5">
            <div id="ctrl-zone-1" className="border-l-2 border-[#3D73FF] pl-4 opacity-100">
              <p className="type-kicker">01 · 2017 — 2018</p>
              <p className="type-role mt-1">Head of Accounts</p>
            </div>
            <div id="ctrl-zone-2" className="border-l-2 border-[#3D73FF] pl-4 opacity-40">
              <p className="type-kicker">02 · 2018 — 2021</p>
              <p className="type-role mt-1">Deputy Manager Finance</p>
            </div>
            <div id="ctrl-zone-3" className="border-l-2 border-[#3D73FF] pl-4 opacity-40">
              <p className="type-kicker">03 · 2021</p>
              <p className="type-role mt-1">Manager Accounts &amp; Finance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenZoom}
            className="type-kicker mt-8 w-fit border border-[#303640] px-5 py-3 hover:border-[#3D73FF]"
          >
            VIEW CONTROL MANDATE ↗
          </button>
        </div>
      </div>
    </section>
  );
}

function RiyadhChapter() {
  return (
    <section data-chapter="scene-riyadh" id="scene-riyadh" className="chapter-panel" aria-label="Riyadh">
      <div className="composition relative h-full overflow-hidden">
        <p
          id="ghost-riyadh"
          className="absolute inset-x-0 top-[22%] text-center font-bold tracking-[-0.06em] text-[#F4F6F8] opacity-[0.07] pointer-events-none whitespace-nowrap overflow-hidden"
          style={{ fontSize: "clamp(5rem, 12vw, 14rem)" }}
        >
          RIYADH
        </p>

        <div id="obj-lahore" className="absolute left-[2%] bottom-[18%] h-[40%] w-[28%] opacity-70 will-change-transform">
          <Image src="/assets/3d/lahore-origin.webp" alt="" fill className="object-contain object-left" sizes="28vw" />
        </div>

        <div id="obj-riyadh" className="absolute right-[4%] top-[14%] bottom-[8%] w-[min(48vw,700px)] will-change-transform object-scale-short">
          <Image src="/assets/3d/riyadh-destination.webp" alt="" fill className="object-contain object-right" sizes="48vw" />
        </div>

        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,18svh)] z-30 max-w-[min(34rem,40%)]">
          <p className="type-kicker">03 / THE MOVE · 2021</p>
          <h2 className="type-section mt-4">
            LAHORE
            <span className="block font-light text-[#AAB1BC]">→</span>
            <span className="block font-semibold text-[#3D73FF]">RIYADH</span>
          </h2>
          <p className="type-role mt-3">Saudi Arabia</p>
          <p className="type-body mt-5 max-w-sm">
            The career signal crosses borders into institutional scale.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReportingChapter() {
  return (
    <section data-chapter="scene-reporting" id="scene-reporting" className="chapter-panel" aria-label="Reporting">
      <div className="composition relative h-full">
        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,16svh)] z-30 max-w-[min(34rem,40%)]">
          <p className="type-kicker">04 / REPORTING · 2021 — 2023</p>
          <h2 className="type-section mt-4">
            FINANCIAL
            <span className="block font-semibold">CADENCE.</span>
          </h2>
          <p className="type-role mt-4">Najm Company for Insurance Services</p>
          <div className="mt-8 space-y-3">
            <p id="rep-m" className="type-kicker opacity-0">
              MONTHLY
            </p>
            <p id="rep-q" className="type-kicker opacity-0">
              QUARTERLY
            </p>
            <p id="rep-a" className="type-kicker opacity-0">
              ANNUAL
            </p>
          </div>
        </div>

        <div id="obj-reporting" className="absolute bottom-[10%] right-[2%] top-[12%] w-[min(50vw,720px)] will-change-transform object-scale-short">
          <Image src="/assets/3d/reporting-tower.webp" alt="" fill className="object-contain" sizes="50vw" />
        </div>
      </div>
    </section>
  );
}

function FpaChapter({ onOpenRole }: { onOpenRole: () => void }) {
  return (
    <section data-chapter="scene-fpa" id="scene-fpa" className="chapter-panel" aria-label="FP&A">
      <div className="composition relative h-full">
        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,14svh)] z-30 max-w-[min(34rem,38%)]">
          <p className="type-kicker">05 / FP&amp;A · 2023 — 2025</p>
          <h2 className="type-section mt-4">
            FROM REPORTING
            <span className="block font-semibold text-[#3D73FF]">TO FORESIGHT.</span>
          </h2>
          <p className="type-role mt-5">Al Rajhi Bank</p>
          <p className="type-kicker mt-2 text-[#AAB1BC]">FP&amp;A Specialist · Riyadh</p>
          <button
            type="button"
            onClick={onOpenRole}
            className="type-kicker mt-8 w-fit border border-[#3D73FF]/40 px-5 py-3 hover:bg-[#3D73FF]/15"
          >
            VIEW ROLE DETAILS ↗
          </button>
        </div>

        <div className="absolute bottom-[8%] right-[2%] top-[10%] w-[min(58vw,860px)]">
          <div id="obj-forecast" className="absolute inset-0 will-change-transform object-scale-short">
            <Image src="/assets/3d/forecasting-curve.webp" alt="" fill className="object-contain opacity-90" sizes="58vw" />
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" fill="none" aria-hidden="true">
            <path id="fpa-actual" d="M40 480 C 220 460, 400 420, 580 380" stroke="#6d6a62" strokeWidth="3" strokeDasharray="1200" strokeDashoffset="1200" />
            <path id="fpa-budget" d="M40 400 C 280 360, 500 300, 700 260" stroke="#B9A46A" strokeWidth="3" strokeDasharray="1200" strokeDashoffset="1200" />
            <path id="fpa-forecast" d="M580 380 C 780 240, 980 140, 1160 80" stroke="#77A1FF" strokeWidth="3.5" strokeDasharray="1000" strokeDashoffset="1000" />
            <text x="40" y="520" fill="#AAB1BC" fontSize="14" letterSpacing="3">
              ACTUAL
            </text>
            <text x="40" y="360" fill="#B9A46A" fontSize="14" letterSpacing="3">
              BUDGET
            </text>
            <text x="1040" y="70" fill="#77A1FF" fontSize="14" letterSpacing="3">
              FORECAST
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function FloossChapter({ onOpenRole }: { onOpenRole: () => void }) {
  return (
    <section data-chapter="scene-flooss" id="scene-flooss" className="chapter-panel" aria-label="Flooss">
      <div className="composition relative h-full">
        <div
          id="obj-portrait-flooss"
          className="absolute left-0 bottom-0 h-[86%] w-[min(44vw,580px)] z-20 will-change-transform"
        >
          <Image
            src="/portrait/sameer-majeed.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="44vw"
          />
        </div>

        <div
          id="obj-planning"
          className="absolute left-[22%] top-[18%] h-[50%] w-[32%] z-10 opacity-80 will-change-transform object-scale-short"
        >
          <Image src="/assets/3d/planning-core.webp" alt="" fill className="object-contain" sizes="32vw" />
        </div>

        <div className="absolute right-[clamp(24px,4vw,80px)] top-[max(96px,14svh)] z-30 max-w-[min(36rem,44%)]">
          <p className="type-kicker">06 / PRESENT · 2025 —</p>
          <p className="type-role mt-3">FLOOSS · FP&amp;A MANAGER</p>
          <h2 className="type-section mt-5">
            PLANNING
            <span className="block">WHAT COMES</span>
            <span className="block font-semibold text-[#3D73FF]">NEXT.</span>
          </h2>
          <div className="relative mt-10 border-t border-[#303640]/80 pt-4">
            <span
              id="flooss-rail-dot"
              className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[#3D73FF] shadow-[0_0_12px_#3D73FF]"
            />
            <div className="grid grid-cols-2 gap-4">
              {["PLAN", "FORECAST", "ANALYZE", "REPORT"].map((item) => (
                <div key={item}>
                  <p className="type-kicker text-[#F4F6F8]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenRole}
            className="type-kicker mt-8 w-fit border border-[#3D73FF]/50 px-5 py-3 hover:bg-[#3D73FF]/15"
          >
            VIEW FLOOSS MANDATE ↗
          </button>
        </div>
      </div>
    </section>
  );
}

function PhilosophyChapter() {
  return (
    <section data-chapter="scene-philosophy" id="scene-philosophy" className="chapter-panel" aria-label="Philosophy">
      <div className="composition relative h-full">
        <div className="absolute left-[4%] bottom-0 h-[70%] w-[36%] opacity-[0.14] pointer-events-none">
          <Image
            src="/portrait/sameer-majeed.png"
            alt=""
            fill
            className="object-contain object-bottom mix-blend-luminosity"
            sizes="36vw"
          />
        </div>

        {/* Thin beam — NOT a blue rectangle fill */}
        <div
          id="phil-beam"
          className="absolute left-[12%] top-1/2 h-px w-[55%] origin-left bg-gradient-to-r from-transparent via-[#3D73FF] to-[#77A1FF] opacity-70 shadow-[0_0_12px_#3D73FF]"
        />

        <div
          id="obj-prism-seed"
          className="absolute right-[18%] top-1/2 -translate-y-1/2 h-[28%] w-[22%] opacity-0 will-change-transform"
        >
          <Image src="/assets/3d/analysis-prism.webp" alt="" fill className="object-contain" sizes="22vw" />
        </div>

        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(110px,20svh)] z-20 max-w-[min(44rem,70%)]">
          <p className="type-kicker mb-6">08 — EXECUTIVE PHILOSOPHY</p>
          <h2 className="type-display">
            CLARITY
            <span className="block">BEFORE</span>
            <span id="phil-complexity" className="block font-semibold text-[#F4F6F8]">
              COMPLEXITY.
            </span>
          </h2>
          <p className="type-body mt-8 max-w-lg">
            A career shaped by disciplined reporting, rigorous financial planning and forward-looking analysis.
          </p>
        </div>
      </div>
    </section>
  );
}

function ToolkitChapter({
  active,
  setActive,
}: {
  active: number;
  setActive: (n: number) => void;
}) {
  return (
    <section data-chapter="scene-toolkit" id="scene-toolkit" className="chapter-panel" aria-label="Toolkit">
      <div className="composition relative h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div id="obj-prism" className="relative h-[min(42vh,380px)] w-[min(42vh,380px)] will-change-transform z-10">
            <Image src="/assets/3d/analysis-prism.webp" alt="" fill className="object-contain drop-shadow-[0_0_50px_rgba(61,115,255,0.45)]" sizes="380px" />
          </div>

          {TOOLKIT_SKILLS.map((sk, idx) => (
            <button
              key={sk.id}
              type="button"
              onClick={() => setActive(idx)}
              onMouseEnter={() => setActive(idx)}
              className={`toolkit-node absolute flex items-center gap-2 rounded-lg border bg-[#0D1015]/85 px-2.5 py-2 backdrop-blur-md transition-all ${
                active === idx ? "border-[#3D73FF] scale-105 z-30" : "border-[#303640]/70 z-20"
              }`}
              style={{ left: `${sk.x}%`, top: `${sk.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="relative h-10 w-10 shrink-0">
                <Image src={sk.asset} alt="" fill className="object-contain" sizes="40px" />
              </span>
              <span className="hidden text-[10px] font-mono font-semibold tracking-wider lg:inline">{sk.name}</span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-[6%] left-1/2 z-40 max-w-xl -translate-x-1/2 rounded-full border border-[#303640]/60 bg-[#0D1015]/90 px-5 py-2.5 text-center backdrop-blur-md">
          <span className="type-kicker mr-2">{TOOLKIT_SKILLS[active].name}:</span>
          <span className="text-xs text-[#F4F6F8] font-light">{TOOLKIT_SKILLS[active].desc}</span>
        </div>
      </div>
    </section>
  );
}

function CredentialsChapter({
  certificates,
  onOpen,
}: {
  certificates: CertificateData[];
  onOpen: (cert: CertificateData, idx: number) => void;
}) {
  return (
    <section data-chapter="scene-credentials" id="scene-credentials" className="chapter-panel" aria-label="Credentials">
      <div className="composition relative h-full">
        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(96px,16svh)] z-20 max-w-[min(40rem,50%)]">
          <p className="type-kicker">10 — CREDENTIALS</p>
          <h2 className="type-section mt-4">
            CREDENTIALS
            <span className="block font-semibold text-[#3D73FF]">&amp; FELLOWSHIPS</span>
          </h2>
        </div>

        <div className="absolute bottom-[12%] left-[36%] right-[4%] top-[22%] flex items-center justify-center" style={{ perspective: "1400px" }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
            <div className="relative h-[55%] w-[55%]">
              <Image src="/assets/3d/credential-pedestal.webp" alt="" fill className="object-contain" sizes="40vw" />
            </div>
          </div>

          {certificates.map((cert, idx) => (
            <button
              key={cert.id}
              id={`cert-${idx}`}
              type="button"
              onClick={() => onOpen(cert, idx)}
              className="absolute aspect-[3/4] h-[min(58vh,520px)] rounded-lg border border-[#303640] bg-[#0D1015] p-2 shadow-2xl will-change-transform"
              style={{
                transform: `translateX(${idx === 0 ? 0 : idx === 1 ? 28 : 48}%) scale(${idx === 0 ? 1 : 0.72})`,
                opacity: idx === 0 ? 1 : idx < 3 ? 0.55 : 0.2,
                zIndex: 30 - idx,
              }}
            >
              <span className="relative block h-full w-full overflow-hidden rounded">
                <Image src={cert.img} alt={cert.alt} fill className="object-contain" sizes="30vw" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactChapter() {
  return (
    <section data-chapter="scene-contact" id="scene-contact" className="chapter-panel" aria-label="Contact">
      <div className="composition relative h-full">
        <div
          id="obj-portrait-contact"
          className="absolute right-0 bottom-0 h-[90%] w-[42%] opacity-25 will-change-transform"
        >
          <Image
            src="/portrait/sameer-majeed.png"
            alt=""
            fill
            className="object-contain object-bottom mix-blend-luminosity"
            sizes="42vw"
          />
        </div>

        <div className="absolute left-[clamp(24px,4vw,80px)] top-[max(110px,18svh)] z-20 max-w-[min(40rem,55%)]">
          <p className="type-kicker mb-4">11 — CONNECT</p>
          <h2 className="type-display">
            LET&apos;S
            <span className="block font-semibold text-[#3D73FF]">CONNECT.</span>
          </h2>
          <span
            id="contact-underline"
            className="mt-4 block h-0.5 w-48 origin-left scale-x-0 bg-[#3D73FF] shadow-[0_0_12px_#3D73FF]"
          />
          <p className="mt-8 text-xl font-medium">Sameer Majeed</p>
          <p className="type-kicker mt-2 text-[#AAB1BC]">FP&amp;A MANAGER · RIYADH</p>
          <a
            href="mailto:sameerpk_majeed@hotmail.com"
            className="mt-8 inline-block font-mono text-[clamp(1.1rem,1.8vw,1.6rem)] text-[#F4F6F8] hover:text-[#3D73FF]"
          >
            sameerpk_majeed@hotmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/sameer-majeed-aca-fipa-ffa-85a38969/"
            target="_blank"
            rel="noreferrer"
            className="type-kicker mt-4 w-fit text-[#3D73FF]"
          >
            LINKEDIN ↗
          </a>
        </div>
      </div>
    </section>
  );
}
