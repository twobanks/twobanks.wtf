"use client";

import { syncStravaAction } from "@/actions/sync-strava";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function SyncStravaButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  function handleSync() {
    setStatus(null);
    startTransition(async () => {
      const res = await syncStravaAction(false);
      setStatus(res.message);
      if (res.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={handleSync}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors cursor-pointer"
      >
        <RefreshCw className={`size-3.5 text-white ${isPending ? "animate-spin" : ""}`} />
        {isPending ? "Atualizando..." : "Sincronizar Strava"}
      </button>

      {status && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{status}</span>
      )}
    </div>
  );
}