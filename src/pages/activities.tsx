import type { GetStaticProps } from 'next'
import SkeletonActivities from '../components/Skeleton/SkeletonActivities';
import ActivitiesTemplate from '../templates/Activities';
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import { useStrava } from '../utils/hooks/strava';
import { useState } from 'react';
import client from '../graphql/client';
import GET_HOME from '../graphql/queries/getWrapper';
import Wrapper from '../templates/Wrapper';
import { HomeProps } from '../types/strapi';

const ActivitiesPage = ({ data }: HomeProps) => {
  const { attributes } = data;
  const { useActivities } = useStrava();
  const [page, setPage] = useState<number>(1);
  const { data: dataActivities , loading } = useActivities(page);
  if (loading) return <SkeletonActivities />
  return (
    <>
      <NextSeo
        title="vivência | twobanks"
        {...SEO}
      />
      <Wrapper page="activities" infos={attributes.infos} >
        <ActivitiesTemplate activities={dataActivities} page={page} setPage={setPage} />
      </Wrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { home } = await client.request(GET_HOME);
  return {
    props: {
      ...home,
    }
  }
}

export default ActivitiesPage
