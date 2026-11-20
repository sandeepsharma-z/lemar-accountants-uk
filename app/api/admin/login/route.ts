import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "../../../lib/auth";
import { ensureSchema, getPool } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    await ensureSchema();
    const [rows] = await getPool().execute<RowDataPacket[]>("SELECT email, password_hash, display_name FROM admin_users WHERE email = ? LIMIT 1", [email]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    const token = await createAdminToken(admin.email, admin.display_name);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 500 });
  }
}
