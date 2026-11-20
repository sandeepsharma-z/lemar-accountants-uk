"use client";

import Image from "next/image";
import { ArrowRight, Mail, MapPin, Menu, Phone, Smartphone, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import ServiceMenu from "./service-menu";
import SiteFooter from "./site-footer";
import SiteSearch from "./site-search";

export default function LegalPageShell({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;
    const update = () => {
      const current = window.scrollY;
      const distance = current - previous;
      if (menuOpen || current <= 20) setHeaderHidden(false);
      else if (Math.abs(distance) >= 6) setHeaderHidden(distance > 0);
      previous = current;
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [menuOpen]);

  return (
    <main className="legal-page about-page">
      <div className="about-topbar"><div className="about-container about-topbar-inner"><div className="about-top-contacts"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Smartphone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a><span><MapPin />220 Church Road, Northolt UB5 5AE</span></div><div className="about-top-actions"><div className="about-socials"><a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg></a></div><a className="about-top-cta" href="/#callback">Book a Free Consultation <ArrowRight /></a></div></div></div>
      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}><div className="about-container about-nav-wrap"><a className="about-logo" href="/" aria-label="Lemar Accountants home"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority /></a><nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation"><a href="/">Home</a><a href="/about">About Us</a><ServiceMenu /><a href="/tax-resources">Tax Resources</a><a href="/contact">Contact</a></nav><div className="about-nav-tools"><SiteSearch /><button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div></div></header>
      <section className="legal-hero"><div className="about-container"><p className="about-kicker">{kicker}</p><h1>{title}</h1><p>{intro}</p></div></section>
      <section className="legal-content"><div className="about-container legal-content-inner">{children}</div></section>
      <SiteFooter id="legal-footer" />
    </main>
  );
}
