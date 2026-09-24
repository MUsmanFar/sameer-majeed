"use client";

import type { RefObject } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktop() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 901px)").matches;
}

/**
 * Usman-inspired chapter motion:
 * - blur / rise reveals
 * - SplitText line masks on [data-split]
 * - image soft scrub / parallax
 * - bullet cascade
 * - clip mask on [data-mask]
 */
export function useChapterMotion(
  rootRef: RefObject<HTMLElement | null>,
  options?: {
    ready?: boolean;
    /** @deprecated kept for older chapter files */
    scrubSelector?: string;
    scrubFrom?: gsap.TweenVars;
    scrubTo?: gsap.TweenVars;
  },
) {
  const ready = options?.ready ?? true;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready) return;
      const reduce = prefersReducedMotion();

      if (reduce) {
        gsap.set(
          root.querySelectorAll(
            "[data-reveal], [data-rise], [data-image], [data-bullet], [data-split], [data-mask]",
          ),
          {
            autoAlpha: 1,
            clearProps: "all",
          },
        );
        return;
      }

      const reveals = root.querySelectorAll("[data-reveal]");
      if (reveals.length) {
        gsap.fromTo(
          reveals,
          { autoAlpha: 0, y: 28, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const rises = root.querySelectorAll("[data-rise]");
      if (rises.length) {
        gsap.fromTo(
          rises,
          { autoAlpha: 0, y: 72, rotateX: 10 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.09,
            ease: "power3.out",
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: root,
              start: "top 74%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const splits = root.querySelectorAll("[data-split]");
      splits.forEach((el) => {
        if (!SplitText) return;
        const split = SplitText.create(el, {
          type: "words,lines",
          linesClass: "split-line",
          mask: "lines",
        });
        gsap.from(split.words, {
          yPercent: 120,
          autoAlpha: 0,
          duration: 1.05,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const masks = root.querySelectorAll("[data-mask]");
      if (masks.length) {
        gsap.fromTo(
          masks,
          { clipPath: "inset(12% 12% 12% 12%)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const bullets = root.querySelectorAll("[data-bullet]");
      if (bullets.length) {
        gsap.fromTo(
          bullets,
          { autoAlpha: 0, x: -18 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 66%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const images = root.querySelectorAll("[data-image]");
      if (images.length) {
        gsap.fromTo(
          images,
          { autoAlpha: 0, y: 48, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          },
        );

        images.forEach((img) => {
          gsap.fromTo(
            img,
            { y: 22 },
            {
              y: -22,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
      }

      const rule = root.querySelector("[data-rule]");
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "top 40%",
              scrub: 0.45,
            },
          },
        );
      }
    },
    {
      scope: rootRef,
      dependencies: [ready],
      revertOnUpdate: true,
    },
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  import("@/lib/lenis").then(({ getLenis }) => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { duration: 1.45, offset: -8 });
    else el.scrollIntoView({ behavior: "smooth" });
  });
}

/** Magnetic hover for CTAs — Usman energy */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.28,
  enabled = true,
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !enabled || prefersReducedMotion()) return;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [enabled, strength], revertOnUpdate: true },
  );
}
