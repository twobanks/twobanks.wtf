import { NextSeo } from 'next-seo'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper'
import Error from '@/layouts/Error'

const Custom404 = () => (
  <>
    <NextSeo
      title="twobanks"
      {...SEO}
    />
    <Error />
  </>
)

export default Custom404
