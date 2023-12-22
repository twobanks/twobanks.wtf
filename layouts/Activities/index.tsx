import { challenges, completedChallenges } from '@/public/content';
import { Athlete, Challenges, Strava } from '@/components';
import { Activities, AthleteStats } from '@/types/strava';
import * as S from './styled'
import { useState } from "react";
import { ACTIVITY, OPTIONS_ACTIVITY } from '@/utils/enums/strava';
import { conversionTypeActivity, conversionTitleActivities, getIconActivity, getIconTypeActivity } from '@/utils/functions/conversionStrava';
import DropDown from './DropDown';
import Image from 'next/image';
import images from '@/public';

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
      <S.TabsWrapper>
        <div className='tab_container'>
          <div className="tab_content">
            <S.TabButton type='button' title='Treinos' onClick={() => setOptions(OPTIONS_ACTIVITY.TRAINING)} $active={options === OPTIONS_ACTIVITY.TRAINING}>
              <Image src={images.training} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.training} priority quality={100} />
              Treinos
            </S.TabButton>
            <S.TabButton type='button' title='Competições' onClick={() => setOptions(OPTIONS_ACTIVITY.RACE)} $active={options === OPTIONS_ACTIVITY.RACE}>
              <Image src={images.trophy} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.trophy} priority quality={100} />
              Competições
            </S.TabButton>
            <S.TabButton type='button' title='Estatísticas' onClick={() => setOptions(OPTIONS_ACTIVITY.STATISTICS)} $active={options === OPTIONS_ACTIVITY.STATISTICS}>
              <Image src={images.statistics} alt='Estatísticas' title='Estatísticas' height={20} width={20} blurDataURL={images.statistics} priority quality={100}/>
              Estatísticas
            </S.TabButton>
          </div>
          <div className="tab_content modality">
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
        </div>
      </S.TabsWrapper>
      {/* <S.OptionsWrapper>
        <S.OptionsSelected>
          <div className='wrapper_options'>
            <div className='dropdown_container'>
              <span>Opções:</span>
              <S.DropButton type='button'  onClick={() => setOpen(prevState => !prevState)}>
                <Image src={getIconTypeActivity[options]} alt={conversionTitleActivities(options)} title={conversionTitleActivities(options)} height={20} width={20} blurDataURL={getIconTypeActivity[options]} priority quality={100}/>
                {options === OPTIONS_ACTIVITY.TRAINING && (
                  <>
                    |
                    <Image src={getIconActivity[type]} alt={conversionTypeActivity(type)} title={conversionTypeActivity(type)} height={20} width={20} blurDataURL={getIconActivity[type]} priority quality={100}/>
                  </>
                )}
              </S.DropButton>
            </div>
            <div className='title'>
              <h6 title={conversionTitleActivities(options)}>{conversionTitleActivities(options)}</h6>
              {options === OPTIONS_ACTIVITY.TRAINING && (
                <>
                  {`>`}
                  <h6 title={conversionTypeActivity(type)}>{conversionTypeActivity(type)}</h6>
                </>
              )}
            </div>
          </div>
          {open && <DropDown options={options} setOptions={setOptions} type={type} setType={setType} />}
        </S.OptionsSelected>
      </S.OptionsWrapper> */}
      <S.WrapperChallenges>
        {renderOption(options)}
      </S.WrapperChallenges>
    </S.Content>
  )
}

export default ActivitiesTemplate;
