import { NextSeo } from 'next-seo'
import ActivitiesTemplate from '@/layouts/Activities';
import Wrapper from '@/layouts/Wrapper';
import { getActivities, getAthlete, getAthleteStats } from '@/utils/lib/strava';
import { Activities, AthleteStats } from '@/types/strava';

type ActivitiesProps = {
  activities: Activities[];
  athlete: any;
  athleteStat: AthleteStats;
}

const ActivitiesPage = ({ activities, athlete, athleteStat }: ActivitiesProps) => {
  return (
    <>
      <NextSeo
        title="atividades | twobanks"
        description="Hello World!"
        openGraph={{
          title: "atividades | twobanks",
          description: "Hello World!",
          url: "https://www.twobanks.wtf/atividades",
          site_name: "twobanks",
          images: [
            { url: 'https://avatars.githubusercontent.com/u/2577611?v=4' },
          ],
        }}
      />
      <Wrapper page="activities">
        <ActivitiesTemplate activities={activities} athlete={athlete} athleteStat={athleteStat} />
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
