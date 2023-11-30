import { NextSeo } from 'next-seo'
import ActivitiesTemplate from '@/layouts/Activities';
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper';
import { getActivities, getAthlete, getAthleteStats } from '@/utils/lib/strava';
import { Activities, AthleteStats } from '@/types/strava';

type ActivitiesProps = {
  activities: Activities[];
  athlete: any;
  athleteStat?: AthleteStats;
}

const ActivitiesPage = ({ activities, athlete, athleteStat }: ActivitiesProps) => {
  return (
    <>
      <NextSeo
        title="atividades | twobanks"
        {...SEO}
      />
      <Wrapper page="activities">
        <ActivitiesTemplate activities={activities} />
      </Wrapper>
    </>
  )
}

export const getStaticProps = async () => {
  const activities = await getActivities();
  const athlete = await getAthlete();
  const athleteStat = await getAthleteStats();
  return {
    props: {
      activities,
      athlete,
      athleteStat,
    },
    revalidate: 3600,
  };
};

export default ActivitiesPage
