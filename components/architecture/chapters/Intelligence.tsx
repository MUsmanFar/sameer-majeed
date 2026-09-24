"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { INTELLIGENCE_TERMS, OPERATING_SYSTEM, PROFILE } from "@/lib/career-data";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

type Props = { ready?: boolean };

export function Intelligence({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [termIndex, setTermIndex] = useState(0);

  useChapterMotion(rootRef, { ready });

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setTermIndex((i) => (i + 1) % INTELLIGENCE_TERMS.length);
    }, 1500);
    return () => window.clearInterval(id);
  }, [ready]);

  return (
    <ChapterShell id="ch-intelligence" ref={rootRef} tone="light">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter="07 / FINANCIAL INTELLIGENCE"
        label="Chapter 08 — Clarity before complexity."
        aside="Expertise"
        footerLeft="Operating language"
        nextHint="EXPERTISE → CREDENTIALS ↓"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="arch-meta mb-3" data-reveal>
              Currently cycling
            </p>
            <h2
              className="arch-display text-[clamp(2rem,7vw,4.8rem)] text-charcoal"
              data-rise
              key={INTELLIGENCE_TERMS[termIndex]}
            >
              {INTELLIGENCE_TERMS[termIndex]}
            </h2>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3" data-reveal>
              {OPERATING_SYSTEM.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  <span className="text-[0.78rem] tracking-[0.2em] text-forest">{item}</span>
                  {i < OPERATING_SYSTEM.length - 1 ? (
                    <span className="text-brass" aria-hidden>
                      —
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2" data-reveal>
              {PROFILE.services.map((s) => (
                <span
                  key={s}
                  className="border border-line px-3 py-1.5 text-[0.68rem] tracking-[0.12em] text-muted transition-colors hover:border-forest hover:text-forest"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3" data-reveal>
            <div className="arch-asset relative aspect-square w-full">
              <Image
                src="/assets/3d/analysis-prism.webp"
                alt="Financial analysis prism"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
            <div className="arch-asset relative aspect-[16/10] w-full">
              <Image
                src="/assets/3d/powerbi-prism.webp"
                alt="Power BI dashboard prism"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
