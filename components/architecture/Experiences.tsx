"use client";

import Image from "next/image";
import { useRef } from "react";
import { getRole } from "@/lib/career-data";
import { gsap, useGSAP } from "@/lib/gsap";
import { CompanyLogo } from "./CompanyLogo";
import { prefersReducedMotion } from "./useChapterMotion";

type Props = { ready?: boolean };

export const EXPERIENCES = [
  {
    id: "ch-foundation",
    index: "01",
    roleId: "hassan",
    asset: "/assets/3d/audit-core.webp",
    assetAlt: "Audit foundation",
    headline: "Before the forecast,",
    italic: "the foundation.",
    story:
      "Audit associateship at Hassan Naeem & Co (UHY) formed the discipline behind every later close, control, and forecast.",
  },
  {
    id: "ch-varioline",
    index: "02",
    roleId: "varioline",
    asset: "/assets/3d/control-blocks.png",
    assetAlt: "Accounts control",
    headline: "From ledgers to",
    italic: "ownership.",
    story:
      "Head of Accounts at Varioline Services — interpreting numbers, closing cycles, and running the Oracle ERP stack.",
  },
  {
    id: "ch-zoom-deputy",
    index: "03",
    roleId: "zoom-deputy",
    asset: "/assets/3d/control-engine.webp",
    assetAlt: "Finance control engine",
    headline: "Cash, compliance,",
    italic: "and control.",
    story:
      "Deputy Manager Finance at Zoom Marketing Oils — OGRA pricing, banking facilities, tax, and SAP Business One.",
  },
  {
    id: "ch-zoom-manager",
    index: "04",
    roleId: "zoom-manager",
    asset: "/assets/3d/cashflow-core.webp",
    assetAlt: "Cashflow leadership",
    headline: "Wider scope across",
    italic: "the function.",
    story:
      "Manager Accounts & Finance — stakeholder management and regulatory responsibility across the finance function.",
  },
  {
    id: "ch-saudi",
    index: "05",
    roleId: "najm",
    asset: "/assets/3d/riyadh-destination.webp",
    assetAlt: "Riyadh reporting",
    headline: "Riyadh.",
    italic: "Reporting with purpose.",
    story:
      "Najm Company for Insurance Services — management reporting layered monthly, quarterly, and annual under IFRS.",
  },
  {
    id: "ch-fpa",
    index: "06",
    roleId: "alrajhi",
    asset: "/assets/3d/planning-core.webp",
    assetAlt: "FP&A planning",
    headline: "From explaining the past",
    italic: "to planning ahead.",
    story:
      "Al Rajhi Bank — budgets, forecasts, variance narratives, risk flags, and Power BI dashboards.",
  },
  {
    id: "ch-flooss",
    index: "07",
    roleId: "flooss",
    asset: "/assets/3d/erp-network.webp",
    assetAlt: "Fintech FP&A",
    headline: "Finance at the",
    italic: "speed of fintech.",
    story:
      "Flooss — reporting cadence, planning cycles, KPIs, and performance clarity inside a fintech environment.",
  },
] as const;

/** Sticky experiences — ClarityArc-proven pin + left/right crossfade */
export function Experiences({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".exp-panel"));
      const assets = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".exp-asset"));
      const dots = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".exp-dot"));
      if (!panels.length) return;

      gsap.set(panels, { autoAlpha: 0, y: 28 });
      gsap.set(assets, { autoAlpha: 0, scale: 0.94 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      if (assets[0]) gsap.set(assets[0], { autoAlpha: 1, scale: 1 });
      dots[0]?.classList.add("is-active");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * panels.length * 0.9)}`,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                panels.length - 1,
                Math.floor(self.progress * panels.length + 0.001),
              );
              dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
              const counter = root.querySelector(".exp-counter");
              if (counter) {
                counter.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
              }
            },
          },
        });

        panels.forEach((_, i) => {
          if (i === 0) return;
          tl.to(panels[i - 1], { autoAlpha: 0, y: -36, duration: 0.45, ease: "power2.inOut" }, i)
            .to(assets[i - 1], { autoAlpha: 0, scale: 0.92, duration: 0.45, ease: "power2.inOut" }, i)
            .to(panels[i], { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, i)
            .to(assets[i], { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" }, i);
        });

        const fill = root.querySelector(".exp-progress-fill");
        if (fill) {
          tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: panels.length }, 0);
        }
      });

      mm.add("(max-width: 900px)", () => {
        gsap.set(panels, { clearProps: "all" });
        gsap.set(assets, { clearProps: "all" });
        panels.forEach((panel, i) => {
          gsap.fromTo(
            [panel, assets[i]].filter(Boolean),
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-foundation"
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#f4f7fb]"
      aria-label="Experience chapters"
    >
      {EXPERIENCES.slice(1).map((exp) => (
        <div
          key={exp.id}
          id={exp.id}
          className="pointer-events-none absolute h-px w-px opacity-0"
          aria-hidden
        />
      ))}

      <div className="flex min-h-[100svh] flex-col">
        <div className="flex items-center justify-between border-b border-line/70 px-5 py-4 md:px-10 lg:px-14">
          <div>
            <p className="arch-kicker">EXPERIENCE</p>
            <p className="mt-1 font-display text-lg tracking-[-0.02em] text-charcoal">
              Seven chapters. One arc.
            </p>
          </div>
          <p className="exp-counter arch-meta text-forest">01 / 07</p>
        </div>

        <div className="relative grid flex-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative px-5 py-8 md:px-10 lg:px-14 lg:py-10">
            <div className="absolute bottom-10 left-8 top-10 hidden w-px bg-line lg:block">
              <div className="exp-progress-fill h-full w-full origin-top scale-y-0 bg-forest" />
            </div>

            <div className="relative min-h-[24rem] lg:min-h-[28rem] lg:pl-8">
              {EXPERIENCES.map((exp, i) => {
                const role = getRole(exp.roleId)!;
                return (
                  <div
                    key={exp.id}
                    className={`exp-panel ${
                      i === 0
                        ? "relative"
                        : "mt-16 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:flex-col lg:justify-center"
                    } ${i === 0 ? "lg:flex lg:h-full lg:flex-col lg:justify-center" : ""}`}
                  >
                    <ExperienceCopy exp={exp} role={role} />
                    {/* Mobile 3D under each chapter */}
                    <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-ink lg:hidden">
                      <Image
                        src={exp.asset}
                        alt={exp.assetAlt}
                        fill
                        className="object-contain mix-blend-screen p-8"
                        sizes="90vw"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden items-center justify-center overflow-hidden bg-ink lg:flex">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,111,209,0.28),transparent_60%)]" />
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.asset}
                className="exp-asset absolute inset-0 flex items-center justify-center p-12 xl:p-16"
              >
                <div className="relative aspect-square w-full max-w-[28rem]">
                  <Image
                    src={exp.asset}
                    alt={exp.assetAlt}
                    fill
                    className="object-contain mix-blend-screen drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    sizes="480px"
                  />
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex gap-2">
                {EXPERIENCES.map((exp) => (
                  <span key={exp.id} className="exp-dot h-1.5 w-1.5 rounded-full bg-paper/25" />
                ))}
              </div>
              <p className="text-[0.62rem] tracking-[0.2em] text-paper/35">3D · CHAPTER ASSET</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCopy({
  exp,
  role,
}: {
  exp: (typeof EXPERIENCES)[number];
  role: NonNullable<ReturnType<typeof getRole>>;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="arch-kicker">{exp.index} / EXPERIENCE</p>
        <p className="arch-meta">{role.period}</p>
      </div>

      <div className="mt-5">
        <CompanyLogo src={role.logo} alt={role.company} className="items-start" />
      </div>

      <h2 className="arch-display mt-6 max-w-[16ch] text-[clamp(1.85rem,4vw,3rem)] leading-[0.95]">
        {exp.headline} <em className="arch-italic">{exp.italic}</em>
      </h2>

      <div className="mt-5 border-l-2 border-forest/30 pl-4">
        <p className="font-display text-[clamp(1.2rem,2.2vw,1.55rem)] leading-tight">
          {role.company}
        </p>
        <p className="mt-1 text-forest">{role.role}</p>
        <p className="arch-meta mt-2">{role.location}</p>
      </div>

      <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted">{exp.story}</p>

      <ul className="mt-6 max-h-[28vh] space-y-2.5 overflow-y-auto border-t border-line pt-4 pr-2 lg:max-h-[32vh]">
        {role.responsibilities.slice(0, 5).map((item, ri) => (
          <li key={item} className="flex gap-3 text-[0.86rem] leading-snug text-[#2a3a4d]">
            <span className="shrink-0 font-display text-forest/45">
              {String(ri + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
        {role.responsibilities.length > 5 ? (
          <li className="arch-meta !normal-case tracking-[0.08em] text-muted">
            +{role.responsibilities.length - 5} more in this chapter
          </li>
        ) : null}
      </ul>
    </>
  );
}
