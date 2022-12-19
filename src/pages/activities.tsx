import type { NextPage } from 'next'
import SkeletonActivities from '../components/Skeleton/SkeletonActivities';
import ActivitiesTemplate from '../templates/Activities';
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import { useStrava } from '../utils/hooks/strava';
import { useState } from 'react';

const ActivitiesPage: NextPage = () => {
  const { useActivities } = useStrava();
  const [page, setPage] = useState<number>(1);
  const { data , loading } = useActivities(page);
  if (loading) return <SkeletonActivities />
  return (
    <>
      <NextSeo
        title="vivência | twobanks"
        {...SEO}
      />
      <ActivitiesTemplate activities={data} page={page} setPage={setPage} />
    </>
  )
}

export default ActivitiesPage
