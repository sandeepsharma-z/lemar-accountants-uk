"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Clock3,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Send,
  Smartphone,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import ServiceMenu from "../components/service-menu";
import SiteFooter from "../components/site-footer";
import SiteSearch from "../components/site-search";
import { enquiryServiceOptions } from "../lib/service-options";
import { submitEnquiry } from "../lib/submit-enquiry";
import "../about/about.css";
import "./contact.css";

const contactCards = [
  { icon: Phone, title: "Phone", lines: ["020 3441 1664"], href: "tel:02034411664" },
  { icon: Smartphone, title: "Mobile", lines: ["07551 930360"], href: "tel:+447551930360" },
  { icon: Mail, title: "Email", lines: ["ML@lemaraccountants.co.uk"], href: "mailto:ML@lemaraccountants.co.uk" },
  { icon: Globe2, title: "Website", lines: ["www.lemar", "accountants.co.uk"], href: "/" },
  { icon: MapPin, title: "Address", lines: ["220 Church Road,", "Northolt UB5 5AE"], href: "https://www.google.com/maps?q=220+Church+Road,+Northolt+UB5+5AE" },
];

const benefits = [
  { icon: Award, title: "Trusted Advice", copy: "Clear, practical and up-to-date accountancy guidance." },
  { icon: Headphones, title: "Reliable Support", copy: "A responsive team that is here whenever you need help." },
  { icon: Zap, title: "Fast Response", copy: "We aim to respond promptly and keep you fully informed." },
  { icon: UsersRound, title: "Personal Service", copy: "A tailored approach built around your individual needs." },
];

function BrandIcon() {
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
}

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

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

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setFormError("");

    try {
      await submitEnquiry({
        enquiryType: "contact",
        fullName: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || ""),
        service: String(data.get("service") || ""),
        message: String(data.get("message") || ""),
        sourcePage: "Contact page enquiry form",
        website: String(data.get("website") || ""),
      });
      form.reset();
      setSent(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "We could not send your enquiry. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page about-page">
      <div className="about-topbar">
        <div className="about-container about-topbar-inner">
          <div className="about-top-contacts">
            <a href="tel:02034411664"><Phone />020 3441 1664</a>
            <a href="tel:+447551930360"><Smartphone />07551 930360</a>
            <a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a>
            <span><MapPin />220 Church Road, Northolt UB5 5AE</span>
          </div>
          <div className="about-top-actions">
            <div className="about-socials">
              <a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><BrandIcon /></a>
            </div>
            <a className="about-top-cta" href="#contact-form">Request a Consultation <ArrowRight /></a>
          </div>
        </div>
      </div>

      <header className={`about-header${headerHidden ? " is-hidden" : ""}`}>
        <div className="about-container about-nav-wrap">
          <a className="about-logo" href="/" aria-label="Lemar Accountants home">
            <Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors" width={330} height={112} priority />
          </a>
          <nav className={`about-nav${menuOpen ? " open" : ""}`} aria-label="Primary navigation">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <ServiceMenu onNavigate={() => setMenuOpen(false)} />
            <a href="/tax-resources">Tax Resources</a>
            <a className="active" href="/contact">Contact</a>
          </nav>
          <div className="about-nav-tools">
            <SiteSearch />
            <button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <section className="contact-hero">
        <Image src="/images/contact-page/contact-hero-v2.png" alt="Premium Lemar contact banner with calculator, financial reports and navy-gold curved design" fill priority className="contact-hero-image" sizes="100vw" />
        <div className="about-container contact-hero-inner">
          <div className="contact-hero-copy">
            <p className="about-kicker contact-kicker"><span>CONTACT US</span><i /></p>
            <h1>Get in Touch<br /><span>With Lemar</span></h1>
            <p>Individuals, businesses and landlords are welcome to get in touch with our friendly team for professional accountancy and tax support.</p>
            <div className="contact-hero-actions">
              <a className="about-btn about-btn-gold" href="#contact-form"><CalendarDays />Request a Consultation <ArrowRight /></a>
              <a className="about-btn about-btn-outline" href="tel:02034411664"><Phone />Call Us Today</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-details-section">
        <div className="about-container">
          <div className="contact-heading">
            <p className="about-kicker contact-kicker"><span>CONTACT DETAILS</span><i /></p>
            <h2>Get in Touch</h2>
            <p>Reach out to us using the details below. We&apos;re here to help with your accountancy, tax and business needs.</p>
          </div>
          <div className="contact-detail-grid">
            {contactCards.map(({ icon: Icon, title, lines, href }) => (
              <a href={href} key={title} target={title === "Address" ? "_blank" : undefined} rel={title === "Address" ? "noreferrer" : undefined}>
                <span><Icon /></span><h3>{title}</h3><p>{lines.map(line => <span key={line}>{line}</span>)}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-enquiry" id="contact-form">
        <div className="contact-enquiry-visual">
          <Image src="/images/contact-page/contact-enquiry-v4-transparent.png" alt="Professional accountant completing a financial report inside a navy and gold curved design" fill className="contact-enquiry-image" sizes="(max-width: 800px) 100vw, 41vw" />
          <div className="contact-enquiry-copy">
            <p className="about-kicker contact-kicker"><span>SEND US A MESSAGE</span><i /></p>
            <h2>Enquire Online</h2>
            <p>Complete the form and a member of our team will get back to you shortly.</p>
          </div>
        </div>
        <div className="contact-enquiry-form-wrap">
          {sent ? (
            <div className="contact-success" role="status"><Send /><div><h3>Your enquiry has been received.</h3><p>Thank you. A member of our team will get back to you shortly.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div></div>
          ) : (
            <form className="contact-form" onSubmit={submitForm}>
              <label>Full Name <b>*</b><input type="text" name="name" placeholder="Enter your full name" required /></label>
              <label>Phone Number <b>*</b><input type="tel" name="phone" placeholder="Enter your phone number" required /></label>
              <label>Email Address <b>*</b><input type="email" name="email" placeholder="Enter your email address" required /></label>
              <label>Service Needed <b>*</b><select name="service" defaultValue="" required><option value="" disabled>Please select a service</option>{enquiryServiceOptions.map(service => <option key={service} value={service}>{service}</option>)}</select></label>
              <label>Message <b>*</b><textarea name="message" placeholder="Tell us how we can help you" required /></label>
              <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="about-btn about-btn-gold" type="submit" disabled={submitting}><Send />{submitting ? "Sending..." : "Send Message"}</button>
              {formError && <p className="public-form-error" role="alert">{formError}</p>}
            </form>
          )}
        </div>
      </section>

      <section className="contact-location">
        <div className="about-container">
          <div className="contact-heading">
            <p className="about-kicker contact-kicker"><span>OUR LOCATION &amp; HOURS</span><i /></p>
            <h2>Office Location &amp; Business Hours</h2>
            <p>Visit us at our office in Northolt or get in touch during our working hours.</p>
          </div>
          <div className="contact-location-grid">
            <div className="contact-map">
              <iframe title="Lemar Accountants office location" src="https://www.google.com/maps?q=Lemar+Accountants+%26+Tax+Advisors,+220+Church+Road,+Northolt+UB5+5AE&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <div className="contact-location-card">
              <div><MapPin /><p><strong>Our Office</strong><span>220 Church Road,<br />Northolt UB5 5AE</span></p></div>
              <div><Clock3 /><p><strong>Business Hours</strong><span className="contact-hours"><span>Every day:</span><b>8:30 AM – 6:30 PM</b></span></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-benefits">
        <div className="about-container">
          <div className="contact-heading">
            <p className="about-kicker contact-kicker"><span>WHY CONTACT US</span><i /></p>
            <h2>The Lemar Difference</h2>
            <p>When you contact Lemar, you can expect a friendly, professional and responsive service focused on your needs.</p>
          </div>
          <div className="contact-benefit-grid">
            {benefits.map(({ icon: Icon, title, copy }) => <article key={title}><span><Icon /></span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="about-container contact-cta-inner">
          <div><h2>Request a Consultation <span>Today</span></h2><p>Speak to our team about your accountancy, tax or business requirements. We&apos;re here to help.</p></div>
          <a className="about-btn about-btn-gold" href="#contact-form"><CalendarDays />Request a Consultation <ArrowRight /></a>
        </div>
      </section>

      <SiteFooter id="contact-footer" />
    </main>
  );
}
