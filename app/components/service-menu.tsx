import { ChevronDown } from "lucide-react";

export const serviceLinks = [
  { label: "Bookkeeping & Accounts", href: "/services/bookkeeping-accounts" },
  { label: "Tax Preparation & Planning", href: "/services/tax-preparation-planning" },
  { label: "Payroll Services", href: "/services/payroll-services" },
  { label: "VAT / Sales Tax", href: "/services/vat-sales-tax" },
  { label: "Management Accounts", href: "/services/management-accounts" },
  { label: "Company Accounts", href: "/services/company-accounts" },
];

export default function ServiceMenu({ active = false, onNavigate }: { active?: boolean; onNavigate?: () => void }) {
  return (
    <div className={`services-menu${active ? " is-active" : ""}`}>
      <a className={active ? "active" : ""} href="/services" onClick={onNavigate}>Services <ChevronDown /></a>
      <div className="services-submenu" aria-label="Services submenu">
        {serviceLinks.map(service => <a href={service.href} onClick={onNavigate} key={service.href}>{service.label}</a>)}
      </div>
    </div>
  );
}
