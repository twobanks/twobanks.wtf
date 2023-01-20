
import Link from 'next/link';
import * as S from './styled'
import { Post } from '../../types/banks';
import { useState, ReactNode } from 'react';

const Snippets = ({ posts }: { posts: Post[] }) => {
  const [hovered, setHovered] = useState<string>('');
  const Animation = (props: { index: string; children: ReactNode }) => {
    let isHovered = hovered === props.index
    return (
      <S.AnimContainer
        onHoverStart={() => setHovered(props.index)}
        onHoverEnd={() => setHovered('')}
      >
        {isHovered && (
          <S.AnimHovered
            layoutId="listItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {props.children}
      </S.AnimContainer>
    )
  }
  return (
    <S.Content>
      {posts.map(post => (
        <Link
          key={`post-${post.slug}`}
          as={`/snippets/${post.slug}`}
          href="/snippets/[slug]"
          passHref
        >
          <Animation index={post.slug}>
            <S.Item>
              <strong>{post.data.title}</strong>
              <span>{post.data.description}</span>
            </S.Item>
          </Animation>
        </Link>
      ))}
    </S.Content>
  )
}

export default Snippets;
