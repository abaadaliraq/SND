"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { createWorkerReview } from "@/lib/db/reviews";

export async function acceptRequest(id: string) {
  const requestId = String(id || "").trim();

  if (!requestId) {
    throw new Error("requestId is required");
  }

  const { error } = await supabase
    .from("worker_requests")
    .update({ status: "accepted" })
    .eq("id", requestId);

  if (error) {
    throw new Error(error.message || "Failed to accept request");
  }

  revalidatePath("/admin/requests");
}

export async function rejectRequest(id: string) {
  const requestId = String(id || "").trim();

  if (!requestId) {
    throw new Error("requestId is required");
  }

  const { error } = await supabase
    .from("worker_requests")
    .update({ status: "rejected" })
    .eq("id", requestId);

  if (error) {
    throw new Error(error.message || "Failed to reject request");
  }

  revalidatePath("/admin/requests");
}

export async function assignWorkerToRequest(formData: FormData) {
  const requestId = String(formData.get("requestId") || "").trim();
  const workerId = String(formData.get("workerId") || "").trim();

  if (!requestId || !workerId) {
    throw new Error("requestId and workerId are required");
  }

  const { data: worker, error: workerError } = await supabase
    .from("workers")
    .select("id, is_available, availability_mode")
    .eq("id", workerId)
    .single();

  if (workerError || !worker) {
    throw new Error("العامل غير موجود");
  }

  if (!worker.is_available) {
    throw new Error("هذا العامل مشغول حالياً");
  }

  const { data: requestRow, error: requestFetchError } = await supabase
    .from("worker_requests")
    .select("id, assigned_worker_id, status")
    .eq("id", requestId)
    .single();

  if (requestFetchError || !requestRow) {
    throw new Error("الطلب غير موجود");
  }

  if (requestRow.assigned_worker_id) {
    throw new Error("هذا الطلب مرتبط بعامل بالفعل");
  }

  if (requestRow.status === "completed") {
    throw new Error("لا يمكن تعيين عامل لطلب مكتمل");
  }

  if (requestRow.status === "rejected") {
    throw new Error("لا يمكن تعيين عامل لطلب مرفوض");
  }

  const { error: requestError } = await supabase
    .from("worker_requests")
    .update({
      assigned_worker_id: workerId,
      assigned_at: new Date().toISOString(),
      assigned_by: "admin",
      status: "assigned",
    })
    .eq("id", requestId);

  if (requestError) {
    throw new Error(requestError.message || "فشل في تعيين العامل للطلب");
  }

  const { error: updateWorkerError } = await supabase
    .from("workers")
    .update({
      is_available: false,
      availability_mode: "busy",
    })
    .eq("id", workerId);

  if (updateWorkerError) {
    throw new Error(updateWorkerError.message || "فشل في تحديث حالة العامل");
  }

  revalidatePath("/admin/requests");
  revalidatePath("/admin/workers");
}

export async function unassignWorkerFromRequest(requestId: string) {
  const cleanRequestId = String(requestId || "").trim();

  if (!cleanRequestId) {
    throw new Error("requestId is required");
  }

  const { data: requestRow, error: requestError } = await supabase
    .from("worker_requests")
    .select("id, assigned_worker_id, status")
    .eq("id", cleanRequestId)
    .single();

  if (requestError || !requestRow) {
    throw new Error("الطلب غير موجود");
  }

  if (!requestRow.assigned_worker_id) {
    throw new Error("لا يوجد عامل مرتبط بهذا الطلب");
  }

  const workerId = String(requestRow.assigned_worker_id);

  const { error: clearRequestError } = await supabase
    .from("worker_requests")
    .update({
      assigned_worker_id: null,
      assigned_at: null,
      assigned_by: null,
      status: "accepted",
    })
    .eq("id", cleanRequestId);

  if (clearRequestError) {
    throw new Error(clearRequestError.message || "فشل في فك التعيين");
  }

  const { error: freeWorkerError } = await supabase
    .from("workers")
    .update({
      is_available: true,
      availability_mode: "now",
    })
    .eq("id", workerId);

  if (freeWorkerError) {
    throw new Error(freeWorkerError.message || "فشل في تحديث حالة العامل");
  }

  revalidatePath("/admin/requests");
  revalidatePath("/admin/workers");
}

export async function completeRequest(requestId: string) {
  const cleanRequestId = String(requestId || "").trim();

  if (!cleanRequestId) {
    throw new Error("requestId is required");
  }

  const { data: requestRow, error: requestError } = await supabase
    .from("worker_requests")
    .select("id, assigned_worker_id, status")
    .eq("id", cleanRequestId)
    .single();

  if (requestError || !requestRow) {
    throw new Error("الطلب غير موجود");
  }

  const workerId = requestRow.assigned_worker_id
    ? String(requestRow.assigned_worker_id)
    : null;

  const { error: completeError } = await supabase
    .from("worker_requests")
    .update({
      status: "completed",
    })
    .eq("id", cleanRequestId);

  if (completeError) {
    throw new Error(completeError.message || "فشل في إكمال الطلب");
  }

  if (workerId) {
    const { error: workerUpdateError } = await supabase
      .from("workers")
      .update({
        is_available: true,
        availability_mode: "now",
      })
      .eq("id", workerId);

    if (workerUpdateError) {
      throw new Error(workerUpdateError.message || "فشل في تحرير العامل");
    }
  }

  revalidatePath("/admin/requests");
  revalidatePath("/admin/workers");
}

export async function submitWorkerRecommendation(formData: FormData) {
  const requestId = String(formData.get("requestId") || "").trim();
  const workerId = String(formData.get("workerId") || "").trim();
  const value = String(formData.get("wouldRecommend") || "").trim();

  if (!requestId || !workerId || !value) {
    throw new Error("بيانات التقييم ناقصة");
  }

  if (value !== "yes" && value !== "no") {
    throw new Error("قيمة التوصية غير صحيحة");
  }

  const wouldRecommend = value === "yes";

  const { data: requestRow, error: requestError } = await supabase
    .from("worker_requests")
    .select("id, status, assigned_worker_id")
    .eq("id", requestId)
    .single();

  if (requestError || !requestRow) {
    throw new Error("الطلب غير موجود");
  }

  if (requestRow.status !== "completed") {
    throw new Error("لا يمكن تقييم الطلب قبل اكتماله");
  }

  if (!requestRow.assigned_worker_id) {
    throw new Error("لا يوجد عامل مرتبط بهذا الطلب");
  }

  if (String(requestRow.assigned_worker_id) !== workerId) {
    throw new Error("العامل لا يطابق الطلب");
  }

  const { data: existingReview, error: existingReviewError } = await supabase
    .from("worker_reviews")
    .select("id")
    .eq("request_id", requestId)
    .maybeSingle();

  if (existingReviewError) {
    throw new Error(existingReviewError.message || "فشل في التحقق من التقييم السابق");
  }

  if (existingReview) {
    throw new Error("تم تسجيل تقييم لهذا الطلب مسبقًا");
  }

  await createWorkerReview({
    worker_id: workerId,
    request_id: requestId,
    would_recommend: wouldRecommend,
  });

  revalidatePath("/admin/requests");
  revalidatePath("/admin/workers");
}