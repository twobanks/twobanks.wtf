export type Athlete = {
  badge_type_id: number;
  bio: string;
  city: string;
  country: string;
  created_at: string;
  firstname: string;
  follower: object;
  friend: object;
  id: number;
  lastname: string;
  premium: boolean;
  profile: string;
  profile_medium: string;
  resource_state: number;
  sex: string;
  state: string;
  summit: boolean;
  updated_at: string;
  username: string;
  weight: number;
}

export type Activity = {
  achievement_count: number;
  athlete: {
    id: number;
    resource_state: number;
  }
  athlete_count: number;
  average_heartrate: number;
  average_speed: number;
  average_watts: number;
  comment_count: number;
  commute: boolean;
  device_watts: boolean;
  display_hide_heartrate_option: boolean;
  distance: number;
  elapsed_time: number;
  elev_high: number;
  elev_low: number;
  end_latlng: number[];
  external_id: string;
  flagged: boolean;
  from_accepted_tag: boolean;
  gear_id: string;
  has_heartrate: boolean;
  has_kudoed: boolean;
  heartrate_opt_out: boolean;
  id: number;
  kilojoules: number;
  kudos_count: number;
  location_city: null
  location_country: string;
  location_state: null
  manual: false
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  }
  max_heartrate: number;
  max_speed: number;
  moving_time: number;
  name: string;
  photo_count: number;
  pr_count: number;
  private: boolean;
  resource_state: number;
  start_date: string;
  start_date_local: string;
  start_latitude: number;
  start_latlng:  number[];
  start_longitude: number;
  suffer_score: number;
  timezone: string;
  total_elevation_gain: number;
  total_photo_count: number;
  trainer: boolean;
  type: string;
  upload_id: number;
  upload_id_str: string;
  utc_offset: number;
  visibility: string;
  workout_type: number;
}

