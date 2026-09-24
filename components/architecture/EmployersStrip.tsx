"use client";

import { useRef } from "react";
import { EMPLOYERS } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { CompanyLogo } from "./CompanyLogo";
import { prefersReducedMotion, useChapterMotion } from "./useChapterMotion";

type Props = { ready?: boolean };

export function EmployersStrip({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;
      gsap.fromTo(
        root.querySelectorAll(".emp-logo"),
        { autoAlpha: 0, y: 28, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-employers"
      ref={rootRef}
      className="relative border-y border-line bg-white py-14 md:py-16"
      aria-label="Employers"
    >
      <div className="mx-auto w-[min(100%-2rem,72rem)]">
        <div className="flex flex-wrap items-end justify-between gap-3" data-reveal>
          <div>
            <p className="arch-kicker">Employers</p>
            <p className="mt-2 font-display text-[clamp(1.3rem,2.5vw,1.7rem)] tracking-[-0.02em]">
              Six chapters of work
            </p>
          </div>
          <p className="arch-meta">2014 — Present</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {EMPLOYERS.map((emp, i) => (
            <div
              key={emp.id}
              className="emp-logo group border border-line bg-[#f7f9fc] px-3 py-4 transition-colors duration-300 hover:border-forest/40 hover:bg-white"
            >
              <p className="mb-3 text-[0.58rem] tracking-[0.18em] text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <CompanyLogo src={emp.logo} alt={emp.name} caption={emp.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
