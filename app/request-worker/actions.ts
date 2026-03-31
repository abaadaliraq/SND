"use server";

import { createWorkerRequest } from "@/lib/db/requests";
import { redirect } from "next/navigation";

export async function createRequestAction(formData: FormData) {
  const customer_name = String(formData.get("customer_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const request_type = String(formData.get("request_type") || "").trim();
  const details = String(formData.get("details") || "").trim();
  const worker_id = String(formData.get("worker_id") || "").trim();
const acceptTerms = formData.get("accept_terms");
if (!acceptTerms) {
  throw new Error("يجب الموافقة على الشروط والأحكام.");
}
  const requested_category_slugs = formData
    .getAll("requested_category_slugs")
    .map((value) => String(value).trim())
    .filter(Boolean);

  const workersCountValue = Number(formData.get("workers_count") || 1);

  const request = await createWorkerRequest({
    customer_name,
    phone,
    city,
    area,
    request_type,
    requested_category_slugs,
    workers_count: Number.isNaN(workersCountValue) ? 1 : workersCountValue,
    details,
    worker_id: worker_id || undefined,
  });

  redirect(`/request-worker?success=${encodeURIComponent(request.request_code)}`);
}