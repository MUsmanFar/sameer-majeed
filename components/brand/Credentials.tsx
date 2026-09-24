"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { credentials, profile } from "@/lib/career";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cx } from "@/lib/cx";
import { gsap, useGSAP } from "@/lib/gsap";

const placements = [
  "lg:col-span-2",
  "lg:col-start-3 lg:mt-24",
  "lg:col-span-2 lg:-mt-6",
  "lg:col-start-3 lg:-mt-16",
  "lg:col-span-2 lg:col-start-2 lg:mt-8",
];

export function Credentials() {
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = credentials.find((item) => item.id === openId) ?? null;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-cert]").forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? -24 : 32,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openId]);

  return (
    <section ref={root} id="archive" className="stage-ivory px-[clamp(1.1rem,4.5vw,4rem)] py-28 text-text" aria-labelledby="archive-title">
      <h2 id="archive-title" className="display-lg max-w-[11ch]">
        Credentials
        <span className="block">& continuous</span>
        <span className="block serif-italic font-normal">learning.</span>
      </h2>

      <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-6">
        {credentials.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenId(item.id)}
            data-cert
            className={cx("text-left", placements[index] ?? "")}
          >
            <span
              className="relative block overflow-hidden bg-[#e7e2d6] shadow-[0_28px_70px_rgba(18,21,19,0.1)]"
              style={{ height: item.orientation === "landscape" ? "min(48vh, 440px)" : "min(58vh, 520px)" }}
            >
              <Image src={item.image} alt={`${item.name}, ${item.issuer}`} fill sizes="50vw" className="object-contain p-5" />
            </span>
            <span className="mt-4 block kicker text-forest/50">{item.year}</span>
            <span className="mt-2 block text-lg font-medium leading-snug">
              {item.short ? `${item.short} · ${item.name}` : item.name}
            </span>
            <span className="mt-1 block text-sm text-text/55">{item.issuer}</span>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" role="dialog" aria-modal="true" aria-labelledby="credential-dialog-title">
          <button type="button" className="absolute inset-0 cursor-zoom-out" aria-label="Close credential" onClick={() => setOpenId(null)} />
          <div className="relative z-[1] grid max-h-[92dvh] w-full max-w-6xl overflow-y-auto bg-ivory text-text md:grid-cols-[1.25fr_0.75fr]">
            <div className="relative min-h-[50dvh] bg-[#e7e2d6]">
              <Image src={open.image} alt="" fill sizes="70vw" className="object-contain p-6 md:p-10" />
            </div>
            <div className="flex flex-col justify-between p-6 md:p-10">
              <div>
                <p className="kicker text-forest">{open.year}</p>
                <h3 id="credential-dialog-title" className="mt-4 font-sans text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {open.short ? `${open.short} · ${open.name}` : open.name}
                </h3>
                <p className="mt-3 text-sm text-text/65">{open.issuer}</p>
                <p className="mt-6 text-sm">{open.date}</p>
                <ul className="mt-6 space-y-2 text-sm text-text/70">
                  {open.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex items-center justify-between">
                {"verifyUrl" in open && open.verifyUrl ? (
                  <a href={open.verifyUrl} className="kicker text-forest" target="_blank" rel="noreferrer">
                    Verify
                  </a>
                ) : (
                  <span />
                )}
                <button type="button" className="kicker" onClick={() => setOpenId(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="stage stage-ink" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute bottom-[-10%] right-[-12%] hidden h-[108%] w-[46%] lg:block">
        <Image src={profile.portrait} alt="" fill sizes="46vw" className="object-cover object-[center_8%] opacity-95" />
      </div>
      <div className="relative flex min-h-[100dvh] flex-col justify-between px-[clamp(1.1rem,4.5vw,4rem)] pb-8 pt-28 lg:max-w-[58%]">
        <div>
          <h2 id="contact-title" className="display-xl">
            Let’s
            <span className="block">connect.</span>
          </h2>
          <div className="mt-14">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="text-[clamp(1rem,2vw,1.55rem)] tracking-[0.04em] text-brass"
            >
              <span className="border-b border-brass/55 pb-1">{profile.email}</span>
            </MagneticButton>
          </div>
          <div className="mt-7">
            <MagneticButton href={profile.linkedin} className="text-ivory/65">
              LinkedIn
            </MagneticButton>
          </div>
          <p className="mt-16 text-xl font-medium">{profile.name}</p>
          <p className="mt-2 kicker text-ivory/45">FP&A Manager · Riyadh</p>
        </div>
        <footer className="flex justify-between pt-10 text-ivory/32">
          <p className="kicker">Sameer Majeed</p>
          <p className="text-xs">© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </section>
  );
}
