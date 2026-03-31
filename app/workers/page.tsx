import Link from "next/link";
import { getWorkers } from "@/lib/db/workers";
import { getCategoryBySlug } from "@/lib/data";

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            عرض العمال
          </div>

          <h1 className="text-3xl font-bold md:text-5xl">
            تصفح العمال المتاحين
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 md:mr-auto md:text-base">
            الواجهة هنا صارت أقرب للتطبيق. العامل يظهر بأكثر من مهنة بدل نظام المهنة
            الواحدة القديم.
          </p>
        </div>

        {workers.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workers.map((worker) => (
              <article
                key={worker.id}
                className="rounded-[30px] border border-white/10 bg-[#151515] p-5 text-right shadow-xl transition duration-200 hover:-translate-y-1 hover:border-[#ff7a1a]/35"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span className="rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-3 py-1 text-xs text-[#ffb36b]">
                    {worker.is_available ? "متاح الآن" : "غير متاح"}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1f1f1f] text-lg">
                    👷
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white">{worker.name}</h2>

                <p className="mt-1 text-sm text-[#ff9d4d]">
                  {worker.primary_job_title}
                </p>

                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  {worker.category_slugs.slice(0, 3).map((slug) => {
                    const category = getCategoryBySlug(slug);

                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-[#101010] px-3 py-1 text-xs text-white/80"
                      >
                        <span>{category?.icon || "•"}</span>
                        <span>{category?.name || slug}</span>
                      </span>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-2 text-sm leading-7 text-white/65">
                  <p>المدينة: {worker.city || "غير محددة"}</p>
                  <p>المنطقة: {worker.area || "غير محددة"}</p>
                  <p>
                    الأجر اليومي:{" "}
                    {worker.daily_rate ? `${worker.daily_rate} د.ع` : "حسب الاتفاق"}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <Link
                    href={`/request-worker?workerId=${worker.id}`}
                    className="app-btn-primary-sm"
                  >
                    اطلبه
                  </Link>

                  <Link
                    href={`/worker/${worker.id}`}
                    className="app-btn-secondary-sm"
                  >
                    التفاصيل
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-white/10 bg-[#151515] p-10 text-center text-white/60">
            لا يوجد عمال مسجلون حاليًا.
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-end gap-3">
          <Link href="/" className="app-btn-secondary">
            رجوع للرئيسية
          </Link>

          <Link href="/register-worker" className="app-btn-primary">
            سجّل كعامل
          </Link>
        </div>
      </div>
    </main>
  );
}