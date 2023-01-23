import { NextSeo } from 'next-seo'
import Home from '@/layouts/Home'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper'

const HomePage = () => (
  <>
    <NextSeo
      title="twobanks"
      {...SEO}
    />
    <Wrapper page="home">
      <Home />
    </Wrapper>
  </>
)

export default HomePage
