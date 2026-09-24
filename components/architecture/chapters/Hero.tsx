"use client";

import Image from "next/image";
import { useRef } from "react";
import { PROFILE } from "@/lib/career-data";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "../MagneticButton";
import { prefersReducedMotion, scrollToId } from "../useChapterMotion";

type Props = { ready: boolean };

export function Hero({ ready }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        root.querySelectorAll("[data-hero-reveal]"),
        { autoAlpha: 0, y: 22, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.05 },
      );

      const name = root.querySelector(".hero-name");
      if (name && SplitText) {
        const split = SplitText.create(name, {
          type: "chars,words,lines",
          linesClass: "hero-line",
          mask: "lines",
        });
        tl.from(
          split.chars,
          { yPercent: 120, autoAlpha: 0, duration: 0.9, stagger: 0.018, ease: "power3.out" },
          "-=0.4",
        );
      }

      tl.fromTo(
        ".hero-portrait",
        { autoAlpha: 0, y: 60, clipPath: "inset(12% 0 0 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.25,
          ease: "power3.out",
        },
        "-=0.7",
      ).fromTo(
        ".hero-signal",
        { autoAlpha: 0, y: 40, rotate: -10, scale: 0.9 },
        { autoAlpha: 1, y: 0, rotate: -4, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.85",
      );

      gsap.to(".hero-portrait-img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.85,
        },
      });
      gsap.to(".hero-signal", {
        y: -40,
        rotate: 2,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-hero"
      ref={rootRef}
      className="arch-chapter arch-chapter--screen relative overflow-hidden bg-[#f7f9fc]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(30,77,140,0.07),transparent_55%),radial-gradient(ellipse_45%_40%_at_90%_70%,rgba(91,141,239,0.08),transparent_50%)]" />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col">
        <div className="flex items-center justify-between px-5 pt-6 md:px-10 md:pt-8 lg:px-14">
          <p className="arch-kicker" data-hero-reveal>
            THE PERSON BEHIND THE NUMBERS
          </p>
          <p className="arch-meta" data-hero-reveal>
            {PROFILE.location.toUpperCase()}
          </p>
        </div>

        <div className="grid flex-1 items-end gap-8 px-5 pb-8 pt-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-6 lg:px-14 lg:pb-10 xl:gap-10">
          <div className="relative z-10 max-w-xl pb-4 lg:pb-12">
            <p className="text-[0.65rem] tracking-[0.24em] text-forest" data-hero-reveal>
              IDEAS MEET EXECUTION
            </p>

            <h1 className="hero-name arch-display mt-4 text-[clamp(3.4rem,11vw,7.2rem)] leading-[0.88] text-charcoal">
              Sameer
              <br />
              <em className="arch-italic">Majeed</em>
            </h1>

            <p
              className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-muted"
              data-hero-reveal
            >
              {PROFILE.title}.
              <br />
              {PROFILE.subtitle}.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2" data-hero-reveal>
              {PROFILE.credentials.split(" · ").map((cred) => (
                <span
                  key={cred}
                  className="border border-line px-2.5 py-1 text-[0.62rem] tracking-[0.16em] text-forest"
                >
                  {cred}
                </span>
              ))}
              <span className="arch-meta">10+ YEARS</span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5" data-hero-reveal>
              <MagneticButton onClick={() => scrollToId("ch-arc")}>
                The way I work ↓
              </MagneticButton>
              <MagneticButton variant="link" onClick={() => scrollToId("ch-contact")}>
                A little about me ↗
              </MagneticButton>
            </div>
          </div>

          {/* Dominant visual composition */}
          <div className="hero-compose relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div className="hero-portrait relative aspect-[4/5] w-full overflow-hidden bg-[#dce5f2] sm:aspect-[3/4] lg:ml-auto lg:w-[min(100%,28rem)] xl:w-[32rem]">
              <div className="hero-portrait-img absolute inset-0">
                <Image
                  src="/portrait/sameer-majeed.png"
                  alt="Sameer Majeed"
                  fill
                  className="object-cover object-[center_12%]"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent p-4 md:p-5">
                <p className="text-[0.62rem] tracking-[0.2em] text-paper/90">
                  FP&amp;A · RIYADH
                </p>
              </div>
            </div>

            <div className="hero-signal absolute -bottom-2 -left-3 aspect-square w-[44%] max-w-[12rem] sm:-left-5 sm:bottom-6 sm:w-[40%] lg:-left-10 lg:bottom-8">
              <Image
                src="/assets/3d/foundation-ledger.png"
                alt="Financial clarity signal"
                fill
                className="object-contain drop-shadow-[0_18px_40px_rgba(15,28,46,0.25)]"
                sizes="200px"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line/80 px-5 py-4 md:px-10 lg:px-14">
          <p className="arch-scroll-cue" data-hero-reveal>
            Scroll to step inside <span>↓</span>
          </p>
          <p className="arch-meta" data-hero-reveal>
            WORKING ACROSS BORDERS
          </p>
        </div>
      </div>
    </section>
  );
}
