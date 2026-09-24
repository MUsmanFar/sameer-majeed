"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MotionDebugHud } from "@/components/motion/MotionDebugHud";

interface ChapterDef {
  id: string;
  name: string;
  color: string;
  dist: number; // pixel distance
  subtext: string;
}

const CHAPTERS: ChapterDef[] = [
  { id: "entry", name: "00 — ENTRY", color: "#11141A", dist: 800, subtext: "CAREER ORBIT / PROMPT" },
  { id: "hero", name: "01 — HERO", color: "#161B22", dist: 1200, subtext: "EXECUTIVE PROFILE / PORTRAIT" },
  { id: "foundation", name: "02 — FOUNDATION", color: "#1A202C", dist: 1000, subtext: "AUDIT & ASSURANCE / BIG 4" },
  { id: "control", name: "03 — CONTROL", color: "#13171F", dist: 1000, subtext: "FINANCIAL CONTROLS / RISK" },
  { id: "riyadh", name: "04 — RIYADH", color: "#151C28", dist: 1100, subtext: "REGIONAL HUB / SCALING" },
  { id: "reporting", name: "05 — REPORTING", color: "#182030", dist: 1100, subtext: "MONTHLY / QUARTERLY / ANNUAL" },
  { id: "fpa", name: "06 — FP&A", color: "#111927", dist: 1200, subtext: "FORECASTING / VARIANCE / RUNWAY" },
  { id: "flooss", name: "07 — FLOOSS", color: "#171E2D", dist: 1200, subtext: "FINTECH LEADERSHIP / GROWTH" },
  { id: "philosophy", name: "08 — PHILOSOPHY", color: "#141A24", dist: 900, subtext: "CLARITY IN COMPLEXITY" },
  { id: "toolkit", name: "09 — TOOLKIT", color: "#192233", dist: 1200, subtext: "FINANCIAL STACK CONSTELLATION" },
  { id: "credentials", name: "10 — CREDENTIALS", color: "#151B26", dist: 1400, subtext: "ACA · FIPA · FFA · SOCPA" },
  { id: "contact", name: "11 — CONTACT", color: "#0B0E14", dist: 600, subtext: "EXECUTIVE DIALOGUE / DOSSIER" },
];

export default function MotionTestPage() {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDebug = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("motionDebug") === "1";

  useEffect(() => {
    (window as unknown as { ScrollTrigger?: unknown }).ScrollTrigger = ScrollTrigger;

    // Phase 8: Ensure fonts and layout are settled before calculating triggers
    const initTimelines = async () => {
      await document.fonts.ready;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        CHAPTERS.forEach((ch, idx) => {
          const chapterEl = document.getElementById(`motion-ch-${ch.id}`);
          const stageEl = chapterEl?.querySelector<HTMLElement>(".motion-stage");
          const blockEl = chapterEl?.querySelector<HTMLElement>(".motion-inner-block");
          const coverInEl = chapterEl?.querySelector<HTMLElement>(".motion-cover-in");
          const coverOutEl = chapterEl?.querySelector<HTMLElement>(".motion-cover-out");

          if (!chapterEl || !stageEl) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapterEl,
              start: "top top",
              end: `+=${ch.dist}`,
              pin: stageEl,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: isDebug,
              onEnter: () => setActiveChapter(ch.id),
              onEnterBack: () => setActiveChapter(ch.id),
            },
          });

          // Phase 14: Overlapping transition rule
          // 1. Initial Cover In resolves (if not chapter 0)
          if (coverInEl && idx > 0) {
            tl.fromTo(
              coverInEl,
              { opacity: 1, scale: 1 },
              { opacity: 0, scale: 1.08, duration: 0.25, ease: "power2.out" },
              0
            );
          }

          // 2. Main content transformations (transform + opacity only, Phase 7)
          if (blockEl) {
            tl.fromTo(
              blockEl,
              { y: 60, scale: 0.92, opacity: 0.4 },
              { y: 0, scale: 1.0, opacity: 1.0, duration: 0.4, ease: "power1.out" },
              0.1
            );
            tl.to(
              blockEl,
              { y: -50, scale: 1.06, duration: 0.35, ease: "power1.in" },
              0.55
            );
          }

          // 3. Ending Cover Out seals the viewport for handoff (if not last chapter)
          if (coverOutEl && idx < CHAPTERS.length - 1) {
            const nextCh = CHAPTERS[idx + 1];
            // Set the cover out color to match the next chapter background
            coverOutEl.style.backgroundColor = nextCh.color;

            tl.fromTo(
              coverOutEl,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 0.25, ease: "power2.in" },
              0.75
            );
          }
        });
      });

      // Single initial refresh after frame settlement
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });

      return () => {
        mm.revert();
      };
    };

    void initTimelines();
  }, [isDebug]);

  return (
    <div ref={containerRef} className="w-full bg-[#050608] text-[#F4F6F8] select-none font-mono">
      <MotionDebugHud activeChapter={activeChapter} />

      {/* Persistent Diagnostic Nav */}
      <nav className="fixed top-4 right-4 z-50 bg-[#0D1015]/90 border border-[#303640] px-4 py-3 rounded-lg flex flex-col gap-1 text-xs backdrop-blur-md">
        <div className="text-[#3D73FF] font-bold text-[11px] mb-1 tracking-wider uppercase">
          DIAGNOSTIC STAGES ({CHAPTERS.length})
        </div>
        {CHAPTERS.map((ch) => (
          <div
            key={ch.id}
            className={`flex items-center gap-2 px-2 py-0.5 rounded ${
              activeChapter === ch.id ? "bg-[#245BFF] text-white font-bold" : "text-[#AAB1BC]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{ch.name}</span>
            <span className="text-[10px] opacity-60 ml-auto">+{ch.dist}px</span>
          </div>
        ))}
      </nav>

      {/* Chapters */}
      {CHAPTERS.map((ch, idx) => (
        <section
          key={ch.id}
          id={`motion-ch-${ch.id}`}
          className="relative w-full"
        >
          <div
            className="motion-stage w-full h-[100svh] relative overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: ch.color }}
          >
            {/* Phase 14: Cover In (Starts full opacity if idx > 0, resolves out) */}
            {idx > 0 && (
              <div
                className="motion-cover-in absolute inset-0 z-30 pointer-events-none"
                style={{ backgroundColor: ch.color }}
              />
            )}

            {/* Diagnostic Inner Content Box */}
            <div className="motion-inner-block relative z-10 w-[78vw] max-w-4xl h-[62vh] border-2 border-[#3D73FF]/50 bg-[#0D1015]/80 rounded-xl p-8 flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#303640] pb-4">
                <div className="text-xl font-bold text-[#F4F6F8] tracking-wider">{ch.name}</div>
                <div className="text-xs text-[#3D73FF] font-bold tracking-widest uppercase">
                  SCROLL DISTANCE: {ch.dist}PX
                </div>
              </div>

              <div className="my-auto text-center space-y-3">
                <div className="text-3xl font-black tracking-tight text-[#FFFFFF]">{ch.subtext}</div>
                <div className="text-sm text-[#AAB1BC]">
                  GSAP Pin Stage · Scrub 0.65 · Single Clock · No Sticky · AnticipatePin: 1
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#AAB1BC] border-t border-[#303640] pt-4">
                <span>CHAPTER {idx + 1} OF {CHAPTERS.length}</span>
                <span>ZERO SEAMS · ZERO RE-RENDERS</span>
              </div>
            </div>

            {/* Phase 14: Cover Out (Expands to cover viewport at end) */}
            {idx < CHAPTERS.length - 1 && (
              <div
                className="motion-cover-out absolute inset-0 z-40 opacity-0 pointer-events-none"
              />
            )}
          </div>
        </section>
      ))}

      <footer className="w-full py-16 bg-[#050608] text-center text-xs text-[#AAB1BC] border-t border-[#303640]">
        MOTION DIAGNOSTIC COMPLETE · ALL CHAPTERS UNPINNED
      </footer>
    </div>
  );
}
