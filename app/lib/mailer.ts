import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { getEmailSettings } from "./email-settings";

type EnquiryEmail = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  sourcePage: string;
  message: string;
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);

function emailShell(content: string) {
  return `<div style="margin:0;padding:32px 16px;background:#f2f4f5;font-family:Arial,sans-serif;color:#08243a"><div style="max-width:640px;margin:0 auto;overflow:hidden;border-radius:12px;background:#fff;box-shadow:0 10px 35px rgba(0,31,53,.12)"><div style="padding:24px 30px;background:#00243d;color:#fff;border-bottom:4px solid #e6a832"><div style="font-family:Georgia,serif;font-size:28px;font-weight:700">LEMAR</div><div style="margin-top:4px;color:#f0b542;font-size:11px;letter-spacing:2px">ACCOUNTANTS &amp; TAX ADVISORS</div></div><div style="padding:30px">${content}</div><div style="padding:18px 30px;background:#f8f9f9;color:#687680;font-size:12px">Lemar Accountants · 220 Church Road, Northolt UB5 5AE · 020 3441 1664</div></div></div>`;
}

function transport(settings: Awaited<ReturnType<typeof getEmailSettings>>) {
  return nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpSecure,
    auth: { user: settings.smtpUser, pass: settings.smtpPassword },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 18000,
  });
}

function getBusinessRecipients(settings: Awaited<ReturnType<typeof getEmailSettings>>) {
  return [...new Set(
    [settings.notificationEmail, settings.additionalNotificationEmail]
      .map(email => email.trim().toLowerCase())
      .filter(Boolean),
  )];
}

function acceptedBySmtp(result: PromiseSettledResult<SMTPTransport.SentMessageInfo>) {
  return result.status === "fulfilled" && result.value.accepted.length > 0 && result.value.rejected.length === 0;
}

export async function sendEnquiryEmails(enquiry: EnquiryEmail) {
  const settings = await getEmailSettings();
  if (!settings.enabled || !settings.hasPassword || !settings.smtpPassword) {
    return { adminStatus: "not_configured", customerStatus: "not_configured", error: null };
  }

  const sender = `"${settings.senderName.replace(/["\r\n]/g, "")}" <${settings.smtpUser}>`;
  const mailer = transport(settings);
  const businessRecipients = getBusinessRecipients(settings);
  const adminHtml = emailShell(`<p style="margin:0 0 8px;color:#d28d1f;font-size:12px;font-weight:700;letter-spacing:1.6px">NEW WEBSITE ENQUIRY</p><h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;color:#08243a">${escapeHtml(enquiry.fullName)} has contacted Lemar</h1><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:10px 0;color:#71808a;width:125px">Email</td><td style="padding:10px 0;font-weight:700"><a href="mailto:${escapeHtml(enquiry.email)}" style="color:#0b557e">${escapeHtml(enquiry.email)}</a></td></tr><tr><td style="padding:10px 0;color:#71808a">Phone</td><td style="padding:10px 0;font-weight:700">${escapeHtml(enquiry.phone)}</td></tr><tr><td style="padding:10px 0;color:#71808a">Service</td><td style="padding:10px 0;font-weight:700">${escapeHtml(enquiry.service)}</td></tr><tr><td style="padding:10px 0;color:#71808a">Source</td><td style="padding:10px 0">${escapeHtml(enquiry.sourcePage)}</td></tr></table><div style="margin-top:20px;padding:18px;border-left:4px solid #e6a832;background:#f8f6f1;line-height:1.6">${escapeHtml(enquiry.message || "No additional message provided.").replace(/\n/g, "<br>")}</div><p style="margin:24px 0 0"><a href="mailto:${escapeHtml(enquiry.email)}?subject=${encodeURIComponent(`Your Lemar enquiry: ${enquiry.service}`)}" style="display:inline-block;padding:13px 20px;border-radius:5px;background:#e6a832;color:#08243a;text-decoration:none;font-weight:700">Reply to ${escapeHtml(enquiry.fullName)}</a></p>`);
  const customerHtml = emailShell(`<p style="margin:0 0 8px;color:#d28d1f;font-size:12px;font-weight:700;letter-spacing:1.6px">ENQUIRY RECEIVED</p><h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:30px;color:#08243a">Thank you, ${escapeHtml(enquiry.fullName)}.</h1><p style="margin:0;color:#435664;font-size:15px;line-height:1.7">${escapeHtml(settings.customerMessage).replace(/\n/g, "<br>")}</p><div style="margin-top:24px;padding:18px;border-radius:7px;background:#f8f6f1"><strong style="display:block;margin-bottom:7px;color:#08243a">Your enquiry</strong><span style="color:#65747e;font-size:14px">${escapeHtml(enquiry.service)}</span></div><p style="margin:24px 0 0;color:#435664;font-size:14px;line-height:1.6">If your enquiry is urgent, call us on <a href="tel:02034411664" style="color:#b87815;font-weight:700">020 3441 1664</a>.</p>`);

  const deliveryResults = await Promise.allSettled([
    ...businessRecipients.map(recipient => mailer.sendMail({ from: sender, to: recipient, replyTo: enquiry.email, subject: `New Lemar enquiry: ${enquiry.fullName} — ${enquiry.service}`, html: adminHtml })),
    mailer.sendMail({ from: sender, to: enquiry.email, replyTo: settings.replyToEmail, subject: settings.customerSubject, html: customerHtml }),
  ]);
  const businessResults = deliveryResults.slice(0, businessRecipients.length);
  const customerResult = deliveryResults[businessRecipients.length];
  const businessFailures = businessResults.flatMap((result, index) => {
    if (acceptedBySmtp(result)) {
      console.info("Enquiry business notification accepted", { recipient: businessRecipients[index] });
      return [];
    }
    const reason = result.status === "rejected" ? String(result.reason?.message || result.reason) : "SMTP did not accept the recipient";
    return [`${businessRecipients[index]}: ${reason}`];
  });
  const customerAccepted = acceptedBySmtp(customerResult);
  const customerFailure = customerAccepted
    ? []
    : [customerResult.status === "rejected" ? String(customerResult.reason?.message || customerResult.reason) : "Customer email was not accepted by SMTP"];
  return {
    adminStatus: businessFailures.length === 0 && businessRecipients.length > 0 ? "sent" : "failed",
    customerStatus: customerAccepted ? "sent" : "failed",
    error: [...businessFailures, ...customerFailure].join(" | ").slice(0, 2000) || null,
  };
}

export async function sendEmailSettingsTest() {
  const settings = await getEmailSettings();
  if (!settings.hasPassword || !settings.smtpPassword) throw new Error("Enter and save the SMTP password first.");
  const mailer = transport(settings);
  const businessRecipients = getBusinessRecipients(settings);
  await mailer.verify();
  const testResults = await Promise.allSettled(businessRecipients.map(recipient => mailer.sendMail({
    from: `"${settings.senderName.replace(/["\r\n]/g, "")}" <${settings.smtpUser}>`,
    to: recipient,
    replyTo: settings.replyToEmail,
    subject: "Lemar website email test successful",
    html: emailShell("<h1 style=\"margin:0 0 14px;font-family:Georgia,serif;color:#08243a\">Email settings are working.</h1><p style=\"margin:0;color:#435664;line-height:1.7\">The Lemar website can now send new enquiry notifications and customer confirmation emails.</p>"),
  })));
  const failures = testResults.flatMap((result, index) => acceptedBySmtp(result) ? [] : [businessRecipients[index]]);
  if (failures.length) throw new Error(`SMTP did not accept the test email for: ${failures.join(", ")}`);
}
