import { NextSeo } from 'next-seo'
import About from '@/layouts/About'
import Wrapper from '@/layouts/Wrapper'
import { data } from '@/public/content';
import { SEO } from '@/utils/constants/seo'

const AboutPage = () => (
  <>
    <NextSeo
      title="sobre | twobanks"
      {...SEO}
    />
    <Wrapper page="sobre">
      <About data={data} />
    </Wrapper>
  </>
)

export default AboutPage
