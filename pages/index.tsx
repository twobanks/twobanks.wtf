import { NextSeo } from 'next-seo'
import Home from '@/layouts/Home'
import Wrapper from '@/layouts/Wrapper'
import { seoConfig } from '@/components/seo'

const HomePage = () => (
  <>
    <NextSeo
      title="twobanks"
      {...seoConfig}
    />
    <Wrapper page="home">
      <Home />
    </Wrapper>
  </>
)

export default HomePage
