"use client";

import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Smartphone,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ServiceMenu from "../components/service-menu";
import SiteFooter from "../components/site-footer";
import SiteSearch from "../components/site-search";
import "../about/about.css";
import "./tax-resources.css";

const instagramUrl = "https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr";

const insights = [
  {
    image: "/images/tax-deadlines.png",
    tag: "TAX DEADLINES",
    title: "Key Tax Deadlines for 2026–27",
    copy: "A practical overview of the dates individuals and businesses should keep on their radar.",
    href: "https://www.gov.uk/self-assessment-tax-returns",
  },
  {
    image: "/images/cash-flow.png",
    tag: "BUSINESS GUIDANCE",
    title: "Ways to Improve Cash Flow in Your Business",
    copy: "Simple steps to strengthen day-to-day cash flow and make financial planning more predictable.",
    href: "/services/management-accounts",
  },
  {
    image: "/images/self-assessment.png",
    tag: "SELF ASSESSMENT",
    title: "Self Assessment Made Simple",
    copy: "Understand the records, figures and preparation that make filing your tax return less stressful.",
    href: "/services/tax-preparation-planning",
  },
];

const deadlines = [
  { icon: CalendarDays, date: "31 January 2027", title: "Online Self Assessment", copy: "Online returns and payment for the 2025–26 tax year are normally due by this date." },
  { icon: Clock3, date: "22nd each month", title: "Online PAYE Payment", copy: "Monthly PAYE payments normally need to reach HMRC by the 22nd of the following tax month." },
  { icon: FileCheck2, date: "1 month + 7 days", title: "VAT Return & Payment", copy: "The usual online VAT deadline is one calendar month and seven days after the accounting period ends." },
  { icon: Building2, date: "9 months + 1 day", title: "Corporation Tax Payment", copy: "Most companies pay Corporation Tax nine months and one day after their accounting period ends." },
];

const guideTopics = [
  { icon: BookOpenCheck, title: "Keeping Better Records", copy: "Build a clear monthly routine for invoices, receipts, expenses and bank records." },
  { icon: Landmark, title: "Preparing for HMRC", copy: "Keep the right supporting documents ready and respond to requests with confidence." },
  { icon: TrendingUp, title: "Planning Ahead", copy: "Use timely figures to plan tax payments, manage cash flow and make stronger decisions." },
];

function InstagramIcon() {
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
}

export default function TaxResourcesPage() {
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
    <main className="tax-resources-page about-page">
      <div className="about-topbar">
        <div className="about-container about-topbar-inner">
          <div className="about-top-contacts">
            <a href="tel:02034411664"><Phone />020 3441 1664</a>
            <a href="tel:+447551930360"><Smartphone />07551 930360</a>
            <a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a>
            <span><MapPin />226 Church Road, Northolt UB5 5AE</span>
          </div>
          <div className="about-top-actions">
            <div className="about-socials"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a></div>
            <a className="about-top-cta" href="/contact#contact-form">Book a Free Consultation <ArrowRight /></a>
          </div>
        </div>
      </div>

      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}>
        <div className="about-container about-nav-wrap">
          <a className="about-logo" href="/" aria-label="Lemar Accountants home"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority /></a>
          <nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation">
            <a href="/">Home</a><a href="/about">About Us</a><ServiceMenu onNavigate={() => setMenuOpen(false)} /><a className="active" href="/tax-resources">Tax Resources</a><a href="/contact">Contact</a>
          </nav>
          <div className="about-nav-tools"><SiteSearch /><button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <section className="tr-hero">
        <Image src="/images/tax-deadlines.png" alt="Calculator, financial reports and tax planning documents" fill priority className="tr-hero-image" sizes="100vw" />
        <div className="tr-hero-overlay" />
        <div className="about-container tr-hero-inner">
          <div className="tr-hero-copy">
            <p className="tr-kicker">TAX &amp; BUSINESS RESOURCES</p>
            <h1>Clear Guidance for<br /><span>Confident Decisions</span></h1>
            <p>Practical tax updates, business insights and straightforward guidance to help you stay informed, organised and ready for important deadlines.</p>
            <div className="tr-hero-actions"><a className="about-btn about-btn-gold" href="#latest-guidance">Explore Resources <ArrowRight /></a><a className="about-btn about-btn-outline" href="/contact#contact-form">Ask Our Team <ArrowRight /></a></div>
          </div>
        </div>
        <div className="tr-hero-curve tr-hero-curve-gold" /><div className="tr-hero-curve tr-hero-curve-white" />
      </section>

      <section className="tr-section tr-latest" id="latest-guidance">
        <div className="about-container">
          <div className="tr-heading"><p className="tr-kicker">LATEST INSIGHTS</p><h2>Helpful Articles &amp; Guidance</h2><p>Clear information for individuals, landlords and growing businesses.</p></div>
          <div className="tr-insight-grid">
            {insights.map(item => <article key={item.title}><div className="tr-insight-image"><Image src={item.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="tr-insight-body"><span>{item.tag}</span><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>Read More <ArrowRight /></a></div></article>)}
          </div>
        </div>
      </section>

      <section className="tr-section tr-deadlines" id="tax-deadlines">
        <div className="about-container">
          <div className="tr-heading"><p className="tr-kicker">IMPORTANT TAX DATES</p><h2>Key Deadlines to Keep in Mind</h2><p>General UK filing and payment rules verified from GOV.UK. Your exact deadline can depend on your circumstances.</p></div>
          <div className="tr-deadline-grid">
            {deadlines.map(({ icon: Icon, date, title, copy }) => <article key={title}><span className="tr-deadline-icon"><Icon /></span><div><time>{date}</time><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
          <p className="tr-disclaimer">Deadlines and requirements can change. Always check your HMRC account or speak with an adviser about your specific position.</p>
        </div>
      </section>

      <section className="tr-section tr-guide" id="business-guidance">
        <div className="about-container tr-guide-grid">
          <div className="tr-guide-image"><Image src="/images/cash-flow.png" alt="Business cash-flow planning with reports, coins and growth arrows" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
          <div className="tr-guide-copy"><p className="tr-kicker">PRACTICAL BUSINESS SUPPORT</p><h2>Turn Financial Information into Better Decisions</h2><p>Good records are not only about compliance. They give you a clearer picture of cash flow, tax exposure and the decisions that can move your business forward.</p><div className="tr-topic-list">{guideTopics.map(({ icon: Icon, title, copy }) => <div key={title}><span><Icon /></span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><a className="about-btn about-btn-gold" href="/services">Explore Our Services <ArrowRight /></a></div>
        </div>
      </section>

      <section className="tr-section tr-checklist">
        <div className="about-container tr-checklist-inner"><div><p className="tr-kicker">BE PREPARED</p><h2>A Simple Year-Round Checklist</h2><p>Small, consistent habits make tax and accounts preparation much easier.</p></div><ul><li><CheckCircle2 />Keep business and personal spending separate</li><li><CheckCircle2 />Save invoices, receipts and bank records regularly</li><li><CheckCircle2 />Review cash flow and upcoming liabilities monthly</li><li><CheckCircle2 />Ask for advice before major financial decisions</li></ul></div>
      </section>

      <section className="tr-cta"><div className="about-container tr-cta-inner"><div><h2>Need Advice Specific to Your Situation?</h2><p>Speak with the Lemar team for clear, practical accountancy and tax support.</p></div><a className="about-btn about-btn-gold" href="/contact#contact-form">Book a Consultation <ArrowRight /></a></div></section>

      <SiteFooter id="tax-resources-footer" />
    </main>
  );
}
