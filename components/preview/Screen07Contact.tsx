import React from "react";
import Image from "next/image";

export function Screen07Contact() {
  return (
    <section
      id="screen-contact"
      className="relative w-full h-screen overflow-hidden bg-[#111513] text-[#F5F2EA] flex flex-col justify-between p-10 lg:p-14 select-none"
      style={{
        background:
          "linear-gradient(155deg, #13231E 0%, #111513 100%)",
      }}
    >
      {/* Subtle Visual Echo of Sameer at Far-Right Edge (Low Opacity, Non-Intrusive) */}
      <div className="absolute right-0 bottom-0 h-[92%] w-auto pointer-events-none opacity-[0.06] mix-blend-luminosity z-0 flex items-end">
        <Image
          src="/portrait/sameer-majeed.png"
          alt="Visual echo"
          width={600}
          height={800}
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#F5F2EA]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B8A06A]" />
          <span className="text-xs font-semibold tracking-[0.24em] text-[#B8A06A] uppercase">
            Inquiries &amp; Advisory
          </span>
        </div>

        <div className="text-xs font-mono tracking-wider text-[#F5F2EA]/50">
          EXECUTIVE ENGAGEMENT
        </div>
      </header>

      {/* Main Content Area: Dominant "LET'S CONNECT." (40%) + High-Visibility Channels & CTA (60%) */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-10 items-center my-auto py-6">
        {/* Dominant Final Statement (Left 45%) — 30% Larger Scale */}
        <div className="col-span-6 flex flex-col justify-center pr-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold mb-2">
            INITIATE ENGAGEMENT
          </span>

          <h2 className="text-7xl lg:text-[7.5rem] font-light tracking-[-0.04em] text-[#F5F2EA] leading-[0.88]">
            LET&apos;S <br />
            <span className="font-serif italic font-normal text-[#B8A06A]">
              CONNECT.
            </span>
          </h2>
        </div>

        {/* Right Side (55%): High-Importance Email, Channels, and Elegant CTA */}
        <div className="col-span-6 flex flex-col justify-between pl-8 border-l border-[#F5F2EA]/15 space-y-8">
          <div>
            <div className="text-2xl font-bold tracking-tight text-[#F5F2EA]">
              Sameer Majeed
            </div>
            <div className="text-sm font-mono text-[#B8A06A] font-semibold mt-0.5">
              FP&amp;A Manager · Riyadh, Saudi Arabia
            </div>
            <div className="text-xs text-[#F5F2EA]/60 mt-0.5">
              Chartered Accountant · ACA · FIPA · FFA
            </div>
          </div>

          {/* High-Visibility Clickable Email & Direct Channels */}
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.2em] text-[#B8A06A] uppercase block">
              Direct Contact
            </span>
            <a
              href="mailto:sameerpk_majeed@hotmail.com"
              className="block text-2xl lg:text-3xl font-mono font-medium text-[#F5F2EA] hover:text-[#B8A06A] transition-colors break-all"
            >
              sameerpk_majeed@hotmail.com
            </a>

            <a
              href="https://linkedin.com/in/sameer-majeed-aca"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-base font-mono text-[#B8A06A] hover:underline pt-1"
            >
              <span>linkedin.com/in/sameer-majeed-aca</span>
              <span>↗</span>
            </a>
          </div>

          {/* Strong Elevated CTA Button */}
          <div className="pt-2">
            <a
              href="mailto:sameerpk_majeed@hotmail.com?subject=Executive%20FP%26A%20Inquiry"
              className="inline-block px-12 py-5 bg-[#B8A06A] text-[#111513] text-sm font-bold tracking-[0.24em] uppercase transition-colors hover:bg-[#F5F2EA] shadow-2xl"
            >
              START A CONVERSATION
            </a>
          </div>
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-10 border-t border-[#F5F2EA]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#F5F2EA]/50">
        <span>© 2025 SAMEER MAJEED</span>
        <span className="text-[#B8A06A] font-bold">FINAL CHAPTER</span>
      </footer>
    </section>
  );
}
