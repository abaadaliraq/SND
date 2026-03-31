import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkerById } from "@/lib/db/workers";
import { getCategoryBySlug, getAvailabilityLabel } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const worker = await getWorkerById(id);

  if (!worker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            تفاصيل العامل
          </div>

          <h1 className="text-3xl font-bold md:text-5xl">{worker.name}</h1>
          <p className="mt-3 text-base text-[#ff9d4d] md:text-lg">
            {worker.primary_job_title}
          </p>
        </div>

        <div className="worker-card-badge">
          <div className="worker-card-top">
            <div className="worker-card-logo">SND</div>

            <div className="text-right">
              <p className="text-[11px] text-white/45">Worker ID</p>
              <p className="text-base font-bold text-[#ffcf9f]">{worker.worker_code}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="badge-mini-box">
              <p className="badge-mini-label">المدينة</p>
              <p className="badge-mini-value">{worker.city || "غير محددة"}</p>
            </div>

            <div className="badge-mini-box">
              <p className="badge-mini-label">المنطقة</p>
              <p className="badge-mini-value">{worker.area || "غير محددة"}</p>
            </div>

            <div className="badge-mini-box">
              <p className="badge-mini-label">الهاتف</p>
              <p className="badge-mini-value">{worker.phone || "غير متوفر"}</p>
            </div>

            <div className="badge-mini-box">
              <p className="badge-mini-label">واتساب</p>
              <p className="badge-mini-value">{worker.whatsapp || "غير متوفر"}</p>
            </div>

            <div className="badge-mini-box">
              <p className="badge-mini-label">الأجر اليومي</p>
              <p className="badge-mini-value">
                {worker.daily_rate ? `${worker.daily_rate} د.ع` : "حسب الاتفاق"}
              </p>
            </div>

            <div className="badge-mini-box">
              <p className="badge-mini-label">سنوات الخبرة</p>
              <p className="badge-mini-value">{worker.experience ?? 0}</p>
            </div>

            <div className="badge-mini-box md:col-span-2">
              <p className="badge-mini-label">التوفر</p>
              <p className="badge-mini-value">{getAvailabilityLabel(worker)}</p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/8 bg-[#101010] p-5 text-right">
            <p className="text-sm text-white/55">المهن التي يعمل بها</p>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {worker.category_slugs.length > 0 ? (
                worker.category_slugs.map((slug) => {
                  const category = getCategoryBySlug(slug);

                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-sm text-[#ffb36b]"
                    >
                      <span>{category?.icon || "•"}</span>
                      <span>{category?.name || slug}</span>
                    </span>
                  );
                })
              ) : (
                <p className="text-sm text-white/60">لا توجد تخصصات محددة.</p>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/8 bg-[#101010] p-5 text-right">
            <p className="text-sm text-white/55">نبذة عن العامل</p>
            <p className="mt-3 text-base leading-8 text-white/85">
              {worker.description || "لا توجد نبذة حالياً."}
            </p>
          </div>

          <div className="worker-card-stamp">SND VERIFIED</div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <Link href={`/request-worker?workerId=${worker.id}`} className="app-btn-primary">
              اطلب هذا العامل
            </Link>

            <Link href="/workers" className="app-btn-secondary">
              رجوع للعمال
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}