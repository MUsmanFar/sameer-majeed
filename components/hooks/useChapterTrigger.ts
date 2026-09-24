"use client";

import { RefObject } from "react";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { ChapterId } from "@/lib/career";

export function useChapterTrigger(
  id: ChapterId,
  ref: RefObject<HTMLElement | null>,
) {
  const { setChapterId, ready } = useExperience();

  useGSAP(
    () => {
      if (!ready || !ref.current) return;
      ScrollTrigger.create({
        id,
        trigger: ref.current,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setChapterId(id),
        onEnterBack: () => setChapterId(id),
      });
    },
    { scope: ref, dependencies: [id, ready] },
  );
}
