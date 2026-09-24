"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const PATHS = {
  ledger:
    "M40,80 C120,40 200,120 280,70 C360,20 440,100 520,60 C600,20 680,90 760,50",
  control:
    "M40,100 C140,100 160,40 300,40 C420,40 460,120 560,100 C660,80 700,100 760,100",
  riyadh:
    "M40,120 C100,40 180,40 240,90 C300,140 380,30 460,70 C540,110 620,40 760,80",
  chart:
    "M40,140 C120,110 180,120 260,70 C340,40 440,90 540,40 C620,20 700,55 760,30",
  network:
    "M80,100 C160,40 200,160 300,80 C400,20 420,140 520,70 C620,20 680,120 720,60",
  constellation:
    "M60,90 C120,40 180,110 280,50 C380,20 460,100 560,40 C640,20 700,85 740,45",
};

export type ContinuityMode = keyof typeof PATHS;

type Props = {
  mode: ContinuityMode;
};

export function ContinuityLine({ mode }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || modeRef.current === mode) {
      path.setAttribute("d", PATHS[mode]);
      modeRef.current = mode;
      return;
    }

    gsap
      .timeline()
      .to(path, { autoAlpha: 0.15, duration: 0.25 })
      .add(() => {
        path.setAttribute("d", PATHS[mode]);
      })
      .to(path, { autoAlpha: 1, duration: 0.35 });

    modeRef.current = mode;
  }, [mode]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[18%] z-[5] hidden h-[28vh] opacity-30 md:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 800 160" className="h-full w-full" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d={PATHS.ledger}
          fill="none"
          stroke="#2F5D50"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
