"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "./MagneticButton";
import { prefersReducedMotion, scrollToId, useChapterMotion } from "./useChapterMotion";

type Props = { ready?: boolean };

export function ExperienceGate({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  useChapterMotion(rootRef, { ready });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      const headline = root.querySelector(".gate-headline");
      if (headline && SplitText) {
        const split = SplitText.create(headline, {
          type: "words,lines",
          linesClass: "gate-line",
          mask: "lines",
        });
        gsap.from(split.words, {
          yPercent: 110,
          autoAlpha: 0,
          duration: 1.05,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.fromTo(
        ".gate-orb",
        { scale: 0.75, autoAlpha: 0.25 },
        {
          scale: 1.2,
          autoAlpha: 0.55,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-gate"
      ref={rootRef}
      className="arch-chapter--screen relative overflow-hidden bg-ink text-paper arch-chapter--ink"
    >
      <div className="gate-orb pointer-events-none absolute left-1/2 top-[42%] h-[min(80vw,36rem)] w-[min(80vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f6fd1]/20 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(91,141,239,0.1),transparent_40%)]" />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col">
        <div className="flex items-center justify-between px-5 pt-6 md:px-10 lg:px-14">
          <p className="arch-kicker !text-brass" data-reveal>
            02 / SELECTED EXPERIENCE
          </p>
          <p className="arch-meta !text-paper/40" data-reveal>
            2014 — PRESENT
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
          <p className="arch-meta !text-paper/45" data-reveal>
            IDEAS, OUT IN THE LEDGER
          </p>

          <h2 className="gate-headline arch-display mt-6 max-w-4xl text-[clamp(2.6rem,8vw,5.8rem)] leading-[0.92] text-paper">
            Enter the <em className="arch-italic">experience.</em>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-relaxed text-paper/55" data-reveal>
            Seven chapters. One connected vision — from audit floors in Lahore to FP&amp;A in
            Riyadh.
          </p>

          <div className="mt-10 flex items-center gap-3" data-reveal>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span
                key={n}
                className="h-1.5 w-1.5 rounded-full bg-brass/70"
                style={{ opacity: 0.35 + n * 0.08 }}
              />
            ))}
          </div>

          <p className="arch-meta mt-8 !text-paper/35" data-reveal>
            7 STORIES · ONE ARC
          </p>

          <div className="mt-12 space-y-5" data-reveal>
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.1rem)] text-paper/90">
              Are you <em className="arch-italic">ready?</em>
            </p>
            <MagneticButton
              className="!border-paper !bg-paper !text-ink hover:!border-brass hover:!bg-brass"
              onClick={() => scrollToId("ch-foundation")}
            >
              Let&apos;s get into it ↓
            </MagneticButton>
          </div>
        </div>

        <div className="flex justify-between border-t border-paper/10 px-5 py-4 md:px-10 lg:px-14">
          <p className="text-[0.62rem] tracking-[0.2em] text-paper/35">THE COLLECTION</p>
          <p className="text-[0.62rem] tracking-[0.2em] text-paper/35">SCROLL TO EXPLORE →</p>
        </div>
      </div>
    </section>
  );
}
