"use client";

import Image from "next/image";
import { useRef } from "react";
import { PROFILE } from "@/lib/career-data";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { useChapterMotion } from "../useChapterMotion";

const STATEMENTS = [
  {
    title: "CLARITY",
    body: "Numbers only matter when they make decisions simpler.",
  },
  {
    title: "DISCIPLINE",
    body: "Controls, close cycles, and reporting cadence create trust.",
  },
  {
    title: "FORESIGHT",
    body: "Budgets and forecasts turn history into direction.",
  },
];

type Props = { ready?: boolean };

export function Philosophy({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  useChapterMotion(rootRef, { ready });

  return (
    <ChapterShell id="ch-philosophy" ref={rootRef} tone="light">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter="09 / THE PERSON BEHIND THE NUMBERS"
        label="Chapter 10 — Operating principles."
        aside="Editorial"
        footerLeft="Not personal quotes"
        nextHint="PHILOSOPHY → SUMMARY ↓"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div
            className="relative mx-auto hidden aspect-[3/4] w-full max-w-xs overflow-hidden opacity-85 lg:block"
            data-reveal
          >
            <Image
              src="/portrait/sameer-majeed.png"
              alt=""
              fill
              className="object-cover object-top grayscale"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ivory" />
          </div>

          <div>
            <h2 className="arch-display text-[clamp(1.8rem,4.5vw,3rem)]" data-rise>
              Hard work. <em className="arch-italic">Trust.</em> Accountability.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted" data-reveal>
              {PROFILE.about}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {STATEMENTS.map((s) => (
                <article key={s.title} data-reveal>
                  <p className="arch-kicker">{s.title}</p>
                  <p className="mt-3 font-display text-[clamp(1.15rem,2.2vw,1.45rem)] leading-snug">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
