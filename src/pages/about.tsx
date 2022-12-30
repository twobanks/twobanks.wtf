import type { GetStaticProps } from 'next'
import About from '../templates/About'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'
import Wrapper from '../templates/Wrapper'
import { HomeProps } from '../types/strapi'

const AboutPage = ({ data }: HomeProps) => {
  const { attributes } = data;
  return (
  <>
    <NextSeo
      title="sobre | twobanks"
      {...SEO}
    />
    <Wrapper page="about" header={attributes.header} >
      <About />
    </Wrapper>
  </>
)}

export const getStaticProps: GetStaticProps = async () => {
  const { home } = await client.request(GET_HOME);
  return {
    props: {
      ...home,
    }
  }
}

export default AboutPage
