"use client";

import Image from "next/image";
import { ArrowRight, Award, BarChart3, BookOpenCheck, BriefcaseBusiness, Calculator, ChevronDown, ChevronRight, ClipboardList, FileCheck2, Handshake, Headphones, Mail, MapPin, Menu, MessageCircleMore, Phone, Search, Smartphone, TrendingUp, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import SiteFooter from "../components/site-footer";
import SiteSearch from "../components/site-search";
import ServiceMenu from "../components/service-menu";
import "../about/about.css";
import "./services.css";

const serviceCards = [
  { icon: BookOpenCheck, title: "Bookkeeping & Accounts", href: "/services/bookkeeping-accounts", copy: "Keep your financial records accurate, organised and fully compliant, giving you clear visibility and confidence in your day-to-day finances." },
  { icon: FileCheck2, title: "Tax Preparation & Planning", href: "/services/tax-preparation-planning", copy: "Efficient and compliant tax preparation for individuals, businesses and landlords, with practical planning designed to minimise your tax liability." },
  { icon: UsersRound, title: "Payroll Services", href: "/services/payroll-services", copy: "A reliable, hassle-free payroll service covering payslips, RTI submissions, statutory compliance and ongoing employee support." },
  { icon: Calculator, title: "VAT / Sales Tax", href: "/services/vat-sales-tax", copy: "Expert VAT support including registration, accurate returns and ongoing compliance, helping your business remain firmly on track." },
  { icon: TrendingUp, title: "Management Accounts", href: "/services/management-accounts", copy: "Timely and insightful financial reports that help you monitor performance, control cash flow and make better business decisions." },
  { icon: BriefcaseBusiness, title: "Company Accounts", href: "/services/company-accounts", copy: "Preparation of statutory accounts and dependable Companies House and HMRC compliance for limited companies." },
];

const processSteps = [
  { icon: MessageCircleMore, title: "Initial Discussion", copy: "Tell us about your needs, goals and current accounting arrangements." },
  { icon: Search, title: "Understand Your Needs", copy: "We review your situation and recommend the right services for you." },
  { icon: ClipboardList, title: "Tailored Plan", copy: "You receive a clear, personalised approach with transparent next steps." },
  { icon: BarChart3, title: "Ongoing Support", copy: "We keep your accounts, tax affairs and reporting on track all year round." },
];

function BrandIcon({ name }: { name: "facebook" | "instagram" | "linkedin" }) {
  if (name === "facebook") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.8l.42-3.15H13.6V7.84c0-.91.26-1.53 1.62-1.53h1.73V3.5c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.48-4.22 4.22v2.25H7.36V13h2.84v8h3.4Z" /></svg>;
  if (name === "instagram") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.45H2.4V21h2.8V8.45ZM3.8 3A1.7 1.7 0 1 0 3.8 6.4 1.7 1.7 0 0 0 3.8 3ZM21.6 13.8c0-3.78-2.02-5.54-4.72-5.54-2.17 0-3.15 1.2-3.7 2.04V8.45h-2.8V21h2.8v-6.22c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.88 2.03 3.34V21h2.8l.04-7.2Z" /></svg>;
}

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

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

  return (
    <main className="services-page about-page">
      <div className="about-topbar"><div className="about-container about-topbar-inner"><div className="about-top-contacts"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Smartphone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a><span><MapPin />226 Church Road, Northolt UB5 5AE</span></div><div className="about-top-actions"><div className="about-socials"><a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon name="instagram" /></a></div><a className="about-top-cta" href="/#callback">Book a Free Consultation <ArrowRight /></a></div></div></div>

      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}><div className="about-container about-nav-wrap"><a className="about-logo" href="/" aria-label="Lemar Accountants home"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority /></a><nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation"><a href="/">Home</a><a href="/about">About Us</a><ServiceMenu active /><a href="/tax-resources">Tax Resources</a><a href="/contact">Contact</a></nav><div className="about-nav-tools"><SiteSearch /><button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div></div></header>

      <section className="services-hero">
        <Image src="/images/services-hero-v1.png" alt="Calculator, pens and financial reports on a professional accounting desk" fill priority className="services-hero-image" sizes="100vw" />
        <div className="services-hero-shade" />
        <div className="about-container services-hero-inner"><div className="services-hero-copy"><h1>Comprehensive<br /><span>Accounting &amp; Tax<br />Services</span></h1><p>Professional accountancy and tax services for individuals, businesses and landlords, designed to keep you compliant, profitable and focused on what you do best.</p><div className="services-hero-actions"><a className="about-btn about-btn-gold" href="/#callback">Book a Consultation <ArrowRight /></a><a className="about-btn about-btn-outline" href="#all-services">Our Services <ArrowRight /></a></div></div></div>
        <Image src="/images/hero-ribbon-v3.png" alt="" fill className="services-hero-ribbon" sizes="100vw" aria-hidden="true" />
      </section>

      <section className="services-list-section" id="all-services"><div className="about-container"><div className="services-heading"><p className="about-kicker"><span>OUR SERVICES</span><i /></p><h2>Professional Accountancy &amp; Tax Services</h2><p>A complete range of accountancy and tax services for individuals, businesses and landlords.</p></div><div className="services-cards">{serviceCards.map(({ icon: Icon, title, copy, href }) => <article key={title}><div className="services-card-title"><span><Icon /></span><h3>{title}</h3></div><p>{copy}</p><a href={href}>Learn More <ArrowRight /></a></article>)}</div></div></section>

      <section className="services-why"><Image src="/images/services-advisor-v1.png" alt="Accountant reviewing financial reports beside a laptop" fill className="services-why-image" sizes="100vw" /><svg className="services-why-shape" viewBox="0 0 1600 440" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H880C880 173 943 333 1312 440H0Z" fill="#002139" /><path d="M880 0C880 173 943 333 1312 440" fill="none" stroke="url(#servicesWhyGold)" strokeWidth="12" /><defs><linearGradient id="servicesWhyGold" x1="880" y1="0" x2="1312" y2="440" gradientUnits="userSpaceOnUse"><stop stopColor="#c37a12" /><stop offset=".5" stopColor="#f3c763" /><stop offset="1" stopColor="#c67e16" /></linearGradient></defs></svg><div className="about-container services-why-inner"><div className="services-why-copy"><p className="about-kicker"><span>WHY CHOOSE LEMAR</span><i /></p><h2>More Than Numbers...<br /><span>A Partner for Your Success</span></h2><p>We provide expert accountancy and tax services with a personal, proactive approach, helping you stay compliant, grow your business and plan for a brighter future.</p><div className="services-benefits"><div><Award /><strong>Trusted<br />Advice</strong></div><div><Headphones /><strong>Reliable<br />Support</strong></div><div><TrendingUp /><strong>Business<br />Growth</strong></div><div><Handshake /><strong>Personal<br />Service</strong></div></div></div></div></section>

      <section className="services-process"><div className="about-container"><div className="services-heading"><p className="about-kicker"><span>OUR PROCESS</span><i /></p><h2>A Simple &amp; Clear Process</h2><p>Getting started with Lemar is straightforward. Here&apos;s how we work with you:</p></div><div className="services-process-grid">{processSteps.map(({ icon: Icon, title, copy }, index) => <article key={title}><span className="services-step-number">{String(index + 1).padStart(2, "0")}</span><span className="services-step-icon"><Icon /></span><h3>{title}</h3><p>{copy}</p>{index < processSteps.length - 1 && <ChevronRight className="services-step-arrow" />}</article>)}</div></div></section>

      <section className="services-contact"><div className="about-container services-contact-inner"><div><h2>Get in Touch Today</h2><p>Let&apos;s discuss how our accountancy and tax services can support you, your business or your property portfolio.</p><div className="services-contact-details"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Phone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a></div></div><div className="services-contact-actions"><a className="about-btn about-btn-gold" href="/contact#contact-form">Book a Consultation <ArrowRight /></a><a className="about-btn about-btn-outline" href="/contact">Contact Us <ArrowRight /></a></div></div></section>

      <SiteFooter id="services-footer" />
    </main>
  );
}
