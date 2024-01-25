import { NextSeo } from 'next-seo'
import Error from '@/layouts/Error'
import { seoConfig } from '@/components/seo'

const Custom404 = () => (
  <>
    <NextSeo
      title="twobanks"
      {...seoConfig}
    />
    <Error />
  </>
)

export default Custom404
