"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = { onComplete: () => void };

/** Usman-style “setting the scene” preloader — blue/white brand */
export function BriefPreloader({ onComplete }: Props) {
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

      gsap.set(".scene-progress-fill", { scaleX: 0, transformOrigin: "left center" });

      tl.fromTo(
        ".scene-corner",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05 },
      )
        .fromTo(
          ".scene-mark",
          { autoAlpha: 0, scale: 0.92, y: 12 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.65 },
          "-=0.15",
        )
        .fromTo(
          ".scene-line-a",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.25",
        )
        .fromTo(
          ".scene-line-b",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.2",
        )
        .to(".scene-progress-fill", { scaleX: 1, duration: 1.05, ease: "power2.inOut" }, "-=0.15")
        .to(
          root,
          {
            autoAlpha: 0,
            duration: 0.55,
            delay: 0.2,
            ease: "power2.inOut",
          },
        );
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] bg-ink text-paper"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="scene-corner text-[0.65rem] tracking-[0.22em] text-paper/70 opacity-0">
            SAMEER MAJEED
          </p>
          <p className="scene-corner text-[0.65rem] tracking-[0.22em] text-paper/70 opacity-0">
            FINANCIAL CLARITY / 2026
          </p>
        </div>

        <div className="mx-auto w-full max-w-md text-center">
          <p className="scene-mark font-display text-[clamp(2.8rem,10vw,4.5rem)] tracking-[-0.04em] text-brass opacity-0">
            SM
          </p>
          <p className="scene-line-a mt-5 text-[0.78rem] tracking-[0.08em] text-paper/75 opacity-0">
            A little anticipation.
          </p>
          <p className="scene-line-b mt-2 font-display text-[clamp(1.15rem,3vw,1.55rem)] italic text-paper opacity-0">
            Something beyond the ordinary.
          </p>
          <div className="mx-auto mt-8 h-px w-full max-w-[14rem] overflow-hidden bg-paper/15">
            <div className="scene-progress-fill h-full w-full origin-left bg-brass" />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="scene-corner text-[0.65rem] tracking-[0.22em] text-paper/55 opacity-0">
            SETTING THE SCENE
          </p>
          <span className="scene-corner h-1.5 w-1.5 rounded-full bg-brass opacity-0" />
        </div>
      </div>
    </div>
  );
}
