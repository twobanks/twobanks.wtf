import type { GetStaticProps } from 'next'
import Works from '../templates/Works'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'
import GET_WORKS from '../graphql/queries/getWorks'
import Wrapper from '../templates/Wrapper'
import { HomeProps, WorkProps } from '../types/strapi'

type WorksPageProps = {
  home: HomeProps;
  work: WorkProps;
}

const WorksPage = ({ home, work }: WorksPageProps) => {
  const { data: { attributes } } = home;
  const { data: { attributes: { works } } } = work;
  return (
    <>
      <NextSeo
        title="trampos | twobanks"
        {...SEO}
      />
      <Wrapper page="works" infos={attributes.infos} >
        <Works works={works} />
      </Wrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { home } = await client.request(GET_HOME);
  const { work } = await client.request(GET_WORKS);
  return {
    props: {
      home,
      work
    }
  }
}

export default WorksPage
