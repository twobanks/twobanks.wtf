import { NextSeo } from 'next-seo'
import About from '@/layouts/About'
import Wrapper from '@/layouts/Wrapper'
import { data } from '@/public/content';
import { SEO } from '@/utils/constants/seo'

const AboutPage = () => (
  <>
    <NextSeo
      title="sobre | twobanks"
      openGraph={{
        title: "sobre | twobanks",
        description: "Hello World!",
        url: "https://www.twobanks.wtf/sobre",
        site_name: "twobanks",
      }}
    />
    <Wrapper page="sobre">
      <About data={data} />
    </Wrapper>
  </>
)

export default AboutPage
