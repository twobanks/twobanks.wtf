
import { v4 as uuid } from 'uuid'
import * as S from './styled'
import Link from 'next/link';
import Image from 'next/image';
import { Challenges } from '@/types/banks';
import { getIconActivity } from '@/utils/functions/conversionStrava';


const CompletedChallenges = ({ data } : { data: Challenges[]; }) => (
  <S.Wrapper>
    <h2>Provas concluídas</h2>
    <S.CompletedChallengesWrapper>
      {data.map(item => (
        <li key={uuid()}>
          <div className='top'>
            <Image src={getIconActivity[item.type]} alt={item.type} height={20} width={20} blurDataURL={getIconActivity[item.type]} priority quality={100} />
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
