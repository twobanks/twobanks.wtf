/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { WellnessData, RawWellnessItem, IntervalsProfile } from "../types/intervals";

const API_KEY = process.env.INTERVALS_API_KEY;
const ATHLETE_ID = process.env.INTERVALS_ATHLETE_ID;
const BASE_URL = 'https://intervals.icu/api/v1';

export const getWellnessData = async (days = 2): Promise<WellnessData[] | null> => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);
  const todayStr = today.toISOString().split('T')[0];
  const pastStr = pastDate.toISOString().split('T')[0];
  if (!API_KEY || !ATHLETE_ID) return null;
  const auth = Buffer.from(`API_KEY:${API_KEY}`).toString('base64');
  try {
    const response = await fetch(
      `${BASE_URL}/athlete/${ATHLETE_ID}/wellness?oldest=${pastStr}&newest=${todayStr}`, 
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 3600 }
      }
    );
    if (!response.ok) return null;
    const data = (await response.json()) as RawWellnessItem[];
    return data.map((item) => ({
      id: item.id,
      sleepSecs: item.sleepSecs || 0,
      atl: item.atl || null,
      atlLoad: item.atlLoad || null,
      avgSleepingHR: item.avgSleepingHR || null,
      ctl: item.ctl || null,
      ctlLoad: item.ctlLoad || null,
      hrv: item.hrv || null,
      restingHR: item.restingHR || null,
      steps: item.steps || null,
    }));

  } catch (error) {
    console.error("Erro ao buscar wellness:", error);
    return null;
  }
};

export const getAthleteSettings = async (): Promise<IntervalsProfile | null> => {
  if (!API_KEY || !ATHLETE_ID) return null;
  const auth = Buffer.from(`API_KEY:${API_KEY}`).toString('base64');
  try {
    const response = await fetch(`${BASE_URL}/athlete/${ATHLETE_ID}`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600 }
    });
    if (!response.ok) return null;
    return await response.json() as IntervalsProfile;
    
  } catch (error) {
    return null;
  }
};