import * as S from './styled';
import images from '@/public';
import Image from 'next/image';
import { ACTIVITY, OPTIONS_ACTIVITY } from '@/utils/enums/strava';
import { Dispatch } from 'react';

type DropDownTypes = {
  options: OPTIONS_ACTIVITY;
  setOptions: Dispatch<OPTIONS_ACTIVITY>;
  type: ACTIVITY;
  setType: Dispatch<ACTIVITY>;
}

const DropDown = ({ options, setOptions, type, setType } : DropDownTypes) => (
  <S.Options $option={options === OPTIONS_ACTIVITY.TRAINING}>
    <div>
      <h4>Tipos de atividades</h4>
      <S.Button type='button' title='Treinos' onClick={() => setOptions(OPTIONS_ACTIVITY.TRAINING)} $active={options === OPTIONS_ACTIVITY.TRAINING}>
        <Image src={images.training} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.training} priority quality={100} />
        Treinos
      </S.Button>
      <S.Button type='button' title='Competições' onClick={() => setOptions(OPTIONS_ACTIVITY.RACE)} $active={options === OPTIONS_ACTIVITY.RACE}>
        <Image src={images.trophy} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.trophy} priority quality={100} />
        Competições
      </S.Button>
      <S.Button type='button' title='Estatísticas - Equipamentos' onClick={() => setOptions(OPTIONS_ACTIVITY.STATISTICS)} $active={options === OPTIONS_ACTIVITY.STATISTICS}>
        <Image src={images.statistics} alt='Estatísticas - Equipamentos' title='Estatísticas - Equipamentos' height={20} width={20} blurDataURL={images.statistics} priority quality={100}/>
        Estatísticas - Equipamentos
      </S.Button>
    </div>
    {options === OPTIONS_ACTIVITY.TRAINING && (
      <div>
        <h4>Modalidades</h4>
        <S.Button type='button' onClick={() => setType(ACTIVITY.RUN)} title='Corrida' $active={type === ACTIVITY.RUN}>
          <Image src={images.running} alt={ACTIVITY.RUN} height={20} width={20} blurDataURL={images.running} priority quality={100} />
          Corrida
        </S.Button>
        <S.Button type='button' onClick={() => setType(ACTIVITY.TRAIL)} title='Trail Running' $active={type === ACTIVITY.TRAIL}>
          <Image src={images.trail} alt={ACTIVITY.TRAIL} height={20} width={20} blurDataURL={images.trail} priority quality={100} />
          Trail Running
        </S.Button>
        <S.Button type='button' onClick={() => setType(ACTIVITY.RIDE)} title='Mountain Bike' $active={type === ACTIVITY.RIDE}>
          <Image src={images.bike} alt={ACTIVITY.RIDE} height={20} width={20} blurDataURL={images.bike} priority quality={100} />
          Mountain Bike
        </S.Button>
        <S.Button type='button' onClick={() => setType(ACTIVITY.GYM)} title='Academia' $active={type === ACTIVITY.GYM}>
          <Image src={images.workout} alt={ACTIVITY.GYM} height={20} width={20} blurDataURL={images.workout} priority quality={100} />
          Academia
        </S.Button>
      </div>
    )}
  </S.Options>
)

export default DropDown;