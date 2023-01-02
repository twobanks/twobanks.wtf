import type { GetStaticProps } from 'next'
import About from '../templates/About'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'
import client from '../graphql/client'
import GET_HOME from '../graphql/queries/getWrapper'
import GET_ABOUT from '../graphql/queries/getAbout'
import Wrapper from '../templates/Wrapper'
import { HomeProps, AboutProps } from '../types/strapi'

type AboutPageProps = {
  home: HomeProps;
  aboutData: AboutProps;
}

const AboutPage = ({ home, aboutData }: AboutPageProps) => {
  const { data: { attributes } } = home;
  const { data: { attributes: { experiences, academic, about } } } = aboutData;
  return (
  <>
    <NextSeo
      title="sobre | twobanks"
      {...SEO}
    />
    <Wrapper page="about" header={attributes.header} >
      <About about={about} academic={academic} experiences={experiences}/>
    </Wrapper>
  </>
)}

export const getStaticProps: GetStaticProps = async () => {
  const { home } = await client.request(GET_HOME);
  const { about } = await client.request(GET_ABOUT);
  return {
    props: {
      home,
      aboutData: about
    }
  }
}

export default AboutPage
