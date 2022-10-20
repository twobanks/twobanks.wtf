import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import SkeletonActivities from '../components/Skeleton/SkeletonActivities';
import ActivitiesTemplate from '../templates/Activities';
import { Activities } from '../types/strava';
import { CALL_REFRESH, CALL_ACTIVITIES } from '../utils/constants/strava';
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'

const ActivitiesPage: NextPage = () => {
  const [activities, setActivities] = useState<Activities[]>([])
  const [loadingActivities, setLoadingActivities] = useState<boolean>(true);

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => getActivities(result.access_token))
  }, [])

  const getActivities = (access: string) => {
    fetch(CALL_ACTIVITIES + access)
      .then(res => res.json())
      .then(data => setActivities(data))
      .then(() => setLoadingActivities(false))
  }

  if (loadingActivities) {
    return <SkeletonActivities />
  }

  return (
    <>
      <NextSeo
        title="vivência | twobanks"
        {...SEO}
      />
      <ActivitiesTemplate activities={activities} />
    </>
  )
}

export default ActivitiesPage
