import { challenges, completedChallenges } from '@/public/content';
import { Challenges, Strava } from '@/components';
import { Activities } from '@/types/strava';
import * as S from './styled'
import { useState } from 'react';
import images from '@/public';
import Image from 'next/image';

type ActivitiesProps = {
  activities: Activities[];
}

const ActivitiesTemplate = ({ activities }: ActivitiesProps) => {
  const [options, setOptions] = useState<'activities' | 'competitions'>('activities');
  const [type, setType] = useState<'all' | 'bike' | 'trail' | 'gym'>('all');
  return (
    <S.Content>
      <S.Options>
        <button type='button' onClick={() => setOptions('activities')}>
          Atividades
        </button>
        <button type='button' onClick={() => setOptions('competitions')}>
          Competições
        </button>
        |
        <button type='button' onClick={() => setType('trail')}>
          <Image src={images.trail} alt="trail" height={20} width={20} blurDataURL={images.trail} priority quality={100} />
        </button>
        <button type='button' onClick={() => setType('bike')}>
          <Image src={images.bike} alt="bike" height={20} width={20} blurDataURL={images.bike} priority quality={100} />
        </button>
        <button type='button' onClick={() => setType('gym')} disabled={options === 'activities'}>
          <Image src={images.workout} alt="workout" height={20} width={20} blurDataURL={images.workout} priority quality={100} />
        </button>
      </S.Options>
      <S.WrapperChallenges>
        {options === 'activities' && <Strava activities={activities} />}
        {options === 'competitions' && <Challenges challenges={challenges} completedChallenges={completedChallenges} />}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
