/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Segment {
  id: number;
  name: string;
  distance: string;
  time: string;
  pace: string;
  grade: number;
  heartrate: number | string;
  kom_rank?: number;
  pr_rank?: number;
}

export interface ElevationChart { 
  distance: string; 
  elevation: number; 
  speed?: number;
  bpm?: number;
  grade?: number;
}

export interface ElevationChartProps {
  data: ElevationChart[];
  onHover: (coord: [number, number] | null) => void;
}

export type StatDetail = {
  count: number;
  distance: number;
  elevation: number;
  time: number;
};

export interface StatsResponse {
  volume: {
    year: VolumeData;
    recent: VolumeData;
    all_time: VolumeData;
  };
  physiology: PhysiologyData;
}

export interface ActivityMapProps {
  polylineString: string;
  highlightCoord?: [number, number] | null;
}

export type MapMode = '2D' | '3D';
export type MapStyleType = 'VECTOR' | 'SATELLITE';

export interface ActivityProps {
  activity: any;
}

export interface ActivityTotal {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count?: number;
}

export interface AthleteStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_run_totals: ActivityTotal;
  recent_ride_totals: ActivityTotal;
  recent_swim_totals: ActivityTotal;
  ytd_run_totals: ActivityTotal;
  ytd_ride_totals: ActivityTotal;
  ytd_swim_totals: ActivityTotal;
  all_run_totals: ActivityTotal;
  all_ride_totals: ActivityTotal;
  all_swim_totals: ActivityTotal;
}

export interface StreamData<T = number> {
  data: T[];
  original_size: number;
  resolution: string;
  series_type: string;
}

export interface ActivityStreams {
  distance?: StreamData<number>;
  altitude?: StreamData<number>;
  velocity_smooth?: StreamData<number>; 
  heartrate?: StreamData<number>;        
  grade_smooth?: StreamData<number>;     
  latlng?: StreamData<[number, number]>; 
  time?: StreamData<number>;
  cadence?: StreamData<number>;
  watts?: StreamData<number>;
  temp?: StreamData<number>;
  moving?: StreamData<boolean>;
}

export interface OpenMeteoResponse {
  daily?: {
    temperature_2m_max?: number[]; 
    weathercode?: number[];
  };
}

export interface ActivityWeather {
  temp: string;
  condition: string;
}

export interface StravaLapRaw {
  lap_index: number;
  distance: number;
  moving_time: number;
  average_speed: number;
  average_grade_adjusted_speed?: number;
  total_elevation_gain: number;
  average_heartrate?: number;
}

export interface StravaSegmentEffortRaw {
  id: number;
  name: string;
  distance: number;
  elapsed_time: number;
  kom_rank?: number;
  pr_rank?: number;
  average_heartrate?: number;
  segment: {
    average_grade: number;
  };
}

export interface StravaActivityRaw {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  start_date: string;
  start_latlng?: [number, number];
  total_elevation_gain: number;
  calories: number;
  average_speed: number;
  max_speed: number;
  description: string | null;
  suffer_score?: number;
  device_name?: string;
  errors?: any[]; 
  gear?: { name: string };
  map?: {
    polyline?: string;
    summary_polyline?: string;
  };
  laps?: StravaLapRaw[];
  segment_efforts?: StravaSegmentEffortRaw[];
}

export interface ElevationPoint {
  distance: string;
  elevation: number;
  speed: string | number;
  bpm: number;
  grade: number;
  coord: number[] | null;
}

export declare const formatTime: (seconds: number) => string;
export declare const calculatePace: (speed: number) => string;
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

export interface StravaLapRaw {
  lap_index: number;
  distance: number;
  moving_time: number;
  average_speed: number;
  average_grade_adjusted_speed?: number; //
  total_elevation_gain: number;
  average_heartrate?: number; 
}
export interface FormattedLap {
  index: number;
  distance: string;       
  time: string;           
  pace: string;           
  gap: string;            
  elevation: number;
  heartrate: number | string; 
}

export interface ActivitiesProps {
  activities: IActivity[];
}
export interface PillStyle {
  left: number;
  width: number;
  opacity: number;
}

export interface StravaAuthResponse {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  athlete?: {
    id: number;
    username: string;
  };
}

export interface StravaErrorResponse {
  message: string;
  errors?: Array<{
    resource: string;
    field: string;
    code: string;
  }>;
}