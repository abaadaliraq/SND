import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  acceptRequest,
  rejectRequest,
  assignWorkerToRequest,
  completeRequest,
  unassignWorkerFromRequest,
  submitWorkerRecommendation,
} from "./actions";
import {
  getWorkerRecommendationStatsMap,
  sortWorkersByRecommendationAndAvailability,
} from "@/lib/db/reviews";

export default async function AdminRequestsPage() {
  const [
    { data: requests },
    { data: workers },
    { data: reviews },
  ] = await Promise.all([
    supabase.from("worker_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("workers").select("*"),
    supabase.from("worker_reviews").select("*"),
  ]);

  const workerIds = (workers ?? []).map((w) => String(w.id));
  const statsMap = await getWorkerRecommendationStatsMap(workerIds);

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">إدارة الطلبات</h1>

      {requests?.map((req) => {
        const assignedWorker = workers?.find(
          (w) => w.id === req.assigned_worker_id
        );

        const existingReview = reviews?.find(
          (r) => r.request_id === req.id
        );

        const matchingWorkers = sortWorkersByRecommendationAndAvailability(
          workers?.filter((w) => w.is_available) ?? [],
          statsMap
        );

        return (
          <div key={req.id} className="mb-6 p-4 border border-white/10 rounded-xl">

            <p>👤 {req.customer_name}</p>
            <p>📍 {req.city}</p>
            <p>📊 الحالة: {req.status}</p>
            <p>👷 العامل: {assignedWorker?.name || "غير معين"}</p>

            {/* assign */}
            {!req.assigned_worker_id && (
              <form action={assignWorkerToRequest} className="mt-3">
                <input type="hidden" name="requestId" value={req.id} />

                <select name="workerId" required className="text-black">
                  <option value="">اختر عامل</option>

                  {matchingWorkers.map((w) => {
                    const stats = statsMap[w.id] || { recommendPercent: 0, totalCount: 0 };

                    return (
                      <option key={w.id} value={w.id}>
                        {w.name} - {stats.recommendPercent}% ({stats.totalCount})
                      </option>
                    );
                  })}
                </select>

                <button className="ml-2 bg-green-600 px-2 py-1 rounded">
                  تعيين
                </button>
              </form>
            )}

            {/* actions */}
            <div className="flex gap-2 mt-3">

              <form action={async () => { "use server"; await acceptRequest(req.id); }}>
                <button className="bg-blue-600 px-2 py-1 rounded">قبول</button>
              </form>

              <form action={async () => { "use server"; await rejectRequest(req.id); }}>
                <button className="bg-red-600 px-2 py-1 rounded">رفض</button>
              </form>

              {req.assigned_worker_id && (
                <>
                  <form action={async () => { "use server"; await completeRequest(req.id); }}>
                    <button className="bg-green-700 px-2 py-1 rounded">
                      إنهاء
                    </button>
                  </form>

                  <form action={async () => { "use server"; await unassignWorkerFromRequest(req.id); }}>
                    <button className="bg-orange-600 px-2 py-1 rounded">
                      فك التعيين
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* review */}
            {req.status === "completed" && !existingReview && (
              <div className="mt-3 flex gap-2">

                <form action={submitWorkerRecommendation}>
                  <input type="hidden" name="requestId" value={req.id} />
                  <input type="hidden" name="workerId" value={req.assigned_worker_id} />
                  <input type="hidden" name="wouldRecommend" value="yes" />

                  <button className="bg-green-600 px-2 py-1 rounded">
                    👍 نعم
                  </button>
                </form>

                <form action={submitWorkerRecommendation}>
                  <input type="hidden" name="requestId" value={req.id} />
                  <input type="hidden" name="workerId" value={req.assigned_worker_id} />
                  <input type="hidden" name="wouldRecommend" value="no" />

                  <button className="bg-red-600 px-2 py-1 rounded">
                    👎 لا
                  </button>
                </form>

              </div>
            )}

          </div>
        );
      })}
    </main>
  );
}