import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">لوحة تحكم الأدمن</h1>
        <p className="mb-8 text-sm text-white/60">
          من هنا تكدرين تتحكمين بالطلبات والعمال بشكل مباشر.
        </p>
        <a
  href="/admin/logout"
  className="rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
>
  تسجيل الخروج
</a>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/requests"
            className="rounded-2xl border border-white/10 bg-[#151515] p-5 transition hover:border-white/20 hover:bg-[#1b1b1b]"
          >
            <div className="mb-3 inline-flex rounded-xl bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
              Requests
            </div>
            <h2 className="mb-2 text-xl font-bold">إدارة الطلبات</h2>
            <p className="text-sm leading-7 text-white/60">
              عرض جميع الطلبات، قبولها، رفضها، ومتابعة حالتها.
            </p>
          </Link>

          <Link
            href="/admin/workers"
            className="rounded-2xl border border-white/10 bg-[#151515] p-5 transition hover:border-white/20 hover:bg-[#1b1b1b]"
          >
            <div className="mb-3 inline-flex rounded-xl bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              Workers
            </div>
            <h2 className="mb-2 text-xl font-bold">إدارة العمال</h2>
            <p className="text-sm leading-7 text-white/60">
              عرض العمال، تبديل حالتهم، حذفهم، ومراجعة بياناتهم.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}