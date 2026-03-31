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

export default function RequestWorkerClient() {
  const searchParams = useSearchParams();
  const successCode = searchParams.get("success") || "";
  const workerId = searchParams.get("workerId") || "";

  const [areaQuery, setAreaQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRequestType, setSelectedRequestType] = useState("");

  const filteredAreaSuggestions = useMemo(() => {
    if (!areaQuery.trim()) return areaSuggestions.slice(0, 8);

    return areaSuggestions
      .filter((item) => item.includes(areaQuery.trim()))
      .slice(0, 8);
  }, [areaQuery]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug]
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            رجوع للرئيسية
          </Link>

          <Link
            href="/workers"
            className="rounded-xl border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-sm text-[#ffb36b] transition hover:bg-[#ff7a1a]/15"
          >
            تصفح العمال
          </Link>
        </div>

        <div className="mb-8 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            طلب عامل
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            اطلب عاملًا مناسبًا
            <br />
            <span className="text-[#ff8a33]">بخطوات واضحة وسريعة</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
            املأ الطلب بدقة حتى نربطك بالعامل الأنسب حسب التخصص، المدينة،
            ونوع الخدمة المطلوبة.
          </p>
        </div>

        {successCode ? (
          <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-right">
            <p className="text-sm font-semibold text-green-400">
              تم إرسال الطلب بنجاح
            </p>
            <p className="mt-1 text-sm text-white/70">
              رقم الطلب: <span className="font-bold">{successCode}</span>
            </p>
          </div>
        ) : null}

        <form
          action={createRequestAction}
          className="rounded-3xl border border-white/10 bg-[#121212] p-5 shadow-2xl shadow-black/30 md:p-7"
        >
          {workerId ? (
            <input type="hidden" name="workerId" value={workerId} />
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/75">
                الاسم الكامل
              </label>
              <input
                type="text"
                name="customer_name"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
                placeholder="اكتب الاسم الكامل"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/75">
                رقم الهاتف
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
                placeholder="07xxxxxxxxx"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/75">المدينة</label>
              <select
                name="city"
                required
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
              >
                <option value="">اختر المدينة</option>
                {iraqCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/75">المنطقة</label>
              <input
                type="text"
                name="area"
                list="area-suggestions"
                value={areaQuery}
                onChange={(e) => setAreaQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
                placeholder="اكتب المنطقة"
              />
              <datalist id="area-suggestions">
                {filteredAreaSuggestions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-white/75">
              نوع الطلب
            </label>

            <div className="flex flex-wrap gap-2">
              {requestTypes.map((type) => {
                const value = String(type);
                const label = String(type);

                return (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-xl border px-4 py-2 text-sm transition ${
                      selectedRequestType === value
                        ? "border-[#ff7a1a]/40 bg-[#ff7a1a]/15 text-[#ffb36b]"
                        : "border-white/10 bg-[#0d0d0d] text-white/70 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="request_type"
                      value={value}
                      checked={selectedRequestType === value}
                      onChange={() => setSelectedRequestType(value)}
                      className="hidden"
                      required
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-3 block text-sm text-white/75">
              اختر التخصص المطلوب
            </label>

            <div className="space-y-5">
              {categoryGroups.map((group: any) => {
                const groupTitle =
                  group.title || group.name || group.label || "قسم";
                const items = Array.isArray(group.items) ? group.items : [];

                return (
                  <div
                    key={groupTitle}
                    className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4"
                  >
                    <h3 className="mb-3 text-sm font-semibold text-[#ffb36b]">
                      {groupTitle}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {items.map((item: any) => {
                        const slug =
                          item.slug || item.value || item.id || item.name;
                        const label =
                          item.label || item.name || item.title || slug;

                        const active = selectedCategories.includes(slug);

                        return (
                          <label
                            key={slug}
                            className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition ${
                              active
                                ? "border-[#ff7a1a]/40 bg-[#ff7a1a]/15 text-[#ffb36b]"
                                : "border-white/10 text-white/70 hover:border-white/20"
                            }`}
                          >
                            <input
                              type="checkbox"
                              name="requested_category_slugs"
                              value={slug}
                              checked={active}
                              onChange={() => toggleCategory(slug)}
                              className="hidden"
                            />
                            {label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/75">
                التاريخ المطلوب
              </label>
              <input
                type="date"
                name="requested_date"
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/75">
                الوقت المطلوب
              </label>
              <input
                type="time"
                name="requested_time"
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-white/75">
              تفاصيل إضافية
            </label>
            <textarea
              name="notes"
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm outline-none transition focus:border-[#ff7a1a]/40"
              placeholder="اشرح المطلوب بشكل مختصر وواضح"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-6 text-white/45">
              بإرسال الطلب، أنت توافق على مشاركة بياناتك الأساسية لغرض ربطك
              بالعامل المناسب ومتابعة تنفيذ الخدمة.
            </p>

            <button
              type="submit"
              className="rounded-xl bg-[#ff8a33] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#ff9a4d]"
            >
              إرسال الطلب
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}