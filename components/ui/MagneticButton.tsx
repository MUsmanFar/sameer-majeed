"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP, ScrollToPlugin } from "@/lib/gsap";
import { cx } from "@/lib/cx";

gsap.registerPlugin(ScrollToPlugin);

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function MagneticButton({ children, className, href, onClick, type = "button" }: Props) {
  const root = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (reduce || !fine) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = contextSafe!((event: Event) => {
        const e = event as MouseEvent;
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.32);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.32);
      });

      const onLeave = contextSafe!(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root },
  );

  const classes = cx(
    "inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.26em] uppercase",
    className,
  );

  const handleHash = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href?.startsWith("#")) {
      onClick?.();
      return;
    }
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, { duration: 1.15, scrollTo: { y: target, offsetY: 0 }, ease: "power3.inOut" });
    }
    onClick?.();
  };

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        ref={root as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onClick={handleHash}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={root as React.RefObject<HTMLButtonElement>}
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
