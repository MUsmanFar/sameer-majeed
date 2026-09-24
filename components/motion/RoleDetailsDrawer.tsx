"use client";

import React, { useEffect } from "react";

export interface RoleDetailData {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

interface RoleDetailsDrawerProps {
  roleData: RoleDetailData | null;
  onClose: () => void;
}

export function RoleDetailsDrawer({ roleData, onClose }: RoleDetailsDrawerProps) {
  useEffect(() => {
    if (!roleData) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [roleData, onClose]);

  if (!roleData) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex justify-end bg-black/75 backdrop-blur-md transition-opacity duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-full bg-[#0D1015] border-l border-[#245BFF]/30 p-8 lg:p-12 overflow-y-auto shadow-2xl flex flex-col justify-between select-text"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(36, 91, 255, 0.08)",
        }}
      >
        <div>
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#303640]/80 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D73FF] shadow-[0_0_10px_#3D73FF]" />
              <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#3D73FF] uppercase">
                VERIFIED EXECUTIVE RECORD
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-mono tracking-widest text-[#AAB1BC] hover:text-[#F4F6F8] transition-colors uppercase flex items-center gap-2 px-3 py-1.5 rounded border border-[#303640] hover:border-[#3D73FF]"
            >
              <span>CLOSE</span>
              <span className="font-bold">✕</span>
            </button>
          </div>

          {/* Role Header */}
          <div className="mt-8">
            <div className="text-xs font-mono text-[#AAB1BC] tracking-wider uppercase mb-1">
              {roleData.period} · {roleData.location}
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#F4F6F8]">
              {roleData.role}
            </h3>
            <div className="text-xl font-semibold text-[#3D73FF] mt-1 flex items-center gap-3">
              <span>{roleData.company}</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#171B22] border border-[#303640] text-[#AAB1BC]">
                {roleData.type}
              </span>
            </div>
            <p className="text-base text-[#AAB1BC] font-light leading-relaxed mt-4">
              {roleData.summary}
            </p>
          </div>

          {/* Verified Responsibilities */}
          <div className="mt-8 pt-6 border-t border-[#303640]/60">
            <h4 className="text-xs font-mono tracking-[0.2em] text-[#F4F6F8] uppercase font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#3D73FF] rounded-full" />
              Core Mandates &amp; Execution
            </h4>
            <div className="space-y-3">
              {roleData.responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-[#171B22]/60 border border-[#303640]/50 text-sm text-[#F4F6F8]/90 font-light leading-snug hover:border-[#3D73FF]/50 transition-colors"
                >
                  <span className="font-mono text-xs text-[#3D73FF] font-semibold mt-0.5 shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Competencies */}
          {roleData.skills && roleData.skills.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#303640]/60">
              <h4 className="text-xs font-mono tracking-[0.2em] text-[#AAB1BC] uppercase font-bold mb-3">
                Key Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {roleData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#171B22] border border-[#303640] text-[#AAB1BC]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-5 border-t border-[#303640]/60 flex items-center justify-between text-xs font-mono text-[#AAB1BC]">
          <span>SAMEER MAJEED · FP&amp;A PORTFOLIO</span>
          <span className="text-[#3D73FF]">AUTHENTICATED CAREER RECORD</span>
        </div>
      </div>
    </div>
  );
}
