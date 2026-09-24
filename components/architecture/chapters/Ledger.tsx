"use client";

import Image from "next/image";
import { useRef } from "react";
import { PROFILE } from "@/lib/career-data";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "../MagneticButton";
import { prefersReducedMotion, scrollToId } from "../useChapterMotion";

type Props = { ready?: boolean };

export function Ledger({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        root.querySelectorAll("[data-open]"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 },
      );

      const headline = root.querySelector(".open-headline");
      if (headline && SplitText) {
        const split = SplitText.create(headline, {
          type: "words,lines",
          linesClass: "open-line",
          mask: "lines",
        });
        tl.from(
          split.words,
          { yPercent: 120, autoAlpha: 0, duration: 1.05, stagger: 0.045, ease: "power3.out" },
          "-=0.35",
        );
      }

      tl.fromTo(
        ".open-asset-wrap",
        { autoAlpha: 0, y: 40, scale: 0.88, rotate: -6 },
        { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.35, ease: "power3.out" },
        "-=0.75",
      )
        .fromTo(
          ".open-mark",
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.8 },
          "-=0.9",
        )
        .fromTo(
          ".open-cue",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.3",
        );

      gsap.to(".open-asset-wrap", {
        y: -36,
        rotate: 3,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.85,
        },
      });

      gsap.to(".open-asset", {
        y: "+=12",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".open-glow", {
        scale: 1.2,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-ledger"
      ref={rootRef}
      className="arch-chapter arch-chapter--screen relative overflow-hidden bg-ink text-paper arch-chapter--ink"
    >
      <div className="open-glow pointer-events-none absolute right-[5%] top-[20%] h-[55vmin] w-[55vmin] rounded-full bg-[#2f6fd1]/30 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(91,141,239,0.14),transparent_50%)]" />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col">
        <div className="flex items-start justify-between px-5 pt-6 md:px-10 md:pt-8">
          <p className="text-[0.62rem] tracking-[0.28em] text-paper/55" data-open>
            SAMEER MAJEED
          </p>
          <p className="text-[0.62rem] tracking-[0.28em] text-paper/55" data-open>
            FINANCIAL CLARITY / 2026
          </p>
        </div>

        <div className="grid flex-1 items-center gap-8 px-5 py-8 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-4 lg:px-14 xl:pl-20">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3" data-open>
              <span className="open-mark font-display text-3xl tracking-[-0.04em] text-brass md:text-4xl">
                SM
              </span>
              <span className="h-px w-10 bg-brass/50" />
              <span className="text-[0.62rem] tracking-[0.22em] text-paper/45">01 — THE ENTRANCE</span>
            </div>

            <h1 className="open-headline arch-display mt-8 max-w-[14ch] text-[clamp(2.6rem,7.5vw,5.4rem)] text-paper">
              Every journey starts with <em className="arch-italic">a decision.</em>
            </h1>

            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/60" data-open>
              Thoughtfully built. Carefully led.
              <br />
              From audit in Lahore to FP&amp;A in Riyadh.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5" data-open>
              <MagneticButton
                className="!border-paper !bg-paper !text-ink hover:!border-brass hover:!bg-brass"
                onClick={() => scrollToId("ch-hero")}
              >
                Begin the journey ↓
              </MagneticButton>
              <MagneticButton
                variant="link"
                className="!text-brass hover:!text-paper"
                onClick={() => scrollToId("ch-contact")}
              >
                Let&apos;s connect ↗
              </MagneticButton>
            </div>

            <p className="arch-meta mt-8 !text-paper/35" data-open>
              {PROFILE.credentials} · {PROFILE.location.toUpperCase()}
            </p>
          </div>

          {/* Floating 3D — no white panel; screen blend knocks out black plate */}
          <div className="relative flex min-h-[40vh] items-center justify-center lg:min-h-[70vh]">
            <div className="open-asset-wrap relative aspect-square w-full max-w-[28rem] xl:max-w-[34rem]">
              <div className="open-asset absolute inset-0">
                <Image
                  src="/assets/3d/hero-sculpture.png"
                  alt="Financial architecture sculpture"
                  fill
                  className="object-contain mix-blend-screen"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  priority
                />
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-between text-[0.62rem] tracking-[0.2em] text-paper/30 lg:bottom-8">
              <span>3D · ARCHITECTURE</span>
              <span>01 / 13</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-paper/10 px-5 py-4 md:px-10">
          <button
            type="button"
            className="open-cue arch-scroll-cue !text-paper/45 opacity-0"
            onClick={() => scrollToId("ch-hero")}
          >
            Scroll to step inside <span>↓</span>
          </button>
          <p className="text-[0.62rem] tracking-[0.22em] text-paper/35" data-open>
            SETTING THE SCENE
          </p>
        </div>
      </div>
    </section>
  );
}
