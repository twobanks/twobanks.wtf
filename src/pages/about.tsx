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
  about: AboutProps;
}

const AboutPage = ({ home, about }: AboutPageProps) => {
  const { data: { attributes } } = home;
  const { data: { attributes: { sectionExperience, sectionAcademic, sectionAbout } } } = about;
  return (
  <>
    <NextSeo
      title="sobre | twobanks"
      {...SEO}
    />
    <Wrapper page="about" header={attributes.header} >
      <About sectionAbout={sectionAbout} sectionAcademic={sectionAcademic} sectionExperience={sectionExperience }/>
    </Wrapper>
  </>
)}

export const getStaticProps: GetStaticProps = async () => {
  const { home } = await client.request(GET_HOME);
  const { about } = await client.request(GET_ABOUT);
  return {
    props: {
      home,
      about
    }
  }
}

export default AboutPage
