import { NextSeo } from 'next-seo'
import About from '@/templates/About'
import Wrapper from '@/templates/Wrapper'
import { data } from '@/public/content';
import { SEO } from '@/utils/constants/seo'

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
