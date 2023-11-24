
import { v4 as uuid } from 'uuid'
import * as S from './styled'
import Link from 'next/link';
import images from '@/public';
import Image from 'next/image';
import { ACTIVITY } from '@/utils/enums/strava';
import { Challenges } from '@/types/banks';

const iconActivity: any = {
  [ACTIVITY.RIDE]: images.bike,
  [ACTIVITY.RUN]: images.trail,
  [ACTIVITY.TRAIL]: images.trail,
  [ACTIVITY.WALK]: images.walking,
  [ACTIVITY.GYM]: images.workout
}

const NextChallenges = ({ data } : { data: Challenges[]; }) => (
  <S.Wrapper>
    <h2>Próximas provas</h2>
    <S.NextChallengeWrapper>
      {data.map(item => (
        <li key={uuid()}>
          <div className='top'>
            <Image src={iconActivity[item.type]} alt={item.type} height={20} width={20} blurDataURL={iconActivity[item.type]} priority quality={100} />
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
