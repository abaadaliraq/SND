"use server";

import { upsertWorkerByPhone } from "@/lib/db/workers";
import { redirect } from "next/navigation";

export async function registerWorkerAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const primary_job_title = String(formData.get("primary_job_title") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const availability_mode = String(formData.get("availability_mode") || "now").trim();
const acceptTerms = formData.get("accept_terms");

if (!acceptTerms) {
  throw new Error("يجب الموافقة على الشروط والأحكام.");
}
  const category_slugs = formData
    .getAll("category_slugs")
    .map((value) => String(value).trim())
    .filter(Boolean);

  const available_days = formData
    .getAll("available_days")
    .map((value) => String(value).trim())
    .filter(Boolean);

  const experienceValue = Number(formData.get("experience") || 0);
  const dailyRateValue = Number(formData.get("daily_rate") || 0);

  const available_from_date = String(formData.get("available_from_date") || "").trim();
  const available_to_date = String(formData.get("available_to_date") || "").trim();
  const available_from_time = String(formData.get("available_from_time") || "").trim();
  const available_to_time = String(formData.get("available_to_time") || "").trim();

  if (!name || !primary_job_title || !phone) {
    throw new Error("الاسم والهاتف واسم المهنة الرئيسية مطلوبة.");
  }

  if (category_slugs.length === 0) {
    throw new Error("اختر مهنة واحدة على الأقل.");
  }

  await upsertWorkerByPhone({
    name,
    primary_job_title,
    city,
    area,
    phone,
    whatsapp,
    description,
    category_slugs,
    experience: Number.isNaN(experienceValue) ? 0 : experienceValue,
    daily_rate: Number.isNaN(dailyRateValue) ? 0 : dailyRateValue,
    is_available: true,
    availability_mode,
    available_from_date,
    available_to_date,
    available_from_time,
    available_to_time,
    available_days,
  });

  redirect("/workers");
}