import React from "react";
import Image from "next/image";

export function Screen02Hero() {
  return (
    <section
      id="screen-02"
      className="relative w-full h-screen overflow-hidden bg-[#F5F2EA] text-[#111513] flex flex-col justify-between p-10 lg:p-14 select-none"
    >
      {/* Top Header — Clean Person & Role */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#111513]/15 pb-4">
        <div className="text-xs font-bold tracking-[0.24em] text-[#345B4B] uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#345B4B]" />
          Executive Profile
        </div>

        <div className="text-xs font-mono tracking-wider text-[#111513]/70">
          RIYADH, SAUDI ARABIA
        </div>
      </header>

      {/* Main Grid: Left Personal Brand Typography + Right Layered Portrait Breaking Bounds */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Immediate Visual Clarity */}
        <div className="col-span-7 flex flex-col justify-center pr-4 max-w-[45vw]">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-10 bg-[#345B4B]" />
            <span className="text-xs font-bold tracking-[0.26em] text-[#345B4B] uppercase">
              FP&amp;A MANAGER
            </span>
          </div>

          {/* Large Authoritative Name */}
          <h2 className="text-7xl lg:text-[5.75rem] font-semibold tracking-[-0.04em] text-[#111513] leading-[0.9]">
            Sameer <br />
            <span className="text-[#13231E]">Majeed</span>
          </h2>

          <p className="text-2xl lg:text-[1.7rem] text-[#111513]/85 font-light leading-snug tracking-tight mt-6 max-w-xl">
            Financial planning and analysis with clarity, discipline and foresight.
          </p>

          {/* Verified Designations */}
          <div className="mt-8 flex items-center gap-3">
            <span className="px-4 py-2 bg-[#13231E] text-[#F5F2EA] text-xs font-bold tracking-[0.2em] uppercase">
              ACA
            </span>
            <span className="px-4 py-2 bg-[#13231E] text-[#F5F2EA] text-xs font-bold tracking-[0.2em] uppercase">
              FIPA
            </span>
            <span className="px-4 py-2 bg-[#13231E] text-[#F5F2EA] text-xs font-bold tracking-[0.2em] uppercase">
              FFA
            </span>
            <span className="text-xs font-mono text-[#111513]/70 ml-2">
              ICAP · IPA Australia · IFA UK
            </span>
          </div>

          {/* Large, Confident Buttons */}
          <div className="mt-10 flex items-center gap-5">
            <a
              href="#screen-03"
              className="px-10 py-4 bg-[#111513] text-[#F5F2EA] text-xs font-bold tracking-[0.24em] uppercase transition-colors hover:bg-[#13231E] shadow-md"
            >
              VIEW EXPERIENCE
            </a>
            <a
              href="#screen-contact"
              className="px-10 py-4 border-2 border-[#111513] text-[#111513] text-xs font-bold tracking-[0.24em] uppercase transition-colors hover:bg-[#111513] hover:text-[#F5F2EA]"
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* Right Column: Natural Layered Depth — Sameer's Silhouette Breaks Plane Bounds */}
        <div className="col-span-5 relative h-full flex items-end justify-center">
          {/* Deep-Green Architectural Plane BEHIND Him (Smaller footprint so body visibly overlaps outside) */}
          <div
            className="absolute bottom-0 right-4 w-[74%] h-[78%] bg-[#13231E] rounded-t-[2px] shadow-2xl z-10"
            style={{
              boxShadow: "0 30px 60px -15px rgba(19, 35, 30, 0.45)",
            }}
          >
            {/* Elegant thin champagne border accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8A06A]" />
            <div className="absolute top-4 right-4 text-[10px] tracking-[0.25em] text-[#B8A06A]/40 font-mono uppercase">
              LEADERSHIP
            </div>
          </div>

          {/* Transparent Cutout Layered in Front (z-20) — Overlaps and Breaks Out Naturally */}
          <div className="relative z-20 h-[98%] w-auto flex items-end justify-center">
            <Image
              src="/portrait/sameer-majeed.png"
              alt="Sameer Majeed, FP&A Manager"
              width={660}
              height={880}
              priority
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-10 border-t border-[#111513]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#111513]/60">
        <span>EXECUTIVE PORTFOLIO</span>
        <span className="text-[#345B4B] font-bold">SCREEN 02 / 06</span>
      </footer>
    </section>
  );
}
