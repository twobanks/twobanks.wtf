import { NextSeo } from 'next-seo'
import fs from 'fs'
import path, { join } from 'path'
import matter from 'gray-matter'
import { Post } from '@/types/banks'
import Snippets from '@/layouts/Snippets'
import Wrapper from '@/layouts/Wrapper'
import { seoConfig } from '@/components/seo'

const postsDirectory = join(process.cwd(), 'public/posts')

const SnippetsPage = ({ posts }: { posts: Post[] }) => (
  <>
    <NextSeo
      title="code snippets | twobanks"
      {...seoConfig}
    />
    <Wrapper page="snippets">
      <Snippets posts={posts} />
    </Wrapper>
  </>
)

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join(postsDirectory))
  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
    const { data } = matter(markdownWithMeta)
    return {
      data,
      slug: filename.split('.')[0]
    }
  })
  return {
    props: {
      posts
    }
  }
}

export default SnippetsPage
