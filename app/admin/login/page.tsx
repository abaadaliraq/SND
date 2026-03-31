import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminToken, getAdminCookieName } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  async function adminLoginAction(formData: FormData) {
    "use server";

    const password = String(formData.get("password") || "").trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD is not set in environment variables.");
    }

    if (password !== adminPassword) {
      throw new Error("كلمة المرور غير صحيحة");
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

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6">
        <h1 className="mb-2 text-2xl font-bold">تسجيل دخول الأدمن</h1>

        <p className="mb-6 text-sm text-white/60">
          هذه الصفحة مخصصة للإدارة فقط.
        </p>

        <form action={adminLoginAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-white/70"
            >
              كلمة المرور
            </label>

            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-white/20"
              placeholder="أدخل كلمة مرور الأدمن"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500"
          >
            دخول
          </button>
        </form>
      </div>
    </main>
  );
}