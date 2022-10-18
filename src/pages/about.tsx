import type { NextPage } from 'next'
import About from '../templates/About'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'

const AboutPage: NextPage = () => (
  <>
    <NextSeo
      title="sobre | twobanks"
      {...SEO}
    />
    <About />
  </>
)

export default AboutPage
