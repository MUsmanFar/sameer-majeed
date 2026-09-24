"use client";

import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useMagnetic } from "./useChapterMotion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "link" | "ghost";
};

export function MagneticButton({
  children,
  variant = "solid",
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref, 0.26, true);

  const base =
    variant === "solid"
      ? "arch-cta"
      : variant === "ghost"
        ? "arch-cta arch-cta--ghost"
        : "arch-cta arch-cta--link";

  return (
    <button ref={ref} type="button" className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
}
