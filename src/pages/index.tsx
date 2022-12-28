import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Home from '../templates/Home'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'

const HomePage: NextPage = ({ data }: any) => {
  return (
    <>
      <NextSeo
        title="twobanks"
        {...SEO}
      />
      <Home {...data}/>
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
