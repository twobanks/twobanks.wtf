"use server";

import { db } from "@/db";
import { stravaWorkouts } from "@/db/schema";
import { and, desc, eq, inArray, sql } from "drizzle-orm";

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

export interface RaceWorkoutItem {
  id: string;
  name: string;
  type: string | null;
  modality: "bike" | "corrida";
  distanceMeters: number;
  movingTime: number | null;
  averageSpeed: string | null;
  totalElevationGain: number;
  startDate: string;
  stravaUrl: string;
}

const BIKE_TYPES = [
  "Ride",
  "MountainBikeRide",
  "GravelRide",
  "VirtualRide",
  "EBikeRide",
];
const RUN_TYPES = ["Run", "TrailRun", "VirtualRun"];
const PAGE_SIZE = 10;

// IDs extras para forçar como prova ou excluir caso necessário
const MANUAL_RACE_IDS = new Set<string>([]);
const EXCLUDED_RACE_IDS = new Set<string>([]);

function extractWorkoutType(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const rawValue = record.workout_type ?? record.workoutType;
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return null;
  }
  const parsed = Number(rawValue);
  return Number.isNaN(parsed) ? null : parsed;
}

function isRaceWorkoutRow(row: {
  id: string;
  rawPayload: unknown;
  detailedPayload?: unknown;
}): boolean {
  if (EXCLUDED_RACE_IDS.has(row.id)) return false;
  if (MANUAL_RACE_IDS.has(row.id)) return true;

  const workoutType =
    extractWorkoutType(row.detailedPayload) ??
    extractWorkoutType(row.rawPayload);

  // 1 = Corrida (Race), 11 = Ciclismo (Race) no Strava
  return workoutType === 1 || workoutType === 11;
}

export async function fetchWorkoutsPage({
  tab,
  year,
  page = 1,
  userId,
}: {
  tab: TabType;
  year: string;
  page?: number;
  userId?: string;
}): Promise<PaginatedWorkoutsResult> {
  const typesFilter =
    tab === "bike"
      ? BIKE_TYPES
      : tab === "corrida"
        ? RUN_TYPES
        : [...BIKE_TYPES, ...RUN_TYPES];

  const whereClause = and(
    inArray(stravaWorkouts.type, typesFilter),
    sql`SUBSTRING(${stravaWorkouts.startDate}, 1, 4) = ${year}`,
    userId ? eq(stravaWorkouts.userId, userId) : undefined
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

export async function fetchRaceWorkouts({
  tab = "todas",
  userId,
}: {
  tab?: TabType;
  userId?: string;
}): Promise<RaceWorkoutItem[]> {
  const typesFilter =
    tab === "bike"
      ? BIKE_TYPES
      : tab === "corrida"
        ? RUN_TYPES
        : [...BIKE_TYPES, ...RUN_TYPES];

  const rows = await db
    .select({
      id: stravaWorkouts.id,
      name: stravaWorkouts.name,
      type: stravaWorkouts.type,
      distance: stravaWorkouts.distance,
      movingTime: stravaWorkouts.movingTime,
      averageSpeed: stravaWorkouts.averageSpeed,
      totalElevationGain: stravaWorkouts.totalElevationGain,
      startDate: stravaWorkouts.startDate,
      rawPayload: stravaWorkouts.rawPayload,
      detailedPayload: stravaWorkouts.detailedPayload,
    })
    .from(stravaWorkouts)
    .where(
      userId
        ? and(inArray(stravaWorkouts.type, typesFilter), eq(stravaWorkouts.userId, userId))
        : inArray(stravaWorkouts.type, typesFilter)
    )
    .orderBy(desc(stravaWorkouts.startDate));

  return rows
    .filter((row) => isRaceWorkoutRow(row))
    .map((row) => {
      const isBike = Boolean(row.type && BIKE_TYPES.includes(row.type));
      return {
        id: row.id,
        name: row.name,
        type: row.type,
        modality: isBike ? "bike" : "corrida",
        distanceMeters: Number(row.distance || 0),
        movingTime: row.movingTime,
        averageSpeed: row.averageSpeed,
        totalElevationGain: Number(row.totalElevationGain || 0),
        startDate: row.startDate,
        stravaUrl: `https://www.strava.com/activities/${row.id}`,
      };
    });
}