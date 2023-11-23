import { NextSeo } from 'next-seo'
import Works from '@/layouts/Works'
import { SEO } from '@/utils/constants/seo'
import { works } from '@/public/content'
import Wrapper from '@/layouts/Wrapper'

const WorksPage = () => <>
  <NextSeo
    title="trampos | twobanks"
    {...SEO}
  />
  <Wrapper page="trampos" >
    <Works works={works} />
  </Wrapper>
</>

export default WorksPage