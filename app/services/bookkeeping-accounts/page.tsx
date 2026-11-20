"use client";

import Image from "next/image";
import { ArrowRight, BarChart3, BookOpenCheck, BriefcaseBusiness, Building2, Check, ChevronDown, ChevronRight, CirclePoundSterling, ClipboardCheck, FileBarChart, FileCheck2, Handshake, Landmark, Mail, MapPin, Menu, Phone, ReceiptText, Search, ShieldCheck, Smartphone, Store, TrendingUp, UsersRound, WalletCards, X } from "lucide-react";
import { useEffect, useState } from "react";
import SiteFooter from "../../components/site-footer";
import SiteSearch from "../../components/site-search";
import ServiceMenu from "../../components/service-menu";
import "../../about/about.css";
import "./bookkeeping.css";

const inclusions = [
  { icon: ReceiptText, title: "Day-to-Day Transaction Recording", copy: "Accurate recording and categorisation of income, expenses, purchases and payments, so your books remain complete and easy to understand." },
  { icon: Landmark, title: "Bank Reconciliation", copy: "Regular reconciliation of bank and credit card accounts to identify missing entries, duplicated transactions and discrepancies early." },
  { icon: WalletCards, title: "Sales & Purchase Ledgers", copy: "Clear management of customer invoices, supplier bills, outstanding balances and payment activity across your business." },
  { icon: CirclePoundSterling, title: "Expense Management", copy: "Organised processing of receipts and business expenses with consistent categories, supporting documents and reliable audit trails." },
  { icon: FileCheck2, title: "VAT-Ready Records", copy: "Well-maintained digital records prepared for accurate VAT returns, Making Tax Digital requirements and smoother HMRC compliance." },
  { icon: FileBarChart, title: "Monthly Financial Reporting", copy: "Useful summaries showing income, expenditure, cash position and key movements, giving you better visibility of business performance." },
];

const clientTypes = [
  { icon: Store, title: "Sole Traders", copy: "Keep business and personal finances clearly separated while staying organised for Self Assessment and future planning." },
  { icon: Building2, title: "Limited Companies", copy: "Maintain reliable company records that support statutory accounts, corporation tax and director decision-making." },
  { icon: BriefcaseBusiness, title: "Landlords", copy: "Track rental income, property expenses and supporting documents across individual properties or growing portfolios." },
  { icon: TrendingUp, title: "Start-ups & Growing Businesses", copy: "Build strong financial foundations from day one and introduce dependable processes as transaction volumes increase." },
];

const process = [
  { icon: Handshake, title: "Initial Review", copy: "We discuss your business, current records, software, deadlines and the level of support you need." },
  { icon: ClipboardCheck, title: "Records Collected", copy: "You share bank information, invoices, receipts and existing bookkeeping records through an agreed process." },
  { icon: BookOpenCheck, title: "Books Updated", copy: "We record, organise and reconcile transactions, resolving questions before they become larger issues." },
  { icon: BarChart3, title: "Reports & Support", copy: "You receive clear updates and ongoing guidance that keeps your finances accurate and decision-ready." },
];

const faqs = [
  ["How often should my bookkeeping be updated?", "For most active businesses, monthly bookkeeping provides the best balance of accuracy, control and timely reporting. Higher-volume businesses may benefit from weekly updates, while smaller businesses can agree a schedule that reflects their activity and deadlines."],
  ["Can you take over from my current bookkeeper or accountant?", "Yes. We can review your existing records, identify outstanding items and agree a clean handover process. Where information is incomplete, we will explain what is needed and help bring the books up to date."],
  ["Do you work with cloud accounting software?", "Yes. We can work with established cloud accounting and digital record-keeping systems, using a process that suits how your business already raises invoices, pays suppliers and stores receipts."],
  ["Will my records be ready for VAT and year-end accounts?", "Our bookkeeping process is designed to maintain accurate, well-supported records throughout the year. This makes VAT returns, statutory accounts and tax preparation more efficient and reduces last-minute queries."],
  ["Can you help if my bookkeeping is behind?", "Yes. We can provide catch-up bookkeeping for overdue or disorganised records, reconcile available information and create a practical ongoing routine once the backlog has been addressed."],
  ["What information will I need to provide?", "This normally includes business bank statements, sales invoices, supplier bills, expense receipts and relevant payment details. We will give you a clear checklist tailored to your business rather than asking for unnecessary information."],
];

function BrandIcon({ name }: { name: "facebook" | "instagram" | "linkedin" }) {
  if (name === "facebook") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.8l.42-3.15H13.6V7.84c0-.91.26-1.53 1.62-1.53h1.73V3.5c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.48-4.22 4.22v2.25H7.36V13h2.84v8h3.4Z" /></svg>;
  if (name === "instagram") return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.45H2.4V21h2.8V8.45ZM3.8 3A1.7 1.7 0 1 0 3.8 6.4 1.7 1.7 0 0 0 3.8 3ZM21.6 13.8c0-3.78-2.02-5.54-4.72-5.54-2.17 0-3.15 1.2-3.7 2.04V8.45h-2.8V21h2.8v-6.22c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.88 2.03 3.34V21h2.8l.04-7.2Z" /></svg>;
}

export default function BookkeepingPage() {
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

  return (
    <main className="bookkeeping-page about-page">
      <div className="about-topbar"><div className="about-container about-topbar-inner"><div className="about-top-contacts"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Smartphone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a><span><MapPin />220 Church Road, Northolt UB5 5AE</span></div><div className="about-top-actions"><div className="about-socials"><a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon name="instagram" /></a></div><a className="about-top-cta" href="/#callback">Book a Free Consultation <ArrowRight /></a></div></div></div>
      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}><div className="about-container about-nav-wrap"><a className="about-logo" href="/" aria-label="Lemar Accountants home"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority /></a><nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation"><a href="/">Home</a><a href="/about">About Us</a><ServiceMenu active /><a href="/tax-resources">Tax Resources</a><a href="/contact">Contact</a></nav><div className="about-nav-tools"><SiteSearch /><button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div></div></header>

      <section className="bk-hero"><Image src="/images/service-pages/bookkeeping-hero-v1.png" alt="Professional bookkeeping workspace with calculator, reports and pens" fill priority className="bk-hero-image" sizes="100vw" /><div className="bk-hero-overlay" /><div className="about-container bk-hero-inner"><div className="bk-hero-copy"><p className="bk-kicker">BOOKKEEPING &amp; ACCOUNTS</p><h1>Clear, Reliable Bookkeeping<br /><span>for Better Business Decisions</span></h1><p>Stay organised, compliant and in control with accurate bookkeeping tailored to your business. We keep your financial records up to date, giving you more time to focus on customers, operations and growth.</p><div className="bk-actions"><a className="about-btn about-btn-gold" href="/#callback">Book a Consultation <ArrowRight /></a><a className="about-btn about-btn-outline" href="#bookkeeping-includes">What&apos;s Included <ArrowRight /></a></div></div></div><Image src="/images/hero-ribbon-v3.png" alt="" fill className="bk-hero-ribbon" sizes="100vw" aria-hidden="true" /></section>

      <section className="bk-section bk-overview"><div className="about-container bk-split"><div className="bk-copy"><p className="bk-kicker">DEPENDABLE FINANCIAL RECORDS</p><h2>Bookkeeping That Keeps Your Business in Control</h2><p>Good bookkeeping is more than entering numbers. It creates the reliable financial foundation your business needs for VAT returns, annual accounts, tax planning, cash-flow management and everyday decisions.</p><p>Our bookkeeping support is structured around your transaction volume, deadlines and existing systems. Whether you need a complete outsourced service, regular monthly assistance or help bringing historic records up to date, we provide a clear and practical process.</p><ul><li><Check />Accurate, consistently categorised transactions</li><li><Check />Regular reconciliations and discrepancy checks</li><li><Check />Organised digital records and supporting documents</li><li><Check />Clear communication when information is missing</li></ul></div><div className="bk-image-card"><Image src="/images/service-pages/bookkeeping-overview-v1.png" alt="Accountant reviewing business records and financial reports" fill sizes="(max-width: 800px) 100vw, 48vw" /></div></div></section>

      <section className="bk-section bk-inclusions" id="bookkeeping-includes"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>WHAT WE TAKE CARE OF</span><i /></p><h2>Comprehensive Bookkeeping Support</h2><p>Every service is adapted to your business, while maintaining the accurate records and clear controls needed for confident financial management.</p></div><div className="bk-inclusion-grid">{inclusions.map(({ icon: Icon, title, copy }) => <article key={title}><span><Icon /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="bk-section bk-clients"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>WHO WE SUPPORT</span><i /></p><h2>Bookkeeping Built Around Your Business</h2><p>From first-year businesses to established companies and property portfolios, we shape the bookkeeping process around how you work.</p></div><div className="bk-client-grid">{clientTypes.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="bk-benefits"><div className="about-container"><div className="bk-benefits-copy"><p className="bk-kicker">WHY PROFESSIONAL BOOKKEEPING MATTERS</p><h2>Better Records. Clearer Decisions.<br /><span>More Time for Your Business.</span></h2><p>Up-to-date books reduce uncertainty and give you a dependable view of where your business stands. That means fewer surprises, smoother deadlines and better conversations about future plans.</p></div><div className="bk-benefit-grid"><div><ShieldCheck /><strong>Improved<br />Compliance</strong></div><div><Search /><strong>Clear Financial<br />Visibility</strong></div><div><TrendingUp /><strong>Better Business<br />Planning</strong></div><div><UsersRound /><strong>Less Admin<br />Pressure</strong></div></div></div></section>

      <section className="bk-section bk-process"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>HOW IT WORKS</span><i /></p><h2>A Simple &amp; Reliable Bookkeeping Process</h2><p>We agree a straightforward routine for sharing records, resolving queries and keeping your accounts current throughout the year.</p></div><div className="bk-process-grid">{process.map(({ icon: Icon, title, copy }, index) => <article key={title}><span className="bk-number">{String(index + 1).padStart(2, "0")}</span><span className="bk-process-icon"><Icon /></span><h3>{title}</h3><p>{copy}</p>{index < process.length - 1 && <ChevronRight className="bk-process-arrow" />}</article>)}</div></div></section>

      <section className="bk-section bk-reporting"><div className="about-container bk-split"><div className="bk-report-image"><Image src="/images/service-pages/bookkeeping-reporting-v1.png" alt="Financial reporting and business cash flow analysis" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="bk-copy"><p className="bk-kicker">MORE THAN DATA ENTRY</p><h2>Useful Records That Support Your Next Decision</h2><p>Accurate bookkeeping should make the rest of your financial work easier. By maintaining organised ledgers and reconciled balances, we create a stronger starting point for VAT, accounts preparation, tax discussions and management reporting.</p><p>Where appropriate, we can provide regular summaries and highlight unusual movements, overdue information or areas requiring attention. You remain informed without needing to spend valuable time maintaining the books yourself.</p><a className="about-btn about-btn-gold" href="/#callback">Discuss Your Bookkeeping <ArrowRight /></a></div></div></section>

      <section className="bk-section bk-faq"><div className="about-container"><div className="bk-heading"><p className="bk-kicker"><span>FREQUENTLY ASKED QUESTIONS</span><i /></p><h2>Bookkeeping Questions, Clearly Answered</h2><p>Practical answers to the questions businesses commonly ask before moving to an outsourced bookkeeping service.</p></div><div className="bk-faq-list">{[0, 1].map(column => <div className="bk-faq-column" key={column}>{faqs.map(([question, answer], index) => index % 2 === column ? <article className={openFaq === index ? "is-open" : ""} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button><div><p>{answer}</p></div></article> : null)}</div>)}</div><div className="bk-faq-mobile">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "is-open" : ""} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button><div><p>{answer}</p></div></article>)}</div></div></section>

      <section className="bk-cta"><div className="about-container bk-cta-inner"><div><p className="bk-kicker">LET&apos;S GET YOUR BOOKS IN ORDER</p><h2>Reliable Bookkeeping Starts with a Simple Conversation</h2><p>Tell us how your records are currently managed and where you need support. We&apos;ll explain a clear way forward for your business.</p><div className="bk-cta-contact"><a href="tel:02034411664"><Phone />020 3441 1664</a><a href="tel:+447551930360"><Phone />07551 930360</a><a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a></div></div><div className="bk-cta-actions"><a className="about-btn about-btn-gold" href="/#callback">Book a Consultation <ArrowRight /></a><a className="about-btn about-btn-outline" href="/services">View All Services <ArrowRight /></a></div></div></section>

      <SiteFooter id="bookkeeping-footer" />
    </main>
  );
}
