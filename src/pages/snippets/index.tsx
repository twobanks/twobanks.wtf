import { NextSeo } from 'next-seo'
import Snippets from '../../templates/Snippets'
import { SEO } from '../../utils/constants/seo'
import Wrapper from '../../templates/Wrapper'
import { getAllPosts } from '../api/snippets'
import { Post } from '../../types/banks'

const SnippetsPage = ({ allPosts }: { allPosts: Post[] }) => (
  <>
    <NextSeo
      title="code snippets | twobanks"
      {...SEO}
    />
    <Wrapper page="snippets">
      <Snippets allPosts={allPosts} />
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

export default SnippetsPage
