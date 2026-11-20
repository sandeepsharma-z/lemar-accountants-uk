import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/auth";
import { encryptEmailPassword, getEmailSettings } from "../../../lib/email-settings";
import { ensureSchema, getPool } from "../../../lib/db";
import { sendEmailSettingsTest } from "../../../lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function authorised() { return Boolean(await getAdminSession()); }

export async function GET() {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const settings = await getEmailSettings();
  const { smtpPassword: _password, ...safeSettings } = settings;
  return NextResponse.json({ settings: safeSettings });
}

export async function PATCH(request: Request) {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  try {
    const body = await request.json();
    const current = await getEmailSettings();
    const enabled = Boolean(body.enabled);
    const smtpHost = clean(body.smtpHost, 190);
    const smtpPort = Number(body.smtpPort);
    const smtpSecure = Boolean(body.smtpSecure);
    const smtpUser = clean(body.smtpUser, 190).toLowerCase();
    const smtpPassword = clean(body.smtpPassword, 500);
    const notificationEmail = clean(body.notificationEmail, 190).toLowerCase();
    const replyToEmail = clean(body.replyToEmail, 190).toLowerCase();
    const senderName = clean(body.senderName, 120);
    const customerSubject = clean(body.customerSubject, 190);
    const customerMessage = clean(body.customerMessage, 5000);
    if (!smtpHost || !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535 || !isEmail(smtpUser) || !isEmail(notificationEmail) || !isEmail(replyToEmail) || !senderName || !customerSubject || !customerMessage) {
      return NextResponse.json({ error: "Please complete all email settings with valid values." }, { status: 400 });
    }
    if (enabled && !smtpPassword && !current.hasPassword) {
      return NextResponse.json({ error: "Enter the mailbox password before enabling email delivery." }, { status: 400 });
    }
    await ensureSchema();
    if (smtpPassword) {
      await getPool().execute(
        "UPDATE email_settings SET enabled=?, smtp_host=?, smtp_port=?, smtp_secure=?, smtp_user=?, smtp_password_encrypted=?, notification_email=?, reply_to_email=?, sender_name=?, customer_subject=?, customer_message=? WHERE id=1",
        [enabled, smtpHost, smtpPort, smtpSecure, smtpUser, encryptEmailPassword(smtpPassword), notificationEmail, replyToEmail, senderName, customerSubject, customerMessage],
      );
    } else {
      await getPool().execute(
        "UPDATE email_settings SET enabled=?, smtp_host=?, smtp_port=?, smtp_secure=?, smtp_user=?, notification_email=?, reply_to_email=?, sender_name=?, customer_subject=?, customer_message=? WHERE id=1",
        [enabled, smtpHost, smtpPort, smtpSecure, smtpUser, notificationEmail, replyToEmail, senderName, customerSubject, customerMessage],
      );
    }
    return NextResponse.json({ ok: true, hasPassword: Boolean(smtpPassword || current.hasPassword) });
  } catch (error) {
    console.error("Email settings update failed", error);
    return NextResponse.json({ error: "Unable to save email settings." }, { status: 500 });
  }
}

export async function POST() {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  try {
    await sendEmailSettingsTest();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email settings test failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send test email." }, { status: 500 });
  }
}
