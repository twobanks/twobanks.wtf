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