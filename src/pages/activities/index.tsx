import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import ActivitiesTemplate from '../../templates/Activities';
import { Activities, AthleteStats, mockAthleteStats } from '../../types/strava';
import { CALL_REFRESH, CALL_ACTIVITIES, CALL_ATHLETE_STATS } from '../../utils/constants/strava';

const ActivitiesPage: NextPage = () => {
  const [activities, setActivities] = useState<Activities[]>([])
  const [athleteStats, setAthleteStats] = useState<AthleteStats>(mockAthleteStats)

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

  return <ActivitiesTemplate activities={activities} athleteStats={athleteStats} loading={loading} />
}

export default ActivitiesPage
