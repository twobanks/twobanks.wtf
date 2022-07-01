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

export type Activities = {
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


export type Activity = {
  athlete: {
    id: number;
    resource_state: number;
  };
  elapsed_time: number;
  resource_state: number;
  name: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  start_date: string;
  start_date_local: string;
  achievement_count: number;
  kudos_count: number;
  timezone: string;
  map: {
    id: string;
    polyline: string;
    resource_state: number;
    summary_polyline: string;
  },
  start_latlng: number[];
  end_latlng: number[];
  average_speed: number;
  max_speed: number;
  average_heartrate: number;
  elev_high: number;
  pr_count: number;
  description: string;
  calories: number;
  utc_offset: number;
  location_city: any;
  location_state: any;
  location_country: string;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  average_watts: number;
  segment_efforts: [
    {
      id: number;
      name: string;
      resource_state: number;
      activity: {
        id: number;
        resource_state: number;
      },
      athlete: {
        id: number;
        resource_state: number;
      },
      elapsed_time: number;
      moving_time: number;
      start_date: string;
      start_date_local: string;
      distance: number;
      start_index: number;
      end_index: number;
      device_watts: boolean;
      average_watts: number;
      average_heartrate: number;
      max_heartrate: number;
      segment: {
        id: number;
        resource_state: number;
        name: string;
        activity_type: string;
        distance: number;
        average_grade: number;
        maximum_grade: number;
        elevation_high: number;
        elevation_low: number;
        start_latlng: number[];
        end_latlng: number[];
        elevation_profile: any;
        climb_category: number;
        city: string;
        state: string;
        country: string;
        private: boolean;
        hazardous: boolean;
        starred: boolean;
      },
      pr_rank: any;
      achievements: any;
      kom_rank: null,
      hidden: boolean;
    },
  ],
  gear: {
    id: string;
    name: string;
    nickname: string;
    distance: number;
    converted_distance: number;
    primary: any;
    resource_state: any;
    retired: boolean;

  },
  photos: {
    primary: any;
    count: number;
  },
}
