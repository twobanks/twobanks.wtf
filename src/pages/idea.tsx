import { NextSeo } from 'next-seo'
import Idea from '../templates/Idea'
import { SEO } from '../utils/constants/seo'
import Wrapper from '../templates/Wrapper'

const IdeaPage = () => (
  <>
    <NextSeo
      title="idea | twobanks"
      {...SEO}
    />
    <Wrapper page="idea">
      <Idea />
    </Wrapper>
  </>
)

export default IdeaPage
