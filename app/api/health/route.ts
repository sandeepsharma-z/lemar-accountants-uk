import { NextResponse } from "next/server";
import { ensureSchema, getPool } from "../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSchema();
    await getPool().query("SELECT 1");
    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    console.error("Database health check failed", error);
    return NextResponse.json({ ok: false, database: "unavailable" }, { status: 503 });
  }
}
