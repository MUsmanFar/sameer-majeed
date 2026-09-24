"use client";

import { useRef } from "react";
import { PROFILE } from "@/lib/career-data";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "../MagneticButton";
import { prefersReducedMotion, scrollToId, useChapterMotion, useMagnetic } from "../useChapterMotion";

type Props = { ready?: boolean };

export function Contact({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);

  useChapterMotion(rootRef, { ready });
  useMagnetic(mailRef, 0.32, ready);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready || prefersReducedMotion()) return;

      gsap.fromTo(
        root.querySelector(".contact-rule"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 35%",
            scrub: 0.5,
          },
        },
      );

      const headline = root.querySelector(".contact-headline");
      if (headline && SplitText) {
        const split = SplitText.create(headline, {
          type: "words,lines",
          linesClass: "split-line",
          mask: "lines",
        });
        gsap.from(split.words, {
          yPercent: 110,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.045,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      id="ch-contact"
      ref={rootRef}
      className="arch-chapter--screen relative overflow-hidden bg-ink text-paper arch-chapter--ink"
    >
      <div className="pointer-events-none absolute -right-1/4 top-0 h-[60vmin] w-[60vmin] rounded-full bg-[#2f6fd1]/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(91,141,239,0.12),transparent_45%)]" />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col">
        <div className="flex items-center justify-between px-5 pt-6 md:px-10 lg:px-14">
          <p className="arch-kicker !text-brass" data-reveal>
            05 / THE NEXT CHAPTER
          </p>
          <p className="arch-meta !text-paper/40" data-reveal>
            LET&apos;S BUILD SOMETHING
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 py-16 md:px-10 lg:px-14">
          <div className="contact-rule h-px w-20 origin-left bg-brass" />
          <h2 className="contact-headline arch-display mt-8 max-w-4xl text-[clamp(2.4rem,7vw,5rem)] leading-[0.94] text-paper">
            Your next <em className="arch-italic">great move.</em>
          </h2>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-paper/55" data-reveal>
            Good work starts with a conversation — numbers, decisions, and direction.
          </p>

          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <a
              ref={mailRef}
              href={`mailto:${PROFILE.email}`}
              className="arch-cta !border-paper !bg-paper !text-ink hover:!border-brass hover:!bg-brass"
            >
              Get in touch ↗
            </a>
            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="arch-cta arch-cta--link !text-brass hover:!text-paper"
            >
              LinkedIn ↗
            </a>
          </div>

          <p className="arch-meta mt-8 !text-paper/35" data-reveal>
            {PROFILE.email}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-paper/10 px-5 py-4 md:px-10 lg:px-14">
          <MagneticButton
            variant="link"
            className="!text-brass hover:!text-paper"
            onClick={() => scrollToId("ch-ledger")}
          >
            Back to the entrance ↑
          </MagneticButton>
          <p className="text-[0.62rem] tracking-[0.2em] text-paper/30">© 2026 SAMEER MAJEED</p>
        </div>
      </div>
    </section>
  );
}
