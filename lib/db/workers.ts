import { supabase } from "@/lib/supabase";

export type WorkerRecord = {
  id: string;
  worker_code: string;
  name: string;
  primary_job_title: string;
  category_slugs: string[];
  city: string | null;
  area: string | null;
  phone: string | null;
  whatsapp: string | null;
  experience: number;
  daily_rate: number | null;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  availability_mode: string;
  available_from_date: string | null;
  available_to_date: string | null;
  available_from_time: string | null;
  available_to_time: string | null;
  available_days: string[];
  busy_until: string | null;
  source: string;
  monthly_requests_count?: number;
  created_at: string;
  updated_at: string;
};

export type UpsertWorkerPayload = {
  name: string;
  primary_job_title: string;
  category_slugs: string[];
  city?: string;
  area?: string;
  phone: string;
  whatsapp?: string;
  experience?: number;
  daily_rate?: number;
  description?: string;
  image_url?: string;
  is_available?: boolean;
  availability_mode?: string;
  available_from_date?: string;
  available_to_date?: string;
  available_from_time?: string;
  available_to_time?: string;
  available_days?: string[];
};

type WorkerWritePayload = {
  name: string;
  primary_job_title: string;
  category_slugs: string[];
  city: string | null;
  area: string | null;
  phone: string;
  whatsapp: string | null;
  experience: number;
  daily_rate: number | null;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  availability_mode: string;
  available_from_date: string | null;
  available_to_date: string | null;
  available_from_time: string | null;
  available_to_time: string | null;
  available_days: string[];
  busy_until: string | null;
  source: string;
};

type WorkerUpdatePayload = Partial<WorkerWritePayload>;

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function normalizeNullableString(value: unknown): string | null {
  if (typeof value !== "string") return value == null ? null : String(value);
  const trimmed = value.trim();
  return trimmed || null;
}

function normalizeNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function normalizeWorker(row: any): WorkerRecord {
  return {
    id: String(row.id),
    worker_code: row.worker_code ?? "",
    name: row.name ?? "",
    primary_job_title: row.primary_job_title ?? "عامل خدمات",
    category_slugs: normalizeStringArray(row.category_slugs),
    city: row.city ?? null,
    area: row.area ?? null,
    phone: row.phone ?? null,
    whatsapp: row.whatsapp ?? null,
    experience: normalizeNumber(row.experience, 0),
    daily_rate:
      typeof row.daily_rate === "number" && !Number.isNaN(row.daily_rate)
        ? row.daily_rate
        : row.daily_rate != null && !Number.isNaN(Number(row.daily_rate))
        ? Number(row.daily_rate)
        : null,
    description: row.description ?? null,
    image_url: row.image_url ?? null,
    is_available:
      typeof row.is_available === "boolean" ? row.is_available : true,
    availability_mode: row.availability_mode ?? "now",
    available_from_date: row.available_from_date ?? null,
    available_to_date: row.available_to_date ?? null,
    available_from_time: row.available_from_time ?? null,
    available_to_time: row.available_to_time ?? null,
    available_days: normalizeStringArray(row.available_days),
    busy_until: row.busy_until ?? null,
    source: row.source ?? "website",
    monthly_requests_count:
      typeof row.monthly_requests_count === "number"
        ? row.monthly_requests_count
        : row.monthly_requests_count != null &&
          !Number.isNaN(Number(row.monthly_requests_count))
        ? Number(row.monthly_requests_count)
        : 0,
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? new Date().toISOString(),
  };
}

function sanitizeWorkerPayload(payload: UpsertWorkerPayload): WorkerWritePayload {
  const cleaned: WorkerWritePayload = {
    name: payload.name.trim(),
    primary_job_title: payload.primary_job_title.trim(),
    category_slugs: (payload.category_slugs ?? [])
      .map((item) => item.trim())
      .filter(Boolean),
    city: payload.city?.trim() || null,
    area: payload.area?.trim() || null,
    phone: payload.phone.trim(),
    whatsapp: payload.whatsapp?.trim() || null,
    experience:
      typeof payload.experience === "number" && !Number.isNaN(payload.experience)
        ? payload.experience
        : payload.experience != null && !Number.isNaN(Number(payload.experience))
        ? Number(payload.experience)
        : 0,
    daily_rate:
      typeof payload.daily_rate === "number" && !Number.isNaN(payload.daily_rate)
        ? payload.daily_rate
        : payload.daily_rate != null && !Number.isNaN(Number(payload.daily_rate))
        ? Number(payload.daily_rate)
        : null,
    description: payload.description?.trim() || null,
    image_url: payload.image_url?.trim() || null,
    is_available:
      typeof payload.is_available === "boolean" ? payload.is_available : true,
    availability_mode: payload.availability_mode?.trim() || "now",
    available_from_date: payload.available_from_date?.trim() || null,
    available_to_date: payload.available_to_date?.trim() || null,
    available_from_time: payload.available_from_time?.trim() || null,
    available_to_time: payload.available_to_time?.trim() || null,
    available_days: (payload.available_days ?? [])
      .map((item) => item.trim())
      .filter(Boolean),
    busy_until: null,
    source: "website",
  };

  if (!cleaned.name || !cleaned.primary_job_title || !cleaned.phone) {
    throw new Error("الاسم والهاتف والمهنة الرئيسية مطلوبة.");
  }

  if (cleaned.category_slugs.length === 0) {
    throw new Error("لازم تختار مهنة واحدة على الأقل.");
  }

  return cleaned;
}

export async function getWorkers(): Promise<WorkerRecord[]> {
  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getWorkers error:", error);
    return [];
  }

  return (data ?? []).map(normalizeWorker);
}

export async function getAvailableWorkers(): Promise<WorkerRecord[]> {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .or(`is_available.eq.true,busy_until.lt.${nowIso}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAvailableWorkers error:", error);
    return [];
  }

  return (data ?? []).map(normalizeWorker);
}

export async function getWorkerById(id: string): Promise<WorkerRecord | null> {
  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getWorkerById error:", error);
    return null;
  }

  return normalizeWorker(data);
}

export async function getWorkerByPhone(
  phone: string
): Promise<WorkerRecord | null> {
  const cleanedPhone = phone.trim();

  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .eq("phone", cleanedPhone)
    .maybeSingle();

  if (error) {
    console.error("getWorkerByPhone error:", error);
    return null;
  }

  if (!data) return null;

  return normalizeWorker(data);
}

async function createWorkerRecord(
  payload: WorkerWritePayload
): Promise<WorkerRecord> {
  const { data, error } = await supabase
    .from("workers")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error("createWorkerRecord error:", error);
    throw new Error(error.message || "Failed to create worker");
  }

  return normalizeWorker(data);
}

async function updateWorkerRecordById(
  id: string,
  payload: WorkerUpdatePayload
): Promise<WorkerRecord> {
  const { data, error } = await supabase
    .from("workers")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("updateWorkerRecordById error:", error);
    throw new Error(error.message || "Failed to update worker");
  }

  return normalizeWorker(data);
}

export async function createWorker(
  payload: UpsertWorkerPayload
): Promise<WorkerRecord> {
  const cleanedPayload = sanitizeWorkerPayload(payload);
  return createWorkerRecord(cleanedPayload);
}

export async function updateWorkerById(
  id: string,
  payload: Partial<UpsertWorkerPayload>
): Promise<WorkerRecord> {
  const updatePayload: WorkerUpdatePayload = {};

  if (typeof payload.name === "string") {
    updatePayload.name = payload.name.trim();
  }

  if (typeof payload.primary_job_title === "string") {
    updatePayload.primary_job_title = payload.primary_job_title.trim();
  }

  if (Array.isArray(payload.category_slugs)) {
    updatePayload.category_slugs = payload.category_slugs
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if ("city" in payload) {
    updatePayload.city = normalizeNullableString(payload.city);
  }

  if ("area" in payload) {
    updatePayload.area = normalizeNullableString(payload.area);
  }

  if (typeof payload.phone === "string") {
    updatePayload.phone = payload.phone.trim();
  }

  if ("whatsapp" in payload) {
    updatePayload.whatsapp = normalizeNullableString(payload.whatsapp);
  }

  if (typeof payload.experience === "number" && !Number.isNaN(payload.experience)) {
    updatePayload.experience = payload.experience;
  } else if (
    payload.experience != null &&
    !Number.isNaN(Number(payload.experience))
  ) {
    updatePayload.experience = Number(payload.experience);
  }

  if (typeof payload.daily_rate === "number" && !Number.isNaN(payload.daily_rate)) {
    updatePayload.daily_rate = payload.daily_rate;
  } else if (
    payload.daily_rate != null &&
    !Number.isNaN(Number(payload.daily_rate))
  ) {
    updatePayload.daily_rate = Number(payload.daily_rate);
  } else if ("daily_rate" in payload && payload.daily_rate == null) {
    updatePayload.daily_rate = null;
  }

  if ("description" in payload) {
    updatePayload.description = normalizeNullableString(payload.description);
  }

  if ("image_url" in payload) {
    updatePayload.image_url = normalizeNullableString(payload.image_url);
  }

  if (typeof payload.is_available === "boolean") {
    updatePayload.is_available = payload.is_available;
  }

  if (typeof payload.availability_mode === "string") {
    updatePayload.availability_mode = payload.availability_mode.trim() || "now";
  }

  if ("available_from_date" in payload) {
    updatePayload.available_from_date = normalizeNullableString(
      payload.available_from_date
    );
  }

  if ("available_to_date" in payload) {
    updatePayload.available_to_date = normalizeNullableString(
      payload.available_to_date
    );
  }

  if ("available_from_time" in payload) {
    updatePayload.available_from_time = normalizeNullableString(
      payload.available_from_time
    );
  }

  if ("available_to_time" in payload) {
    updatePayload.available_to_time = normalizeNullableString(
      payload.available_to_time
    );
  }

  if (Array.isArray(payload.available_days)) {
    updatePayload.available_days = payload.available_days
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return updateWorkerRecordById(id, updatePayload);
}

export async function upsertWorkerByPhone(
  payload: UpsertWorkerPayload
): Promise<WorkerRecord> {
  const cleanedPayload = sanitizeWorkerPayload(payload);
  const existingWorker = await getWorkerByPhone(cleanedPayload.phone);

  if (existingWorker) {
    return updateWorkerRecordById(existingWorker.id, cleanedPayload);
  }

  return createWorkerRecord(cleanedPayload);
}

export async function setWorkerAvailability(
  workerId: string,
  options: {
    is_available: boolean;
    busy_until?: string | null;
    availability_mode?: string;
    available_from_date?: string | null;
    available_to_date?: string | null;
    available_from_time?: string | null;
    available_to_time?: string | null;
    available_days?: string[];
  }
): Promise<WorkerRecord> {
  const updatePayload: WorkerUpdatePayload = {
    is_available: options.is_available,
    busy_until: options.busy_until ?? null,
    availability_mode: options.availability_mode ?? "now",
    available_from_date: options.available_from_date ?? null,
    available_to_date: options.available_to_date ?? null,
    available_from_time: options.available_from_time ?? null,
    available_to_time: options.available_to_time ?? null,
    available_days: options.available_days ?? [],
  };

  return updateWorkerRecordById(workerId, updatePayload);
}

export async function deleteWorkerById(workerId: string): Promise<void> {
  const { error } = await supabase.from("workers").delete().eq("id", workerId);

  if (error) {
    console.error("deleteWorkerById error:", error);
    throw new Error(error.message || "Failed to delete worker");
  }
}

export async function getTopRequestedWorkerThisMonth(): Promise<WorkerRecord | null> {
  const { data, error } = await supabase
    .from("top_requested_worker_current_month")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("top requested worker view error:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const worker = await getWorkerById(String(data.id));

  if (!worker) {
    return null;
  }

  return {
    ...worker,
    monthly_requests_count: Number(data.monthly_requests_count || 0),
  };
}