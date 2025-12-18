/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StravaActivityTotal {
  count: number;
  distance: number;
  elevation_gain: number;
  moving_time: number;
  elapsed_time: number;
}

export interface StravaStatsResponse {
  recent_run_totals: StravaActivityTotal;
  recent_ride_totals: StravaActivityTotal;
  ytd_run_totals: StravaActivityTotal;
  ytd_ride_totals: StravaActivityTotal;
  all_run_totals: StravaActivityTotal;
  all_ride_totals: StravaActivityTotal;
}

export interface IntervalsZoneObject {
  min?: number;
  max?: number;
  name?: string;
}

export interface SportSetting {
  types: string[];
  lthr?: number;
  hr_zones?: (number | IntervalsZoneObject)[]; 
}

export interface IntervalsProfileResponse {
  sportSettings: SportSetting[];
  restingHR?: number;
  max_hr?: number;
  fitness?: number; 
  fatigue?: number; 
  form?: number;    
}

export interface IntervalsWellnessItem {
  restingHR?: number;
  hrv?: number;
  date?: string;
}

export interface FormattedVolume {
  count: number;
  distance: number;
  elevation: number;
  time: number;
}

export interface FormattedZone {
  min: number;
  max: number;
  name: string;
}

export interface PhysiologyData {
  lthr: number;
  restingHR: number;
  maxHR: number;
  ctl: number;
  atl: number;
  form: number;
  zones: FormattedZone[];
}

export interface VolumeData {
  year: { run: FormattedVolume; ride: FormattedVolume };
  recent: { run: FormattedVolume; ride: FormattedVolume };
  all_time: { run: FormattedVolume; ride: FormattedVolume };
}

export interface ApiResponse {
  volume: VolumeData;
  physiology: PhysiologyData;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export type RouteProps = {
  params: Promise<{ id: string }>;
};

export interface ActivityDetails {
  id: number;
  name: string;
  type: string;
  distance: string;       
  moving_time: string;    
  elapsed_time: string;   
  suffer_score: number | string;
  device_name: string;
  gear_name: string;
  weather: {
    temp: string;
    condition: string;
  } | null;
  total_elevation_gain: number;
  calories: number;
  average_speed: string;  
  max_speed: string;      
  date: string;           
  map_polyline: string | null;
  description: string | null;
  
  laps: {
    index: number;
    distance: string;
    time: string;
    pace: string;
    heartrate: number | string;
  }[];
  
  elevationData: {
    distance: string;
    elevation: number;
    speed: string | number;
    bpm: number;
    grade: number;
    coord: number[] | null;
  }[];
  
  segments: {
    id: number;
    name: string;
    distance: string;
    time: string;
    pace: string;
    kom_rank?: number;
    pr_rank?: number;
  }[];
}

export interface IActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  date: string;
  url: string;
  start_date: string;    
  start_date_local: string;
  laps: any;
}

export interface Lap {
  id: number;
  resource_state: number;
  name: string;
  activity: { id: number };
  athlete: { id: number };
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_cadence?: number;
  device_watts?: boolean;
  average_watts?: number;
  lap_index: number;
  split: number;
  pace_zone?: number;
}