import { NextSeo } from 'next-seo'
import Works from '@/layouts/Works'
import { SEO } from '@/utils/constants/seo'
import { works } from '@/public/content'
import Wrapper from '@/layouts/Wrapper'

const WorksPage = () => <>
  <NextSeo
    title="trampos | twobanks"
    {...SEO}
    openGraph={{
      title: "trampos | twobanks",
      description: "Hello World!",
      url: "https://www.twobanks.wtf/trampos",
      site_name: "twobanks",
    }}
  />
  <Wrapper page="trampos" >
    <Works works={works} />
  </Wrapper>
</>

export default WorksPage
