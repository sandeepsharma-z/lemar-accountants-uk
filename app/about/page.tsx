"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  Eye,
  Handshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import SiteFooter from "../components/site-footer";
import ServiceMenu from "../components/service-menu";
import SiteSearch from "../components/site-search";
import "./about.css";

const values = [
  { icon: Handshake, title: "Integrity", copy: "Honest, transparent, and ethical in everything we do." },
  { icon: UsersRound, title: "Client First", copy: "Your goals are at the centre of every solution we provide." },
  { icon: ShieldCheck, title: "Accuracy", copy: "Reliable, compliant and detail-oriented financial services." },
  { icon: TrendingUp, title: "Growth", copy: "Helping you achieve sustainable financial success." },
];

function BrandIcon({ name }: { name: "facebook" | "instagram" | "linkedin" | "youtube" }) {
  if (name === "facebook") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.8l.42-3.15H13.6V7.84c0-.91.26-1.53 1.62-1.53h1.73V3.5c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.48-4.22 4.22v2.25H7.36V13h2.84v8h3.4Z" /></svg>;
  if (name === "instagram") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
  if (name === "youtube") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.2 7.2a2.7 2.7 0 0 0-1.9-1.9C17.62 4.85 12 4.85 12 4.85s-5.62 0-7.3.45a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2.35 12a28 28 0 0 0 .45 4.8 2.7 2.7 0 0 0 1.9 1.9c1.68.45 7.3.45 7.3.45s5.62 0 7.3-.45a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .45-4.8 28 28 0 0 0-.45-4.8ZM10 15.1V8.9l5.3 3.1-5.3 3.1Z" /></svg>;
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.45H2.4V21h2.8V8.45ZM3.8 3A1.7 1.7 0 1 0 3.8 6.4 1.7 1.7 0 0 0 3.8 3ZM21.6 13.8c0-3.78-2.02-5.54-4.72-5.54-2.17 0-3.15 1.2-3.7 2.04V8.45h-2.8V21h2.8v-6.22c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.88 2.03 3.34V21h2.8l.04-7.2Z" /></svg>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`about-logo${light ? " is-light" : ""}`} href="/" aria-label="Lemar Accountants home"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority={!light} /></a>;
}

export default function AboutPage() {
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
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  return (
    <main className="about-page">
      <div className="about-topbar">
        <div className="about-container about-topbar-inner">
          <div className="about-top-contacts">
            <a href="tel:02034411664"><Phone />020 3441 1664</a>
            <a href="tel:+447551930360"><Smartphone />07551 930360</a>
            <a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a>
            <span><MapPin />226 Church Road, Northolt UB5 5AE</span>
          </div>
          <div className="about-top-actions">
            <div className="about-socials"><a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon name="instagram" /></a></div>
            <a className="about-top-cta" href="/#callback">Book a Free Consultation <ArrowRight /></a>
          </div>
        </div>
      </div>

      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}>
        <div className="about-container about-nav-wrap">
          <Logo />
          <nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation">
            <a href="/">Home</a>
            <a className="active" href="/about">About Us</a>
            <ServiceMenu />
            <a href="/tax-resources">Tax Resources</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="about-nav-tools"><SiteSearch /><button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <section className="about-hero">
        <Image src="/images/about-page/about-hero-generated.png" alt="Premium accounting desk with reports, pens, laptop and calculator" fill priority className="about-hero-image" sizes="100vw" />
        <div className="about-hero-overlay" />
        <div className="about-container about-hero-inner">
          <div className="about-hero-copy">
            <p className="about-kicker">ABOUT US</p>
            <h1>Your Trusted Partner in<br /><span>Accounting &amp; Financial<br />Excellence</span></h1>
            <p>Learn more about Lemar, our journey, values, and commitment to helping businesses and individuals achieve financial success.</p>
            <div className="about-hero-actions"><a className="about-btn about-btn-gold" href="/services">Our Services <ArrowRight /></a><a className="about-btn about-btn-outline" href="/#callback">Contact Us</a></div>
          </div>
        </div>
        <Image src="/images/hero-ribbon-v3.png" alt="" fill className="about-hero-ribbon" sizes="100vw" aria-hidden="true" />
      </section>

      <section className="about-intro">
        <div className="about-container">
          <div className="about-intro-grid">
            <div className="about-intro-copy">
              <p className="about-kicker">WHO WE ARE</p>
              <h2>About Lemar Accounting<br />&amp; Tax Services</h2>
              <p>Lemar is a professional accounting and financial services firm dedicated to delivering accurate, reliable, and personalised solutions for businesses and individuals. With a focus on compliance, growth, and long-term financial health, we help our clients make smarter financial decisions with confidence.</p>
            </div>
            <div className="about-office-card">
              <Image src="/images/about-page/about-office-branded-v2.png" alt="Modern Lemar accounting office reception with the Lemar logo mounted on the marble wall" fill sizes="(max-width: 800px) 100vw, 48vw" />
            </div>
          </div>
          <div className="about-stats">
            <div><UsersRound /><p><strong>500+</strong><span>Happy Clients</span></p></div>
            <div><BriefcaseBusiness /><p><strong>10+</strong><span>Years of Experience</span></p></div>
            <div><BarChart3 /><p><strong>1500+</strong><span>Returns Filed</span></p></div>
            <div><Award /><p><strong>98%</strong><span>Client Satisfaction</span></p></div>
          </div>
        </div>
      </section>

      <section className="about-purpose">
        <div className="about-purpose-photo-shell"><Image src="/images/about-page/about-mission-generated.png" alt="Accountant reviewing blue and gold financial charts" fill sizes="50vw" /></div>
        <div className="about-container about-purpose-inner">
          <div className="about-purpose-copy">
            <p className="about-kicker">OUR PURPOSE</p>
            <h2>Our Vision &amp; Mission</h2>
            <div className="purpose-row"><span><Eye /></span><div><h3>Our Vision</h3><p>To be a leading accounting and financial services partner known for trust, expertise, and long-term client success.</p></div></div>
            <div className="purpose-row"><span><Target /></span><div><h3>Our Mission</h3><p>To provide accurate, compliant, and value-driven financial solutions that empower our clients to grow and succeed.</p></div></div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-container">
          <div className="about-section-heading"><h2>Our Core Values</h2><p>The principles that guide our work, our relationships, and the value we deliver.</p></div>
          <div className="about-values-grid">{values.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="about-cta">
        <svg viewBox="0 0 1024 116" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H674C656 43 625 89 568 116H0Z" fill="#002139"/><path d="M674 0C656 43 625 89 568 116H583C640 90 671 43 689 0Z" fill="#e5aa38"/></svg>
        <div className="about-container about-cta-inner"><div><h2>Let’s Build a Stronger<br />Financial Future Together</h2><p>Have questions or want to know more about how we work?<br />We’re here to help.</p></div><a className="about-btn about-btn-gold" href="/#callback">Get in Touch <ArrowRight /></a></div>
      </section>

      <SiteFooter id="about-footer" />
    </main>
  );
}
