"use client";

import Image from "next/image";
import { useRef } from "react";
import { getRole, JOURNEY } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { CompanyLogo } from "../CompanyLogo";
import { prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

type Props = { ready?: boolean };

export function Flooss({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const role = getRole("flooss")!;
  const copy = JOURNEY.chapters.flooss;

  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      gsap.fromTo(
        root.querySelectorAll(".flooss-node"),
        { scale: 0.5, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 55%",
            end: "center 30%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <ChapterShell id="ch-flooss" ref={rootRef} tone="dark">
      <div className="arch-atmosphere arch-atmosphere--dark" aria-hidden="true" />
      <ChapterFrame
        chapter={copy.tag}
        label="Chapter 06 — Experience, reimagined in fintech."
        aside={role.period}
        tone="dark"
        footerLeft="FP&A → Fintech"
        nextHint={`${copy.bridge} ↓`}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="arch-meta !text-brass" data-reveal>
              THE SIGNATURE CHAPTER
            </p>
            <h2 className="arch-display mt-3 text-[clamp(1.9rem,5vw,3.6rem)] text-paper" data-rise>
              {copy.title} <em className="arch-italic">{copy.italic}</em>
            </h2>
            <p className="mt-4 max-w-xl text-paper/65" data-reveal>
              {copy.story}
            </p>
            <div className="mt-5" data-reveal>
              <CompanyLogo src={role.logo} alt={role.company} className="items-start" />
            </div>
            <p className="mt-5 font-display text-2xl text-paper" data-reveal>
              {role.company}
            </p>
            <p className="text-brass" data-reveal>
              {role.role}
            </p>

            <svg
              className="mt-8 h-32 w-full max-w-lg"
              viewBox="0 0 360 140"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M40 70 L120 40 L200 90 L280 35 L330 70"
                stroke="#5B8DEF"
                strokeWidth="1"
                opacity="0.8"
              />
              {[
                [40, 70],
                [120, 40],
                [200, 90],
                [280, 35],
                [330, 70],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  className="flooss-node"
                  cx={x}
                  cy={y}
                  r="5"
                  fill={i === 4 ? "#8EB0F0" : "#FFFFFF"}
                />
              ))}
            </svg>

            <ul className="mt-4 space-y-3">
              {role.responsibilities.map((item) => (
                <li key={item} className="arch-bullet !text-paper/80" data-reveal>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="arch-asset relative aspect-[4/3] w-full overflow-hidden border-paper/20" data-reveal>
              <Image
                src="/assets/3d/erp-network.webp"
                alt="Fintech network visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
            <div
              className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden border border-paper/20"
              data-reveal
            >
              <Image
                src="/portrait/sameer-majeed.png"
                alt="Sameer Majeed"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
