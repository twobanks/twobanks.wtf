import { getIconActivity, metersToKilometers } from "@/utils/functions/conversionStrava";
import * as S from './styles';
import { ACTIVITY } from "@/utils/enums/strava";
import images from '@/public';
import Image from 'next/image';

type ResultsType = { 
  movingTime?: string;
  distance?: number;
  averageSpeed?: string;
  averageTitle?: string;
  type: ACTIVITY;
  total_elevation_gain?: number;
  average?: number;
}

const Results = ({ movingTime, distance, averageTitle, averageSpeed, total_elevation_gain, type, average } : ResultsType) => {
  return (
    <S.ActivityData>
      {distance && (
        <div className='content'  title="Distância">
          <span>Distância</span>
          <div className='values'>
            <strong>
              <Image src={images.loc} alt='Selecionar' title='Selecionar' height={16} width={16} blurDataURL={images.loc} priority quality={100}/>
              {metersToKilometers(distance)}
            </strong>km
          </div>
        </div>
      )}
      <div className='content' title="Tempo">
        <span>Tempo</span>
        <strong>
          <Image src={images.time} alt='Selecionar' title='Selecionar' height={16} width={16} blurDataURL={images.time} priority quality={100}/>
          {movingTime}
        </strong>
      </div>
      <div className='content' title={averageTitle}>
        <span>{averageTitle}</span>
        <div className='values'>
          <strong>
            <Image src={getIconActivity[type]} alt='Selecionar' title='Selecionar' height={16} width={16} blurDataURL={getIconActivity[type]} priority quality={100}/>
            {averageSpeed}
          </strong>{type !== ACTIVITY.RIDE ? 'km' : 'km/h'}
        </div>
      </div>
      {total_elevation_gain !== undefined && (
        <div className='content' title="Elevação">
          <span>Elevação</span>
          <div className='values'>
            <strong>
              <Image src={images.elevation} alt='Selecionar' title='Selecionar' height={16} width={16} blurDataURL={images.elevation} priority quality={100}/>
              {total_elevation_gain.toFixed(0)}
            </strong>m
          </div>
        </div>
      )}
      {average !== undefined && (
        <div className='content' title="Frequência cardiaca média">
          <span>F.C Média</span>
          <div className='values'>
            <S.HeartRate $average={average} />
            <strong>{average.toFixed(0)}</strong>bpm
          </div>
        </div>
      )}
    </S.ActivityData>
  )
}

export default Results;