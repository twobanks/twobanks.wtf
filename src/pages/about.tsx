import { NextSeo } from 'next-seo'
import About from '../templates/About'
import { SEO } from '../utils/constants/seo'
import Wrapper from '../templates/Wrapper'
import { data } from '../data';

const AboutPage = () => (
  <>
    <NextSeo
      title="sobre | twobanks"
      {...SEO}
    />
    <Wrapper page="about">
      <About data={data} />
    </Wrapper>
  </>
)

export default AboutPage
