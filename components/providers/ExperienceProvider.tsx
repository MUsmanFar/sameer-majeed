"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { chapters, type ChapterId, type Theme } from "@/lib/career";

type Chapter = (typeof chapters)[number];

type ExperienceValue = {
  ready: boolean;
  setReady: (value: boolean) => void;
  chapterId: ChapterId;
  setChapterId: (id: ChapterId) => void;
  theme: Theme;
  indexLabel: string;
  chapter: Chapter;
};

const ExperienceContext = createContext<ExperienceValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(true);
  const [chapterId, setChapterId] = useState<ChapterId>("opening");

  const value = useMemo(() => {
    const current = chapters.find((chapter) => chapter.id === chapterId) ?? chapters[0];
    return {
      ready,
      setReady,
      chapterId,
      setChapterId,
      theme: current.theme,
      indexLabel: current.index,
      chapter: current,
    };
  }, [ready, chapterId]);

  useEffect(() => {
    document.documentElement.dataset.theme = value.theme;
  }, [value.theme]);

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}
