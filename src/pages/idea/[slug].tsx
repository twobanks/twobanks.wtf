import { getPostBySlug, getAllPosts } from "../../utils/lib/blog/api"
import markdownToHtml from "../../utils/lib/blog/markdownToHtml"
import { NextSeo } from "next-seo";
import Wrapper from "../../templates/Wrapper";
import { SEO } from "../../utils/constants/seo";
import { Post } from "../../types/banks";
import PostBody from "../../templates/Idea/PostBody";

export default function Posts({ post }: { post: Post }) {
  return (
    <>
      <NextSeo
        title="idea | twobanks"
        {...SEO}
      />
      <Wrapper page="idea">
        <PostBody post={post} />
      </Wrapper>
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
