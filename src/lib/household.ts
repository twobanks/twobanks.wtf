import { db } from "@/db";
import { householdMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserHouseholdIds(userId: string): Promise<string[]> {
  const memberships = await db
    .select({ householdId: householdMembers.householdId })
    .from(householdMembers)
    .where(eq(householdMembers.userId, userId));

  return memberships.map(m => m.householdId);
}

export async function getPrimaryHouseholdId(userId: string): Promise<string | null> {
  const ids = await getUserHouseholdIds(userId);
  return ids[0] ?? null;
}