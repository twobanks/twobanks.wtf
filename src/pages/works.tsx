import { NextSeo } from 'next-seo'
import Works from '../templates/Works'
import { SEO } from '../utils/constants/seo'
import { works } from '../../public/content'
import Wrapper from '../templates/Wrapper'

const WorksPage = () => <>
  <NextSeo
    title="trampos | twobanks"
    {...SEO}
  />
  <Wrapper page="works" >
    <Works works={works} />
  </Wrapper>
</>

export default WorksPage
