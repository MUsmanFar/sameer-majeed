"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { CERTIFICATES } from "@/lib/career-data";
import {
  CertificateModal,
  type CertificateData,
} from "@/components/motion/CertificateModal";
import { useChapterMotion } from "./useChapterMotion";

type Props = { ready?: boolean };

export function CredentialsVault({ ready = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<CertificateData | null>(null);
  const [index, setIndex] = useState(0);

  useChapterMotion(rootRef, { ready });

  const open = (i: number) => {
    setIndex(i);
    setActive(CERTIFICATES[i] as CertificateData);
  };

  const onNext = useCallback(() => {
    setIndex((i) => {
      const next = (i + 1) % CERTIFICATES.length;
      setActive(CERTIFICATES[next] as CertificateData);
      return next;
    });
  }, []);

  const onPrev = useCallback(() => {
    setIndex((i) => {
      const prev = (i - 1 + CERTIFICATES.length) % CERTIFICATES.length;
      setActive(CERTIFICATES[prev] as CertificateData);
      return prev;
    });
  }, []);

  return (
    <section
      id="ch-credentials"
      ref={rootRef}
      className="relative overflow-hidden bg-[#eef2f8] py-16 md:py-24"
    >
      <div className="mx-auto w-[min(100%-2rem,72rem)]">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5" data-reveal>
          <div>
            <p className="arch-kicker">03 / THE CREDENTIALS</p>
            <h2 className="arch-display mt-3 text-[clamp(2rem,4.5vw,3.2rem)]" data-rise>
              Verified <em className="arch-italic">standing.</em>
            </h2>
          </div>
          <p className="arch-meta">5 certificates · Clarity before complexity</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CERTIFICATES.map((cert, i) => (
            <button
              key={cert.id}
              type="button"
              className="group text-left"
              onClick={() => open(i)}
              data-reveal
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-line bg-white">
                <Image
                  src={cert.img}
                  alt={cert.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 90vw, 18vw"
                />
                <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[0.58rem] tracking-[0.16em] text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 font-display text-[1.05rem] leading-tight text-charcoal">
                {cert.title}
              </p>
              <p className="mt-1 text-[0.72rem] leading-snug text-muted">{cert.issuer}</p>
              <p className="arch-meta mt-2 !text-forest">{cert.standing}</p>
            </button>
          ))}
        </div>
      </div>

      <CertificateModal
        cert={active}
        onClose={() => setActive(null)}
        onNext={onNext}
        onPrev={onPrev}
        currentIndex={index + 1}
        totalCount={CERTIFICATES.length}
      />
    </section>
  );
}
