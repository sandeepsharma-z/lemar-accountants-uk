"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const searchItems = [
  { title: "Home", description: "Lemar Accountants homepage", href: "/" },
  { title: "About Us", description: "Our firm, purpose and values", href: "/about" },
  { title: "Accounting & Tax Services", description: "Explore all professional services", href: "/services" },
  { title: "Bookkeeping & Accounts", description: "Accurate, organised business records", href: "/services/bookkeeping-accounts" },
  { title: "Tax Preparation & Planning", description: "Tax returns, compliance and forward planning", href: "/services/tax-preparation-planning" },
  { title: "Payroll Services", description: "Reliable payroll processing and support", href: "/services/payroll-services" },
  { title: "VAT / Sales Tax", description: "VAT registration, records and returns", href: "/services/vat-sales-tax" },
  { title: "Management Accounts", description: "Clear reporting for better decisions", href: "/services/management-accounts" },
  { title: "Company Accounts", description: "Year-end accounts and filing support", href: "/services/company-accounts" },
  { title: "Self Assessments", description: "Straightforward personal tax return support", href: "/services/tax-preparation-planning" },
  { title: "Business Advisory", description: "Practical support for sustainable growth", href: "/services" },
  { title: "Tax Resources", description: "Deadlines, guidance and useful information", href: "/tax-resources" },
  { title: "Contact Lemar", description: "Phone, email, office hours and enquiry form", href: "/contact" },
  { title: "Privacy Policy", description: "How we collect and protect personal information", href: "/privacy-policy" },
  { title: "Terms & Conditions", description: "Terms governing use of this website", href: "/terms-and-conditions" },
];

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return searchItems.slice(0, 7);
    return searchItems.filter(item => `${item.title} ${item.description}`.toLowerCase().includes(term));
  }, [query]);

  return (
    <>
      <button className="site-search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Search website"><Search /></button>
      {open && (
        <div className="site-search-overlay" role="dialog" aria-modal="true" aria-label="Search Lemar website" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div className="site-search-panel">
            <div className="site-search-head">
              <div><span>SEARCH LEMAR</span><h2>How can we help?</h2></div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search"><X /></button>
            </div>
            <label className="site-search-field">
              <Search />
              <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search services, resources or pages..." />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X /></button>}
            </label>
            <div className="site-search-results" aria-live="polite">
              {results.length ? results.map(item => (
                <a href={item.href} key={`${item.title}-${item.href}`} onClick={() => setOpen(false)}>
                  <strong>{item.title}</strong><span>{item.description}</span>
                </a>
              )) : <p>No matching pages found. Try “tax”, “payroll” or “contact”.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
