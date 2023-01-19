
import Link from 'next/link';
import * as S from './styled'
import { Post } from '../../types/banks';

const Snippets = ({ allPosts }: { allPosts: Post[] }) => (
  <S.Content>
    {allPosts.map(item => (
      <Link key={item.slug}
        as={`/snippets/${item.slug}`}
        href="/snippets/[slug]"
        passHref
        >
        <S.Item>
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </S.Item>
      </Link>
    ))}
  </S.Content>
)

export default Snippets;
