import { supabase } from "@/lib/supabase";

export type WorkerRecommendationStats = {
  yesCount: number;
  noCount: number;
  totalCount: number;
  recommendPercent: number;
};

export async function createWorkerReview(payload: {
  worker_id: string;
  request_id: string;
  would_recommend: boolean;
}) {
  const { error } = await supabase.from("worker_reviews").insert({
    worker_id: payload.worker_id,
    request_id: payload.request_id,
    would_recommend: payload.would_recommend,
  });

  if (error) {
    throw new Error(error.message || "Failed to create worker review");
  }
}

export async function getWorkerRecommendationStats(
  workerId: string
): Promise<WorkerRecommendationStats> {
  const { data, error } = await supabase
    .from("worker_reviews")
    .select("would_recommend")
    .eq("worker_id", workerId);

  if (error || !data) {
    return {
      yesCount: 0,
      noCount: 0,
      totalCount: 0,
      recommendPercent: 0,
    };
  }

  const yesCount = data.filter((item) => item.would_recommend === true).length;
  const noCount = data.filter((item) => item.would_recommend === false).length;
  const totalCount = yesCount + noCount;

  const recommendPercent =
    totalCount === 0 ? 0 : Math.round((yesCount / totalCount) * 100);

  return {
    yesCount,
    noCount,
    totalCount,
    recommendPercent,
  };
}

export async function getWorkerRecommendationStatsMap(workerIds: string[]) {
  if (!workerIds.length) {
    return {};
  }

  const { data, error } = await supabase
    .from("worker_reviews")
    .select("worker_id, would_recommend")
    .in("worker_id", workerIds);

  if (error || !data) {
    return {};
  }

  const statsMap: Record<string, WorkerRecommendationStats> = {};

  for (const item of data) {
    const workerId = String(item.worker_id);

    if (!statsMap[workerId]) {
      statsMap[workerId] = {
        yesCount: 0,
        noCount: 0,
        totalCount: 0,
        recommendPercent: 0,
      };
    }

    if (item.would_recommend) {
      statsMap[workerId].yesCount += 1;
    } else {
      statsMap[workerId].noCount += 1;
    }

    statsMap[workerId].totalCount += 1;
  }

  for (const workerId of Object.keys(statsMap)) {
    const stats = statsMap[workerId];
    stats.recommendPercent =
      stats.totalCount === 0
        ? 0
        : Math.round((stats.yesCount / stats.totalCount) * 100);
  }

  return statsMap;
}

type SortableWorker = {
  id: string;
  is_available?: boolean | null;
  created_at?: string | null;
};

type RecommendationMap = Record<string, WorkerRecommendationStats>;

export function sortWorkersByRecommendationAndAvailability<T extends SortableWorker>(
  workers: T[],
  statsMap: RecommendationMap
): T[] {
  return [...workers].sort((a, b) => {
    const aStats = statsMap[String(a.id)] ?? {
      yesCount: 0,
      noCount: 0,
      totalCount: 0,
      recommendPercent: 0,
    };

    const bStats = statsMap[String(b.id)] ?? {
      yesCount: 0,
      noCount: 0,
      totalCount: 0,
      recommendPercent: 0,
    };

    const aAvailable = a.is_available ? 1 : 0;
    const bAvailable = b.is_available ? 1 : 0;

    if (bAvailable !== aAvailable) {
      return bAvailable - aAvailable;
    }

    if (bStats.recommendPercent !== aStats.recommendPercent) {
      return bStats.recommendPercent - aStats.recommendPercent;
    }

    if (bStats.totalCount !== aStats.totalCount) {
      return bStats.totalCount - aStats.totalCount;
    }

    const aCreated = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bCreated = b.created_at ? new Date(b.created_at).getTime() : 0;

    return bCreated - aCreated;
  });
}