"use client";

import { useEffect, useState } from "react";
import { gsap, ScrollToPlugin } from "@/lib/gsap";
import { navLinks, profile } from "@/lib/career";
import { cx } from "@/lib/cx";

gsap.registerPlugin(ScrollToPlugin);

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onNav = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    gsap.to(window, {
      duration: 0.9,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <header className="nav-blend pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto flex items-center justify-between px-[clamp(1.1rem,4vw,3.5rem)] py-5">
        <a href="#opening" onClick={onNav("#opening")} className="text-lg font-semibold tracking-[-0.04em]">
          SM
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 min-[1100px]:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={onNav(link.href)} className="kicker opacity-80 hover:opacity-100">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="kicker min-[1100px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cx(
          "fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[clamp(1.4rem,6vw,3rem)] pb-10 pt-24 text-ivory mix-blend-normal min-[1100px]:hidden",
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={onNav(link.href)} className="display-md">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={`mailto:${profile.email}`} className="kicker text-brass">
          {profile.email}
        </a>
      </div>
    </header>
  );
}

export function ProgressRail() {
  return null;
}
