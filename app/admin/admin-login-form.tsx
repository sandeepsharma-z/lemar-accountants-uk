"use client";

import Image from "next/image";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", credentials: "same-origin", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setError(result.error || "Unable to sign in."); setLoading(false); return; }
    window.location.assign("/admin");
  }

  return <main className="admin-login-page">
    <section className="admin-login-brand"><div className="admin-login-brand-inner"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants" width={330} height={112} priority /><p className="admin-eyebrow">SECURE ADMINISTRATION</p><h1>Your enquiries.<br /><span>Organised beautifully.</span></h1><p>Review every website enquiry, keep client details current and manage follow-up from one secure workspace.</p><div className="admin-login-points"><span><i>01</i>Protected access</span><span><i>02</i>Real-time enquiries</span><span><i>03</i>Simple workflow</span></div></div></section>
    <section className="admin-login-panel"><a className="admin-back-link" href="/">Back to website <ArrowRight /></a><form onSubmit={login} className="admin-login-card"><div className="admin-lock"><LockKeyhole /></div><p className="admin-eyebrow">WELCOME BACK</p><h2>Sign in to your dashboard</h2><p>Use your Lemar administrator credentials.</p><label>Email address<div><Mail /><input name="email" type="email" autoComplete="username" required placeholder="ML@lemaraccountants.co.uk" /></div></label><label>Password<div><LockKeyhole /><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>{error && <p className="admin-form-error" role="alert">{error}</p>}<button className="admin-primary-button" type="submit" disabled={loading}>{loading ? "Signing in..." : <>Sign in securely <ArrowRight /></>}</button><small>Authorised users only. Sessions expire automatically after 8 hours.</small></form></section>
  </main>;
}
