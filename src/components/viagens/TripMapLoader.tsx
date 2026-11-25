"use client";

import dynamic from "next/dynamic";

const TripMapDynamic = dynamic(() => import("@/components/viagens/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] w-full rounded-2xl bg-surface-1 animate-pulse" />
  ),
});

export default TripMapDynamic;
