import type { NextPage } from 'next'
import Works from '../templates/Works'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'

const WorksPage: NextPage = () => (
  <>
    <NextSeo
      title="trampos | twobanks"
      {...SEO}
    />
    <Works />
  </>
)

export default WorksPage
