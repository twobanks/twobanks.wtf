import { challenges, completedChallenges } from '@/public/content';
import { Challenges, Strava } from '@/components';
import { Activities } from '@/types/strava';
import * as S from './styled'
import { useState } from 'react';
import images from '@/public';
import Image from 'next/image';
import { ACTIVITY } from '@/utils/enums/strava';

type ActivitiesProps = {
  activities: Activities[];
}

const ActivitiesTemplate = ({ activities }: ActivitiesProps) => {
  const [options, setOptions] = useState<'activities' | 'competitions'>('activities');
  const [type, setType] = useState<ACTIVITY>(ACTIVITY.RUN);
  const activitiesFiltered = activities.filter(item => item.type === type);
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
        <button type='button' onClick={() => setType(ACTIVITY.RUN)}>
          <Image src={images.trail} alt={ACTIVITY.RUN} height={20} width={20} blurDataURL={images.trail} priority quality={100} />
        </button>
        <button type='button' onClick={() => setType(ACTIVITY.RIDE)}>
          <Image src={images.bike} alt={ACTIVITY.RIDE} height={20} width={20} blurDataURL={images.bike} priority quality={100} />
        </button>
        <button type='button' onClick={() => setType(ACTIVITY.GYM)}>
          <Image src={images.workout} alt={ACTIVITY.GYM} height={20} width={20} blurDataURL={images.workout} priority quality={100} />
        </button>
      </S.Options>
      <S.WrapperChallenges>
        {options === 'activities' && <Strava activities={activitiesFiltered} />}
        {options === 'competitions' && <Challenges challenges={challenges} completedChallenges={completedChallenges} />}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
