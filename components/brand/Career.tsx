"use client";

import { useRef } from "react";
import { careerChapters } from "@/lib/journey";
import { cx } from "@/lib/cx";
import { gsap, useGSAP } from "@/lib/gsap";

function FoundationMark() {
  return (
    <div className="relative h-[min(72dvh,640px)] w-full">
      <p className="absolute -left-[4%] top-0 display-xl text-ivory/[0.09]">01</p>
      <div className="absolute left-[6%] top-[16%] h-[72%] w-[58%] bg-ivory/10" />
      <div className="absolute bottom-[6%] right-[2%] h-[60%] w-[54%] bg-brass/28" />
      <div className="absolute left-[16%] top-[26%] h-[62%] w-[50%] border border-ivory/25 bg-forest" />
      <div className="absolute left-[24%] top-[36%] h-12 w-24 bg-brass" />
    </div>
  );
}

function ControlMark() {
  return (
    <div className="relative h-[min(72dvh,640px)] w-full">
      <p className="absolute right-0 top-0 display-xl text-ivory/[0.09]">02</p>
      <div className="absolute left-[4%] top-[28%] h-[52%] w-[72%] bg-ivory/10" />
      <div className="absolute left-[14%] top-[12%] h-[52%] w-[72%] origin-left rotate-[-8deg] bg-brass/32" />
      <div className="absolute left-[20%] top-[36%] h-[52%] w-[72%] border border-ivory/20 bg-ink/50" />
    </div>
  );
}

function ReportingMark() {
  return (
    <div className="relative mx-auto mt-8 h-[32vh] w-full max-w-lg">
      <div className="absolute left-1/2 top-0 h-full w-20 -translate-x-1/2 bg-brass/30" />
      <div className="absolute left-[10%] top-[18%] h-32 w-32 bg-ivory/10" />
      <div className="absolute bottom-[4%] right-[8%] h-44 w-44 border border-ivory/20" />
    </div>
  );
}

function ChapterVisual({ id }: { id: string }) {
  if (id === "foundation") return <FoundationMark />;
  if (id === "control") return <ControlMark />;
  return <ReportingMark />;
}

function Chapter({ chapter }: { chapter: (typeof careerChapters)[number] }) {
  return (
    <div
      className={cx(
        "grid h-full w-full items-center gap-10 px-[clamp(1.1rem,4.5vw,4rem)] lg:gap-16",
        chapter.layout === "center" ? "place-items-center text-center" : "lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]",
        chapter.layout === "right" && "lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]",
      )}
    >
      <div className={cx(chapter.layout === "right" && "lg:order-2", chapter.layout === "center" && "max-w-4xl")}>
        <p className="kicker text-brass">
          {chapter.index} / {chapter.era}
        </p>
        <p className="mt-5 text-sm font-medium tracking-wide text-ivory/50">{chapter.years}</p>
        <h3 id={`career-${chapter.id}`} className="display-md mt-4">
          {chapter.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="mt-6 text-lg lg:text-xl">{chapter.company}</p>
        <p className="mt-2 kicker text-ivory/40">{chapter.location}</p>
        <p className={cx("mt-8 text-lg leading-relaxed text-ivory/72", chapter.layout === "center" ? "mx-auto max-w-xl" : "max-w-md")}>
          {chapter.sentence}
        </p>
        {chapter.roles.length > 1 ? (
          <ul className="mt-8 space-y-3 text-sm text-ivory/68">
            {chapter.roles.map((role) => (
              <li key={role.year + role.title}>
                <span className="text-brass">{role.year}</span>
                <span className="mx-3 opacity-35">/</span>
                {role.title}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className={cx("w-full", chapter.layout === "right" && "lg:order-1")}>
        <ChapterVisual id={chapter.id} />
      </div>
    </div>
  );
}

function Forecast() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".fpa-line", {
        drawSVG: "0%",
        duration: 1.4,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stage stage-ink flex flex-col justify-between px-[clamp(1.1rem,4.5vw,4rem)] py-16" aria-labelledby="fpa-title">
      <p id="fpa-title" className="pointer-events-none absolute inset-x-0 top-[8%] text-center display-xl text-ivory/[0.055]">
        FP&A
      </p>
      <div className="relative mt-8 flex min-h-[58dvh] flex-1 items-center">
        <svg className="h-[min(62dvh,640px)] w-full" viewBox="0 0 1600 720" fill="none" aria-hidden="true">
          <path className="fpa-line" d="M80 560 C 260 548, 420 520, 720 470" stroke="#6d6a62" strokeWidth="3.5" strokeLinecap="round" />
          <path className="fpa-line" d="M80 430 C 340 390, 560 350, 720 330" stroke="#B9A46A" strokeWidth="3.5" strokeLinecap="round" />
          <path className="fpa-line" d="M720 470 C 980 300, 1280 160, 1520 96" stroke="#F1EEE6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="720" cy="470" r="6" fill="#F1EEE6" />
          <text x="80" y="610" fill="#F1EEE6" opacity="0.45" fontSize="18" letterSpacing="4">
            ACTUAL
          </text>
          <text x="80" y="400" fill="#B9A46A" fontSize="18" letterSpacing="4">
            BUDGET
          </text>
          <text x="1388" y="78" fill="#F1EEE6" fontSize="18" letterSpacing="4">
            FORECAST
          </text>
        </svg>
      </div>
      <div className="relative pb-4">
        <p className="kicker text-brass">Al Rajhi Bank</p>
        <p className="mt-3 text-2xl font-medium">FP&A Specialist</p>
        <p className="mt-2 text-ivory/50">2023 — 2025 · Riyadh</p>
        <p className="mt-5 max-w-md text-ivory/68">Budgets, forecasts and financial analysis at institutional scale.</p>
      </div>
    </section>
  );
}

export function Career() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      if (reduce || !desktop || !track.current) return;

      const slides = track.current.querySelector("[data-career-slides]") as HTMLElement;
      gsap.to(slides, {
        x: () => -(slides.scrollWidth - track.current!.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: track.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: track },
  );

  return (
    <div id="journey">
      <section className="stage stage-forest flex flex-col justify-end px-[clamp(1.1rem,4.5vw,4rem)] pb-16 pt-28">
        <p className="kicker text-brass">Experience</p>
        <h2 className="display-xl mt-6">
          The
          <span className="block">Journey</span>
        </h2>
      </section>

      <div ref={track} className="overflow-hidden bg-forest">
        <div data-career-slides className="flex flex-col lg:h-[100dvh] lg:flex-row lg:flex-nowrap">
          {careerChapters.map((chapter) => (
            <section
              key={chapter.id}
              className="flex min-h-[100dvh] w-full shrink-0 items-center lg:h-full lg:w-screen"
              aria-labelledby={`career-${chapter.id}`}
            >
              <Chapter chapter={chapter} />
            </section>
          ))}
        </div>
      </div>

      <section className="stage stage-ivory flex flex-col justify-between px-[clamp(1.1rem,4.5vw,4rem)] py-16" aria-label="The shift to FP&A">
        <p className="kicker text-forest/45">The shift to FP&A · 2023</p>
        <div className="py-10">
          <h2 className="display-xl">
            From
            <span className="block">reporting</span>
          </h2>
          <p className="display-xl serif-italic mt-6 font-normal text-forest">to foresight.</p>
        </div>
      </section>

      <Forecast />
    </div>
  );
}
