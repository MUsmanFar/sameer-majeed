"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  standing: string;
  date?: string;
  img: string;
  alt: string;
  credentialId?: string;
  details: string;
}

interface CertificateModalProps {
  cert: CertificateData | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export function CertificateModal({
  cert,
  onClose,
  onNext,
  onPrev,
  currentIndex = 1,
  totalCount = 5,
}: CertificateModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
  }, [cert]);

  useEffect(() => {
    if (!cert) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [cert, onClose, onNext, onPrev]);

  if (!cert) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/80 p-4 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col items-center gap-8 overflow-hidden border border-line bg-paper p-6 text-charcoal lg:flex-row lg:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-5 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1 border border-line bg-ivory px-2 py-1 text-xs text-muted">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
              className="px-2 py-0.5 hover:text-charcoal"
              title="Zoom out"
            >
              −
            </button>
            <span className="px-1 text-forest">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.25))}
              className="px-2 py-0.5 hover:text-charcoal"
              title="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="ml-1 border-l border-line px-1.5 py-0.5 text-[10px] hover:text-charcoal"
              title="Reset zoom"
            >
              RESET
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="border border-line bg-ivory px-3 py-1.5 text-xs tracking-widest text-muted uppercase hover:text-charcoal"
          >
            ESC ✕
          </button>
        </div>

        <div className="relative flex aspect-[3/4] w-full max-w-[420px] shrink-0 items-center justify-center overflow-hidden border border-line bg-ivory p-3 lg:w-1/2">
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <Image
              src={cert.img}
              alt={cert.alt}
              width={650}
              height={850}
              className="h-full w-full rounded object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex h-full flex-1 flex-col justify-between py-2 text-left">
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="arch-kicker">
                Credential {currentIndex} of {totalCount}
              </span>
              <span className="arch-meta">Verified</span>
            </div>

            <h3 className="font-display text-2xl leading-tight tracking-tight lg:text-3xl">
              {cert.title}
            </h3>

            <div className="mt-2 text-sm font-medium tracking-wide text-forest">
              {cert.standing}
            </div>

            {cert.credentialId ? (
              <div className="mt-1 text-xs text-muted">
                Credential Ref: <span className="text-charcoal">{cert.credentialId}</span>
              </div>
            ) : null}

            <div className="arch-meta mt-5">Issuing Body</div>
            <p className="mt-1 text-base text-charcoal/90">{cert.issuer}</p>

            <div className="arch-meta mt-5">Details</div>
            <p className="mt-1 text-sm leading-relaxed text-muted">{cert.details}</p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <div className="flex items-center gap-2">
              {onPrev ? (
                <button
                  type="button"
                  onClick={onPrev}
                  className="border border-line bg-ivory px-3 py-1.5 text-xs tracking-widest hover:border-forest"
                >
                  ← PREV
                </button>
              ) : null}
              {onNext ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="border border-line bg-ivory px-3 py-1.5 text-xs tracking-widest hover:border-forest"
                >
                  NEXT →
                </button>
              ) : null}
            </div>
            <span className="arch-meta">Arrow keys or Esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
