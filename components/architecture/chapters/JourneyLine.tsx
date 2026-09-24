"use client";

import Image from "next/image";
import { useRef } from "react";
import { CONTINUITY_NODES } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

type Props = { ready?: boolean };

export function JourneyLine({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;
      gsap.fromTo(
        root.querySelector(".journey-stroke"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "center 40%",
            scrub: 0.55,
          },
        },
      );
      gsap.fromTo(
        root.querySelectorAll(".journey-node"),
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 55%",
            end: "center 35%",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <ChapterShell id="ch-line" ref={rootRef} tone="paper">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter="10 / THE ARC"
        label="Chapter 11 — One line. Seven stations."
        aside="2014 — Present"
        footerLeft="Audit through Fintech"
        nextHint="SUMMARY → CONTACT ↓"
      >
        <h2 className="arch-display mb-6 text-[clamp(1.8rem,5vw,3.2rem)]" data-rise>
          Grounded in experience. <em className="arch-italic">Looking toward possibility.</em>
        </h2>

        <div className="arch-asset relative mb-8 aspect-[21/8] w-full" data-reveal>
          <Image
            src="/assets/3d/reporting-tower.webp"
            alt="Career arc visual"
            fill
            className="object-cover"
            sizes="68rem"
          />
        </div>

        <div className="journey-stroke mb-10 h-px w-full origin-left bg-forest" />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-5">
          {CONTINUITY_NODES.map((node, i) => (
            <span key={node} className="journey-node flex items-center gap-3">
              <span className="font-display text-[clamp(1.05rem,2.5vw,1.65rem)] tracking-tight">
                {node}
              </span>
              {i < CONTINUITY_NODES.length - 1 ? (
                <span className="text-brass" aria-hidden>
                  →
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
