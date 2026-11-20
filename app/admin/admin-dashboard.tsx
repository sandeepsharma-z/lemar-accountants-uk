"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight, CheckCircle2, ChevronRight, CircleDot, Clock3, ExternalLink, Inbox,
  LayoutDashboard, LogOut, Mail, MailCheck, Menu, MessageSquareText, Pencil, Phone, RefreshCw,
  Search, Trash2, UserRound, X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import EmailSettingsPanel from "./email-settings-panel";

type Enquiry = {
  id: number; enquiryType: "callback" | "contact"; fullName: string; phone: string;
  email: string; service: string; sourcePage: string; message: string | null;
  status: "new" | "in_progress" | "completed"; adminEmailStatus: string;
  customerEmailStatus: string; emailError: string | null; createdAt: string; updatedAt: string;
};
type Session = { email: string; displayName: string };
type DashboardView = "overview" | "enquiries" | "email";

const statusLabels = { new: "New", in_progress: "In progress", completed: "Completed" };
const receivedDate = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
const receivedTime = (value: string) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));

export default function AdminDashboard({ session }: { session: Session }) {
  const router = useRouter();
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<DashboardView>("overview");
  const [editing, setEditing] = useState<Enquiry | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/admin/enquiries", { cache: "no-store", credentials: "same-origin" });
    if (response.status === 401) { window.location.assign("/admin/login"); return; }
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to load enquiries.");
    else { setItems(data.enquiries); setError(""); }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const filtered = useMemo(() => items.filter(item => {
    const matchesStatus = filter === "all" || item.status === filter;
    const haystack = `${item.fullName} ${item.email} ${item.phone} ${item.service} ${item.sourcePage} ${item.message || ""}`.toLowerCase();
    return matchesStatus && haystack.includes(search.trim().toLowerCase());
  }), [items, filter, search]);

  const counts = useMemo(() => ({
    total: items.length,
    new: items.filter(item => item.status === "new").length,
    progress: items.filter(item => item.status === "in_progress").length,
    done: items.filter(item => item.status === "completed").length,
  }), [items]);
  const recent = items.slice(0, 5);

  function selectView(nextView: DashboardView, nextFilter = "all") {
    setView(nextView); setFilter(nextFilter); setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!editing) return;
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/enquiries", {
      method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, fullName: data.get("fullName"), phone: data.get("phone"), email: data.get("email"), service: data.get("service"), message: data.get("message"), status: data.get("status") }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Unable to save changes."); return; }
    setEditing(null); await load();
  }

  async function remove(item: Enquiry) {
    if (!window.confirm(`Delete enquiry from ${item.fullName}? This cannot be undone.`)) return;
    const response = await fetch(`/api/admin/enquiries?id=${item.id}`, { method: "DELETE", credentials: "same-origin" });
    if (!response.ok) { const result = await response.json(); setError(result.error || "Unable to delete enquiry."); return; }
    setItems(current => current.filter(entry => entry.id !== item.id));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    router.push("/admin/login"); router.refresh();
  }

  const enquiryTable = loading ? (
    <div className="admin-empty"><RefreshCw className="admin-spinner" /><h3>Loading enquiries</h3><p>Fetching the latest website submissions.</p></div>
  ) : filtered.length === 0 ? (
    <div className="admin-empty"><Inbox /><h3>No enquiries found</h3><p>Try another filter, or wait for a new website submission.</p></div>
  ) : (
    <div className="admin-table-wrap"><table>
      <thead><tr><th>Client</th><th>Contact</th><th>Service</th><th>Source</th><th>Received</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{filtered.map(item => <tr key={item.id}>
        <td><button className="admin-client-button" onClick={() => setEditing(item)}><strong>{item.fullName}</strong><span>{item.enquiryType === "callback" ? "Callback request" : "Contact enquiry"}</span></button></td>
        <td><div className="admin-contact-stack"><a href={`mailto:${item.email}`} title={item.email}><Mail />{item.email}</a><a href={`tel:${item.phone}`}><Phone />{item.phone}</a></div></td>
        <td><strong>{item.service}</strong><span className="admin-message-preview" title={item.message || ""}>{item.message || "No additional message"}</span></td>
        <td><span className="admin-source-pill">{item.sourcePage || "Website"}</span><span className="admin-delivery-summary"><i className={item.adminEmailStatus}>Business {item.adminEmailStatus === "sent" ? "sent" : item.adminEmailStatus.replace("_", " ")}</i><i className={item.customerEmailStatus}>Customer {item.customerEmailStatus === "sent" ? "sent" : item.customerEmailStatus.replace("_", " ")}</i></span></td>
        <td><strong>{receivedDate(item.createdAt)}</strong><span>{receivedTime(item.createdAt)}</span></td>
        <td><span className={`admin-status ${item.status}`}>{statusLabels[item.status]}</span></td>
        <td><div className="admin-row-actions"><a href={`mailto:${item.email}?subject=${encodeURIComponent(`Your Lemar enquiry: ${item.service}`)}`} aria-label={`Email ${item.fullName}`}><Mail /></a><button onClick={() => setEditing(item)} aria-label="Edit enquiry"><Pencil /></button><button className="danger" onClick={() => remove(item)} aria-label="Delete enquiry"><Trash2 /></button></div></td>
      </tr>)}</tbody>
    </table></div>
  );

  return <main className="admin-shell">
    <aside className={`admin-sidebar${sidebarOpen ? " is-open" : ""}`}>
      <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X /></button>
      <a href="/" className="admin-sidebar-logo"><Image src="/images/lemar-logo-complete-v3.png" alt="Lemar Accountants" width={330} height={112} priority /></a>
      <p className="admin-workspace-label">ADMIN WORKSPACE</p>
      <nav>
        <button className={view === "overview" ? "active" : ""} onClick={() => selectView("overview")}><LayoutDashboard />Overview</button>
        <button className={view === "enquiries" ? "active" : ""} onClick={() => selectView("enquiries")}><Inbox />All enquiries <span>{counts.total}</span></button>
        <button className={view === "email" ? "active" : ""} onClick={() => selectView("email")}><MailCheck />Email settings</button>
        <a href="/" target="_blank" rel="noreferrer"><ExternalLink />View website</a>
      </nav>
      <div className="admin-sidebar-profile"><div><UserRound /></div><p><strong>{session.displayName}</strong><a href={`mailto:${session.email}`} title={session.email}>{session.email}</a></p></div>
      <button className="admin-logout" onClick={logout}><LogOut />Sign out</button>
    </aside>

    <section className="admin-main">
      <header className="admin-topbar"><button className="admin-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu /></button><div><p className="admin-eyebrow">LEMAR ADMINISTRATION</p><h1>{view === "overview" ? "Dashboard overview" : view === "enquiries" ? "All website enquiries" : "Email settings"}</h1></div><div className="admin-date"><Clock3 /><span>{new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</span></div></header>

      {view === "overview" ? <div className="admin-content">
        <section className="admin-welcome"><div><p className="admin-eyebrow">WELCOME BACK</p><h2>Keep every conversation moving.</h2><p>Every callback and contact request is stored here automatically, with its source, service and follow-up status.</p></div><a className="admin-email-quick" href="mailto:ML@lemaraccountants.co.uk"><Mail /><span><small>Business inbox</small><strong>ML@lemaraccountants.co.uk</strong></span><ChevronRight /></a></section>
        <section className="admin-stat-grid">
          <button onClick={() => selectView("enquiries", "all")}><span><Inbox /></span><p>Total enquiries<strong>{counts.total}</strong></p></button>
          <button onClick={() => selectView("enquiries", "new")}><span><CircleDot /></span><p>New leads<strong>{counts.new}</strong></p></button>
          <button onClick={() => selectView("enquiries", "in_progress")}><span><Clock3 /></span><p>In progress<strong>{counts.progress}</strong></p></button>
          <button onClick={() => selectView("enquiries", "completed")}><span><CheckCircle2 /></span><p>Completed<strong>{counts.done}</strong></p></button>
        </section>
        <section className="admin-recent"><div className="admin-section-head"><div><p className="admin-eyebrow">LATEST ACTIVITY</p><h2>Recent enquiries</h2></div><button onClick={() => selectView("enquiries")}>View all enquiries <ArrowUpRight /></button></div>{error && <p className="admin-alert">{error}</p>}{loading ? <div className="admin-empty compact"><RefreshCw className="admin-spinner" />Loading...</div> : recent.length === 0 ? <div className="admin-empty compact"><Inbox /><h3>No enquiries yet</h3><p>New website submissions will appear here automatically.</p></div> : <div className="admin-recent-list">{recent.map(item => <button key={item.id} onClick={() => setEditing(item)}><span className="admin-avatar">{item.fullName.charAt(0).toUpperCase()}</span><span className="admin-recent-client"><strong>{item.fullName}</strong><small>{item.sourcePage || "Website"}</small></span><span className="admin-recent-service"><strong>{item.service}</strong><small>{item.email}</small></span><span className={`admin-status ${item.status}`}>{statusLabels[item.status]}</span><span className="admin-recent-date">{receivedDate(item.createdAt)}<small>{receivedTime(item.createdAt)}</small></span><ChevronRight /></button>)}</div>}</section>
      </div> : view === "enquiries" ? <div className="admin-content">
        <section className="admin-enquiries"><div className="admin-section-head"><div><p className="admin-eyebrow">CLIENT COMMUNICATION</p><h2>All enquiries</h2><p>Search, reply, update progress or remove completed records.</p></div><button onClick={load}><RefreshCw />Refresh</button></div><div className="admin-toolbar"><label><Search /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name, email, phone, service or source" /></label><div>{["all", "new", "in_progress", "completed"].map(value => <button className={filter === value ? "active" : ""} onClick={() => setFilter(value)} key={value}>{value === "all" ? `All (${counts.total})` : `${statusLabels[value as keyof typeof statusLabels]} (${value === "new" ? counts.new : value === "in_progress" ? counts.progress : counts.done})`}</button>)}</div></div>{error && <p className="admin-alert">{error}</p>}{enquiryTable}</section>
      </div> : <div className="admin-content"><EmailSettingsPanel /></div>}
    </section>

    {editing && <div className="admin-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setEditing(null); }}><form className="admin-edit-modal" onSubmit={save}>
      <div className="admin-modal-head"><div><p className="admin-eyebrow">ENQUIRY DETAILS</p><h2>{editing.fullName}</h2><span className="admin-modal-source"><MessageSquareText />{editing.sourcePage || "Website"} · received {receivedDate(editing.createdAt)} at {receivedTime(editing.createdAt)}</span></div><button type="button" onClick={() => setEditing(null)} aria-label="Close"><X /></button></div>
      <div className="admin-modal-contact"><a href={`mailto:${editing.email}`}><Mail />{editing.email}</a><a href={`tel:${editing.phone}`}><Phone />{editing.phone}</a></div><div className="admin-modal-delivery"><span className={editing.adminEmailStatus}><MailCheck />Business notification: {editing.adminEmailStatus.replace("_", " ")}</span><span className={editing.customerEmailStatus}><MailCheck />Customer confirmation: {editing.customerEmailStatus.replace("_", " ")}</span>{editing.emailError && <small>{editing.emailError}</small>}</div>
      <div className="admin-edit-grid"><label>Full name<input name="fullName" defaultValue={editing.fullName} required /></label><label>Phone<input name="phone" defaultValue={editing.phone} required /></label><label>Email<input name="email" type="email" defaultValue={editing.email} required /></label><label>Status<select name="status" defaultValue={editing.status}><option value="new">New</option><option value="in_progress">In progress</option><option value="completed">Completed</option></select></label><label className="wide">Service<input name="service" defaultValue={editing.service} required /></label><label className="wide">Message<textarea name="message" defaultValue={editing.message || ""} /></label></div>
      <div className="admin-modal-actions"><button type="button" onClick={() => setEditing(null)}>Cancel</button><a className="admin-reply-button" href={`mailto:${editing.email}?subject=${encodeURIComponent(`Your Lemar enquiry: ${editing.service}`)}`}><Mail />Reply by email</a><button className="admin-primary-button" type="submit">Save changes <ChevronRight /></button></div>
    </form></div>}
  </main>;
}
