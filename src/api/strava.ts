import { useEffect, useState } from 'react';
import { Activity, Athlete } from '../types/strava';
const CALL_REFRESH = `https://www.strava.com/oauth/token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&refresh_token=${process.env.NEXT_PUBLIC_REFRESH_TOKEN}&grant_type=refresh_token`

export const useAthlete = () => {
  const [athlete, setAthlete] = useState<Athlete>();
  const callAthlete = `https://www.strava.com/api/v3/athlete?access_token=`
  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getAthlete(result.access_token))
  }, [CALL_REFRESH])

  function getAthlete(access: string){
    fetch(callAthlete + access)
    .then(res => res.json())
    .then(data => setAthlete(data))
    .catch(null)
  }
  return athlete;
}

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`
  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [CALL_REFRESH])
  
  function getActivities(access: string){
    fetch(callActivities + access)
    .then(res => res.json())
    .then(data => setActivities(data))
    .catch(null)
  }
  return activities;
}