import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Activities from '../../templates/Activities'
import { Activity } from '../../types/strava';
import { CALL_REFRESH, CALL_ACTIVITIES } from '../../utils/constants/strava';

const ActivitiesPage: NextPage = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [])

  function getActivities(access: string){
    setLoading(true)
    fetch(CALL_ACTIVITIES + access)
    .then(res => res.json())
    .then(data => setActivities(data))
    .then(() => setLoading(false))
  }

  return <Activities activities={activities} loading={loading} />
}

export default ActivitiesPage
