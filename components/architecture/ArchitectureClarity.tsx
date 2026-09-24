"use client";

import { useCallback, useEffect, useState } from "react";
import { CHAPTERS } from "@/lib/career-data";
import { ScrollTrigger } from "@/lib/gsap";
import { BriefPreloader } from "./BriefPreloader";
import { ClarityArc } from "./ClarityArc";
import { ClarityNav } from "./ClarityNav";
import { EmployersStrip } from "./EmployersStrip";
import { ExperienceGate } from "./ExperienceGate";
import { Experiences } from "./Experiences";
import { Ledger } from "./chapters/Ledger";
import { Hero } from "./chapters/Hero";
import { CredentialsVault } from "./CredentialsVault";
import { Contact } from "./chapters/Contact";

export function ArchitectureClarity() {
  const [ready, setReady] = useState(false);
  const [activeId, setActiveId] = useState("ch-ledger");
  const [navVisible, setNavVisible] = useState(false);

  const onPreloadDone = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    if (!ready) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setNavVisible(true);

    const triggers: ScrollTrigger[] = [];

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveId(ch.id),
          onEnterBack: () => setActiveId(ch.id),
        }),
      );
    });

    const opening = document.getElementById("ch-ledger");
    if (opening) {
      triggers.push(
        ScrollTrigger.create({
          trigger: opening,
          start: "top top",
          end: "bottom top",
          onLeave: () => setNavVisible(true),
          onEnterBack: () => setNavVisible(false),
          onEnter: () => setNavVisible(false),
        }),
      );
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", refresh);
    void document.fonts.ready.then(refresh);
    const settle = window.setTimeout(refresh, 350);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
      triggers.forEach((t) => t.kill());
    };
  }, [ready]);

  return (
    <div className="arch-root">
      {!ready ? <BriefPreloader onComplete={onPreloadDone} /> : null}
      <ClarityNav activeId={activeId} visible={ready && navVisible} />

      <main>
        <Ledger ready={ready} />
        <Hero ready={ready} />
        <ClarityArc ready={ready} />
        <EmployersStrip ready={ready} />
        <ExperienceGate ready={ready} />
        <Experiences ready={ready} />
        <CredentialsVault ready={ready} />
        <Contact ready={ready} />
      </main>
    </div>
  );
}
