import { fetchRaceWorkouts, fetchWorkoutsPage } from "@/actions/atividades";
import { AtividadesView, ModalityDataset } from "@/components/AtividadesView";
import { db } from "@/db";
import { stravaWorkouts } from "@/db/schema";
import { inArray, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

const BIKE_TYPES = [
  "Ride",
  "MountainBikeRide",
  "GravelRide",
  "VirtualRide",
  "EBikeRide",
];
const RUN_TYPES = ["Run", "TrailRun", "VirtualRun"];

async function getModalityDataset(types: string[]): Promise<ModalityDataset> {
  const [summaryRow, yearlyRows] = await Promise.all([
    db
      .select({
        totalMeters: sql<string>`COALESCE(SUM(CAST(${stravaWorkouts.distance} AS DOUBLE PRECISION)), 0)`,
        maxMeters: sql<string>`COALESCE(MAX(CAST(${stravaWorkouts.distance} AS DOUBLE PRECISION)), 0)`,
      })
      .from(stravaWorkouts)
      .where(inArray(stravaWorkouts.type, types))
      .then((rows) => rows[0]),
    db
      .select({
        year: sql<string>`SUBSTRING(${stravaWorkouts.startDate}, 1, 4)`,
        meters: sql<string>`COALESCE(SUM(CAST(${stravaWorkouts.distance} AS DOUBLE PRECISION)), 0)`,
      })
      .from(stravaWorkouts)
      .where(inArray(stravaWorkouts.type, types))
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
  const currentYear = String(new Date().getFullYear());

  const [bikeData, runData, initialWorkoutsPage, initialRaceWorkouts] =
    await Promise.all([
      getModalityDataset(BIKE_TYPES),
      getModalityDataset(RUN_TYPES),
      fetchWorkoutsPage({ tab: "todas", year: currentYear, page: 1 }),
      fetchRaceWorkouts({ tab: "todas" }),
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
    />
  );
}