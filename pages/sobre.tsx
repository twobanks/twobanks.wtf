import { NextSeo } from 'next-seo'
import About from '@/layouts/About'
import Wrapper from '@/layouts/Wrapper'
import { data } from '@/public/content';

const AboutPage = () => (
  <>
    <NextSeo
      title="sobre | twobanks"
      description="Hello World!"
      openGraph={{
        title: "sobre | twobanks",
        description: "Hello World!",
        url: "https://www.twobanks.wtf/sobre",
        site_name: "twobanks",
        images: [
          { url: 'https://avatars.githubusercontent.com/u/2577611?v=4' },
        ],
      }}
    />
    <Wrapper page="sobre">
      <About data={data} />
    </Wrapper>
  </>
)

export default AboutPage
