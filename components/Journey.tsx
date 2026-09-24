"use client";

import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { Navigation } from "@/components/Navigation";
import { Arrival } from "@/components/brand/OpeningHero";
import { Career } from "@/components/brand/Career";
import { Present, Philosophy, Numbers } from "@/components/brand/Present";
import { Credentials, Contact } from "@/components/brand/Credentials";

export function Journey() {
  return (
    <ExperienceProvider>
      <Navigation />
      <main>
        <Arrival />
        <Career />
        <Present />
        <Philosophy />
        <Numbers />
        <Credentials />
        <Contact />
      </main>
    </ExperienceProvider>
  );
}
