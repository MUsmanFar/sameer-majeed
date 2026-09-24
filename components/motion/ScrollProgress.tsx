"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed right-3 top-1/4 bottom-1/4 w-[2px] bg-[#303640]/40 z-50 pointer-events-none hidden lg:block rounded-full overflow-hidden"
    >
      <div
        className="w-full bg-[#3D73FF] shadow-[0_0_8px_#3D73FF] transition-all duration-100 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}
