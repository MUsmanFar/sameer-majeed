import React from "react";
import Image from "next/image";

export function Screen06CredentialsContact() {
  const certs = [
    {
      title: "ICAP Associate (ACA)",
      issuer: "Institute of Chartered Accountants of Pakistan",
      certNumber: "Membership No. 12797",
      img: "/certificates/icap-associate.png",
      alt: "ICAP Membership Certificate",
    },
    {
      title: "SOCPA Associate",
      issuer: "Saudi Organization for Chartered & Professional Accountants",
      certNumber: "Chartered Standing · KSA",
      img: "/certificates/socpa-associate.png",
      alt: "SOCPA Membership Certificate",
    },
    {
      title: "FIPA & FFA Fellow",
      issuer: "Institute of Public Accountants (AU) & IFA (UK)",
      certNumber: "Fellow Status (Senior Executive)",
      img: "/certificates/fipa-fellow.png",
      alt: "FIPA Fellow Certificate",
    },
  ];

  return (
    <section
      id="screen-06"
      className="relative w-full h-screen overflow-hidden flex flex-col select-none"
    >
      {/* ========================================================================= */}
      {/* TOP HALF: CREDENTIALS & CONTINUOUS LEARNING (Warm Neutral #F5F2EA, 53% h) */}
      {/* ========================================================================= */}
      <div className="h-[53%] bg-[#F5F2EA] text-[#111513] p-8 lg:px-16 flex flex-col justify-between relative border-b border-[#111513]/10">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#345B4B]" />
            <h2 className="text-xs font-bold tracking-[0.25em] text-[#345B4B] uppercase">
              CREDENTIALS &amp; CONTINUOUS LEARNING
            </h2>
          </div>

          <span className="text-[11px] font-mono text-[#111513]/50">
            VERIFIED REGULATORY CHARTERS
          </span>
        </div>

        {/* Polished Horizontal Gallery: 3 Real Certificates Prominently Displayed */}
        <div className="grid grid-cols-3 gap-8 items-center my-auto py-2">
          {certs.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-[#111513]/10 p-3 shadow-md flex items-center gap-4 transition-transform hover:-translate-y-0.5"
              style={{
                boxShadow: "0 8px 24px -6px rgba(17, 21, 19, 0.08)",
              }}
            >
              {/* Real Certificate Image in High-Resolution Frame */}
              <div className="relative w-28 h-36 shrink-0 bg-[#F5F2EA] border border-[#B8A06A]/30 overflow-hidden shadow-inner flex items-center justify-center p-1">
                <Image
                  src={c.img}
                  alt={c.alt}
                  width={200}
                  height={260}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Certificate Details */}
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="text-[10px] font-mono text-[#B8A06A] uppercase font-bold tracking-wider">
                    {c.certNumber}
                  </div>
                  <h3 className="text-sm font-bold text-[#111513] leading-snug mt-1">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-[#111513]/70 font-light leading-relaxed mt-1">
                    {c.issuer}
                  </p>
                </div>

                <div className="mt-2 text-[9px] font-mono tracking-widest text-[#345B4B] uppercase font-semibold">
                  OFFICIALLY ADMITTED &amp; VERIFIED
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Section Sub-strip */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#111513]/50 border-t border-[#111513]/5 pt-2">
          <span>DUAL FELLOWSHIP STANDING · ICAP · SOCPA · IPA AUSTRALIA · IFA UK</span>
          <span>SCREEN 06 / 06 (PART I)</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM HALF: CONTACT & ENGAGEMENT (Deep Charcoal #111513, 47% h)          */}
      {/* ========================================================================= */}
      <div
        className="h-[47%] bg-[#111513] text-[#F5F2EA] p-8 lg:px-16 flex flex-col justify-between relative"
        style={{
          background:
            "linear-gradient(180deg, #13231E 0%, #111513 100%)",
        }}
      >
        {/* Main Contact Grid */}
        <div className="grid grid-cols-12 gap-8 items-center my-auto">
          {/* Headline (Col 5 / 12) */}
          <div className="col-span-5">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#B8A06A] uppercase block mb-2">
              Inquiries &amp; Advisory
            </span>
            <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-[#F5F2EA]">
              LET&apos;S <br />
              <span className="font-serif italic font-normal text-[#B8A06A]">
                CONNECT.
              </span>
            </h2>
          </div>

          {/* Profile & Channels (Col 4 / 12) */}
          <div className="col-span-4 border-l border-[#F5F2EA]/10 pl-6 space-y-3">
            <div>
              <div className="text-base font-semibold text-[#F5F2EA] tracking-wide">
                Sameer Majeed
              </div>
              <div className="text-xs text-[#B8A06A] font-mono mt-0.5">
                FP&amp;A Manager · Riyadh, Saudi Arabia
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <a
                href="mailto:sameerpk_majeed@hotmail.com"
                className="block text-xs text-[#F5F2EA]/80 font-mono hover:text-[#B8A06A] transition-colors"
              >
                sameerpk_majeed@hotmail.com
              </a>
              <a
                href="https://linkedin.com/in/sameer-majeed-aca"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#B8A06A] hover:underline"
              >
                <span>linkedin.com/in/sameer-majeed-aca</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Premium CTA (Col 3 / 12) */}
          <div className="col-span-3 flex flex-col justify-center items-end">
            <a
              href="mailto:sameerpk_majeed@hotmail.com?subject=Strategic%20FP%26A%20Inquiry"
              className="w-full text-center px-8 py-4 bg-[#B8A06A] text-[#111513] text-xs font-bold tracking-[0.2em] uppercase transition hover:bg-[#F5F2EA] shadow-lg shadow-black/40"
            >
              INITIATE CONVERSATION
            </a>
            <span className="text-[10px] text-[#F5F2EA]/40 font-mono mt-2 tracking-wider">
              CONFIDENTIAL INQUIRIES WELCOME
            </span>
          </div>
        </div>

        {/* Footer Base Strip */}
        <div className="border-t border-[#F5F2EA]/10 pt-3 flex items-center justify-between text-[11px] text-[#F5F2EA]/40">
          <span>© 2025 SAMEER MAJEED · ALL RIGHTS RESERVED</span>
          <span className="font-mono text-[#B8A06A]">SCREEN 06 / 06 (PART II)</span>
        </div>
      </div>
    </section>
  );
}
