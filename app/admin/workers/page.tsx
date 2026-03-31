import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { deleteWorker, toggleWorker } from "./actions";
import {
  getWorkerRecommendationStatsMap,
  sortWorkersByRecommendationAndAvailability,
} from "@/lib/db/reviews";

export default async function AdminWorkersPage() {
  const { data: workers, error } = await supabase
    .from("workers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const workerIds = (workers ?? []).map((worker) => String(worker.id));
  const statsMap = await getWorkerRecommendationStatsMap(workerIds);

  const sortedWorkers = sortWorkersByRecommendationAndAvailability(
    workers ?? [],
    statsMap
  );

  return (
    <main className="min-h-screen bg-[#0b0b0b] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">إدارة العمال</h1>
            <p className="mt-1 text-sm text-white/60">
              الترتيب الحالي: المتاح أولًا، ثم الأعلى توصية، ثم الأكثر تقييمًا.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            رجوع للوحة التحكم
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedWorkers.length ? (
            sortedWorkers.map((worker, index) => {
              const stats = statsMap[String(worker.id)] ?? {
                yesCount: 0,
                noCount: 0,
                totalCount: 0,
                recommendPercent: 0,
              };

              return (
                <div
                  key={worker.id}
                  className="rounded-2xl border border-white/10 bg-[#151515] p-5"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 inline-flex rounded-lg bg-white/5 px-2 py-1 text-[11px] text-white/50">
                        الترتيب #{index + 1}
                      </div>

                      <h2 className="text-lg font-bold">{worker.name || "-"}</h2>
                      <p className="mt-1 text-sm text-white/60">
                        {Array.isArray(worker.category_slugs)
                          ? worker.category_slugs.join(", ")
                          : "-"}
                      </p>
                    </div>

                    <span
                      className={`rounded-lg px-2 py-1 text-xs ${
                        worker.is_available
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {worker.is_available ? "متاح" : "مشغول"}
                    </span>
                  </div>

                  <div className="mb-4 rounded-xl border border-white/10 bg-[#101010] p-3">
                    <p className="text-sm font-semibold text-white">
                      {stats.totalCount > 0
                        ? `${stats.recommendPercent}% ينصحون به`
                        : "لا توجد تقييمات بعد"}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {stats.totalCount > 0
                        ? `${stats.totalCount} تقييم`
                        : "بانتظار أول تقييم"}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-white/70">
                    <p>
                      <span className="text-white/40">الكود:</span>{" "}
                      {worker.worker_code || "-"}
                    </p>
                    <p>
                      <span className="text-white/40">الهاتف:</span>{" "}
                      {worker.phone || "-"}
                    </p>
                    <p>
                      <span className="text-white/40">المدينة:</span>{" "}
                      {worker.city || "-"}
                    </p>
                    <p>
                      <span className="text-white/40">المنطقة:</span>{" "}
                      {worker.area || "-"}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <form
                      action={async () => {
                        "use server";
                        await toggleWorker(worker.id, worker.is_available);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium transition hover:bg-blue-500"
                      >
                        تبديل الحالة
                      </button>
                    </form>

                    <form
                      action={async () => {
                        "use server";
                        await deleteWorker(worker.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium transition hover:bg-red-500"
                      >
                        حذف
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#151515] p-6 text-white/50">
              لا يوجد عمال حالياً
            </div>
          )}
        </div>
      </div>
    </main>
  );
}