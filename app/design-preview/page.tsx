import React from "react";
import type { Metadata } from "next";
import { Screen01Opening } from "@/components/preview/Screen01Opening";
import { Screen02Hero } from "@/components/preview/Screen02Hero";
import { Screen03Journey } from "@/components/preview/Screen03Journey";
import { Screen04FPA } from "@/components/preview/Screen04FPA";
import { Screen05Flooss } from "@/components/preview/Screen05Flooss";
import { Screen06Credentials } from "@/components/preview/Screen06Credentials";
import { Screen07Contact } from "@/components/preview/Screen07Contact";

export const metadata: Metadata = {
  title: "Design Preview — High-End Art Direction | Sameer Majeed",
  description:
    "High-end static desktop compositions for executive review prior to animation development.",
};

export default function DesignPreviewPage() {
  const screens = [
    { id: "screen-01", label: "01", title: "Opening" },
    { id: "screen-02", label: "02", title: "Hero" },
    { id: "screen-03", label: "03", title: "Experience" },
    { id: "screen-04", label: "04", title: "FP&A Chart" },
    { id: "screen-05", label: "05", title: "Flooss / Present" },
    { id: "screen-06", label: "06", title: "Credentials" },
    { id: "screen-contact", label: "Contact", title: "Let's Connect" },
  ];

  return (
    <div className="relative w-full bg-[#111513] text-[#F5F2EA] min-h-screen">
      {/* Floating Screen Jumper */}
      <nav
        aria-label="Screen Jumper"
        className="fixed top-6 right-8 z-50 flex items-center gap-1.5 bg-[#111513]/90 backdrop-blur-md border border-[#F5F2EA]/20 px-3.5 py-2 shadow-2xl rounded-full"
      >
        <span className="text-[10px] font-mono tracking-widest text-[#B8A06A] mr-2 uppercase font-bold">
          Preview
        </span>
        {screens.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={`${s.label}: ${s.title}`}
            className="px-2.5 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold transition hover:bg-[#B8A06A] hover:text-[#111513] text-[#F5F2EA]/85 border border-transparent hover:border-[#B8A06A]"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* Screen 01: Opening */}
      <Screen01Opening />

      {/* Screen 02: Hero */}
      <Screen02Hero />

      {/* Screen 03: Experience Career Path */}
      <Screen03Journey />

      {/* Screen 04: Strategic FP&A Editorial Visualization */}
      <Screen04FPA />

      {/* Screen 05: Flooss Present Leadership */}
      <Screen05Flooss />

      {/* Screen 06: Credentials Editorial Gallery */}
      <Screen06Credentials />

      {/* Contact: Final Chapter */}
      <Screen07Contact />
    </div>
  );
}
