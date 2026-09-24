"use client";

import React from "react";

interface GlobalStageProps {
  currentScene?: string;
}

export function GlobalStage({ currentScene = "scene-entry" }: GlobalStageProps) {
  const isBlueIntense =
    currentScene === "scene-entry" ||
    currentScene === "scene-fpa" ||
    currentScene === "scene-flooss";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050608]"
    >
      {/* 1. Deep Atmospheric Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, #0D1015 0%, #050608 85%)",
        }}
      />

      {/* 2. Soft Directional Blue Data Lighting */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          isBlueIntense ? "opacity-30" : "opacity-12"
        }`}
        style={{
          background:
            "radial-gradient(circle at 65% 35%, rgba(36, 91, 255, 0.18) 0%, rgba(13, 16, 21, 0) 65%)",
        }}
      />

      {/* 3. Extremely Subtle Perspective Grid (Drastically reduced to 0.025) */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3D73FF 1px, transparent 1px), linear-gradient(to bottom, #AAB1BC 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          transform: "perspective(1200px) rotateX(32deg) translateY(-80px)",
          transformOrigin: "top center",
        }}
      />

      {/* 4. Film Grain / Subtle Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(244, 246, 248, 0.8) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* 5. Edge Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 180px 50px rgba(5, 6, 8, 0.96)",
        }}
      />
    </div>
  );
}
