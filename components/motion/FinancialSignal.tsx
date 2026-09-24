"use client";

import React, { forwardRef } from "react";

/** Persistent cobalt Financial Signal — morphs across chapters via GSAP MorphSVG */
export const FinancialSignal = forwardRef<SVGSVGElement>(function FinancialSignal(_, ref) {
  return (
    <svg
      ref={ref}
      className="signal-layer absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="signalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#245BFF" stopOpacity="0.15" />
          <stop offset="40%" stopColor="#3D73FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#77A1FF" stopOpacity="0.55" />
        </linearGradient>
        <filter id="signalGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft underglow trail */}
      <path
        id="signal-glow"
        d="M 120 720 C 280 680, 420 620, 560 540 S 820 360, 980 280 S 1280 160, 1480 120"
        fill="none"
        stroke="#245BFF"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.22"
        filter="url(#signalGlow)"
      />

      {/* Core trajectory */}
      <path
        id="signal-core"
        d="M 120 720 C 280 680, 420 620, 560 540 S 820 360, 980 280 S 1280 160, 1480 120"
        fill="none"
        stroke="url(#signalGrad)"
        strokeWidth="2.75"
        strokeLinecap="round"
        filter="url(#signalGlow)"
      />

      {/* Toolkit refraction branches — dormant until toolkit chapter */}
      <g id="signal-branches" opacity="0">
        <path className="signal-branch" d="M 800 450 L 420 180" fill="none" stroke="#3D73FF" strokeWidth="1.5" />
        <path className="signal-branch" d="M 800 450 L 1180 180" fill="none" stroke="#3D73FF" strokeWidth="1.5" />
        <path className="signal-branch" d="M 800 450 L 360 680" fill="none" stroke="#3D73FF" strokeWidth="1.5" />
        <path className="signal-branch" d="M 800 450 L 1240 680" fill="none" stroke="#3D73FF" strokeWidth="1.5" />
        <path className="signal-branch" d="M 800 450 L 200 450" fill="none" stroke="#77A1FF" strokeWidth="1.25" />
        <path className="signal-branch" d="M 800 450 L 1400 450" fill="none" stroke="#77A1FF" strokeWidth="1.25" />
        <path className="signal-branch" d="M 800 450 L 800 160" fill="none" stroke="#245BFF" strokeWidth="1.25" />
        <path className="signal-branch" d="M 800 450 L 800 740" fill="none" stroke="#245BFF" strokeWidth="1.25" />
      </g>

      <circle id="signal-head" cx="1480" cy="120" r="5" fill="#77A1FF" opacity="0.9" />
    </svg>
  );
});
