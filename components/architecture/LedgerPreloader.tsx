"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  onComplete: () => void;
};

const LEDGER_ROWS = [
  { year: "2014", term: "AUDIT" },
  { year: "2017", term: "ACCOUNTS" },
  { year: "2021", term: "REPORTING" },
  { year: "2023", term: "FP&A" },
  { year: "2025", term: "FLOOSS" },
];

export function LedgerPreloader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete,
      });

      tl.fromTo(".ledger-veil", { autoAlpha: 1 }, { autoAlpha: 0.35, duration: 0.5 })
        .fromTo(
          ".ledger-grid line",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.55, stagger: 0.025 },
          "-=0.2",
        )
        .fromTo(
          ".ledger-row",
          { autoAlpha: 0, x: -16 },
          { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.1 },
          "-=0.15",
        )
        .fromTo(
          ".ledger-tagline",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          "+=0.12",
        )
        .fromTo(
          ".ledger-name",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          "+=0.15",
        )
        .to(root, { autoAlpha: 0, duration: 0.6, delay: 0.4 });
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink text-paper"
      aria-hidden="true"
    >
      <div className="ledger-veil absolute inset-0 bg-ink" />
      <div className="arch-atmosphere arch-atmosphere--dark absolute inset-0" />

      <svg
        className="ledger-grid pointer-events-none absolute inset-0 h-full w-full opacity-45"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(i + 1) * 8}
            x2="100"
            y2={(i + 1) * 8}
            stroke="#2F5D50"
            strokeWidth="0.08"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i + 1) * 12}
            y1="0"
            x2={(i + 1) * 12}
            y2="100"
            stroke="#C4A574"
            strokeWidth="0.06"
            opacity="0.5"
          />
        ))}
      </svg>

      <div className="relative z-10 w-[min(92vw,30rem)] px-4">
        <p className="arch-kicker mb-3 text-brass">Setting the scene</p>
        <p className="mb-8 font-display text-[clamp(1.2rem,3vw,1.6rem)] text-paper/75">
          A little anticipation. <em className="italic text-brass">Something beyond the ordinary.</em>
        </p>
        <div className="space-y-3 border-y border-brass/30 py-5">
          {LEDGER_ROWS.map((row) => (
            <div
              key={row.year}
              className="ledger-row flex items-baseline justify-between gap-4 opacity-0"
            >
              <span className="font-display text-2xl text-paper/90">{row.year}</span>
              <span className="text-[0.7rem] tracking-[0.28em] text-forest">{row.term}</span>
            </div>
          ))}
        </div>
        <p className="ledger-tagline mt-8 text-center text-[0.68rem] tracking-[0.22em] text-brass opacity-0">
          PRECISION IN NUMBERS. CLARITY IN DECISIONS.
        </p>
        <h1 className="ledger-name mt-5 text-center font-display text-[clamp(2rem,8vw,3.5rem)] tracking-[-0.03em] text-paper opacity-0">
          SAMEER MAJEED
        </h1>
      </div>
    </div>
  );
}
