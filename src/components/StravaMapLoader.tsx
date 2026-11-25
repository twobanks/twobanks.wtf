"use client";

import dynamic from "next/dynamic";

const StravaMapDynamic = dynamic(() => import("@/components/StravaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-2xl bg-zinc-900 animate-pulse" />
  ),
});

export default StravaMapDynamic;
