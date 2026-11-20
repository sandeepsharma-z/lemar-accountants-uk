import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "../lib/auth";
import AdminDashboard from "./admin-dashboard";
import "./admin.css";

export const metadata: Metadata = { title: "Admin Dashboard | Lemar Accountants", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <AdminDashboard session={session} />;
}
