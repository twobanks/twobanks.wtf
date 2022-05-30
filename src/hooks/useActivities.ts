import { useEffect, useState } from 'react';
import {  Activity } from '../types/strava';
import { CALL_REFRESH } from '../utils/constants/strava';


export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  console.log("activities", activities);
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
  }
  return activities;
}
