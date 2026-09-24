"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Optional label under logo */
  caption?: string;
  className?: string;
};

/** Fixed footprint so every employer mark reads the same visual size */
export function CompanyLogo({ src, alt, caption, className = "" }: Props) {
  return (
    <figure className={`arch-logo-wrap ${className}`}>
      <div className="arch-logo">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-2.5"
          sizes="160px"
        />
      </div>
      {caption ? <figcaption className="arch-logo__cap">{caption}</figcaption> : null}
    </figure>
  );
}
