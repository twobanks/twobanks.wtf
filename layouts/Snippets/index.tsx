
import Link from 'next/link';
import { Post } from '@/types/banks';
import * as S from './styled'

const Snippets = ({ posts }: { posts: Post[] }) => {
  return (
    <S.Content>
      {posts.map(post => (
        <Link
          key={`post-${post.slug}`}
          as={`/snippets/${post.slug}`}
          href="/snippets/[slug]"
          passHref
        >
          <S.Item>
            <strong>{post.data.title}</strong>
            <span>{post.data.description}</span>
          </S.Item>
        </Link>
      ))}
    </S.Content>
  )
}

export default Snippets;
