"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

export function OpeningSequence({ children, navigation }: { children: ReactNode; navigation: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const root = useRef<HTMLElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const profile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const oldRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      getLenis()?.stop();
      window.scrollTo(0, 0);
    });
    const timer = window.setTimeout(() => setLoading(false), matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 2200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      document.body.style.overflow = oldOverflow;
      history.scrollRestoration = oldRestoration;
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    document.body.style.overflow = "";
    getLenis()?.start();
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: root.current, start: "top top", end: () => `+=${window.innerHeight}`, scrub: .45,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const opened = self.progress > .7;
            if (cover.current) cover.current.inert = opened;
            if (profile.current) profile.current.inert = !opened;
          },
        } });
        timeline.to(".entrance-copy, .entrance-navigation, .entrance-foot", { autoAlpha: 0, duration: .24, ease: "none" }, 0)
          .to(".elevator-left", { xPercent: -101, duration: .85, ease: "power2.inOut" }, .08)
          .to(".elevator-right", { xPercent: 101, duration: .85, ease: "power2.inOut" }, .08)
          .fromTo(".entrance-profile", { filter: "brightness(.65)" }, { filter: "brightness(1)", duration: .7, ease: "none" }, .2)
          .to(".elevator-cover", { autoAlpha: 0, duration: .07 }, .93);
      }, root);
      return () => ctx.revert();
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      if (profile.current) profile.current.inert = false;
      if (cover.current) cover.current.inert = true;
    });
    ScrollTrigger.refresh();
    return () => media.revert();
  }, [loading]);

  function enter(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (!root.current) return;
    const top = root.current.getBoundingClientRect().top + window.scrollY + window.innerHeight;
    if (getLenis()) getLenis()?.scrollTo(top, { duration: 1.8 });
    else window.scrollTo({ top, behavior: "smooth" });
  }

  return <section className="entrance" id="opening" ref={root} aria-label="Welcome to Sameer's portfolio">
    {loading && <div className="brand-preloader" role="status" aria-label="Preparing the portfolio"><span className="preloader-meta">SAMEER MAJEED / A CAREER IN CLARITY</span><span className="preloader-mark">sm<span>.</span></span><div className="preloader-rule"/><span className="preloader-caption">PRECISION. PERSPECTIVE. POSSIBILITY.</span><button onClick={() => setLoading(false)}>ENTER PORTFOLIO ↗</button></div>}
    <div className="entrance-stage">
      <div className="entrance-profile" ref={profile} inert>{children}</div>
      <div className="elevator-cover" ref={cover}>
        <div className="elevator-door elevator-left" aria-hidden="true"><span className="door-etch">SAMEER</span></div>
        <div className="elevator-door elevator-right" aria-hidden="true"><span className="door-etch">MAJEED</span></div>
        <div className="entrance-navigation">{navigation}</div>
        <div className="entrance-copy"><p className="eyebrow">CHARTERED ACCOUNTANT · ACA, FIPA, FFA</p><span className="floor-indicator">01 <span>↑</span></span><h2>A clearer<br /><em>perspective awaits.</em></h2><p>Sameer Majeed<br /><span>Precision in numbers. Perspective in decisions.</span></p><a className="entrance-enter" href="#hero" onClick={enter}>STEP INSIDE <span className="entrance-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16m-6-6 6 6 6-6"/></svg></span></a></div>
        <div className="entrance-foot"><span>LAHORE → RIYADH</span><span>SCROLL TO OPEN THE DOORS</span><span>EST. 2014</span></div>
      </div>
    </div>
  </section>;
}
