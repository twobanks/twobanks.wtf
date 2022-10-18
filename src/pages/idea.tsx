import type { NextPage } from 'next'
import Idea from '../templates/Idea'
import { NextSeo } from 'next-seo'
import { SEO } from '../utils/constants/seo'

const IdeaPage: NextPage = () => (
  <>
    <NextSeo
      title="idea | twobanks"
      {...SEO}
    />
    <Idea />
  </>
)

export default IdeaPage
