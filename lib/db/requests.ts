import { supabase } from "@/lib/supabase";
import { setWorkerAvailability } from "@/lib/db/workers";

export type WorkerRequestRecord = {
  id: string;
  request_code: string;
  customer_name: string;
  phone: string;
  city: string | null;
  area: string | null;
  request_type: string | null;
  requested_category_slugs: string[];
  workers_count: number;
  details: string | null;
  worker_id: string | null;
  status: "pending" | "accepted" | "rejected" | "done" | "cancelled" | string;
  created_at: string;
  updated_at: string;
};

export type CreateWorkerRequestPayload = {
  customer_name: string;
  phone: string;
  city?: string;
  area?: string;
  request_type?: string;
  requested_category_slugs: string[];
  workers_count?: number;
  details?: string;
  worker_id?: string;
};

export type UpdateWorkerRequestPayload = {
  customer_name?: string;
  phone?: string;
  city?: string;
  area?: string;
  request_type?: string;
  requested_category_slugs?: string[];
  workers_count?: number;
  details?: string;
  worker_id?: string | null;
  status?: string;
};

type RequestWritePayload = {
  customer_name: string;
  phone: string;
  city: string | null;
  area: string | null;
  request_type: string | null;
  requested_category_slugs: string[];
  workers_count: number;
  details: string | null;
  worker_id: string | null;
  status: string;
};

type RequestUpdatePayload = Partial<RequestWritePayload>;

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function normalizeRequest(row: any): WorkerRequestRecord {
  return {
    id: String(row.id),
    request_code: row.request_code ?? "",
    customer_name: row.customer_name ?? "",
    phone: row.phone ?? "",
    city: row.city ?? null,
    area: row.area ?? null,
    request_type: row.request_type ?? null,
    requested_category_slugs: normalizeStringArray(row.requested_category_slugs),
    workers_count: typeof row.workers_count === "number" ? row.workers_count : 1,
    details: row.details ?? null,
    worker_id: row.worker_id ?? null,
    status: row.status ?? "pending",
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? new Date().toISOString(),
  };
}

function sanitizeCreateRequestPayload(
  payload: CreateWorkerRequestPayload
): RequestWritePayload {
  const cleaned: RequestWritePayload = {
    customer_name: payload.customer_name.trim(),
    phone: payload.phone.trim(),
    city: payload.city?.trim() || null,
    area: payload.area?.trim() || null,
    request_type: payload.request_type?.trim() || null,
    requested_category_slugs: payload.requested_category_slugs
      .map((item) => item.trim())
      .filter(Boolean),
    workers_count:
      typeof payload.workers_count === "number" && !Number.isNaN(payload.workers_count)
        ? Math.max(1, payload.workers_count)
        : 1,
    details: payload.details?.trim() || null,
    worker_id: payload.worker_id?.trim() || null,
    status: "pending",
  };

  if (!cleaned.customer_name || !cleaned.phone) {
    throw new Error("اسم صاحب الطلب ورقم الهاتف مطلوبان.");
  }

  if (cleaned.requested_category_slugs.length === 0) {
    throw new Error("اختر تخصصًا واحدًا على الأقل.");
  }

  return cleaned;
}

export async function getRequests(): Promise<WorkerRequestRecord[]> {
  const { data, error } = await supabase
    .from("worker_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getRequests error:", error);
    return [];
  }

  return (data ?? []).map(normalizeRequest);
}

export async function getRequestById(
  requestId: string
): Promise<WorkerRequestRecord | null> {
  const { data, error } = await supabase
    .from("worker_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (error) {
    console.error("getRequestById error:", error);
    return null;
  }

  return normalizeRequest(data);
}

export async function createWorkerRequest(
  payload: CreateWorkerRequestPayload
): Promise<WorkerRequestRecord> {
  const cleanedPayload = sanitizeCreateRequestPayload(payload);

  const { data, error } = await supabase
    .from("worker_requests")
    .insert(cleanedPayload)
    .select("*")
    .single();

  if (error) {
    console.error("createWorkerRequest error:", error);
    throw new Error(error.message || "Failed to create request");
  }

  const request = normalizeRequest(data);

  if (request.worker_id) {
    const busyUntil = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();

    await setWorkerAvailability(request.worker_id, {
      is_available: false,
      busy_until: busyUntil,
      availability_mode: "now",
      available_from_date: null,
      available_to_date: null,
      available_from_time: null,
      available_to_time: null,
      available_days: [],
    });
  }

  return request;
}

export async function updateRequestById(
  requestId: string,
  payload: UpdateWorkerRequestPayload
): Promise<WorkerRequestRecord> {
  const updatePayload: RequestUpdatePayload = {};

  if (typeof payload.customer_name === "string") {
    updatePayload.customer_name = payload.customer_name.trim();
  }

  if (typeof payload.phone === "string") {
    updatePayload.phone = payload.phone.trim();
  }

  if (typeof payload.city === "string") {
    updatePayload.city = payload.city.trim() || null;
  }

  if (typeof payload.area === "string") {
    updatePayload.area = payload.area.trim() || null;
  }

  if (typeof payload.request_type === "string") {
    updatePayload.request_type = payload.request_type.trim() || null;
  }

  if (Array.isArray(payload.requested_category_slugs)) {
    const cleaned = payload.requested_category_slugs
      .map((item) => item.trim())
      .filter(Boolean);

    if (cleaned.length > 0) {
      updatePayload.requested_category_slugs = cleaned;
    }
  }

  if (typeof payload.workers_count === "number" && !Number.isNaN(payload.workers_count)) {
    updatePayload.workers_count = Math.max(1, payload.workers_count);
  }

  if (typeof payload.details === "string") {
    updatePayload.details = payload.details.trim() || null;
  }

  if (typeof payload.worker_id === "string") {
    updatePayload.worker_id = payload.worker_id.trim() || null;
  }

  if (payload.worker_id === null) {
    updatePayload.worker_id = null;
  }

  if (typeof payload.status === "string") {
    updatePayload.status = payload.status.trim();
  }

  const { data, error } = await supabase
    .from("worker_requests")
    .update(updatePayload)
    .eq("id", requestId)
    .select("*")
    .single();

  if (error) {
    console.error("updateRequestById error:", error);
    throw new Error(error.message || "Failed to update request");
  }

  return normalizeRequest(data);
}

export async function assignWorkerToRequest(
  requestId: string,
  workerId: string
): Promise<WorkerRequestRecord> {
  const updatedRequest = await updateRequestById(requestId, {
    worker_id: workerId,
    status: "accepted",
  });

  const busyUntil = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString();

  await setWorkerAvailability(workerId, {
    is_available: false,
    busy_until: busyUntil,
    availability_mode: "now",
    available_from_date: null,
    available_to_date: null,
    available_from_time: null,
    available_to_time: null,
    available_days: [],
  });

  return updatedRequest;
}

export async function setRequestStatus(
  requestId: string,
  status: "pending" | "accepted" | "rejected" | "done" | "cancelled"
): Promise<WorkerRequestRecord> {
  const request = await getRequestById(requestId);

  if (!request) {
    throw new Error("الطلب غير موجود.");
  }

  const updatedRequest = await updateRequestById(requestId, { status });

  if ((status === "done" || status === "cancelled" || status === "rejected") && request.worker_id) {
    await setWorkerAvailability(request.worker_id, {
      is_available: true,
      busy_until: null,
      availability_mode: "now",
      available_from_date: null,
      available_to_date: null,
      available_from_time: null,
      available_to_time: null,
      available_days: [],
    });
  }

  return updatedRequest;
}

export async function deleteRequestById(requestId: string): Promise<void> {
  const { error } = await supabase
    .from("worker_requests")
    .delete()
    .eq("id", requestId);

  if (error) {
    console.error("deleteRequestById error:", error);
    throw new Error(error.message || "Failed to delete request");
  }
}