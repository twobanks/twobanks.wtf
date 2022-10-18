import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Home from '../templates/Home'
import { SEO } from '../utils/constants/seo'

const HomePage: NextPage = () => (
  <>
    <NextSeo
      title="twobanks"
      {...SEO}
    />
    <Home />
  </>
)

export default HomePage
