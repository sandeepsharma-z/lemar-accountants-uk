"use client";

import Image from "next/image";
import { ArrowRight, BarChart3, BookOpenCheck, BriefcaseBusiness, Building2, Check, ChevronDown, ChevronRight, CirclePoundSterling, ClipboardCheck, FileBarChart, FileCheck2, Handshake, Landmark, Mail, MapPin, Menu, Phone, ReceiptText, Search, ShieldCheck, Smartphone, Store, TrendingUp, UsersRound, WalletCards, X } from "lucide-react";
import { useEffect, useState } from "react";
import ServiceMenu from "./service-menu";
import SiteFooter from "./site-footer";
import SiteSearch from "./site-search";
import { serviceDetails } from "../services/service-detail-data";
import "../about/about.css";
import "../services/bookkeeping-accounts/bookkeeping.css";

const inclusionIcons = [ReceiptText, Landmark, WalletCards, CirclePoundSterling, FileCheck2, FileBarChart];
const clientIcons = [Store, Building2, BriefcaseBusiness, TrendingUp];
const processSteps = [
  { icon: Handshake, title: "Initial Review", copy: "We discuss your current position, records, deadlines and the outcome you need from the service." },
  { icon: ClipboardCheck, title: "Information Collected", copy: "You receive a clear information request and a practical process for sharing the relevant records." },
  { icon: BookOpenCheck, title: "Work Prepared", copy: "We review the information, complete the agreed work and raise focused questions where clarification is needed." },
  { icon: BarChart3, title: "Review & Support", copy: "We explain the outcome, agree next steps and maintain an organised timetable for future work." },
];

function BrandIcon({ name }: { name: "facebook" | "instagram" | "linkedin" }) {
  if (name === "facebook") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.8l.42-3.15H13.6V7.84c0-.91.26-1.53 1.62-1.53h1.73V3.5c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.48-4.22 4.22v2.25H7.36V13h2.84v8h3.4Z" /></svg>;
  if (name === "instagram") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.45H2.4V21h2.8V8.45ZM3.8 3A1.7 1.7 0 1 0 3.8 6.4 1.7 1.7 0 0 0 3.8 3ZM21.6 13.8c0-3.78-2.02-5.54-4.72-5.54-2.17 0-3.15 1.2-3.7 2.04V8.45h-2.8V21h2.8v-6.22c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.88 2.03 3.34V21h2.8l.04-7.2Z" /></svg>;
}

export default function ServiceDetailTemplate({ slug }: { slug: string }) {
  const detail = serviceDetails[slug];
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let frame = 0;
    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const distance = currentScrollY - previousScrollY;
      if (menuOpen || currentScrollY <= 20) setHeaderHidden(false);
      else if (Math.abs(distance) >= 6) setHeaderHidden(distance > 0);
      previousScrollY = currentScrollY;
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateHeader); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [menuOpen]);

  if (!detail) return null;

  return (
    <main className="bookkeeping-page about-page">
      <div className="about-topbar"><div className="about-container about-topbar-inner"><div className="about-top-contacts"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Smartphone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a><span><MapPin />220 Church Road, Northolt UB5 5AE</span></div><div className="about-top-actions"><div className="about-socials"><a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon name="instagram" /></a></div><a className="about-top-cta" href="/#callback">Book a Free Consultation <ArrowRight /></a></div></div></div>
      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}><div className="about-container about-nav-wrap"><a className="about-logo" href="/" aria-label="Lemar Accountants home"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority /></a><nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation"><a href="/">Home</a><a href="/about">About Us</a><ServiceMenu active /><a href="/tax-resources">Tax Resources</a><a href="/contact">Contact</a></nav><div className="about-nav-tools"><SiteSearch /><button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div></div></header>

      <section className="bk-hero"><Image src={detail.heroImage} alt={`${detail.kicker.toLowerCase()} professional accounting support`} fill priority className="bk-hero-image" sizes="100vw" /><div className="bk-hero-overlay" /><div className="about-container bk-hero-inner"><div className="bk-hero-copy"><p className="bk-kicker">{detail.kicker}</p><h1>{detail.heroTitle}<br /><span>{detail.heroAccent}</span></h1><p>{detail.lead}</p><div className="bk-actions"><a className="about-btn about-btn-gold" href="/#callback">Book a Consultation <ArrowRight /></a><a className="about-btn about-btn-outline" href="#service-includes">What&apos;s Included <ArrowRight /></a></div></div></div><Image src="/images/hero-ribbon-v3.png" alt="" fill className="bk-hero-ribbon" sizes="100vw" aria-hidden="true" /></section>

      <section className="bk-section bk-overview"><div className="about-container bk-split"><div className="bk-copy"><p className="bk-kicker">{detail.overviewKicker}</p><h2>{detail.overviewTitle}</h2>{detail.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<ul>{detail.bullets.map(item => <li key={item}><Check />{item}</li>)}</ul></div><div className="bk-image-card"><Image src={detail.introImage} alt={`${detail.kicker.toLowerCase()} records and professional support`} fill sizes="(max-width: 800px) 100vw, 48vw" /></div></div></section>

      <section className="bk-section bk-inclusions" id="service-includes"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>WHAT WE TAKE CARE OF</span><i /></p><h2>{detail.includesTitle}</h2><p>{detail.includesIntro}</p></div><div className="bk-inclusion-grid">{detail.inclusions.map(({ title, copy }, index) => { const Icon = inclusionIcons[index]; return <article key={title}><span><Icon /></span><h3>{title}</h3><p>{copy}</p></article>; })}</div></div></section>

      <section className="bk-section bk-clients"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>WHO WE SUPPORT</span><i /></p><h2>{detail.clientsTitle}</h2><p>{detail.clientsIntro}</p></div><div className="bk-client-grid">{detail.clients.map(({ title, copy }, index) => { const Icon = clientIcons[index]; return <article key={title}><Icon /><div><h3>{title}</h3><p>{copy}</p></div></article>; })}</div></div></section>

      <section className="bk-benefits"><div className="about-container"><div className="bk-benefits-copy"><p className="bk-kicker">WHY THIS SERVICE MATTERS</p><h2>{detail.benefitsTitle}<br /><span>{detail.benefitsAccent}</span></h2><p>{detail.benefitsCopy}</p></div><div className="bk-benefit-grid"><div><ShieldCheck /><strong>Clearer<br />Compliance</strong></div><div><Search /><strong>Better Financial<br />Visibility</strong></div><div><TrendingUp /><strong>Confident<br />Planning</strong></div><div><UsersRound /><strong>Practical<br />Support</strong></div></div></div></section>

      <section className="bk-section bk-process"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>HOW IT WORKS</span><i /></p><h2>A Simple &amp; Reliable Process</h2><p>{detail.processIntro}</p></div><div className="bk-process-grid">{processSteps.map(({ icon: Icon, title, copy }, index) => <article key={title}><span className="bk-number">{String(index + 1).padStart(2, "0")}</span><span className="bk-process-icon"><Icon /></span><h3>{title}</h3><p>{copy}</p>{index < processSteps.length - 1 && <ChevronRight className="bk-process-arrow" />}</article>)}</div></div></section>

      <section className="bk-section bk-reporting"><div className="about-container bk-split"><div className="bk-report-image"><Image src={detail.reportImage} alt={`${detail.kicker.toLowerCase()} planning and financial review`} fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="bk-copy"><p className="bk-kicker">{detail.reportingKicker}</p><h2>{detail.reportingTitle}</h2>{detail.reporting.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="about-btn about-btn-gold" href="/#callback">Discuss Your Requirements <ArrowRight /></a></div></div></section>

      <section className="bk-section bk-faq"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>FREQUENTLY ASKED QUESTIONS</span><i /></p><h2>{detail.kicker.charAt(0) + detail.kicker.slice(1).toLowerCase()} Questions, Clearly Answered</h2><p>Practical answers to common questions before beginning this service with Lemar Accountants.</p></div><div className="bk-faq-list">{[0, 1].map(column => <div className="bk-faq-column" key={column}>{detail.faqs.map(([question, answer], index) => index % 2 === column ? <article className={openFaq === index ? "is-open" : ""} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button><div><p>{answer}</p></div></article> : null)}</div>)}</div><div className="bk-faq-mobile">{detail.faqs.map(([question, answer], index) => <article className={openFaq === index ? "is-open" : ""} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button><div><p>{answer}</p></div></article>)}</div></div></section>

      <section className="bk-cta"><div className="about-container bk-cta-inner"><div><p className="bk-kicker">{detail.ctaKicker}</p><h2>{detail.ctaTitle}</h2><p>{detail.ctaCopy}</p><div className="bk-cta-contact"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Phone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a></div></div><div className="bk-cta-actions"><a className="about-btn about-btn-gold" href="/#callback">Book a Consultation <ArrowRight /></a><a className="about-btn about-btn-outline" href="/services">View All Services <ArrowRight /></a></div></div></section>

      <SiteFooter id="service-footer" />
    </main>
  );
}
