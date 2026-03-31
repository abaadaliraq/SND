"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { registerWorkerAction } from "./actions";
import {
  groupCategories,
  availabilityModes,
  weekDays,
  iraqCities,
  areaSuggestions,
  primaryJobSuggestions,
} from "@/lib/data";

const categoryGroups = groupCategories();

export default function RegisterWorkerPage() {
  const [jobQuery, setJobQuery] = useState("");
  const [areaQuery, setAreaQuery] = useState("");
  const [availabilityMode, setAvailabilityMode] = useState("now");

  const filteredJobSuggestions = useMemo(() => {
    if (!jobQuery.trim()) return primaryJobSuggestions;
    return primaryJobSuggestions.filter((item) => item.includes(jobQuery));
  }, [jobQuery]);

  const filteredAreaSuggestions = useMemo(() => {
    if (!areaQuery.trim()) return areaSuggestions;
    return areaSuggestions.filter((item) => item.includes(areaQuery));
  }, [areaQuery]);

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-right">
          <div className="mb-3 inline-flex rounded-full border border-[#ff7a1a]/20 bg-[#ff7a1a]/10 px-4 py-2 text-xs text-[#ffb36b]">
            تسجيل / تحديث عامل
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            سجّل بياناتك داخل
            <span className="mt-2 block text-[#ff7a1a]">بادج العامل SND</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
            إذا نفس العامل سجّل مرة ثانية بنفس رقم الهاتف، النظام يحدث بياناته بدل
            ما يكرر الحساب. هذا الصح، غيره فوضى.
          </p>
        </div>

        <form action={registerWorkerAction} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="badge-form-shell">
            <div className="badge-form-header">
              <div className="badge-logo">SND</div>

              <div className="text-right">
                <p className="text-xs text-white/45">بطاقة تعريف العامل</p>
                <h2 className="text-2xl font-bold text-white">Worker Badge</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="text-right md:col-span-2">
                <label className="mb-2 block text-sm text-white/80">الاسم الكامل</label>
                <input name="name" type="text" required placeholder="اكتب اسمك الكامل" className="app-input" />
              </div>

              <div className="text-right">
                <label className="mb-2 block text-sm text-white/80">رقم الهاتف</label>
                <input name="phone" type="tel" required placeholder="07xxxxxxxxx" className="app-input" />
              </div>

              <div className="text-right">
                <label className="mb-2 block text-sm text-white/80">واتساب</label>
                <input name="whatsapp" type="tel" placeholder="07xxxxxxxxx" className="app-input" />
              </div>

              <div className="text-right">
                <label className="mb-2 block text-sm text-white/80">المدينة</label>
                <input list="city-options" name="city" type="text" placeholder="بغداد" className="app-input" />
                <datalist id="city-options">
                  {iraqCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>

              <div className="text-right">
                <label className="mb-2 block text-sm text-white/80">المنطقة</label>
                <input
                  name="area"
                  type="text"
                  value={areaQuery}
                  onChange={(e) => setAreaQuery(e.target.value)}
                  placeholder="الكرادة"
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
                <label className="mb-2 block text-sm text-white/80">اسمك المهني الرئيسي</label>
                <input
                  name="primary_job_title"
                  type="text"
                  required
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="مثال: نجار أبواب وغرف نوم"
                  className="app-input"
                />

                <div className="mt-2 flex flex-wrap justify-end gap-2">
                  {filteredJobSuggestions.slice(0, 6).map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setJobQuery(item)}
                      className="chip-button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-right md:col-span-2">
                <label className="mb-3 block text-sm text-white/80">المهن التي تعمل بها</label>

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
                              name="category_slugs"
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
                <label className="mb-2 block text-sm text-white/80">الأجر اليومي</label>
                <input name="daily_rate" type="number" min="0" placeholder="مثال: 25000" className="app-input" />
              </div>

              <div className="text-right">
                <label className="mb-2 block text-sm text-white/80">سنوات الخبرة</label>
                <input name="experience" type="number" min="0" placeholder="مثال: 3" className="app-input" />
              </div>

              <div className="text-right md:col-span-2">
                <label className="mb-2 block text-sm text-white/80">حالة التوفر</label>
                <select
                  name="availability_mode"
                  className="app-input"
                  value={availabilityMode}
                  onChange={(e) => setAvailabilityMode(e.target.value)}
                >
                  {availabilityModes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {availabilityMode === "hours_range" && (
                <>
                  <div className="text-right">
                    <label className="mb-2 block text-sm text-white/80">من الساعة</label>
                    <input name="available_from_time" type="time" className="app-input" />
                  </div>

                  <div className="text-right">
                    <label className="mb-2 block text-sm text-white/80">إلى الساعة</label>
                    <input name="available_to_time" type="time" className="app-input" />
                  </div>
                </>
              )}

              {availabilityMode === "date_range" && (
                <>
                  <div className="text-right">
                    <label className="mb-2 block text-sm text-white/80">من تاريخ</label>
                    <input name="available_from_date" type="date" className="app-input" />
                  </div>

                  <div className="text-right">
                    <label className="mb-2 block text-sm text-white/80">إلى تاريخ</label>
                    <input name="available_to_date" type="date" className="app-input" />
                  </div>
                </>
              )}

              {availabilityMode === "custom_days" && (
                <div className="text-right md:col-span-2">
                  <label className="mb-3 block text-sm text-white/80">الأيام المتاحة</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {weekDays.map((day) => (
                      <label
                        key={day}
                        className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/8 bg-[#181818] px-4 py-3"
                      >
                        <input
                          type="checkbox"
                          name="available_days"
                          value={day}
                          className="h-4 w-4 accent-[#ff7a1a]"
                        />
                        <span className="text-sm text-white">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-right md:col-span-2">
                <label className="mb-2 block text-sm text-white/80">نبذة مختصرة</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="اكتب خبرتك بشكل صريح، لا تكتب كلام عام بلا قيمة"
                  className="app-textarea"
                />
              </div>
            </div>
              
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="submit" className="app-btn-primary">
                حفظ بيانات العامل
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
          </section>

          <aside className="badge-preview-shell">
            <div className="worker-badge-card">
              <div className="worker-badge-top">
                <div className="worker-badge-logo">SND</div>
                <div className="text-right">
                  <p className="text-xs text-white/45">Smart Network for Demand</p>
                  <h3 className="text-xl font-bold text-white">بطاقة عامل</h3>
                </div>
              </div>

              <div className="mt-8 text-right">
                <p className="text-xs text-white/45">سيظهر بهذا النمط داخل التطبيق</p>
                <h4 className="mt-2 text-2xl font-bold text-white">اسم العامل</h4>
                <p className="mt-1 text-[#ff9d4d]">المهنة الرئيسية</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-right">
                <div className="badge-mini-box">
                  <p className="badge-mini-label">الكود</p>
                  <p className="badge-mini-value">SND-W-0001</p>
                </div>

                <div className="badge-mini-box">
                  <p className="badge-mini-label">الحالة</p>
                  <p className="badge-mini-value">متاح الآن</p>
                </div>
              </div>

              <div className="badge-stamp">Verified by SND</div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}