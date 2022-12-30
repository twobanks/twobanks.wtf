import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Home from '../templates/Home'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'
import Wrapper from '../templates/Wrapper'
import { HomeProps } from '../types/strapi'

const HomePage = ({ data }: HomeProps) => {
  const { attributes } = data;
  return (
    <>
      <NextSeo
        title="twobanks"
        {...SEO}
      />
      <Wrapper page="home" header={attributes.header} >
        <Home body={attributes.header} />
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

export default HomePage
