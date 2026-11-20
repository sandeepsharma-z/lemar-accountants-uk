import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/auth";
import { ensureSchema, getPool } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authorised() { return Boolean(await getAdminSession()); }
function clean(value: unknown, max = 500) { return String(value ?? "").trim().slice(0, max); }

export async function GET() {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  await ensureSchema();
  const [rows] = await getPool().query<RowDataPacket[]>("SELECT id, enquiry_type AS enquiryType, full_name AS fullName, phone, email, service, source_page AS sourcePage, message, status, created_at AS createdAt, updated_at AS updatedAt FROM enquiries ORDER BY created_at DESC");
  return NextResponse.json({ enquiries: rows });
}

export async function PATCH(request: Request) {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json();
  const id = Number(body.id);
  const status = ["new", "in_progress", "completed"].includes(body.status) ? body.status : "new";
  const fullName = clean(body.fullName, 150), phone = clean(body.phone, 50), email = clean(body.email, 190).toLowerCase();
  const service = clean(body.service || "General enquiry", 190), message = clean(body.message, 5000);
  if (!id || !fullName || !phone || !email.includes("@")) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  await ensureSchema();
  const [result] = await getPool().execute<ResultSetHeader>("UPDATE enquiries SET full_name=?, phone=?, email=?, service=?, message=?, status=? WHERE id=?", [fullName, phone, email, service, message || null, status, id]);
  if (!result.affectedRows) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await authorised())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
  await ensureSchema();
  const [result] = await getPool().execute<ResultSetHeader>("DELETE FROM enquiries WHERE id=?", [id]);
  if (!result.affectedRows) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
