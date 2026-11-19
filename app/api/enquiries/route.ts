import { NextResponse } from "next/server";
import { ensureSchema, getPool } from "../../lib/db";

export const runtime = "nodejs";

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true }, { status: 201 });
    const enquiryType = body.enquiryType === "callback" ? "callback" : "contact";
    const fullName = clean(body.fullName, 150);
    const phone = clean(body.phone, 50);
    const email = clean(body.email, 190).toLowerCase();
    const service = clean(body.service || "General enquiry", 190);
    const message = clean(body.message, 5000);
    if (!fullName || !phone || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
    }
    await ensureSchema();
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    await getPool().execute(
      "INSERT INTO enquiries (enquiry_type, full_name, phone, email, service, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [enquiryType, fullName, phone, email, service, message || null, forwarded || null, request.headers.get("user-agent")?.slice(0, 500) || null],
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return NextResponse.json({ error: "Unable to submit your enquiry right now. Please call or email us." }, { status: 500 });
  }
}
