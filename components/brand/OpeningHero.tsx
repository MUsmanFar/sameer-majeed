"use client";

import { useRef } from "react";
import Image from "next/image";
import { profile } from "@/lib/career";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

function HeroCopy() {
  return (
    <>
      <p className="kicker">FP&A Manager</p>
      <p className="mt-2 kicker text-forest/60">Riyadh, Saudi Arabia</p>
      <h1 className="display-lg mt-7">
        Financial
        <span className="block">
          <span className="serif-italic font-normal">clarity</span> for
        </span>
        <span className="block">better decisions.</span>
      </h1>
      <div className="mt-8 hidden lg:block">
        <p className="text-lg font-medium">{profile.name}</p>
        <p className="mt-2 kicker text-forest/60">ACA · FIPA · FFA</p>
      </div>
      <p className="mt-6 max-w-xs text-sm leading-relaxed text-text/65">
        10+ years across
        <span className="mt-1 block">Audit · Accounting · Finance · FP&A</span>
      </p>
      <div className="mt-10">
        <MagneticButton href="#journey" className="text-forest">
          <span className="border-b border-forest/35 pb-1">Explore experience</span>
        </MagneticButton>
      </div>
    </>
  );
}

export function Opening() {
  return (
    <section className="stage stage-ink lg:hidden" aria-label="Opening">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="portrait-mask relative h-full w-[min(78vw,920px)]">
          <Image
            src={profile.portrait}
            alt=""
            fill
            priority
            sizes="80vw"
            className="object-cover object-top opacity-85"
          />
        </div>
      </div>
      <div className="relative flex h-[100dvh] flex-col justify-between px-[clamp(1.1rem,4.5vw,4rem)] pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-24">
        <div className="flex flex-1 flex-col justify-center">
          <p className="display-name">Sameer</p>
          <p className="display-name mt-[-0.06em] text-right">Majeed</p>
          <div className="mt-8 flex items-end justify-between gap-8">
            <p className="kicker text-brass">
              FP&A
              <span className="mt-2 block">Manager</span>
            </p>
            <p className="max-w-[16rem] text-right text-[clamp(1.05rem,4vw,1.35rem)] leading-[1.15]">
              Numbers explain.
              <span className="serif-italic mt-1 block text-[1.2em] text-ivory/80">Strategy decides.</span>
            </p>
          </div>
        </div>
        <p className="kicker text-ivory/45">
          Scroll to discover
          <span className="ml-3">↓</span>
        </p>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section id="hero" className="stage stage-ivory lg:hidden" aria-label="Sameer Majeed">
      <div className="px-[clamp(1.1rem,4.5vw,4rem)] pt-24">
        <p className="text-2xl font-semibold tracking-[-0.04em]">{profile.name}</p>
        <p className="mt-2 kicker text-forest/55">ACA · FIPA · FFA</p>
      </div>
      <div className="photo-plate relative mt-6 h-[70dvh]">
        <Image
          src={profile.portrait}
          alt="Portrait of Sameer Majeed, Chartered Accountant and FP&A Manager"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="relative z-10 flex flex-col justify-end px-[clamp(1.1rem,4.5vw,4rem)] pb-12 pt-8">
        <HeroCopy />
      </div>
    </section>
  );
}

export function Arrival() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      if (reduce || !desktop || !root.current) return;

      const q = gsap.utils.selector(root);
      const portrait = q("[data-portrait]")[0];
      const plane = q("[data-plane]")[0];

      gsap.set(q("[data-hero-copy]"), { autoAlpha: 0, y: 28 });
      gsap.set(plane, { autoAlpha: 0, x: 36 });
      gsap.set(portrait, { clipPath: "inset(0% 28% 0% 28%)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(q("[data-bg]"), { backgroundColor: "#F1EEE6", duration: 0.55 }, 0)
        .to(q("[data-name-sameer]"), { xPercent: -22, opacity: 0, duration: 0.7 }, 0)
        .to(q("[data-name-majeed]"), { xPercent: 22, opacity: 0, duration: 0.7 }, 0)
        .to(q("[data-open-meta]"), { autoAlpha: 0, y: -16, duration: 0.45 }, 0)
        .to(portrait, { clipPath: "inset(0% 0% 0% 40%)", duration: 1 }, 0)
        .to(portrait, { y: 18, duration: 1 }, 0)
        .to(plane, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.18)
        .to(q("[data-hero-copy]"), { autoAlpha: 1, y: 0, duration: 0.55 }, 0.38);

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=170%",
        onUpdate: (self) => {
          document.documentElement.dataset.theme = self.progress > 0.45 ? "light" : "dark";
        },
      });
    },
    { scope: root },
  );

  return (
    <div id="opening">
      <Opening />
      <Hero />

      <section
        ref={root}
        className="relative hidden h-[100dvh] overflow-clip lg:block"
        aria-label="Sameer Majeed"
      >
        <div data-bg className="absolute inset-0 bg-ink" />
        <div
          data-plane
          className="geo-plane pointer-events-none absolute right-[30%] top-[10%] h-[72dvh] w-[min(36vw,520px)] origin-top-right rotate-[-9deg] opacity-0"
          aria-hidden="true"
        />
        <div data-portrait className="pointer-events-none absolute inset-0">
          <Image
            src={profile.portrait}
            alt="Portrait of Sameer Majeed, Chartered Accountant and FP&A Manager"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between px-[clamp(1.1rem,4.5vw,4rem)] pb-8 pt-24">
          <div className="flex flex-1 flex-col justify-center">
            <p data-name-sameer className="display-name text-ivory">
              Sameer
            </p>
            <p data-name-majeed className="display-name mt-[-0.06em] text-right text-ivory">
              Majeed
            </p>
            <div data-open-meta className="mt-10 flex items-end justify-between gap-8">
              <p className="kicker text-brass">
                FP&A
                <span className="mt-2 block">Manager</span>
              </p>
              <p className="max-w-[18rem] text-right text-[clamp(1.1rem,1.8vw,1.45rem)] leading-[1.15] text-ivory">
                Numbers explain.
                <span className="serif-italic mt-1 block text-[1.2em] text-ivory/80">Strategy decides.</span>
              </p>
            </div>
          </div>
          <p data-open-meta className="kicker text-ivory/45">
            Scroll to discover
            <span className="ml-3">↓</span>
          </p>
        </div>

        <div
          data-hero-copy
          className="absolute inset-y-0 left-0 z-20 flex max-w-[46%] flex-col justify-end px-[clamp(1.1rem,4.5vw,4rem)] pb-16 pt-24 text-text opacity-0"
        >
          <HeroCopy />
        </div>
      </section>
    </div>
  );
}
