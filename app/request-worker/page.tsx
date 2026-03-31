"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createRequestAction } from "./actions";
import {
  groupCategories,
  requestTypes,
  iraqCities,
  areaSuggestions,
} from "@/lib/data";

const categoryGroups = groupCategories();

export default function RequestWorkerPage() {
  const searchParams = useSearchParams();
  const successCode = searchParams.get("success") || "";
  const workerId = searchParams.get("workerId") || "";

  const [areaQuery, setAreaQuery] = useState("");

  const filteredAreaSuggestions = useMemo(() => {
    if (!areaQuery.trim()) return areaSuggestions;
    return areaSuggestions.filter((item) => item.includes(areaQuery));
  }, [areaQuery]);

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            طلب عامل
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            أنشئ طلبك الآن
            <span className="mt-2 block text-[#ff7a1a]">برقم طلب تلقائي</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
            صاحب الطلب يقدر يحدد أكثر من تخصص. هذا أفضل من طلب ناقص وبعدين ترجع
            تعدله.
          </p>
        </div>

        {successCode ? (
          <div className="mb-5 rounded-3xl border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 p-4 text-right">
            <p className="text-sm text-[#ffcf9f]">
              تم إرسال الطلب بنجاح. رقم الطلب:
              <span className="mr-2 font-bold text-white">{successCode}</span>
            </p>
          </div>
        ) : null}

        <form action={createRequestAction} className="rounded-[32px] border border-white/10 bg-[#151515] p-5 shadow-2xl md:p-7">
          <input type="hidden" name="worker_id" value={workerId} />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="text-right md:col-span-2">
              <label className="mb-2 block text-sm text-white/80">اسم صاحب الطلب</label>
              <input
                name="customer_name"
                type="text"
                required
                placeholder="اكتب الاسم"
                className="app-input"
              />
            </div>

            <div className="text-right">
              <label className="mb-2 block text-sm text-white/80">رقم الهاتف</label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="07xxxxxxxxx"
                className="app-input"
              />
            </div>

            <div className="text-right">
              <label className="mb-2 block text-sm text-white/80">المدينة</label>
              <input list="request-city-options" name="city" type="text" placeholder="بغداد" className="app-input" />
              <datalist id="request-city-options">
                {iraqCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>

            <div className="text-right md:col-span-2">
              <label className="mb-2 block text-sm text-white/80">المنطقة / العنوان</label>
              <input
                name="area"
                type="text"
                value={areaQuery}
                onChange={(e) => setAreaQuery(e.target.value)}
                placeholder="المنصور - شارع الأميرات"
                className="app-input"
              />

              <div className="mt-2 flex flex-wrap justify-end gap-2">
                {filteredAreaSuggestions.slice(0, 5).map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setAreaQuery(item)}
                    className="chip-button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-right md:col-span-2">
              <label className="mb-3 block text-sm text-white/80">التخصصات المطلوبة</label>

              <div className="space-y-4">
                {categoryGroups.map((group) => (
                  <div key={group.group} className="rounded-3xl border border-white/8 bg-[#101010] p-4">
                    <p className="mb-3 text-sm font-semibold text-[#ff9d4d]">{group.group}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <label
                          key={item.slug}
                          className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/8 bg-[#181818] px-4 py-3 transition hover:border-[#ff7a1a]/35"
                        >
                          <input
                            type="checkbox"
                            name="requested_category_slugs"
                            value={item.slug}
                            className="h-4 w-4 accent-[#ff7a1a]"
                          />

                          <div className="flex items-center gap-3">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm text-white">{item.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right">
              <label className="mb-2 block text-sm text-white/80">نوع الطلب</label>
              <select name="request_type" className="app-input" defaultValue="">
                <option value="">اختر نوع الطلب</option>
                {requestTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-right">
              <label className="mb-2 block text-sm text-white/80">عدد العمال المطلوب</label>
              <input
                name="workers_count"
                type="number"
                min="1"
                defaultValue="1"
                className="app-input"
              />
            </div>

            <div className="text-right md:col-span-2">
              <label className="mb-2 block text-sm text-white/80">تفاصيل إضافية</label>
              <textarea
                name="details"
                rows={4}
                placeholder="مثال: أحتاج نجار وحمال اليوم الساعة 4 عصرًا لنقل وتركيب غرفة نوم"
                className="app-textarea"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button type="submit" className="app-btn-primary">
              إرسال الطلب
            </button>

            <Link href="/" className="app-btn-secondary">
              رجوع للرئيسية
            </Link>
          </div>
          <div className="mt-4 text-right">
  <label className="flex items-start gap-2 text-sm text-white/70">
    <input
      type="checkbox"
      name="accept_terms"
      required
      className="mt-1 accent-[#ff7a1a]"
    />

    <span>
      أوافق على{" "}
      <a
        href="/terms"
        target="_blank"
        className="text-[#ff9d4d] underline"
      >
        الشروط والأحكام
      </a>{" "}
      و{" "}
      <a
        href="/privacy"
        target="_blank"
        className="text-[#ff9d4d] underline"
      >
        سياسة الخصوصية
      </a>
    </span>
  </label>
</div>
        </form>
      </div>
    </main>
  );
}