"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<"default" | "link" | "view" | "open">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const certEl = target.closest("[data-cursor='view']");
      const navEl = target.closest("[data-cursor='open']");
      const linkEl = target.closest("a, button, [role='button']");

      if (certEl) {
        setHoverState("view");
      } else if (navEl) {
        setHoverState("open");
      } else if (linkEl) {
        setHoverState("link");
      } else {
        setHoverState("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full border transition-all duration-200 ${
          hoverState === "view"
            ? "h-14 w-14 border-[#3D73FF] bg-[#050608]/90 text-[10px] font-mono tracking-widest text-[#3D73FF] shadow-[0_0_15px_rgba(61,115,255,0.4)]"
            : hoverState === "open"
            ? "h-12 w-12 border-[#3D73FF] bg-[#0D1015]/90 text-[9px] font-mono tracking-widest text-[#F4F6F8]"
            : hoverState === "link"
            ? "h-9 w-9 border-[#3D73FF] bg-[#245BFF]/15 scale-125 shadow-[0_0_12px_rgba(36,91,255,0.3)]"
            : "h-6 w-6 border-[#F4F6F8]/30 bg-transparent"
        }`}
      >
        {hoverState === "view" && <span>VIEW</span>}
        {hoverState === "open" && <span>NAV</span>}
        {hoverState === "default" && (
          <div className="h-1.5 w-1.5 rounded-full bg-[#3D73FF] shadow-[0_0_6px_#3D73FF]" />
        )}
      </div>
    </div>
  );
}
