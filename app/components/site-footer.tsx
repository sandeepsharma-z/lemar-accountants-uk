import Image from "next/image";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

const footerServices = [
  "Bookkeeping & Accounts",
  "Tax Preparation & Planning",
  "Payroll Services",
  "VAT / Sales Tax",
  "Management Accounts",
  "Self Assessments",
  "Company Accounts",
  "Business Advisory",
];

const footerServiceRoutes: Record<string, string> = {
  "Bookkeeping & Accounts": "/services/bookkeeping-accounts",
  "Tax Preparation & Planning": "/services/tax-preparation-planning",
  "Payroll Services": "/services/payroll-services",
  "VAT / Sales Tax": "/services/vat-sales-tax",
  "Management Accounts": "/services/management-accounts",
  "Self Assessments": "/services/tax-preparation-planning",
  "Company Accounts": "/services/company-accounts",
  "Business Advisory": "/services",
};

function FooterBrandIcon({ name }: { name: "facebook" | "instagram" | "linkedin" }) {
  if (name === "facebook") {
    return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.8l.42-3.15H13.6V7.84c0-.91.26-1.53 1.62-1.53h1.73V3.5c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.48-4.22 4.22v2.25H7.36V13h2.84v8h3.4Z" /></svg>;
  }

  if (name === "instagram") {
    return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle className="brand-dot" cx="17.45" cy="6.7" r="1.05" /></svg>;
  }

  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.45H2.4V21h2.8V8.45ZM3.8 3A1.7 1.7 0 1 0 3.8 6.4 1.7 1.7 0 0 0 3.8 3ZM21.6 13.8c0-3.78-2.02-5.54-4.72-5.54-2.17 0-3.15 1.2-3.7 2.04V8.45h-2.8V21h2.8v-6.22c0-1.64.31-3.23 2.35-3.23 2 0 2.03 1.88 2.03 3.34V21h2.8l.04-7.2Z" /></svg>;
}

export default function SiteFooter({ id = "footer" }: { id?: string }) {
  return (
    <footer className="footer" id={id}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="logo logo-light" href="/" aria-label="Lemar Accountants home">
            <Image className="logo-image" src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants and Tax Advisors, Chartered Certified Accountant" width={330} height={112} />
          </a>
          <p>Professional accountancy and tax services for individuals, businesses and landlords.</p>
          <div className="socials footer-socials">
            <a href="https://www.instagram.com/lemar_accountantsltd?jplx=b3BnZnVsNmJkbmp3&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram"><FooterBrandIcon name="instagram" /></a>
          </div>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="/#home">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/tax-resources">Tax Resources</a>
          <a href="/contact">Contact</a>
        </div>

        <div>
          <h3>Our Services</h3>
          {footerServices.map(service => <a href={footerServiceRoutes[service] ?? "/services"} key={service}>{service}</a>)}
        </div>

        <div className="contact-list">
          <h3>Contact Us</h3>
          <a href="tel:02034411664"><Phone />020 3441 1664</a>
          <a href="tel:+447551930360"><Phone />07551 930360</a>
          <a href="mailto:ML@lemaraccountants.co.uk"><Mail />ML@lemaraccountants.co.uk</a>
          <span><MapPin />226 Church Road, Northolt UB5 5AE</span>
          <span><Clock3 />8:30 AM &ndash; 6:30 PM, 7 days a week</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>&copy; 2026 Lemar Accountants. All rights reserved.</span>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
