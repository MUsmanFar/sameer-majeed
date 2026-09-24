"use client";

import Image from "next/image";
import { useRef } from "react";
import { getRole, JOURNEY } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChapterFrame, ChapterShell } from "../ChapterFrame";
import { CompanyLogo } from "../CompanyLogo";
import { isDesktop, prefersReducedMotion, useChapterMotion } from "../useChapterMotion";

const STATIONS = [
  {
    id: "varioline" as const,
    index: "01",
    category: "HEAD OF ACCOUNTS",
    line: "Where hands-on accounts became a foundation.",
    asset: "/assets/3d/control-blocks.png",
  },
  {
    id: "zoom-deputy" as const,
    index: "02",
    category: "DEPUTY MANAGER FINANCE",
    line: "Cash, compliance, and operational control.",
    asset: "/assets/3d/control-engine.webp",
  },
  {
    id: "zoom-manager" as const,
    index: "03",
    category: "MANAGER ACCOUNTS & FINANCE",
    line: "Wider responsibility across the finance function.",
    asset: "/assets/3d/cashflow-core.webp",
  },
];

type Props = { ready?: boolean };

export function Control({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copy = JOURNEY.chapters.control;

  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track || !ready) return;
      if (prefersReducedMotion() || !isDesktop()) return;

      const total = () => Math.max(0, track.scrollWidth - Math.min(window.innerWidth, 1248) + 32);
      gsap.to(track, {
        x: () => -total(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.6, total())}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <ChapterShell id="ch-control" ref={rootRef} tone="light" className="overflow-hidden">
      <div className="arch-atmosphere" aria-hidden="true" />
      <ChapterFrame
        chapter={copy.tag}
        label="Chapter 03 — Built through experience."
        aside="2017 — 2021"
        footerLeft="Accounting → Financial Control"
        nextHint={`${copy.bridge} ↓`}
      >
        <h2 className="arch-display mb-3 max-w-3xl text-[clamp(1.8rem,4.8vw,3.2rem)]" data-rise>
          {copy.title} <em className="arch-italic">{copy.italic}</em>
        </h2>
        <p className="mb-8 max-w-2xl text-muted" data-reveal>
          {copy.story}
        </p>

        <div ref={trackRef} className="flex w-max flex-col gap-6 md:flex-row md:gap-5">
          {STATIONS.map((station) => {
            const role = getRole(station.id)!;
            return (
              <article
                key={station.id}
                className="arch-station w-[min(88vw,26rem)] shrink-0 md:w-[min(70vw,28rem)]"
                data-reveal
              >
                <div className="arch-asset relative mb-5 aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={station.asset}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="420px"
                  />
                </div>
                <CompanyLogo src={role.logo} alt={role.company} className="mb-4 items-start" />
                <div className="flex items-center justify-between gap-3">
                  <p className="arch-station__index">
                    {station.index} · {station.category}
                  </p>
                  <p className="arch-meta">{role.yearLabel}</p>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight">
                  {role.company}
                </h3>
                <p className="mt-2 text-muted">{station.line}</p>
                <p className="mt-3 text-sm text-forest">{role.role}</p>
                <p className="arch-meta mt-2">
                  {role.location} · {role.period}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="arch-bullet">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </ChapterFrame>
    </ChapterShell>
  );
}
