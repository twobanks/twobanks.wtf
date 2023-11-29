import { challenges, completedChallenges } from '@/public/content';
import { Challenges, Strava } from '@/components';
import { Activities } from '@/types/strava';
import * as S from './styled'
import { useState } from 'react';
import images from '@/public';
import Image from 'next/image';
import { ACTIVITY } from '@/utils/enums/strava';
import { conversionTypeActivity } from '@/utils/functions/conversionStrava';

type ActivitiesProps = {
  activities: Activities[];
}

const iconActivity: any = {
  [ACTIVITY.RIDE]: images.bike,
  [ACTIVITY.RUN]: images.running,
  [ACTIVITY.TRAIL]: images.trail,
  [ACTIVITY.WALK]: images.walking,
  [ACTIVITY.GYM]: images.workout
}

const ActivitiesTemplate = ({ activities }: ActivitiesProps) => {
  const [options, setOptions] = useState<'training' | 'race'>('training');
  const [type, setType] = useState<ACTIVITY>(ACTIVITY.RUN);
  const activitiesFiltered = activities.filter(item => item.sport_type === type);

  return (
    <S.Content>
      <S.OptionsWrapper>
        {options === 'training' && (
          <S.TypeActivity>
            <Image src={iconActivity[type] ?? images.workout} title={type} alt={type} height={20} width={20} blurDataURL={iconActivity[type]} priority quality={100} />
            <strong>{conversionTypeActivity(type)}</strong>
          </S.TypeActivity>
        )}
        <S.Options>
          <S.Button type='button' title='Treinos' onClick={() => setOptions('training')} $active={options === 'training'}>
            Treinos
          </S.Button>
          <S.Button type='button' title='Provas' onClick={() => setOptions('race')} $active={options === 'race'}>
            Provas
          </S.Button>
          {options === 'training' && (
            <div>
              <S.Button type='button' onClick={() => setType(ACTIVITY.RUN)} title='Corrida' $active={type === ACTIVITY.RUN}>
                <Image src={images.running} alt={ACTIVITY.RUN} height={20} width={20} blurDataURL={images.running} priority quality={100} />
              </S.Button>
              <S.Button type='button' onClick={() => setType(ACTIVITY.TRAIL)} title='Trail Running' $active={type === ACTIVITY.TRAIL}>
                <Image src={images.trail} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.trail} priority quality={100} />
              </S.Button>
              <S.Button type='button' onClick={() => setType(ACTIVITY.RIDE)} title='Mountain Bike' $active={type === ACTIVITY.RIDE}>
                <Image src={images.bike} alt={ACTIVITY.RIDE} height={20} width={20} blurDataURL={images.bike} priority quality={100} />
              </S.Button>
            </div>
        )}
        </S.Options>
      </S.OptionsWrapper>
      <S.WrapperChallenges>
        {options === 'training' && <Strava activities={activitiesFiltered} />}
        {options === 'race' && <Challenges challenges={challenges} completedChallenges={completedChallenges} />}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
