import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import ActivitiesTemplate from '../../templates/Activities';
import { Activities } from '../../types/strava';
import { CALL_REFRESH, CALL_ACTIVITIES, CALL_ATHLETE_STATS } from '../../utils/constants/strava';

type AthleteStats = {
  recent_run_totals : string;
  all_run_totals : string;
  recent_swim_totals : string;
  biggest_ride_distance : number;
  ytd_swim_totals : string;
  all_swim_totals : string;
  recent_ride_totals : {
    distance : number;
    achievement_count : number;
    count : number;
    elapsed_time : number;
    elevation_gain : number;
    moving_time : number;
  },
  biggest_climb_elevation_gain : number;
  ytd_ride_totals : string;
  all_ride_totals : string;
  ytd_run_totals : string;
}

const ActivitiesPage: NextPage = () => {
  const [activities, setActivities] = useState<Activities[]>([])
  const [athleteStats, setAthleteStats] = useState<AthleteStats>()

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [])

  const getActivities =(access: string) => {
    setLoading(true)
    fetch(CALL_ACTIVITIES + access)
    .then(res => res.json())
    .then(data => setActivities(data))
    .then(() => setLoading(false))
  }

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getAthleteStats(result.access_token))
  }, [])

  const getAthleteStats = (access: string) => {
    setLoading(true)
    fetch(CALL_ATHLETE_STATS + access)
    .then(res => res.json())
    .then(data => setAthleteStats(data))
    .then(() => setLoading(false))
  }

  return <ActivitiesTemplate activities={activities} loading={loading} />
}

export default ActivitiesPage
