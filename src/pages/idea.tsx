import type { GetStaticProps } from 'next'
import Idea from '../templates/Idea'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'
import Wrapper from '../templates/Wrapper'
import { HomeProps } from '../types/strapi'

const IdeaPage = ({ data }: HomeProps) => {
  const { attributes } = data;
  return (
    <>
      <NextSeo
        title="idea | twobanks"
        {...SEO}
      />
      <Wrapper page="home" header={attributes.header} >
        <Idea />
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

export default IdeaPage
