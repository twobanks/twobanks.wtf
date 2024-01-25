import { NextSeo } from 'next-seo'
import Works from '@/layouts/Works'
import { works } from '@/public/content'
import Wrapper from '@/layouts/Wrapper'

const WorksPage = () => <>
  <NextSeo
    title="trampos | twobanks"
    description="Hello World!"
    openGraph={{
      title: "trampos | twobanks",
      description: "Hello World!",
      url: "https://www.twobanks.wtf/trampos",
      site_name: "twobanks",
      images: [
        { url: 'https://avatars.githubusercontent.com/u/2577611?v=4' },
      ],
    }}
  />
  <Wrapper page="trampos" >
    <Works works={works} />
  </Wrapper>
</>

export default WorksPage
