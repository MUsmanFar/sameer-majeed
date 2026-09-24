import React from "react";
import Image from "next/image";

export function Screen06Credentials() {
  return (
    <section
      id="screen-06"
      className="relative w-full h-screen overflow-hidden bg-[#F5F2EA] text-[#111513] flex flex-col justify-between p-10 lg:p-14 select-none"
    >
      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#111513]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#345B4B]" />
          <span className="text-xs font-bold tracking-[0.24em] text-[#345B4B] uppercase">
            Professional Accreditations
          </span>
        </div>

        <div className="text-xs font-mono tracking-wider text-[#111513]/70">
          CHARTERED STANDING &amp; FELLOWSHIPS
        </div>
      </header>

      {/* Main Content Area: Headline + Hierarchical Gallery (Certificates 1, 2, 3 with Depth & Offsets) */}
      <main className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2">
        {/* Gallery Headline */}
        <div className="mb-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#345B4B] uppercase font-bold block mb-1">
            GOVERNANCE &amp; ACCREDITATIONS
          </span>
          <h2 className="text-5xl lg:text-6xl font-light tracking-[-0.035em] text-[#111513] leading-[0.96]">
            CREDENTIALS <br />
            <span className="font-serif italic font-normal text-[#345B4B]">
              &amp; CONTINUOUS LEARNING
            </span>
          </h2>
        </div>

        {/* Hierarchical Exhibition Gallery: Controlled Offsets & Natural Physical Depth */}
        <div className="grid grid-cols-12 gap-6 items-center pt-2 pb-2">
          {/* Certificate 01: Largest and Slightly Forward (Col 1-4) */}
          <div className="col-span-4 flex flex-col items-center text-center relative z-30">
            <div
              className="relative w-[30vw] max-w-[390px] aspect-[3/4] bg-white shadow-2xl p-1.5 transition-transform hover:scale-[1.02]"
              style={{
                boxShadow:
                  "0 30px 60px -15px rgba(17, 21, 19, 0.28), 0 0 0 1px rgba(17, 21, 19, 0.08)",
              }}
            >
              <Image
                src="/certificates/icap-associate.png"
                alt="ICAP Associate Certificate"
                width={420}
                height={560}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4">
              <div className="text-lg font-bold tracking-wider text-[#111513]">
                ACA
              </div>
              <div className="text-xs font-mono text-[#111513]/70 mt-0.5">
                Institute of Chartered Accountants of Pakistan
              </div>
            </div>
          </div>

          {/* Certificate 02: Slightly Smaller and Elevated / Higher (Col 5-8) */}
          <div className="col-span-4 flex flex-col items-center text-center relative z-20 -translate-y-7">
            <div
              className="relative w-[26vw] max-w-[350px] aspect-[3/4] bg-white shadow-2xl p-1.5 transition-transform hover:scale-[1.02]"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(17, 21, 19, 0.22), 0 0 0 1px rgba(17, 21, 19, 0.08)",
              }}
            >
              <Image
                src="/certificates/socpa-associate.png"
                alt="SOCPA Membership Certificate"
                width={380}
                height={510}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4">
              <div className="text-lg font-bold tracking-wider text-[#111513]">
                SOCPA
              </div>
              <div className="text-xs font-mono text-[#345B4B] font-semibold mt-0.5">
                Associate
              </div>
            </div>
          </div>

          {/* Certificate 03: Medium-Large / Slightly Lower (Col 9-12) */}
          <div className="col-span-4 flex flex-col items-center text-center relative z-20 translate-y-5">
            <div
              className="relative w-[28vw] max-w-[370px] aspect-[3/4] bg-white shadow-2xl p-1.5 transition-transform hover:scale-[1.02]"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(17, 21, 19, 0.24), 0 0 0 1px rgba(17, 21, 19, 0.08)",
              }}
            >
              <Image
                src="/certificates/fipa-fellow.png"
                alt="FIPA Fellow Certificate"
                width={400}
                height={530}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4">
              <div className="text-lg font-bold tracking-wider text-[#111513]">
                FIPA · FFA
              </div>
              <div className="text-xs font-mono text-[#345B4B] font-semibold mt-0.5">
                Fellow
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Rule */}
      <footer className="relative z-10 border-t border-[#111513]/15 pt-3 flex items-center justify-between text-xs font-mono text-[#111513]/70">
        <span>VERIFIED REGULATORY QUALIFICATIONS</span>
        <span className="text-[#345B4B] font-bold">SCREEN 06 / 06</span>
      </footer>
    </section>
  );
}
