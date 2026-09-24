"use client";

import Image from "next/image";
import { useRef } from "react";
import { getRole, JOURNEY } from "@/lib/career-data";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { CompanyLogo } from "../CompanyLogo";
import { useChapterMotion } from "../useChapterMotion";

const LAYERS = [
  { label: "MONTHLY", note: "Management statements" },
  { label: "QUARTERLY", note: "Performance reviews" },
  { label: "ANNUAL", note: "Year-end close" },
] as const;

type Props = { ready?: boolean };

export function Saudi({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const role = getRole("najm")!;
  const copy = JOURNEY.chapters.saudi;

  useChapterMotion(rootRef, { ready, scrubSelector: ".saudi-layer" });

  return (
    <ChapterShell id="ch-saudi" ref={rootRef} tone="paper">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter={copy.tag}
        label="Chapter 04 — A new beginning in Saudi Arabia."
        aside="2021"
        footerLeft="Control → Reporting"
        nextHint={`${copy.bridge} ↓`}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="arch-asset relative mb-6 aspect-[16/10] w-full" data-reveal>
              <Image
                src="/assets/3d/riyadh-destination.webp"
                alt="Riyadh destination visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
            <div className="arch-asset relative mb-6 aspect-[16/10] w-full" data-reveal>
              <Image
                src="/assets/3d/budget-stack.webp"
                alt="Reporting layers visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
            <p className="arch-display text-[clamp(2.6rem,8vw,4.5rem)] text-forest" data-rise>
              RIYADH
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-tight" data-reveal>
              {copy.title} <em className="arch-italic">{copy.italic}</em>
            </h2>
            <p className="mt-4 max-w-md text-muted" data-reveal>
              {copy.story}
            </p>
            <div className="mt-5" data-reveal>
              <CompanyLogo src={role.logo} alt={role.company} className="items-start" />
            </div>
            <p className="mt-5 font-display text-xl" data-reveal>
              {role.company}
            </p>
            <p className="text-forest" data-reveal>
              {role.role}
            </p>
            <p className="arch-meta mt-2" data-reveal>
              {role.period}
            </p>

            <div className="mt-6 space-y-3">
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.label}
                  className="saudi-layer flex flex-wrap items-center gap-3 border-l-2 border-brass pl-4"
                  style={{ marginLeft: `${i * 0.5}rem` }}
                  data-reveal
                >
                  <span className="arch-meta text-forest">{layer.label}</span>
                  <span className="hidden h-px flex-1 bg-line sm:block" />
                  <span className="text-[0.72rem] text-muted">{layer.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal>
            <p className="arch-meta mb-4">Responsibilities →</p>
            <ul className="space-y-3">
              {role.responsibilities.map((item) => (
                <li key={item} className="arch-bullet">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
