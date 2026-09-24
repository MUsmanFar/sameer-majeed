"use client";

import { useEffect, useState, useRef } from "react";
import { getLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

interface MotionDebugHudProps {
  activeChapter?: string;
}

export function MotionDebugHud({ activeChapter = "unknown" }: MotionDebugHudProps) {
  const [enabled, setEnabled] = useState(false);
  const [fps, setFps] = useState(60);
  const [velocity, setVelocity] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [triggerCount, setTriggerCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDebug = new URLSearchParams(window.location.search).get("motionDebug") === "1";
    setEnabled(isDebug);
    if (!isDebug) return;

    console.log("[MotionDebug] Total ScrollTriggers:", ScrollTrigger.getAll().length);

    let rafId: number;
    const loop = () => {
      frameCount.current++;
      const now = performance.now();
      if (now - lastTime.current >= 500) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = now;
      }

      const lenis = getLenis();
      setVelocity(lenis ? Math.round(lenis.velocity * 100) / 100 : 0);
      setScrollY(Math.round(window.scrollY));
      setTriggerCount(ScrollTrigger.getAll().length);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 99999,
        background: "rgba(5, 6, 8, 0.92)",
        border: "1px solid #245bff",
        borderRadius: 8,
        padding: "10px 16px",
        fontFamily: "monospace",
        fontSize: 12,
        color: "#f4f6f8",
        lineHeight: 1.6,
        boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
        backdropFilter: "blur(12px)",
        pointerEvents: "none",
      }}
    >
      <div style={{ color: "#3d73ff", fontWeight: "bold", marginBottom: 4 }}>
        ● MOTION ENGINE DIAGNOSTIC HUD
      </div>
      <div>FPS: <span style={{ color: fps < 55 ? "#ff5555" : "#55ff55" }}>{fps}</span></div>
      <div>Lenis Velocity: {velocity}</div>
      <div>Scroll Y: {scrollY}px ({progress}%)</div>
      <div>Active Chapter: <span style={{ color: "#77a1ff" }}>{activeChapter}</span></div>
      <div>ScrollTriggers: <span style={{ color: "#3d73ff" }}>{triggerCount}</span></div>
    </div>
  );
}
