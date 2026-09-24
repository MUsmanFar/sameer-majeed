"use client";

import Image from "next/image";
import { useRef } from "react";
import { getRole, JOURNEY } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { CompanyLogo } from "../CompanyLogo";
import { prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

type Props = { ready?: boolean };

export function FPA({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const role = getRole("alrajhi")!;
  const copy = JOURNEY.chapters.fpa;

  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;
      gsap.fromTo(
        root.querySelectorAll(".fpa-path"),
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "center 35%",
            scrub: 0.55,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <ChapterShell id="ch-fpa" ref={rootRef} tone="light">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter={copy.tag}
        label="Chapter 05 — Planning what comes next."
        aside={role.period}
        footerLeft="Reporting → Planning → FP&A"
        nextHint={`${copy.bridge} ↓`}
      >
        <h2 className="arch-display max-w-3xl text-[clamp(1.7rem,4.6vw,3.2rem)]" data-rise>
          {copy.title} <em className="arch-italic">{copy.italic}</em>
        </h2>
        <p className="mt-4 max-w-2xl text-muted" data-reveal>
          {copy.story}
        </p>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div data-reveal>
            <div className="arch-asset relative mb-6 aspect-[4/3] w-full">
              <Image
                src="/assets/3d/planning-core.webp"
                alt="Planning and forecasting visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <div className="arch-asset relative mb-6 aspect-[16/9] w-full">
              <Image
                src="/assets/3d/forecasting-curve.webp"
                alt="Forecast curve visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <p className="arch-meta text-brass">RIYADH, SAUDI ARABIA</p>
            <div className="mt-3">
              <CompanyLogo src={role.logo} alt={role.company} className="items-start" />
            </div>
            <p className="mt-3 font-display text-[clamp(1.4rem,3vw,2rem)]">{role.company}</p>
            <p className="mt-1 text-forest">{role.role}</p>
            <svg
              className="mt-6 h-28 w-full max-w-md"
              viewBox="0 0 320 100"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="fpa-path"
                d="M10 70 C50 65 70 75 100 55 C130 35 150 50 180 40 C210 30 240 45 310 25"
                stroke="#1E4D8C"
                strokeWidth="1.6"
              />
              <path
                className="fpa-path"
                d="M10 80 C60 78 90 70 130 68 C170 66 210 58 310 45"
                stroke="#5B8DEF"
                strokeWidth="1.3"
                strokeDasharray="4 4"
              />
              <path
                className="fpa-path"
                d="M10 55 C55 50 85 40 120 35 C160 28 220 20 310 12"
                stroke="#0F1C2E"
                strokeWidth="1"
                opacity="0.45"
              />
              <text x="10" y="96" fill="#5A6B7D" fontSize="8" letterSpacing="1.5">
                ACTUAL · BUDGET · FORECAST
              </text>
            </svg>
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
