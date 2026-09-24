"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "./useChapterMotion";

type Props = { ready?: boolean };

const STAGES = [
  {
    num: "01",
    chapter: "CHAPTER 01 — The foundation",
    label: "AUDIT / FOUNDATION / DISCIPLINE",
    title: "Start with",
    italic: "the numbers that hold.",
    body: "Understand the business, test the controls, and build the habit of reading statements without noise.",
    steps: ["AUDIT", "CLOSE", "CONTROL"],
  },
  {
    num: "02",
    chapter: "CHAPTER 02 — Ownership",
    label: "OWN / INTERPRET / LEAD",
    title: "Build with",
    italic: "ownership.",
    body: "Turn ledgers into decisions — cash, compliance, ERP, and the people who keep the cycle moving.",
    steps: ["OWN", "INTERPRET", "LEAD"],
  },
  {
    num: "03",
    chapter: "CHAPTER 03 — Looking ahead",
    label: "REPORT / FORECAST / GUIDE",
    title: "Make the",
    italic: "plan count.",
    body: "Budgets, variance narratives, and dashboards that help leadership move with clarity.",
    steps: ["REPORT", "FORECAST", "GUIDE"],
  },
] as const;

/** Usman-style pinned process — giant index + editorial copy rail */
export function ClarityArc({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".arc-panel"));
      if (!panels.length) return;

      gsap.set(panels, { autoAlpha: 0, y: 28 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 2.6)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          tl.to(
            panels[i - 1],
            { autoAlpha: 0, y: -36, duration: 0.4, ease: "power2.inOut" },
            i,
          ).to(panel, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, i);
        });

        const fill = root.querySelector(".arc-progress-fill");
        const counter = root.querySelector(".arc-counter");
        if (fill) {
          tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: panels.length }, 0);
        }
        if (counter) {
          tl.to(
            {},
            {
              duration: panels.length,
              ease: "none",
              onUpdate() {
                const idx = Math.min(
                  panels.length - 1,
                  Math.floor(this.progress() * panels.length),
                );
                counter.textContent = String(idx + 1).padStart(2, "0");
              },
            },
            0,
          );
        }
      });

      mm.add("(max-width: 900px)", () => {
        gsap.set(panels, { clearProps: "all" });
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-arc"
      ref={rootRef}
      className="arch-chapter--screen relative overflow-hidden bg-[#f4f7fb]"
      aria-label="The way I work"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_15%,rgba(91,141,239,0.1),transparent_50%),radial-gradient(ellipse_40%_35%_at_10%_80%,rgba(30,77,140,0.06),transparent_45%)]" />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col">
        <div className="flex items-end justify-between gap-4 border-b border-line/70 px-5 py-5 md:px-10 lg:px-14">
          <div>
            <p className="arch-kicker">THE WAY I WORK</p>
            <p className="mt-2 font-display text-[clamp(1.1rem,2.2vw,1.45rem)] tracking-[-0.02em] text-charcoal">
              One idea. A connected journey.
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="arch-meta">
              STAGE <span className="arc-counter text-forest">01</span> / 03
            </p>
            <div className="mt-2 h-px w-36 overflow-hidden bg-line">
              <div className="arc-progress-fill h-full w-full origin-left scale-x-0 bg-forest" />
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-5 py-10 md:px-10 lg:px-14">
          {STAGES.map((stage, i) => (
            <div
              key={stage.num}
              className={`arc-panel ${
                i === 0
                  ? "relative grid items-center gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12 xl:gap-16"
                  : "mt-16 grid items-center gap-6 lg:absolute lg:inset-x-0 lg:inset-y-0 lg:mt-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12 xl:gap-16"
              }`}
            >
              <div className="relative">
                <p
                  className="font-display text-[clamp(6rem,22vw,14rem)] leading-[0.8] tracking-[-0.05em] text-forest/[0.12]"
                  aria-hidden="true"
                >
                  {stage.num}
                </p>
                <p className="arch-meta absolute bottom-2 left-1 text-forest/70 md:bottom-4">
                  {stage.chapter}
                </p>
              </div>

              <div className="max-w-xl lg:pt-6">
                <p className="arch-meta">{stage.label}</p>
                <h2 className="arch-display mt-4 text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.95] text-charcoal">
                  {stage.title}
                  <br />
                  <em className="arch-italic">{stage.italic}</em>
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-muted">{stage.body}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {stage.steps.map((step, si) => (
                    <span
                      key={step}
                      className="inline-flex items-center gap-2 border border-line bg-white/70 px-3 py-2 text-[0.65rem] tracking-[0.16em] text-forest backdrop-blur-sm"
                    >
                      <span className="text-muted">0{si + 1}</span>
                      {step}
                      <span className="text-muted">↗</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line/70 px-5 py-4 md:px-10 lg:px-14">
          <p className="text-[0.68rem] tracking-[0.12em] text-muted">
            THE PLAN. THE BUILD. THE DELIVERY.
          </p>
          <p className="text-[0.68rem] tracking-[0.14em] text-forest">
            NEXT: THE EXPERIENCE ↓
          </p>
        </div>
      </div>
    </section>
  );
}
