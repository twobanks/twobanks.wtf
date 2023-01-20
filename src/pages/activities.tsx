import ActivitiesTemplate from '../templates/Activities';
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import Wrapper from '../templates/Wrapper';
import { getActivities } from '../utils/lib/strava';
import { Activities } from '../types/strava';

type ActivitiesProps = {
  activities: Activities[];
}

const ActivitiesPage = ({ activities }: ActivitiesProps) => (
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

export const getStaticProps = async () => {
  const activities = await getActivities();
  return {
    props: {
      activities,
    },
    revalidate: 3600,
  };
};

export default ActivitiesPage
