import { getPublicOwnerId } from "@/lib/authz";
import { fetchRaceWorkouts, fetchWorkoutsPage } from "@/actions/atividades";
import { AtividadesView, ModalityDataset } from "@/components/AtividadesView";
import { db } from "@/db";
import { stravaWorkouts } from "@/db/schema";
import { and, eq, inArray, sql } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atividades",
  description:
    "Histórico de atividades físicas: treinos, provas, distância acumulada por modalidade e ano.",
  openGraph: {
    title: "Atividades - BANKS",
    description:
      "Acompanhe suas atividades físicas registradas, por modalidade e ano.",
    type: "website",
    url: "/atividades",
  },
  twitter: {
    card: "summary",
    title: "Atividades - BANKS",
    description:
      "Acompanhe suas atividades físicas registradas, por modalidade e ano.",
  },
};

export const dynamic = "force-dynamic";

const BIKE_TYPES = [
  "Ride",
  "MountainBikeRide",
  "GravelRide",
  "VirtualRide",
  "EBikeRide",
];
const RUN_TYPES = ["Run", "TrailRun", "VirtualRun"];

async function getModalityDataset(types: string[], userId: string): Promise<ModalityDataset> {
  const [summaryRow, yearlyRows] = await Promise.all([
    db
      .select({
        totalMeters: sql<string>`COALESCE(SUM(CAST(${stravaWorkouts.distance} AS DOUBLE PRECISION)), 0)`,
        maxMeters: sql<string>`COALESCE(MAX(CAST(${stravaWorkouts.distance} AS DOUBLE PRECISION)), 0)`,
      })
      .from(stravaWorkouts)
      .where(
        and(
          inArray(stravaWorkouts.type, types),
          eq(stravaWorkouts.userId, userId)
        )
      )
      .then((rows) => rows[0]),
    db
      .select({
        year: sql<string>`SUBSTRING(${stravaWorkouts.startDate}, 1, 4)`,
        meters: sql<string>`COALESCE(SUM(CAST(${stravaWorkouts.distance} AS DOUBLE PRECISION)), 0)`,
      })
      .from(stravaWorkouts)
      .where(
        and(
          inArray(stravaWorkouts.type, types),
          eq(stravaWorkouts.userId, userId)
        )
      )
      .groupBy(sql`SUBSTRING(${stravaWorkouts.startDate}, 1, 4)`),
  ]);

  const metersByYear: Record<string, number> = {};
  for (const row of yearlyRows) {
    if (row.year) {
      metersByYear[row.year] = Number(row.meters || 0);
    }
  }

  return {
    totalMeters: Number(summaryRow?.totalMeters || 0),
    maxMeters: Number(summaryRow?.maxMeters || 0),
    metersByYear,
  };
}

export default async function AtividadesPage() {
  const userId = await getPublicOwnerId();
  const currentYear = String(new Date().getFullYear());

  const [bikeData, runData, initialWorkoutsPage, initialRaceWorkouts] =
    await Promise.all([
      getModalityDataset(BIKE_TYPES, userId),
      getModalityDataset(RUN_TYPES, userId),
      fetchWorkoutsPage({ tab: "todas", year: currentYear, page: 1, userId }),
      fetchRaceWorkouts({ tab: "todas", userId }),
    ]);

  const availableYears = Array.from(
    new Set([
      currentYear,
      ...Object.keys(bikeData.metersByYear),
      ...Object.keys(runData.metersByYear),
    ])
  ).sort((a, b) => Number(b) - Number(a));

  return (
    <AtividadesView
      availableYears={availableYears}
      defaultYear={currentYear}
      bikeData={bikeData}
      runData={runData}
      initialWorkoutsPage={initialWorkoutsPage}
      initialRaceWorkouts={initialRaceWorkouts}
      userId={userId}
    />
  );
}