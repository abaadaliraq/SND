"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminToken, getAdminCookieName } from "@/lib/admin-auth";

export async function adminLoginAction(formData: FormData) {
  const password = String(formData.get("password") || "").trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set in environment variables.");
  }

  if (password !== adminPassword) {
    return { error: "كلمة المرور غير صحيحة" };
  }

  const token = await createAdminToken();

  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}