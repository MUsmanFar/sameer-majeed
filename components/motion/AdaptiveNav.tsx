"use client";

import React, { useState } from "react";

interface AdaptiveNavProps {
  activeSection: string;
  isLightMode?: boolean;
}

export function AdaptiveNav({ activeSection }: AdaptiveNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const chapters = [
    { id: "scene-entry", num: "00", name: "INTRO" },
    { id: "scene-hero", num: "01", name: "SAMEER" },
    { id: "scene-foundation", num: "02", name: "FOUNDATION" },
    { id: "scene-control", num: "03", name: "CONTROL" },
    { id: "scene-riyadh", num: "04", name: "RIYADH" },
    { id: "scene-reporting", num: "05", name: "REPORTING" },
    { id: "scene-fpa", num: "06", name: "FP&A" },
    { id: "scene-flooss", num: "07", name: "FLOOSS" },
    { id: "scene-philosophy", num: "08", name: "PHILOSOPHY" },
    { id: "scene-toolkit", num: "09", name: "TOOLKIT" },
    { id: "scene-credentials", num: "10", name: "CREDENTIALS" },
    { id: "scene-contact", num: "11", name: "CONTACT" },
  ];

  const currentChapter = chapters.find((c) => c.id === activeSection) || chapters[0];
  const isEntry = activeSection === "scene-entry";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-14 py-4 text-[#F4F6F8] select-none transition-all duration-500 ease-out ${
        isEntry
          ? "opacity-100 translate-y-0 pointer-events-auto bg-[#050608]/70 backdrop-blur-md"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!isEntry}
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF]" />
        <a
          href="#scene-entry"
          className="text-xs font-bold tracking-[0.22em] text-[#F4F6F8] uppercase hover:text-[#3D73FF] transition-colors"
        >
          SAMEER MAJEED
        </a>
        <span className="hidden sm:inline text-xs text-[#303640] font-mono">/</span>
        <span className="hidden sm:inline text-xs font-mono text-[#AAB1BC] tracking-wider">
          FP&amp;A MANAGER · RIYADH
        </span>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          data-cursor="open"
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#303640]/80 bg-[#0D1015]/80 text-xs font-mono text-[#F4F6F8] hover:border-[#3D73FF] transition-all duration-300"
        >
          <span className="text-[#3D73FF] font-bold">{currentChapter.num} / 11</span>
          <span className="tracking-wider uppercase font-semibold">{currentChapter.name}</span>
          <span className="text-[10px] text-[#AAB1BC]">▾</span>
        </button>

        <nav
          aria-label="Chapter Menu"
          className={`absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#303640] bg-[#0D1015]/95 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 origin-top-right ${
            isExpanded
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {chapters.map((c) => {
            const isActive = c.id === activeSection;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={() => setIsExpanded(false)}
                className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${
                  isActive
                    ? "bg-[#245BFF] text-[#F4F6F8] font-bold shadow-[0_0_12px_rgba(36,91,255,0.4)]"
                    : "text-[#AAB1BC] hover:bg-[#171B22] hover:text-[#F4F6F8]"
                }`}
              >
                <span>{c.name}</span>
                <span className="opacity-50">{c.num}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
