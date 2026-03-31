"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function toggleWorker(id: string, current: boolean) {
  const { error } = await supabase
    .from("workers")
    .update({ is_available: !current })
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to toggle worker");
  }

  revalidatePath("/admin/workers");
}

export async function deleteWorker(id: string) {
  const { error } = await supabase.from("workers").delete().eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to delete worker");
  }

  revalidatePath("/admin/workers");
}