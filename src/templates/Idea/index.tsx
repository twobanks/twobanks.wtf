
import Link from 'next/link';
import * as S from './styled'
import { Post } from '../../types/banks';

const Idea = ({ allPosts }: { allPosts: Post[] }) => (
  <S.Content>
    {allPosts.map(item => (
      <Link key={item.slug}
        as={`/idea/${item.slug}`}
        href="/idea/[slug]"
        >
        {item.title}
      </Link>
    ))}
  </S.Content>
)

export default Idea;
