import { NextSeo } from 'next-seo'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper'
import Listening from '@/layouts/Listening'

const HomePage = () => (
  <>
    <NextSeo
      title="listening | twobanks"
      {...SEO}
    />
    <Wrapper page="listening">
      <Listening />
    </Wrapper>
  </>
)

export default HomePage
