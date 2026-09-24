"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CERTIFICATES, EMPLOYERS, PROFILE, ROLES } from "@/lib/career-data";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import "./portfolio.css";
import "./cinematic.css";
import "./refinements.css";
import "./entrance.css";
import { OpeningSequence } from "./OpeningSequence";

const links = [["about", "About"], ["expertise", "Expertise"], ["experience", "Experience"], ["credentials", "Credentials"]];
const expertise = [
  { title: "Planning for what’s next.", tag: "Financial planning & analysis", text: "Annual budgets, quarterly forecasts and long-range plans. Turning assumptions into a clear financial direction.", type: "bars", skills: "Budgeting / Forecasting / Financial modelling" },
  { title: "Seeing the whole picture.", tag: "Reporting & intelligence", text: "Management reporting, performance dashboards and variance analysis that bring the right questions into focus.", type: "line", skills: "Power BI / KPIs / Management reporting" },
  { title: "Confidence in the foundations.", tag: "Control & governance", text: "The discipline of audit, the rigour of IFRS and the systems that keep a finance function moving with confidence.", type: "rings", skills: "IFRS / Audit / SAP / Financial control" },
];

function Arrow({ diagonal = true }: { diagonal?: boolean }) { return <span className="arrow-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}/></svg></span>; }

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [active, setActive] = useState("");
  const [certificate, setCertificate] = useState<(typeof CERTIFICATES)[number] | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-intro > *", { y: 32, opacity: 0, duration: 1.2, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: ".hero", start: "top 75%", once: true } });
        gsap.from(".portrait-panel", { opacity: 0, y: 35, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: ".hero", start: "top 75%", once: true } });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
          gsap.from(el, { y: 35, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 93%", once: true } });
        });
        gsap.to(".portrait-image", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
        gsap.from(".bar-chart i", { scaleY: .1, transformOrigin: "bottom", stagger: .09, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".bar-chart", start: "top 90%", once: true } });
        gsap.from(".financial-visual.line svg", { clipPath: "inset(0 100% 0 0)", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: ".financial-visual.line", start: "top 90%", once: true } });
        gsap.utils.toArray<HTMLElement>(".chapter-responsibilities li").forEach(row => {
          gsap.from(row, { y: 18, opacity: 0, duration: .65, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 96%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".certificate-frame").forEach(frame => {
          gsap.from(frame, { y: 25, rotation: 2, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: frame, start: "top 90%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".experience-chapter").forEach(chapter => {
          gsap.from(chapter.querySelector(".chapter-content"), { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: chapter, start: "top 80%", once: true } });
          gsap.from(chapter.querySelector(".chapter-progress span"), { scaleX: 0, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: chapter, start: "top 70%", end: "bottom 35%", scrub: .6 } });
        });
        gsap.from(".footer-monogram", { yPercent: 30, opacity: .2, ease: "none", scrollTrigger: { trigger: ".contact-section", start: "top bottom", end: "bottom bottom", scrub: 1 } });
        gsap.from(".statement-line", { scaleX: 0, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: ".statement", start: "top 85%", end: "bottom 60%", scrub: 1 } });
      }, root);
      return () => ctx.revert();
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-20% 0px -55% 0px" });
    root.current?.querySelectorAll("main > section[id]").forEach(el => observer.observe(el));
    return () => { media.revert(); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!certificate) return;
    const modal = dialog.current;
    modal?.showModal();
    getLenis()?.stop();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = old; getLenis()?.start(); };
  }, [certificate]);

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    setMenu(null);
    const lenis = getLenis();
    if (lenis) { event.preventDefault(); lenis.scrollTo(`#${id}`, { offset: -20 }); history.replaceState(null, "", `#${id}`); }
    else {
      const target = document.getElementById(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        history.replaceState(null, "", `#${id}`);
      }
    }
  }

  function renderNavigation(surface: string) {
    const expanded = menu === surface;
    return <header className={`site-header ${surface}-navigation`}>
      <a className="wordmark" href="#main" aria-label="Sameer Majeed home" onClick={e => navigate(e, "main")}>sm<span>.</span></a>
      <nav id={`${surface}-navigation`} className={expanded ? "navigation is-open" : "navigation"} aria-label={`${surface === "cover" ? "Cover" : "Profile"} navigation`}>{links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={e => navigate(e, id)}>{label}</a>)}<a className="mobile-contact" href="#contact" onClick={e => navigate(e, "contact")}>Let’s talk ↗</a></nav>
      <a className="nav-contact" href="#contact" onClick={e => navigate(e, "contact")}>Let’s talk <Arrow /></a>
      <button className="menu-toggle" aria-expanded={expanded} aria-controls={`${surface}-navigation`} aria-label={expanded ? "Close navigation" : "Open navigation"} onClick={() => setMenu(expanded ? null : surface)}>{expanded ? "Close −" : "Menu +"}</button>
    </header>;
  }

  return <div className="portfolio" ref={root}>
    <main id="main">
      <OpeningSequence navigation={renderNavigation("cover")}>
      <section id="hero" className="hero wrap">
        {renderNavigation("profile")}
        <div className="profile-chapter-label"><span>00 / THE PERSON BEHIND THE NUMBERS</span><span>THE STORY BEGINS</span></div>
        <div className="hero-intro">
          <p className="eyebrow"><span className="status-dot" /> CHARTERED ACCOUNTANT · ACA, FIPA, FFA</p>
          <h1>Behind every<br />number.<br /><em>A clearer future.</em></h1>
          <div className="hero-description"><span className="short-rule" /><p>I’m Sameer Majeed. I turn financial complexity into clarity, confidence, and a way forward.</p></div>
          <a className="pill-button" href="#experience" onClick={e => navigate(e, "experience")}>Explore my journey <Arrow /></a>
          <div className="hero-location"><span className="crosshair">⊕</span> RIYADH, SAUDI ARABIA <span className="location-line" /> FINANCE WITH PERSPECTIVE</div>
        </div>
        <div className="portrait-panel">
          <div className="portrait-grid" aria-hidden="true" />
          <span className="portrait-corner">SAMEER MAJEED / ACA · FIPA · FFA</span>
          <div className="portrait-orbit" aria-hidden="true" />
          <span className="portrait-letter" aria-hidden="true">S.</span>
          <Image className="portrait-image" src="/portrait/sameer-majeed.png" alt="Sameer Majeed, Chartered Accountant and FP&A Manager" width={1095} height={1435} sizes="(max-width: 700px) 90vw, 48vw" priority />
          <div className="portrait-caption"><div><h2>Sameer Majeed</h2><p>CHARTERED ACCOUNTANT</p></div><span className="portrait-sign">sm.</span></div>
          <div className="current-role"><span className="status-dot" /><span>Currently shaping finance at <strong>Flooss</strong></span><Arrow /></div>
        </div>
        <div className="hero-bottom"><span>PRECISION IN NUMBERS. PERSPECTIVE IN DECISIONS.</span><a href="#about" onClick={e => navigate(e, "about")}>SCROLL TO DISCOVER <span>↓</span></a></div>
      </section>
      </OpeningSequence>

      <section className="employers wrap" aria-label="Organisations I have worked with">
        <div className="carousel-heading"><p className="eyebrow">A JOURNEY BUILT WITH</p><button onClick={() => setCarouselPaused(!carouselPaused)} aria-label={carouselPaused ? "Play company carousel" : "Pause company carousel"}>{carouselPaused ? "PLAY ↗" : "PAUSE Ⅱ"}</button></div>
        <div className="logo-window"><div className={`logo-track ${carouselPaused ? "is-paused" : ""}`}>{[0, 1].map(copy => <div className="logo-group" key={copy} aria-hidden={copy === 1}>{EMPLOYERS.map(company => <div className="logo-slide" key={company.id}><Image src={company.logo} alt={copy ? "" : company.name} width={150} height={65} sizes="150px" /><span>{company.name}</span></div>)}</div>)}</div></div>
      </section>

      <section id="about" className="about section-space wrap">
        <div className="section-label" data-reveal><span>01 / THE PERSPECTIVE</span><span>MORE THAN A BALANCE SHEET</span></div>
        <div className="about-grid"><h2 className="display-title" data-reveal>Numbers tell a story.<br /><em>I help make it matter.</em></h2><div className="about-copy" data-reveal><p>Good finance goes beyond getting the numbers right. It connects what happened, why it happened, and what should happen next.</p><p>With more than a decade across audit, accounting and financial planning, I bring a grounded perspective to complex decisions. From my foundations in Lahore to fintech in Riyadh, the purpose has stayed the same: make finance useful.</p><a className="text-link" href={PROFILE.linkedIn} target="_blank" rel="noreferrer">A little more about me <Arrow /></a></div></div>
        <div className="facts" data-reveal><div><strong>10<span>+</span></strong><p>Years in finance & audit</p></div><div><strong>06</strong><p>Organisations. Broader perspective.</p></div><div><strong>02</strong><p>Markets: Pakistan & Saudi Arabia</p></div><div><strong>ACA<span> / </span></strong><p>FIPA · FFA · A commitment to the craft</p></div></div>
      </section>

      <section id="expertise" className="expertise-section section-space">
        <div className="wrap"><div className="section-label" data-reveal><span>02 / WHAT I BRING</span><span>DISCIPLINE MEETS DIRECTION</span></div><div className="section-heading" data-reveal><h2 className="display-title">Clarity at every<br /><em>level of finance.</em></h2><p>A connected approach, from the<br />integrity of a ledger to the next forecast.</p></div>
          <div className="expertise-grid">{expertise.map((item, index) => <article className="expertise-card" key={item.type} data-reveal><div className="card-top"><span>0{index + 1}</span><Arrow /></div><div className={`financial-visual ${item.type}`} aria-hidden="true">{item.type === "bars" ? <div className="bar-chart">{[32, 46, 40, 64, 57, 80, 96].map((n, i) => <i key={i} style={{ height: `${n}%`, animationDelay: `${i * .12}s` }} />)}</div> : item.type === "line" ? <svg viewBox="0 0 320 160"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a4b9dd" stopOpacity=".3"/><stop offset="1" stopColor="#a4b9dd" stopOpacity="0"/></linearGradient></defs><path d="M0 140 L55 115 L100 125 L150 70 L205 87 L255 35 L320 15 V160 H0Z" fill="url(#area)"/><path d="M0 140 L55 115 L100 125 L150 70 L205 87 L255 35 L320 15" fill="none" stroke="#b9cbed" strokeWidth="2"/><circle cx="255" cy="35" r="5" fill="#b9cbed"/></svg> : <><i/><i/><i/><span>+</span></>}</div><p className="eyebrow">{item.tag}</p><h3>{item.title}</h3><p className="card-copy">{item.text}</p><div className="card-skills">{item.skills}</div></article>)}</div>
        </div>
      </section>

      <section id="experience" className="experience section-space wrap">
        <div className="section-label" data-reveal><span>03 / THE JOURNEY</span><span>2014 — PRESENT</span></div>
        <div className="journey-heading" data-reveal><h2 className="display-title">Built chapter by chapter.<br /><em>Every role. A wider perspective.</em></h2><p>From the discipline of audit in Lahore<br />to financial planning in Riyadh.</p></div>
        <div className="experience-chapters">{ROLES.map((role, i) => <article className="experience-chapter" id={`role-${role.id}`} key={role.id}>
          <div className="chapter-marker"><span className="chapter-number">0{i + 1}</span><div><p>{i === 0 ? "THE PRESENT CHAPTER" : "THE EXPERIENCE ARCHIVE"}<strong className="chapter-mobile-company">{role.company}</strong></p><span>{role.period}</span></div><div className="chapter-progress"><span /></div></div>
          <div className="chapter-content"><div className="chapter-identity"><div className="chapter-logo"><Image src={role.logo} alt={role.company} width={180} height={80} sizes="180px" /></div><p className="eyebrow">{role.location}</p><h3>{role.company}</h3><p className="chapter-role">{role.role}</p><span className="chapter-coordinate">{role.location.includes("Riyadh") ? "24.7136° N / 46.6753° E" : "31.5204° N / 74.3587° E"}</span></div><div className="chapter-responsibilities"><p className="eyebrow">THE WORK / THE RESPONSIBILITY</p><ul>{role.responsibilities.map((text, j) => <li key={text}><span>{String(j + 1).padStart(2, "0")}</span><p>{text}</p></li>)}</ul><p className="chapter-end">{i === 0 ? "LOOKING FORWARD, WITH PERSPECTIVE." : "ANOTHER CHAPTER. A STRONGER FOUNDATION."}<Arrow /></p></div></div>
        </article>)}</div>
      </section>

      <section className="statement"><div className="wrap"><p className="eyebrow" data-reveal>THE PRINCIPLE THAT CONNECTS IT ALL</p><h2 data-reveal>Precision is the foundation.<br /><em>Clarity is the real value.</em></h2><div className="statement-line"/><p className="statement-sign" data-reveal>Sameer Majeed <span>ACA · FIPA · FFA</span></p></div></section>

      <section id="credentials" className="credentials section-space wrap"><div className="section-label" data-reveal><span>04 / PROFESSIONAL FOUNDATIONS</span><span>LEARNING. PRACTICE. PROGRESS.</span></div><div className="section-heading" data-reveal><h2 className="display-title">A commitment<br /><em>to the craft.</em></h2><p>Professional qualifications and continued learning.<br />Select a credential to view the original certificate.</p></div><div className="certificate-gallery">{CERTIFICATES.map((cert, i) => <button className={`certificate-card certificate-card-${i}`} key={cert.id} onClick={() => setCertificate(cert)} data-reveal><span className="certificate-card-top"><span>ARCHIVE / 0{i + 1}</span><span>{cert.date}</span></span><span className="certificate-frame"><Image src={cert.img} alt={cert.alt} width={600} height={450} sizes="(max-width: 600px) 85vw, 40vw" /></span><span className="certificate-card-bottom"><span><strong>{cert.title}</strong><span>{cert.issuer}</span></span><span className="certificate-view" aria-label="View certificate"><Arrow /></span></span></button>)}</div></section>

      <section id="contact" className="contact-section"><div className="wrap"><div className="section-label" data-reveal><span>05 / THE NEXT CONVERSATION</span><span><span className="status-dot"/> BASED IN RIYADH · CONNECTED GLOBALLY</span></div><div className="contact-main"><div data-reveal><h2>Let’s make<br /><em>what’s next count.</em></h2><p>Financial strategy, a new opportunity, or a shared perspective.<br />Good things start with a conversation.</p></div><a className="contact-circle" href={`mailto:${PROFILE.email}`} aria-label="Email Sameer Majeed"><Arrow /></a></div><div className="contact-links" data-reveal><a href={`mailto:${PROFILE.email}`}>{PROFILE.email} <Arrow /></a><a href={PROFILE.linkedIn} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div><div className="footer-directory"><div><p className="eyebrow">A CONVERSATION CAN CHANGE THE OUTLOOK.</p><p>Finance with precision.<br />Partnership with perspective.</p></div><nav aria-label="Footer navigation">{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={e => navigate(e, id)}>{label} <Arrow /></a>)}</nav><div className="footer-location"><span>RIYADH, SAUDI ARABIA</span><span>ACA · FIPA · FFA</span><span>LAHORE → RIYADH</span></div></div><div className="footer-monogram" aria-hidden="true">Sameer Majeed<span>.</span></div><footer><a className="wordmark" href="#main" onClick={e => navigate(e, "main")}>sm<span>.</span></a><p>© {new Date().getFullYear()} Sameer Majeed</p><a href="#main" onClick={e => navigate(e, "main")}>BACK TO TOP ↑</a></footer></div></section>
    </main>
    <dialog ref={dialog} className="certificate-modal" onClose={() => setCertificate(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} aria-labelledby="certificate-title" data-lenis-prevent>{certificate && <div className="modal-content"><div className="modal-heading"><div><h2 id="certificate-title">{certificate.title}</h2><p>{certificate.standing}</p></div><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close certificate">✕</button></div><div className="certificate-image"><Image src={certificate.img} alt={certificate.alt} width={1200} height={900} sizes="90vw" /></div><a className="text-link" href={certificate.img} target="_blank" rel="noreferrer">Open original certificate <Arrow /></a></div>}</dialog>
  </div>;
}


