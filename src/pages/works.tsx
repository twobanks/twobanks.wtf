import type { GetStaticProps } from 'next'
import Works from '../templates/Works'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'
import Wrapper from '../templates/Wrapper'
import { HomeProps } from '../types/strapi'

const WorksPage = ({ data }: HomeProps) => {
  const { attributes } = data;
  return (
    <>
      <NextSeo
        title="trampos | twobanks"
        {...SEO}
      />
      <Wrapper page="works" header={attributes.header} >
        <Works />
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

export default WorksPage
