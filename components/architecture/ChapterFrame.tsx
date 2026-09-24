"use client";

import { forwardRef, type ReactNode } from "react";

type FrameProps = {
  chapter: string;
  label: string;
  aside?: string;
  nextHint?: string;
  tone?: "light" | "dark" | "paper";
  children: ReactNode;
  footerLeft?: string;
  className?: string;
};

export function ChapterFrame({
  chapter,
  label,
  aside,
  nextHint,
  tone = "light",
  children,
  footerLeft,
  className = "",
}: FrameProps) {
  const dark = tone === "dark";

  return (
    <div className={`arch-stage ${className}`}>
      <div className="arch-stage__eyebrow flex flex-wrap items-start justify-between gap-3">
        <div data-reveal>
          <p className={`arch-kicker ${dark ? "!text-brass" : ""}`}>{chapter}</p>
          <p
            className={`mt-2 max-w-xl font-display text-[clamp(1.05rem,2.2vw,1.4rem)] leading-snug ${
              dark ? "text-paper/80" : "text-charcoal/75"
            }`}
          >
            {label}
          </p>
        </div>
        {aside ? (
          <p className={`arch-meta shrink-0 ${dark ? "!text-paper/45" : ""}`} data-reveal>
            {aside}
          </p>
        ) : null}
      </div>

      <div className="arch-stage__main">{children}</div>

      <div
        className={`arch-stage__footer flex flex-wrap items-end justify-between gap-3 border-t pt-4 ${
          dark ? "border-paper/15" : "border-line"
        }`}
      >
        <p className={`arch-meta ${dark ? "!text-paper/40" : ""}`} data-reveal>
          {footerLeft ?? "Architecture of Financial Clarity"}
        </p>
        {nextHint ? (
          <p className={`arch-meta ${dark ? "!text-brass" : "text-forest"}`} data-reveal>
            {nextHint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

const TONE = {
  light: "bg-ivory text-charcoal",
  paper: "bg-paper text-charcoal",
  dark: "bg-ink text-paper arch-chapter--ink",
} as const;

type ShellProps = {
  id: string;
  tone?: keyof typeof TONE;
  children: ReactNode;
  className?: string;
};

export const ChapterShell = forwardRef<HTMLElement, ShellProps>(function ChapterShell(
  { id, tone = "light", children, className = "" },
  ref,
) {
  return (
    <section id={id} ref={ref} className={`arch-chapter relative ${TONE[tone]} ${className}`}>
      {children}
    </section>
  );
});
