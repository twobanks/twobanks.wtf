
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

const CompletedChallenges = ({ data } : { data: Challenges[]; }) => (
  <S.Wrapper>
    <h2>Provas concluídas</h2>
    <S.CompletedChallengesWrapper>
      {data.map(item => (
        <li key={uuid()}>
          <div className='top'>
            <Image src={iconActivity[item.type]} alt={item.type} height={20} width={20} blurDataURL={iconActivity[item.type]} priority quality={100} />
            <div className='header'>
              <Link href={`https://www.strava.com/activities/${item.id}`} target='_blank'>{item.name}</Link>
              <span>{item.local}</span>
            </div>
          </div>
          <div className='results'>
            <div className='content'>
              <span>Distância</span>
              <div className='values'>
                <strong>{item.distance}</strong>km
              </div>
            </div>
            <div className='content'>
              <span>Tempo</span>
              <strong>{item.time}</strong>
            </div>
            <div className='content'>
              <span>Elevação</span>
              <div className='values'>
                <strong>{item.elevation}</strong>m
              </div>
            </div>
          </div>
        </li>
      ))}
    </S.CompletedChallengesWrapper>
  </S.Wrapper>
)

export default CompletedChallenges;
