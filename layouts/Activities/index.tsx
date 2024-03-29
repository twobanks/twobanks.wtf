import { challenges, completedChallenges } from '@/public/content';
import { Athlete, Challenges, Strava } from '@/components';
import { Activities, AthleteStats } from '@/types/strava';
import * as S from './styled'
import { useMemo, useState } from "react";
import { ACTIVITY, OPTIONS_ACTIVITY, STATISTICS } from '@/utils/enums/strava';
import Image from 'next/image';
import images from '@/public';

type ActivitiesProps = {
  activities: Activities[];
  athlete: any;
  athleteStat: AthleteStats;
}

const ActivitiesTemplate = ({ activities, athlete, athleteStat }: ActivitiesProps) => {
  const currentYear = new Date().getFullYear();
  const [options, setOptions] = useState<OPTIONS_ACTIVITY>(OPTIONS_ACTIVITY.TRAINING);
  const [type, setType] = useState<ACTIVITY>(ACTIVITY.ALL);
  const [statistics, setStatistics] = useState<STATISTICS>(STATISTICS.CURRENT_YEAR);

  const activitiesFiltered = activities.filter(item => item.sport_type === type);
  const activitiesSelected = useMemo(() => {
    const activitiesList = type === ACTIVITY.ALL ? activities : activitiesFiltered;
    return activitiesList;
  }, [activities, activitiesFiltered, type]);

  const renderOption = (value: OPTIONS_ACTIVITY) => {
    const label = {
      [OPTIONS_ACTIVITY.STATISTICS]: <Athlete athlete={athlete} athleteStat={athleteStat} type={type} statistics={statistics} />,
      [OPTIONS_ACTIVITY.TRAINING]: <Strava activities={activitiesSelected} type={type} />,
      [OPTIONS_ACTIVITY.RACE]: <Challenges challenges={challenges} completedChallenges={completedChallenges} />,
    }
    return label[value];
  }

  return (
    <S.Content>
      <S.TabsWrapper>
        <div className='tab_container'>
          <div className="tab_content">
            <S.TabButton type='button' title='Treinos' onClick={() => {
              setOptions(OPTIONS_ACTIVITY.TRAINING);
              setType(ACTIVITY.ALL)
            }} $active={options === OPTIONS_ACTIVITY.TRAINING}>
              <Image src={images.training} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.training} priority quality={100} />
              <span>Treinos</span>
            </S.TabButton>
            <S.TabButton type='button' title='Competições' onClick={() => setOptions(OPTIONS_ACTIVITY.RACE)} $active={options === OPTIONS_ACTIVITY.RACE}>
              <Image src={images.trophy} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.trophy} priority quality={100} />
              <span>Competições</span>
            </S.TabButton>
            <S.TabButton type='button' title='Estatísticas' onClick={() => {
              setOptions(OPTIONS_ACTIVITY.STATISTICS);
              setType(ACTIVITY.RUN);
              setStatistics(STATISTICS.CURRENT_YEAR);
            }} $active={options === OPTIONS_ACTIVITY.STATISTICS}>
              <Image src={images.statistics} alt='Estatísticas' title='Estatísticas' height={20} width={20} blurDataURL={images.statistics} priority quality={100}/>
              <span>Estatísticas</span>
            </S.TabButton>
          </div>
          {options === OPTIONS_ACTIVITY.TRAINING && (
            <div className="tab_content">
              <S.TabButton type='button' onClick={() => setType(ACTIVITY.ALL)} title='Todas os treinos' $active={type === ACTIVITY.ALL}>
                Todos
              </S.TabButton>
              <S.TabButton type='button' onClick={() => setType(ACTIVITY.RUN)} title='Corrida' $active={type === ACTIVITY.RUN}>
                <Image src={images.running} alt={ACTIVITY.RUN} height={20} width={20} blurDataURL={images.running} priority quality={100} />
              </S.TabButton>
              <S.TabButton type='button' onClick={() => setType(ACTIVITY.TRAIL)} title='Trail Running' $active={type === ACTIVITY.TRAIL}>
                <Image src={images.trail} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.trail} priority quality={100} />
              </S.TabButton>
              <S.TabButton type='button' onClick={() => setType(ACTIVITY.RIDE)} title='Mountain Bike' $active={type === ACTIVITY.RIDE}>
                <Image src={images.bike} alt={ACTIVITY.RIDE} height={20} width={20} blurDataURL={images.bike} priority quality={100} />
              </S.TabButton>
              <S.TabButton type='button' onClick={() => setType(ACTIVITY.GYM)} title='Academia' $active={type === ACTIVITY.GYM}>
                <Image src={images.workout} alt={ACTIVITY.GYM} height={20} width={20} blurDataURL={images.workout} priority quality={100} />
              </S.TabButton>
            </div>
          )}
          {options === OPTIONS_ACTIVITY.STATISTICS && (
            <div className='wrapper_content'>
              <div className="tab_content">
                <S.TabButton type='button' onClick={() => setStatistics(STATISTICS.CURRENT_YEAR)} title='Ano atual' $active={statistics === STATISTICS.CURRENT_YEAR}>
                  {currentYear}
                </S.TabButton>
                <S.TabButton type='button' onClick={() => setStatistics(STATISTICS.LAST_4_WEEKS)} title='Últimas 4 semanas' $active={statistics === STATISTICS.LAST_4_WEEKS}>
                  Últimas 4 semanas
                </S.TabButton>
                <S.TabButton type='button' onClick={() => setStatistics(STATISTICS.ALL)} title='Total' $active={statistics === STATISTICS.ALL}>
                  Total
                </S.TabButton>
              </div>
              <div className='tab_content'>
                <S.TabButton type='button' onClick={() => setType(ACTIVITY.RUN)} title='Corrida' $active={type === ACTIVITY.RUN}>
                  <Image src={images.running} alt={ACTIVITY.RUN} height={20} width={20} blurDataURL={images.running} priority quality={100} />
                </S.TabButton>
                <S.TabButton type='button' onClick={() => setType(ACTIVITY.RIDE)} title='Mountain Bike' $active={type === ACTIVITY.RIDE}>
                  <Image src={images.bike} alt={ACTIVITY.RIDE} height={20} width={20} blurDataURL={images.bike} priority quality={100} />
                </S.TabButton>
              </div>
            </div>
          )}
        </div>
      </S.TabsWrapper>
      <S.WrapperChallenges>
        {renderOption(options)}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
