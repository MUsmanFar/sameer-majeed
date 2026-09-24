"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CONSTELLATION_YEARS, getRole } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

type Props = { ready?: boolean };

export function Constellation({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: root,
            start: "top 40%",
            end: "bottom 55%",
            scrub: 0.45,
            onUpdate: (self) => {
              const idx = Math.min(
                CONSTELLATION_YEARS.length - 1,
                Math.floor(self.progress * CONSTELLATION_YEARS.length),
              );
              setActive(idx);
            },
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  const current = CONSTELLATION_YEARS[active];
  const role = getRole(current.roleId)!;

  return (
    <ChapterShell id="ch-constellation" ref={rootRef} tone="paper">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter="06 / THE CONNECTED JOURNEY"
        label="Chapter 07 — A career drawn as coordinates."
        aside="2014 → Now"
        footerLeft="Lahore → Riyadh"
        nextHint="EXPERIENCE → EXPERTISE ↓"
      >
        <h2 className="arch-display mb-3 text-[clamp(1.8rem,5vw,3.2rem)]" data-rise>
          Different chapters. <em className="arch-italic">One connected line.</em>
        </h2>
        <p className="mb-8 max-w-xl text-muted" data-reveal>
          Hover or scroll through the years — each point opens the company, role, and place.
        </p>

        <div className="arch-asset relative mb-10 aspect-[21/9] w-full max-w-3xl" data-reveal>
          <Image
            src="/assets/3d/career-orbit.webp"
            alt="Career orbit visual"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 68rem"
          />
        </div>

        <div data-reveal>
          <div className="relative border-t border-line pt-8">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[calc(2rem+5px)] h-px bg-brass/50"
              aria-hidden
            />
            <div className="flex items-start justify-between gap-1">
              {CONSTELLATION_YEARS.map((node, i) => (
                <button
                  key={`${node.year}-${i}`}
                  type="button"
                  className="group flex flex-1 flex-col items-center gap-3"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <span
                    className={`relative z-10 h-3 w-3 rounded-full transition-all duration-300 ${
                      active === i
                        ? "scale-125 bg-forest"
                        : "bg-charcoal/35 group-hover:bg-brass"
                    }`}
                  />
                  <span
                    className={`text-[0.65rem] tracking-[0.16em] ${
                      active === i ? "text-forest" : "text-muted"
                    }`}
                  >
                    {node.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 min-h-[8.5rem] border-l-2 border-brass pl-5 transition-all">
            <p className="arch-meta text-brass">
              {String(active + 1).padStart(2, "0")} / {String(CONSTELLATION_YEARS.length).padStart(2, "0")}
            </p>
            <p className="mt-2 font-display text-[clamp(1.5rem,3.2vw,2.2rem)]">{role.company}</p>
            <p className="mt-1 text-forest">{role.role}</p>
            <p className="arch-meta mt-2">
              {role.location} · {role.period}
            </p>
          </div>
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
