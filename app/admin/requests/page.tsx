import { Suspense } from "react";
import RequestWorkerClient from "./RequestWorkerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RequestWorkerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0b0b]" />}>
      <RequestWorkerClient />
    </Suspense>
  );
}