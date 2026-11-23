import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import { ensureSchema, getPool } from "../../lib/db";
import { sendEnquiryEmails } from "../../lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function isDuplicateSubmission(error: unknown) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ER_DUP_ENTRY");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true }, { status: 201 });
    const enquiryType = body.enquiryType === "callback" ? "callback" : "contact";
    const fullName = clean(body.fullName, 150);
    const phone = clean(body.phone, 50);
    const email = clean(body.email, 190).toLowerCase();
    const submissionKey = clean(body.submissionKey, 100) || null;
    const service = clean(body.service || "General enquiry", 190);
    const sourcePage = clean(body.sourcePage || "Website", 190);
    const message = clean(body.message, 5000);
    if (!fullName || !phone || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
    }
    await ensureSchema();
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    let result: ResultSetHeader;
    try {
      [result] = await getPool().execute<ResultSetHeader>(
        "INSERT INTO enquiries (enquiry_type, full_name, phone, email, submission_key, service, source_page, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [enquiryType, fullName, phone, email, submissionKey, service, sourcePage, message || null, forwarded || null, request.headers.get("user-agent")?.slice(0, 500) || null],
      );
    } catch (error) {
      if (submissionKey && isDuplicateSubmission(error)) {
        return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });
      }
      throw error;
    }
    let delivery: Awaited<ReturnType<typeof sendEnquiryEmails>>;
    try {
      delivery = await sendEnquiryEmails({ fullName, phone, email, service, sourcePage, message });
    } catch (mailError) {
      console.error("Enquiry saved but email delivery failed", mailError);
      delivery = { adminStatus: "failed", customerStatus: "failed", error: mailError instanceof Error ? mailError.message.slice(0, 2000) : "Email delivery failed" };
    }
    await getPool().execute(
      "UPDATE enquiries SET admin_email_status=?, customer_email_status=?, email_error=? WHERE id=?",
      [delivery.adminStatus, delivery.customerStatus, delivery.error, result.insertId],
    );
    return NextResponse.json({ ok: true, emailDelivery: { business: delivery.adminStatus, customer: delivery.customerStatus } }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return NextResponse.json({ error: "Unable to submit your enquiry right now. Please call or email us." }, { status: 500 });
  }
}
