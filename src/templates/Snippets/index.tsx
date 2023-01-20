
import Link from 'next/link';
import * as S from './styled'
import { Post } from '../../types/banks';
import { useState, ReactNode } from 'react';

const Snippets = ({ allPosts }: { allPosts: Post[] }) => {
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
      {allPosts.map(item => (
        <Link
          key={`item-${item.slug}`}
          as={`/snippets/${item.slug}`}
          href="/snippets/[slug]"
          passHref
        >
          <Animation  index={item.slug}>
            <S.Item>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </S.Item>
          </Animation>
        </Link>
      ))}
    </S.Content>
  )
}

export default Snippets;
