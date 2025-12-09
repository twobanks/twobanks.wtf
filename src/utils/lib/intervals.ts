/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const API_KEY = process.env.INTERVALS_API_KEY;
const ATHLETE_ID = process.env.INTERVALS_ATHLETE_ID;

const BASE_URL = 'https://intervals.icu/api/v1';

export interface WellnessData {
  id: string;
  sleepSecs: number;
  sleepScore: number | null;
  hrv: number | null;
  restingHR: number | null;
  readiness: number | null;
  ctl: number | null; 
  atl: number | null; 
  rampRate: number | null;
  weight?: number | null;
}

export const getWellnessData = async (days = 2): Promise<WellnessData[] | null> => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const todayStr = today.toISOString().split('T')[0];
  const pastStr = pastDate.toISOString().split('T')[0];

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

    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.id,
      sleepSecs: item.sleepSecs || 0,
      sleepScore: item.sleepScore || null,
      hrv: item.hrv || null,
      restingHR: item.restingHR || null,
      readiness: item.readiness || null,
    }));

  } catch (error) {
    console.error("Erro ao buscar wellness:", error);
    return null;
  }
};

export const getAthleteSettings = async () => {
  const auth = Buffer.from(`API_KEY:${API_KEY}`).toString('base64');

  try {
    const response = await fetch(`${BASE_URL}/athlete/${ATHLETE_ID}`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};