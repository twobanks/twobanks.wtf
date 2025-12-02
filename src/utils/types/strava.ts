export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  start_date: string;
  map: { 
    summary_polyline: string;
  };
}

export interface IActivity {
  id: number;
  name: string;
  type: string;
  distance: string;
  moving_time: string;
  date: string;
  url: string;
}

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

export interface Lap {
  index: number;
  distance: string;
  time: string;
  pace: string;
  gap: string;
  elevation: number;
  heartrate: number | string;
}

export interface ElevationChartProps {
  data: { 
    distance: string; 
    elevation: number; 
    speed?: number;
    bpm?: number;
    grade?: number;
  }[];
  onHover: (coord: [number, number] | null) => void;
}