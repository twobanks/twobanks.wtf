import { NextSeo } from 'next-seo'
import Home from '@/templates/Home'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/templates/Wrapper'

const HomePage = () => (
  <>
    <NextSeo
      title="twobanks"
      {...SEO}
    />
    <Wrapper page="home" >
      <Home />
    </Wrapper>
  </>
)

export default HomePage
