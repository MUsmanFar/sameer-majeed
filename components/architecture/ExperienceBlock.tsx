"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CareerRole } from "@/lib/career-data";
import { CompanyLogo } from "./CompanyLogo";
import { useChapterMotion } from "./useChapterMotion";

type Props = {
  id: string;
  index: string;
  role: CareerRole;
  asset: string;
  assetAlt: string;
  headline: string;
  italic?: string;
  story: string;
  tone?: "light" | "paper";
  ready?: boolean;
};

export function ExperienceBlock({
  id,
  index,
  role,
  asset,
  assetAlt,
  headline,
  italic,
  story,
  tone = "light",
  ready = true,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  useChapterMotion(rootRef, { ready });

  const bg = tone === "paper" ? "bg-[#eef2f8]" : "bg-[#f7f9fc]";

  return (
    <section id={id} ref={rootRef} className={`relative overflow-hidden py-16 md:py-24 ${bg}`}>
      <div className="pointer-events-none absolute right-0 top-0 font-display text-[clamp(8rem,28vw,18rem)] leading-none tracking-[-0.06em] text-forest/[0.04]">
        {index}
      </div>

      <div className="relative mx-auto w-[min(100%-2rem,72rem)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4" data-reveal>
          <p className="arch-kicker">{index} / EXPERIENCE</p>
          <p className="arch-meta">{role.period}</p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <div data-reveal>
              <CompanyLogo src={role.logo} alt={role.company} className="items-start" />
            </div>

            <h2
              className="arch-display mt-8 max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)] leading-[0.95]"
              data-split
            >
              {headline}
              {italic ? (
                <>
                  {" "}
                  <em className="arch-italic">{italic}</em>
                </>
              ) : null}
            </h2>

            <div className="mt-6 border-l-2 border-forest/30 pl-4" data-reveal>
              <p className="font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-tight text-charcoal">
                {role.company}
              </p>
              <p className="mt-1 text-[0.95rem] text-forest">{role.role}</p>
              <p className="arch-meta mt-2">{role.location}</p>
            </div>

            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-muted" data-reveal>
              {story}
            </p>

            <div
              className="relative mt-8 aspect-[5/4] w-full max-w-md overflow-hidden border border-line bg-white"
              data-image
              data-mask
            >
              <Image
                src={asset}
                alt={assetAlt}
                fill
                className="object-contain p-5"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>
          </div>

          <div className="lg:pt-2">
            <div className="flex items-end justify-between gap-3" data-reveal>
              <p className="arch-meta">Responsibilities</p>
              <p className="text-[0.62rem] tracking-[0.16em] text-muted">
                {String(role.responsibilities.length).padStart(2, "0")} ITEMS →
              </p>
            </div>
            <ul className="mt-5 divide-y divide-line border-t border-line">
              {role.responsibilities.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 py-3.5 text-[0.92rem] leading-relaxed text-[#2a3a4d]"
                  data-bullet
                >
                  <span className="mt-0.5 shrink-0 font-display text-sm text-forest/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
