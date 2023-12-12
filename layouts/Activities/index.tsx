import { challenges, completedChallenges } from '@/public/content';
import { Athlete, Challenges, Strava } from '@/components';
import { Activities, AthleteStats } from '@/types/strava';
import * as S from './styled'
import { useState } from 'react';
import images from '@/public';
import Image from 'next/image';
import { ACTIVITY } from '@/utils/enums/strava';

type ActivitiesProps = {
  activities: Activities[];
  athlete: any;
  athleteStat: AthleteStats;
}

const ActivitiesTemplate = ({ activities, athlete, athleteStat }: ActivitiesProps) => {
  const [options, setOptions] = useState<'training' | 'race' | 'statistics'>('training');
  const [type, setType] = useState<ACTIVITY>(ACTIVITY.RUN);
  const activitiesFiltered = activities.filter(item => item.sport_type === type);
  return (
    <S.Content>
      <S.OptionsWrapper>
        <S.Options>
          <S.Button type='button' title='Estatísticas - Equipamentos' onClick={() => setOptions('statistics')} $active={options === 'statistics'}>
            Estatísticas - Equipamentos
          </S.Button>
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
        {options === 'statistics' && <Athlete athlete={athlete} athleteStat={athleteStat} type={type} />}
        {options === 'training' && <Strava activities={activitiesFiltered} />}
        {options === 'race' && <Challenges challenges={challenges} completedChallenges={completedChallenges} />}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
