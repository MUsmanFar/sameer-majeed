"use client";

import Image from "next/image";
import { useRef } from "react";
import { getRole, JOURNEY } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { CompanyLogo } from "../CompanyLogo";
import { prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

type Props = { ready?: boolean };

export function Foundation({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const role = getRole("hassan")!;
  const copy = JOURNEY.chapters.foundation;

  useChapterMotion(rootRef, { ready, scrubSelector: ".foundation-term" });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;
      gsap.fromTo(
        root.querySelector(".foundation-line"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 65%",
            end: "center 40%",
            scrub: 0.55,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <ChapterShell id="ch-foundation" ref={rootRef} tone="paper">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter={copy.tag}
        label="Chapter 02 — From Pakistan to financial discipline."
        aside={role.period}
        footerLeft="Audit · ISA · IFRS"
        nextHint={`${copy.bridge} ↓`}
      >
        <h2 className="arch-display max-w-3xl text-[clamp(1.9rem,5vw,3.6rem)]" data-rise>
          {copy.title} <em className="arch-italic">{copy.italic}</em>
        </h2>
        <div className="foundation-line mt-5 h-px w-full origin-left bg-forest" />
        <p className="mt-5 max-w-2xl leading-relaxed text-muted" data-reveal>
          {copy.story}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2" data-reveal>
              <div className="arch-asset relative aspect-[4/3] w-full">
                <Image
                  src="/assets/3d/lahore-origin.webp"
                  alt="Lahore origin visual"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 20vw"
                />
              </div>
              <div className="arch-asset relative aspect-[4/3] w-full">
                <Image
                  src="/assets/3d/audit-core.webp"
                  alt="Audit foundation visual"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 20vw"
                />
              </div>
            </div>
            <div data-reveal>
              <CompanyLogo src={role.logo} alt={role.company} className="mb-4 items-start" />
              <p className="arch-meta text-brass">LAHORE, PAKISTAN</p>
              <p className="mt-2 font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight">
                {role.company}
              </p>
              <p className="mt-1 text-forest">{role.role}</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {["ISA", "IFRS", "INTERNAL CONTROLS", "ENGAGEMENT"].map((t) => (
                  <span key={t} className="foundation-term arch-meta text-forest">
                    {t}
                  </span>
                ))}
              </div>
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
