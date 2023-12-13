import { challenges, completedChallenges } from '@/public/content';
import { Athlete, Challenges, Strava } from '@/components';
import { Activities, AthleteStats } from '@/types/strava';
import * as S from './styled'
import { useState } from 'react';
import { ACTIVITY, OPTIONS_ACTIVITY } from '@/utils/enums/strava';
import { conversionTypeActivity, conversionTitleActivities, getIconActivity } from '@/utils/functions/conversionStrava';
import DropDown from './DropDown';
import images from '@/public';
import Image from 'next/image';

type ActivitiesProps = {
  activities: Activities[];
  athlete: any;
  athleteStat: AthleteStats;
}

const ActivitiesTemplate = ({ activities, athlete, athleteStat }: ActivitiesProps) => {
  const [options, setOptions] = useState<OPTIONS_ACTIVITY>(OPTIONS_ACTIVITY.TRAINING);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<ACTIVITY>(ACTIVITY.RUN);
  const activitiesFiltered = activities.filter(item => item.sport_type === type);

  const renderOption = (value: OPTIONS_ACTIVITY) => {
    const label = {
      [OPTIONS_ACTIVITY.STATISTICS]: <Athlete athlete={athlete} athleteStat={athleteStat} type={type} />,
      [OPTIONS_ACTIVITY.TRAINING]: <Strava activities={activitiesFiltered} />,
      [OPTIONS_ACTIVITY.RACE]: <Challenges challenges={challenges} completedChallenges={completedChallenges} />,
    }
    return label[value];
  }

  return (
    <S.Content>
      <S.OptionsWrapper>
        <S.OptionsSelected>
          <h5>{conversionTitleActivities(options)} {options === OPTIONS_ACTIVITY.TRAINING && (
            <>de {conversionTypeActivity(type)}</>
          )}</h5>
          <S.DropButton type='button'  onClick={() => setOpen(prevState => !prevState)}>
            <Image src={images.statistics} alt='Selecionar' title='Selecionar' height={20} width={20} blurDataURL={images.statistics} priority quality={100}/>
            {options === OPTIONS_ACTIVITY.TRAINING && (
              <>
                |
                <Image src={getIconActivity[type]} alt={type} title={type} height={20} width={20} blurDataURL={getIconActivity[type]} priority quality={100}/>
              </>
            )}
          </S.DropButton>
        </S.OptionsSelected>
        {open && <DropDown options={options} setOptions={setOptions} type={type} setType={setType} />}
      </S.OptionsWrapper>
      <S.WrapperChallenges>
        {renderOption(options)}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
