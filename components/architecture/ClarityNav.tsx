"use client";

import { useEffect, useState } from "react";
import { CHAPTERS, PROFILE } from "@/lib/career-data";
import { scrollToId } from "./useChapterMotion";

type Props = {
  activeId: string;
  visible: boolean;
};

export function ClarityNav({ activeId, visible }: Props) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(-8px)" }}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto border-b border-line/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3.5 md:px-8">
          <button
            type="button"
          onClick={() => go("ch-ledger")}
          className="font-display text-lg tracking-[-0.02em] text-charcoal"
        >
          SM
          <span className="ml-2 hidden text-sm text-muted sm:inline">
            {PROFILE.name.toUpperCase()}
          </span>
        </button>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Chapters">
            {CHAPTERS.map((ch) => {
              const active = activeId === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => go(ch.id)}
                  className={`px-2 py-1 text-[0.6rem] tracking-[0.14em] transition-colors ${
                    active ? "text-forest" : "text-muted hover:text-charcoal"
                  }`}
                  aria-current={active ? "true" : undefined}
                  title={ch.name}
                >
                  {ch.num}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go("ch-contact")}
              className="arch-cta arch-cta--ghost !min-h-0 !px-3 !py-2 text-[0.62rem]"
            >
              Let&apos;s connect ↗
            </button>
            <button
              type="button"
              className="arch-meta px-2 py-1 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {open ? "Close" : "Menu +"}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-line px-4 py-4 lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => go(ch.id)}
                  className="flex items-center justify-between border border-line px-3 py-2 text-left text-[0.7rem] tracking-[0.12em]"
                >
                  <span>{ch.name}</span>
                  <span className="text-forest">{ch.num}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="h-0.5 w-full bg-line/60" aria-hidden="true">
        <div
          className="h-full bg-forest transition-[width] duration-150"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </div>
    </header>
  );
}
