import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs'
import path, { join } from 'path'
import matter from 'gray-matter'
import { NextSeo } from "next-seo";
import Wrapper from "@/templates/Wrapper";
import { SEO } from "@/utils/constants/seo";
import PostBody from '@/templates/Snippets/PostBody';
import { DataPost, StaticProps } from '@/types/banks';

const postsDirectory = join(process.cwd(), 'public/posts')

export default function Posts({ data, mdxSource }: { data: DataPost, mdxSource: MDXRemoteSerializeResult}) {
  return (
    <>
      <NextSeo
        title="code snippets | twobanks"
        {...SEO}
      />
      <Wrapper page="snippets">
        <PostBody data={data} mdxSource={mdxSource} />
      </Wrapper>
    </>
  )
}

export const getStaticProps = async ({ params: { slug } }: StaticProps) => {
  const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, slug + '.mdx'), 'utf-8')
  const { data, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)
  return {
    props: {
      data,
      mdxSource
    }
  }
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join(postsDirectory))
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}
