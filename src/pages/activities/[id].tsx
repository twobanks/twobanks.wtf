/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ActivityTemplate from '../../templates/Activities/Details';
import { Activity } from '../../types/strava';
import { CALL_REFRESH } from '../../utils/constants/strava';

const ActivitiesPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState({})

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivity(result.access_token))
  }, [])

  function getActivity(access: string){
    fetch(`https://www.strava.com/api/v3/activities/${id}?access_token=` + access)
    .then(res => res.json())
    .then(data => setActivity(data))
  }

  return <ActivityTemplate activity={activity}/>
}

export default ActivitiesPage
