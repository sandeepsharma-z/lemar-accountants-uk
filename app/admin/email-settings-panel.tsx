"use client";

import { CheckCircle2, Eye, EyeOff, MailCheck, Send, Server, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Settings = {
  enabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  hasPassword: boolean;
  notificationEmail: string;
  replyToEmail: string;
  senderName: string;
  customerSubject: string;
  customerMessage: string;
};

const initialSettings: Settings = {
  enabled: false,
  smtpHost: "smtp.hostinger.com",
  smtpPort: 465,
  smtpSecure: true,
  smtpUser: "ML@lemaraccountants.co.uk",
  hasPassword: false,
  notificationEmail: "ML@lemaraccountants.co.uk",
  replyToEmail: "ML@lemaraccountants.co.uk",
  senderName: "Lemar Accountants",
  customerSubject: "We have received your Lemar enquiry",
  customerMessage: "Thank you for contacting Lemar Accountants. We have received your enquiry and a member of our team will get back to you shortly.",
};

export default function EmailSettingsPanel() {
  const [settings, setSettings] = useState(initialSettings);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/admin/email-settings", { cache: "no-store", credentials: "same-origin" });
      if (response.status === 401) { window.location.assign("/admin/login"); return; }
      const data = await response.json();
      if (response.ok) setSettings(data.settings);
      else setError(data.error || "Unable to load email settings.");
      setLoading(false);
    })();
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError(""); setSuccess("");
    const response = await fetch("/api/admin/email-settings", {
      method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...settings, smtpPassword: password }),
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to save email settings.");
    else {
      setSettings(current => ({ ...current, hasPassword: data.hasPassword }));
      setPassword("");
      setSuccess("Email settings saved securely.");
    }
    setSaving(false);
  }

  async function sendTest() {
    setTesting(true); setError(""); setSuccess("");
    const response = await fetch("/api/admin/email-settings", { method: "POST", credentials: "same-origin" });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to send test email.");
    else setSuccess(`Test email sent to ${settings.notificationEmail}.`);
    setTesting(false);
  }

  if (loading) return <section className="admin-email-settings"><div className="admin-empty"><Server className="admin-spinner" /><h3>Loading email settings</h3></div></section>;

  return <section className="admin-email-settings">
    <div className="admin-settings-hero"><div><p className="admin-eyebrow">EMAIL AUTOMATION</p><h2>Enquiry notifications &amp; customer replies</h2><p>Connect the Lemar mailbox once. Every new website enquiry will then reach your business inbox and the customer will receive an immediate confirmation.</p></div><div className={`admin-mail-state ${settings.enabled && settings.hasPassword ? "ready" : "pending"}`}><MailCheck /><span><small>Delivery status</small><strong>{settings.enabled && settings.hasPassword ? "Enabled" : "Setup required"}</strong></span></div></div>

    <div className="admin-settings-notes"><article><ShieldCheck /><div><strong>Password protected</strong><p>The mailbox password is encrypted before it is stored and is never displayed again.</p></div></article><article><Send /><div><strong>Two automatic emails</strong><p>One detailed lead notification for Lemar and one branded confirmation for the customer.</p></div></article><article><CheckCircle2 /><div><strong>Enquiries stay safe</strong><p>The dashboard stores every submission even if an email provider is temporarily unavailable.</p></div></article></div>

    <form className="admin-settings-form" onSubmit={save}>
      <div className="admin-settings-section-head"><div><p className="admin-eyebrow">MAILBOX CONNECTION</p><h3>Hostinger SMTP details</h3></div><label className="admin-toggle"><input type="checkbox" checked={settings.enabled} onChange={event => setSettings(current => ({ ...current, enabled: event.target.checked }))} /><span /><b>{settings.enabled ? "Email delivery on" : "Email delivery off"}</b></label></div>
      <div className="admin-settings-grid">
        <label>SMTP host<input value={settings.smtpHost} onChange={event => setSettings(current => ({ ...current, smtpHost: event.target.value }))} required /></label>
        <label>SMTP port<input type="number" min="1" max="65535" value={settings.smtpPort} onChange={event => setSettings(current => ({ ...current, smtpPort: Number(event.target.value) }))} required /></label>
        <label className="wide">Mailbox email / SMTP username<input type="email" value={settings.smtpUser} onChange={event => setSettings(current => ({ ...current, smtpUser: event.target.value }))} required /></label>
        <label className="wide">Mailbox password <small>{settings.hasPassword ? "A password is saved. Leave blank to keep it unchanged." : "Enter the password used to sign in to this mailbox."}</small><div className="admin-password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={event => setPassword(event.target.value)} placeholder={settings.hasPassword ? "Password securely saved" : "Enter mailbox password"} autoComplete="new-password" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
        <label className="admin-check-row wide"><input type="checkbox" checked={settings.smtpSecure} onChange={event => setSettings(current => ({ ...current, smtpSecure: event.target.checked }))} /><span>Use secure SSL/TLS connection (recommended for port 465)</span></label>
      </div>

      <div className="admin-settings-section-head secondary"><div><p className="admin-eyebrow">DELIVERY DETAILS</p><h3>Recipients and sender identity</h3></div></div>
      <div className="admin-settings-grid">
        <label>Business notification email<input type="email" value={settings.notificationEmail} onChange={event => setSettings(current => ({ ...current, notificationEmail: event.target.value }))} required /></label>
        <label>Customer reply-to email<input type="email" value={settings.replyToEmail} onChange={event => setSettings(current => ({ ...current, replyToEmail: event.target.value }))} required /></label>
        <label className="wide">Sender name<input value={settings.senderName} onChange={event => setSettings(current => ({ ...current, senderName: event.target.value }))} required /></label>
      </div>

      <div className="admin-settings-section-head secondary"><div><p className="admin-eyebrow">CUSTOMER CONFIRMATION</p><h3>Automatic acknowledgement email</h3></div></div>
      <div className="admin-settings-grid single">
        <label>Email subject<input value={settings.customerSubject} onChange={event => setSettings(current => ({ ...current, customerSubject: event.target.value }))} required /></label>
        <label>Confirmation message<textarea value={settings.customerMessage} onChange={event => setSettings(current => ({ ...current, customerMessage: event.target.value }))} required /></label>
      </div>

      {error && <p className="admin-alert">{error}</p>}
      {success && <p className="admin-settings-success"><CheckCircle2 />{success}</p>}
      <div className="admin-settings-actions"><button type="button" onClick={sendTest} disabled={testing || !settings.hasPassword}>{testing ? "Sending test..." : "Send test email"}</button><button className="admin-primary-button" type="submit" disabled={saving}>{saving ? "Saving securely..." : "Save email settings"}</button></div>
    </form>
  </section>;
}
