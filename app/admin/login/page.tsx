import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/auth";
import AdminLoginForm from "../admin-login-form";
import "../admin.css";

export const metadata: Metadata = { title: "Admin Login | Lemar Accountants", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return <AdminLoginForm />;
}
