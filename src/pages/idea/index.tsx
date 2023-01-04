import { NextSeo } from 'next-seo'
import Idea from '../../templates/Idea'
import { SEO } from '../../utils/constants/seo'
import Wrapper from '../../templates/Wrapper'
import { getAllPosts } from '../api/idea'
import { Post } from '../../types/banks'

const IdeaPage = ({ allPosts }: { allPosts: Post[] }) => (
  <>
    <NextSeo
      title="idea | twobanks"
      {...SEO}
    />
    <Wrapper page="idea">
      <Idea allPosts={allPosts} />
    </Wrapper>
  </>
)

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'description',
  ])

  return {
    props: { allPosts },
  }
}

export default IdeaPage
