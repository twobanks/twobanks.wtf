import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import SkeletonActivities from '../../components/Skeleton/SkeletonActivities';
import ActivitiesTemplate from '../../templates/Activities';
import { Activities, AthleteStats, mockAthleteStats } from '../../types/strava';
import { CALL_REFRESH, CALL_ACTIVITIES, CALL_ATHLETE_STATS } from '../../utils/constants/strava';

const ActivitiesPage: NextPage = () => {
  const [activities, setActivities] = useState<Activities[]>([])
  const [athleteStats, setAthleteStats] = useState<AthleteStats>(mockAthleteStats)

  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const [loadingAthleteStats, setLoadingAthleteStats] = useState<boolean>(false);

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => getActivities(result.access_token))
  }, [])

  const getActivities = (access: string) => {
    setLoadingActivities(true)
    fetch(CALL_ACTIVITIES + access)
      .then(res => res.json())
      .then(data => setActivities(data))
      .then(() => setLoadingActivities(false))
  }

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => getAthleteStats(result.access_token))
  }, [])

  const getAthleteStats = (access: string) => {
    setLoadingAthleteStats(true)
    fetch(CALL_ATHLETE_STATS + access)
      .then(res => res.json())
      .then(data => setAthleteStats(data))
      .then(() => setLoadingAthleteStats(false))
  }
  if (loadingActivities || loadingAthleteStats) {
    return <SkeletonActivities />
  }

  return <ActivitiesTemplate activities={activities} athleteStats={athleteStats} />
}

export default ActivitiesPage
