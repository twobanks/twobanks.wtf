/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WellnessDayRaw {
  id: string; 
  sleepSecs: number;
  sleepScore: number;
  hrv?: number | null; 
  restingHR: number;
  atl: number;
  atlLoad: number;
  avgSleepingHR: number;
  ctl: number;
  ctlLoad: number;
  steps: number;
}

export interface FormattedWellnessData {
  date: string;
  fullDate: string;
  sleepTime: string;
  sleepHours: number;
  sleepScore: number;
  hrv: number | null;
  restingHR: number;
  atl: number;
  atlLoad: number;
  avgSleepingHR: number;
  ctl: number;
  ctlLoad: number;
  steps: number;
}

export interface WellnessData {
  id: string;
  sleepSecs: number;
  hrv: number | null;
  restingHR: number | null;
  ctl: number | null;
  atl: number | null;
  atlLoad: number | null;
  ctlLoad: number | null;
  avgSleepingHR: number | null;
  steps: number | null;
}

export interface RawWellnessItem {
  id: string;
  sleepSecs?: number;
  hrv?: number;
  restingHR?: number;
  ctl?: number;
  atl?: number;
  atlLoad?: number;
  ctlLoad?: number;
  avgSleepingHR?: number;
  steps?: number;
  [key: string]: any; 
}
export interface ZoneObject {
  min: number;
  max: number;
  name?: string;
}

export interface SportSetting {
  types: string[]; 
  lthr?: number;
  hr_zones: (number | ZoneObject)[]; 
}

export interface IntervalsProfile {
  id: string;
  name: string;
  restingHR?: number;
  max_hr?: number;
  fitness?: number; 
  fatigue?: number; 
  form?: number;    
  sportSettings: SportSetting[];
}