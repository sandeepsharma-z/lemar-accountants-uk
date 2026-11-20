import crypto from "node:crypto";
import type { RowDataPacket } from "mysql2";
import { ensureSchema, getPool } from "./db";

export type EmailSettings = {
  enabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPassword: string;
  notificationEmail: string;
  replyToEmail: string;
  senderName: string;
  customerSubject: string;
  customerMessage: string;
};

function encryptionKey() {
  const secret = process.env.EMAIL_SETTINGS_KEY || process.env.SESSION_SECRET;
  if (!secret) throw new Error("EMAIL_SETTINGS_KEY or SESSION_SECRET is not configured");
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptEmailPassword(value: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, encrypted].map(part => part.toString("base64url")).join(".");
}

function decryptEmailPassword(value: string | null) {
  if (!value) return "";
  const [iv, tag, encrypted] = value.split(".").map(part => Buffer.from(part, "base64url"));
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

export async function getEmailSettings(): Promise<EmailSettings & { hasPassword: boolean }> {
  await ensureSchema();
  const [rows] = await getPool().query<RowDataPacket[]>(`
    SELECT enabled, smtp_host AS smtpHost, smtp_port AS smtpPort, smtp_secure AS smtpSecure,
      smtp_user AS smtpUser, smtp_password_encrypted AS smtpPasswordEncrypted,
      notification_email AS notificationEmail, reply_to_email AS replyToEmail,
      sender_name AS senderName, customer_subject AS customerSubject,
      customer_message AS customerMessage
    FROM email_settings WHERE id = 1 LIMIT 1
  `);
  const row = rows[0];
  if (!row) throw new Error("Email settings are unavailable");
  return {
    enabled: Boolean(row.enabled),
    smtpHost: String(row.smtpHost),
    smtpPort: Number(row.smtpPort),
    smtpSecure: Boolean(row.smtpSecure),
    smtpUser: String(row.smtpUser),
    smtpPassword: decryptEmailPassword(row.smtpPasswordEncrypted ? String(row.smtpPasswordEncrypted) : null),
    hasPassword: Boolean(row.smtpPasswordEncrypted),
    notificationEmail: String(row.notificationEmail),
    replyToEmail: String(row.replyToEmail),
    senderName: String(row.senderName),
    customerSubject: String(row.customerSubject),
    customerMessage: String(row.customerMessage),
  };
}
