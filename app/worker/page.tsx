import Link from "next/link";
import { getWorkers } from "@/lib/db/workers";
import { getCategoryBySlug, getAvailabilityLabel } from "@/lib/data";

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            العمال المسجلون
          </div>

          <h1 className="text-3xl font-bold md:text-5xl">بطاقات العمال</h1>

          <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
            الكارت صار بنمط بادج حقيقي، ومو مجرد بوكس عادي ممل.
          </p>
        </div>

        {workers.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workers.map((worker) => (
              <article key={worker.id} className="worker-card-badge">
                <div className="worker-card-top">
                  <div className="worker-card-logo">SND</div>

                  <div className="text-right">
                    <p className="text-[11px] text-white/45">Worker Badge</p>
                    <p className="text-sm font-bold text-[#ffcf9f]">{worker.worker_code}</p>
                  </div>
                </div>

                <div className="mt-5 text-right">
                  <h2 className="text-2xl font-bold text-white">{worker.name}</h2>
                  <p className="mt-1 text-sm text-[#ff9d4d]">{worker.primary_job_title}</p>
                </div>

                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  {worker.category_slugs.slice(0, 4).map((slug) => {
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

                <div className="mt-5 grid grid-cols-2 gap-3 text-right">
                  <div className="badge-mini-box">
                    <p className="badge-mini-label">المدينة</p>
                    <p className="badge-mini-value">{worker.city || "غير محددة"}</p>
                  </div>

                  <div className="badge-mini-box">
                    <p className="badge-mini-label">المنطقة</p>
                    <p className="badge-mini-value">{worker.area || "غير محددة"}</p>
                  </div>

                  <div className="badge-mini-box">
                    <p className="badge-mini-label">الأجر</p>
                    <p className="badge-mini-value">
                      {worker.daily_rate ? `${worker.daily_rate} د.ع` : "حسب الاتفاق"}
                    </p>
                  </div>

                  <div className="badge-mini-box">
                    <p className="badge-mini-label">التوفر</p>
                    <p className="badge-mini-value">{getAvailabilityLabel(worker)}</p>
                  </div>
                </div>

                <div className="worker-card-stamp">SND VERIFIED</div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <Link href={`/request-worker?workerId=${worker.id}`} className="app-btn-primary-sm">
                    اطلبه
                  </Link>

                  <Link href={`/worker/${worker.id}`} className="app-btn-secondary-sm">
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
      </div>
    </main>
  );
}