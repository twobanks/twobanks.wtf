import { useEffect, useState } from 'react';
import {  Athlete } from '../types/strava';
import { CALL_REFRESH } from '../utils/constants/strava';


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
  }
  return athlete;
}