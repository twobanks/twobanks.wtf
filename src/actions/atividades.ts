"use server";

import { db } from "@/db";
import { stravaWorkouts } from "@/db/schema";
import { and, desc, inArray, sql } from "drizzle-orm";

export type TabType = "todas" | "bike" | "corrida";

export interface WorkoutSummaryItem {
  id: string;
  name: string;
  type: string | null;
  distance: string | null;
  movingTime: number | null;
  averageSpeed: string | null;
  totalElevationGain: string | null;
  startDate: string;
}

export interface PaginatedWorkoutsResult {
  items: WorkoutSummaryItem[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

const BIKE_TYPES = ["Ride", "MountainBikeRide", "GravelRide", "VirtualRide", "EBikeRide"];
const RUN_TYPES = ["Run", "TrailRun", "VirtualRun"];
const PAGE_SIZE = 10;

export async function fetchWorkoutsPage({
  tab,
  year,
  page = 1,
}: {
  tab: TabType;
  year: string;
  page?: number;
}): Promise<PaginatedWorkoutsResult> {
  const typesFilter =
    tab === "bike"
      ? BIKE_TYPES
      : tab === "corrida"
        ? RUN_TYPES
        : [...BIKE_TYPES, ...RUN_TYPES];

  const whereClause = and(
    inArray(stravaWorkouts.type, typesFilter),
    sql`SUBSTRING(${stravaWorkouts.startDate}, 1, 4) = ${year}`
  );

  const safePage = Math.max(1, Math.floor(page));
  const offset = (safePage - 1) * PAGE_SIZE;

  const [countRow, items] = await Promise.all([
    db
      .select({
        count: sql<string>`COUNT(*)`,
      })
      .from(stravaWorkouts)
      .where(whereClause)
      .then((rows) => rows[0]),
    db
      .select({
        id: stravaWorkouts.id,
        name: stravaWorkouts.name,
        type: stravaWorkouts.type,
        distance: stravaWorkouts.distance,
        movingTime: stravaWorkouts.movingTime,
        averageSpeed: stravaWorkouts.averageSpeed,
        totalElevationGain: stravaWorkouts.totalElevationGain,
        startDate: stravaWorkouts.startDate,
      })
      .from(stravaWorkouts)
      .where(whereClause)
      .orderBy(desc(stravaWorkouts.startDate))
      .limit(PAGE_SIZE)
      .offset(offset),
  ]);

  const totalCount = Number(countRow?.count || 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return {
    items,
    totalCount,
    totalPages,
    page: Math.min(safePage, totalPages),
    pageSize: PAGE_SIZE,
  };
}