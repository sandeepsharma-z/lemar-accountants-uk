"use client";

import Image from "next/image";
import {
  ArrowRight, BarChart3, Building2, CalendarDays,
  Check, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound, ClipboardList,
  FileText, Handshake, Lightbulb, Mail, MapPin,
  Menu, MessageCircleMore, Phone, PoundSterling, Search, ShieldCheck, Smartphone, Star,
  TrendingUp, UsersRound, X
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import SiteFooter from "./components/site-footer";
import ServiceMenu from "./components/service-menu";
import SiteSearch from "./components/site-search";

const heroSlides = [
  {
    image: "/images/hero-slide-1-v3.png",
    alt: "Calculator, pens and blue and gold financial charts on a premium accounting desk",
    eyebrow: "CHARTERED CERTIFIED ACCOUNTANTS",
    title: "Accounting Today",
    accentOne: "for a Brighter",
    accentTwo: "Tomorrow",
    lead: "Professional accountancy, tax and business advisory services for individuals and businesses across Northolt and the wider UK.",
    primary: "Book a Free Consultation",
    secondary: "Our Services",
    proof: [["Trusted", "Accountants"], ["Clear", "Fixed Fees"], ["Personalised", "Support"], ["Helping You", "Grow"]],
  },
  {
    image: "/images/hero-slide-2-v3.png",
    alt: "Professional accountant reviewing a tax report beside a laptop",
    eyebrow: "PROACTIVE TAX PLANNING",
    title: "Tax Planning Today",
    accentOne: "for a Stronger",
    accentTwo: "Future",
    lead: "Practical tax planning and preparation designed to protect your income, keep you compliant and help you move forward confidently.",
    primary: "Plan My Taxes",
    secondary: "Tax Services",
    proof: [["Tax", "Efficient"], ["HMRC", "Ready"], ["Forward", "Planning"], ["Clear", "Advice"]],
  },
  {
    image: "/images/hero-slide-3-v3.png",
    alt: "Business advisers reviewing an upward growth chart together",
    eyebrow: "BUSINESS ADVISORY & GROWTH",
    title: "Business Support",
    accentOne: "for Lasting",
    accentTwo: "Growth",
    lead: "Clear financial insight, management reporting and strategic advice to help your business make better decisions and grow sustainably.",
    primary: "Book a Growth Review",
    secondary: "Advisory Services",
    proof: [["Growth", "Focused"], ["Clear", "Reporting"], ["Strategic", "Support"], ["By Your", "Side"]],
  },
];

const services = [
  { icon: BarChart3, title: "Bookkeeping & Accounts", copy: "Keep your finances organised and compliant." },
  { icon: FileText, title: "Tax Preparation & Planning", copy: "Minimise your tax and plan ahead with confidence." },
  { icon: UsersRound, title: "Payroll Services", copy: "Accurate and timely payroll for your business." },
  { icon: PoundSterling, title: "VAT / Sales Tax", copy: "Registration, returns and ongoing support." },
  { icon: TrendingUp, title: "Management Accounts", copy: "Insightful reports to help you make better decisions." },
  { icon: CircleUserRound, title: "Self Assessments", copy: "Simple and stress-free self assessment tax returns." },
  { icon: Building2, title: "Company Accounts", copy: "Statutory accounts and companies house filing." },
  { icon: Lightbulb, title: "Business Advisory", copy: "Strategic advice to help your business grow." },
];

const serviceRoutes: Record<string, string> = {
  "Bookkeeping & Accounts": "/services/bookkeeping-accounts",
  "Tax Preparation & Planning": "/services/tax-preparation-planning",
  "Payroll Services": "/services/payroll-services",
  "VAT / Sales Tax": "/services/vat-sales-tax",
  "Management Accounts": "/services/management-accounts",
  "Self Assessments": "/services/tax-preparation-planning",
  "Company Accounts": "/services/company-accounts",
  "Business Advisory": "/services",
};

const testimonials = [
  { quote: "Lemar Accountants have been professional, responsive and genuinely helpful throughout. They keep our bookkeeping organised, explain every figure clearly and make sure important deadlines are never missed. I would confidently recommend them to any growing business.", name: "S. Ahmed", role: "Business Owner" },
  { quote: "They made my self assessment and tax return completely straightforward and stress-free. Every question was answered in plain English, communication was quick, and I always knew exactly what was happening at each stage.", name: "R. Khan", role: "Individual Client" },
  { quote: "Reliable, knowledgeable and approachable from our very first conversation. The team provides clear advice, responds quickly whenever we need support and has given us much greater confidence in our company finances and future planning.", name: "A. Patel", role: "Limited Company Director" },
  { quote: "The service is personal, proactive and consistently dependable. We receive practical guidance rather than complicated jargon, our accounts stay well organised, and we always have a clear understanding of where the business stands.", name: "M. Lewis", role: "Company Director" },
];

const resources = [
  { image: "/images/tax-deadlines.png", title: "Key Tax Deadlines for 2026–27", copy: "Stay on top of important dates for your personal and business tax.", href: "/tax-resources#tax-deadlines" },
  { image: "/images/cash-flow.png", title: "Ways to Improve Cash Flow in Your Business", copy: "Practical tips to keep your business healthy and growing.", href: "/tax-resources#business-guidance" },
  { image: "/images/self-assessment.png", title: "Self Assessment Made Simple", copy: "A step-by-step guide to filing your self assessment tax return.", href: "/services/tax-preparation-planning" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#home" aria-label="Lemar Accountants home">
      <Image className="logo-image" src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors, Chartered Certified Accountant" width={330} height={112} priority={!light} />
    </a>
  );
}

function BrandIcon({ name }: { name: "facebook" | "instagram" | "linkedin" }) {
  if (name === "facebook") {
    return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.8l.42-3.15H13.6V7.84c0-.91.26-1.53 1.62-1.53h1.73V3.5c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.48-4.22 4.22v2.25H7.36V13h2.84v8h3.4Z" /></svg>;
  }
  if (name === "instagram") {
    return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
  }
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.45H2.4V21h2.8V8.45ZM3.8 3A1.7 1.7 0 1 0 3.8 6.4 1.7 1.7 0 0 0 3.8 3ZM21.6 13.8c0-3.78-2.02-5.54-4.72-5.54-2.17 0-3.15 1.2-3.7 2.04V8.45h-2.8V21h2.8v-6.22c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.88 2.03 3.34V21h2.8l.04-7.2Z" /></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => {
      setHeroSlide(current => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let animationFrame = 0;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const distance = currentScrollY - previousScrollY;

      if (menuOpen || currentScrollY <= 20) {
        setHeaderHidden(false);
      } else if (Math.abs(distance) >= 6) {
        setHeaderHidden(distance > 0);
      }

      previousScrollY = currentScrollY;
      animationFrame = 0;
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [menuOpen]);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "callback",
          fullName: String(data.get("name") || ""),
          phone: String(data.get("phone") || ""),
          email: String(data.get("email") || ""),
          service: String(data.get("service") || "General enquiry"),
          sourcePage: "Homepage callback form",
          website: String(data.get("website") || ""),
        }),
      });
      if (!response.ok) throw new Error("Unable to submit your callback request.");
      form.reset();
      setSent(true);
    } catch {
      setFormError("We could not submit your request. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const proofIcons = [UsersRound, ShieldCheck, BarChart3, Handshake];

  return (
    <main id="home">
      <div className="topbar">
          <div className="container topbar-inner">
            <div className="top-contacts">
              <a href="tel:02034411664"><Phone size={13} /> 020 3441 1664</a>
              <a href="tel:+447551930360"><Smartphone size={13} /> 07551 930360</a>
              <a href="mailto:ML@lemaraccountants.co.uk"><Mail size={13} /> ML@lemaraccountants.co.uk</a>
              <span><MapPin size={13} /> 220 Church Road, Northolt UB5 5AE</span>
            </div>
            <div className="top-actions">
              <div className="socials"><a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon name="instagram" /></a></div>
              <a className="top-cta" href="#callback">Book a Free Consultation <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>

      <header className={`header sticky-header${headerHidden ? " is-hidden" : ""}`}>
          <div className="container nav-wrap">
            <Logo />
            <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
              <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="/about" onClick={() => setMenuOpen(false)}>About Us</a>
              <ServiceMenu onNavigate={() => setMenuOpen(false)} />
              <a href="/tax-resources" onClick={() => setMenuOpen(false)}>Tax Resources</a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </nav>
            <div className="nav-tools"><SiteSearch /><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
          </div>
      </header>

      <section className="hero" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onFocus={() => setHeroPaused(true)} onBlur={() => setHeroPaused(false)}>
        <div className="hero-slides" style={{ transform: `translate3d(-${heroSlide * 100}%, 0, 0)` }} aria-live="polite">
          {heroSlides.map((slide, index) => (
            <div className="hero-slide-frame" key={slide.image} aria-hidden={index !== heroSlide} inert={index !== heroSlide}>
              <Image src={slide.image} alt={slide.alt} fill priority={index === 0} className="hero-image" sizes="100vw" />
              <div className="hero-wash" />
              <div className="container hero-inner">
                <div className="hero-copy">
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <h1>{slide.title}<br /><span>{slide.accentOne}<br />{slide.accentTwo}</span></h1>
                  <p className="hero-lead">{slide.lead}</p>
                  <div className="hero-actions"><a className="btn btn-gold" href="#callback"><CalendarDays size={18} /> {slide.primary} <ArrowRight size={16} /></a><a className="btn btn-outline" href="/services">{slide.secondary} <ArrowRight size={16} /></a></div>
                  <div className="hero-proof">
                    {slide.proof.map((label, proofIndex) => {
                      const ProofIcon = proofIcons[proofIndex];
                      return <div key={label.join("-")}><ProofIcon /><span>{label[0]}<br />{label[1]}</span></div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="hero-arrow hero-arrow-left" type="button" aria-label="Previous hero slide" onClick={() => setHeroSlide(current => (current - 1 + heroSlides.length) % heroSlides.length)}><ChevronLeft /></button>
        <button className="hero-arrow hero-arrow-right" type="button" aria-label="Next hero slide" onClick={() => setHeroSlide(current => (current + 1) % heroSlides.length)}><ChevronRight /></button>
        <Image className="hero-ribbon-image" src="/images/hero-ribbon-v3.png" alt="" fill sizes="100vw" aria-hidden="true" />
      </section>

      <section className="section services" id="services">
        <div className="container">
          <div className="section-heading row-heading"><div><p className="eyebrow">OUR SERVICES</p><h2>Comprehensive Accountancy<br />and Tax Services</h2><p>Tailored solutions for individuals, sole traders and limited companies.</p></div><a className="btn btn-line" href="/services">View All Services <ArrowRight size={15} /></a></div>
          <div className="service-grid" id="all-services">
            {services.map(({ icon: Icon, title, copy }) => <article className="service-card" key={title}><Icon /><div><h3>{title}</h3><p>{copy}</p><a href={serviceRoutes[title] ?? "/services"}>Learn More <ArrowRight size={14} /></a></div></article>)}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <Image src="/images/about-accountant-v3.png" alt="Accountant writing on a financial report beside a laptop" fill className="about-image" sizes="100vw" />
        <svg className="about-sweep" viewBox="0 0 1600 535" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="about-gold-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b9781b" />
              <stop offset="0.52" stopColor="#f4cb6c" />
              <stop offset="1" stopColor="#b66d15" />
            </linearGradient>
          </defs>
          <path fill="url(#about-gold-sweep)" d="M0 0H864C872 166 932 388 1104 535H0Z" />
          <path fill="#001f35" d="M0 0H846C854 166 914 388 1086 535H0Z" />
        </svg>
        <div className="about-overlay" />
        <div className="container about-inner">
          <div className="about-copy"><p className="eyebrow">WHY CHOOSE LEMAR ACCOUNTANTS?</p><h2>More Than Numbers<br /><span>Building Brighter Futures</span></h2><p>We are a friendly and professional firm of Chartered Certified Accountants, committed to providing high-quality, personalised accountancy and tax services.</p>
            <ul>{["Chartered Certified Accountant", "Experienced and approachable", "Clear and transparent fees", "Tailored advice for individuals and businesses", "Focused on helping you grow"].map(item => <li key={item}><Check /> {item}</li>)}</ul>
            <a className="btn btn-gold compact" href="#story">About Us <ArrowRight size={15} /></a>
          </div>
          <div className="priority-card"><BarChart3 /><strong>Your Finances<br />Our Priority</strong><span>ACCOUNT&nbsp; | &nbsp;PLAN&nbsp; | &nbsp;GROW</span></div>
        </div>
      </section>

      <section className="section process" id="story">
        <div className="container"><div className="section-heading"><p className="eyebrow">HOW WE WORK</p><h2>A Simple &amp; Clear Process</h2><p>We make accountancy straightforward, so you can focus on what matters most.</p></div>
          <div className="process-grid">
            {[{n:"01",icon:MessageCircleMore,title:"Get in Touch",copy:"Speak to us or request a call back."},{n:"02",icon:Search,title:"Understand Your Needs",copy:"We learn about your individual or business requirements."},{n:"03",icon:ClipboardList,title:"Tailored Plan",copy:"We provide clear advice and a plan that suits you."},{n:"04",icon:BarChart3,title:"Ongoing Support",copy:"We work with you as your business and circumstances grow."}].map(({n,icon:Icon,title,copy},i) => <article className="process-step" key={title}><span>{n}</span><Icon /><h3>{title}</h3><p>{copy}</p>{i < 3 && <ChevronRight className="step-arrow" />}</article>)}
          </div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="container"><div className="section-heading row-heading testimonial-head"><div><p className="eyebrow">CLIENT TESTIMONIALS</p><h2>What Our Clients Say</h2><p>Trusted by individuals and businesses across the UK.</p></div><div className="slider-buttons"><button aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)}><ChevronLeft /></button><button aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}><ChevronRight /></button></div></div>
          <div className="testimonial-grid">{[0,1,2].map(offset => { const item = testimonials[(testimonial + offset) % testimonials.length]; return <article className="testimonial-card" key={`${item.name}-${testimonial}`}><div className="stars">{[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" />)}</div><p>“{item.quote}”</p><strong>{item.name}</strong><small>{item.role}</small></article> })}</div>
        </div>
      </section>

      <section className="callback" id="callback">
        <svg className="callback-sweep" viewBox="0 0 1128 262" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="callback-gold-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#a86612" />
              <stop offset="0.48" stopColor="#f3cc71" />
              <stop offset="1" stopColor="#bb7719" />
            </linearGradient>
          </defs>
          <path className="callback-sweep-navy" d="M0 0H579C558 75 529 201 430 262H0Z" />
          <path className="callback-sweep-gold" d="M579 0C558 75 529 201 430 262H455C550 201 579 75 601 0Z" />
        </svg>
        <div className="container callback-inner"><div className="callback-copy"><span className="gold-rule" /><p className="eyebrow">REQUEST A CALL BACK</p><h2>Fill in your details and<br />we’ll get back to you.</h2></div>
          {sent ? <div className="form-success"><Check /><div><strong>Request received.</strong><p>Thank you. A member of our team will contact you shortly.</p></div></div> : <form className="callback-form" onSubmit={submitForm}><div className="form-row"><input name="name" required aria-label="Full name" placeholder="Full Name*" /><input name="phone" required aria-label="Phone number" placeholder="Phone Number*" type="tel" /></div><input name="email" required aria-label="Email address" placeholder="Email Address*" type="email" /><select name="service" required aria-label="How can we help" defaultValue=""><option value="" disabled>How can we help?</option><option>Bookkeeping &amp; Accounts</option><option>Tax Preparation &amp; Planning</option><option>Payroll Services</option><option>Business Advisory</option></select><input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="btn btn-gold" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Request a Call Back"} <ArrowRight size={15} /></button>{formError && <p className="public-form-error" role="alert">{formError}</p>}</form>}
        </div>
      </section>

      <section className="section resources" id="resources">
        <div className="container"><div className="section-heading row-heading"><div><p className="eyebrow">TAX &amp; BUSINESS RESOURCES</p><h2>Latest Insights &amp; Guidance</h2><p>Helpful articles and updates to keep you informed.</p></div><a className="btn btn-line" href="/tax-resources">View All Resources <ArrowRight size={15} /></a></div>
          <div className="resource-grid" id="resource-grid">{resources.map(item => <article className="resource-card" key={item.title}><Image src={item.image} alt="" width={640} height={340} /><div><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href}>Read More <ArrowRight size={14} /></a></div></article>)}</div>
        </div>
      </section>

      <SiteFooter id="footer" />
    </main>
  );
}
