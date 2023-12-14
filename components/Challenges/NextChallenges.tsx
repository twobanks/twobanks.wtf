
import { v4 as uuid } from 'uuid'
import * as S from './styled'
import Link from 'next/link';
import Image from 'next/image';
import { Challenges } from '@/types/banks';
import { getIconActivity } from '@/utils/functions/conversionStrava';

const NextChallenges = ({ data } : { data: Challenges[]; }) => (
  <S.Wrapper>
    <S.NextChallengeWrapper>
      {data.map(item => (
        <li key={uuid()}>
          <div className='top'>
            <Image src={getIconActivity[item.type]} alt={item.type} height={20} width={20} blurDataURL={getIconActivity[item.type]} priority quality={100} />
            <div className='header'>
              <Link href={item.url ?? '/'} target='_blank'>{item.name}</Link>
              <div className='info'>
                <span>{item.date}</span> - <span>{item.local}</span>
              </div>
            </div>
          </div>
          <strong>{item.distance}</strong>
        </li>
      ))}
    </S.NextChallengeWrapper>
  </S.Wrapper>
)

export default NextChallenges;
