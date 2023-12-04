import { metersToKilometers } from "@/utils/functions/conversionStrava";
import * as S from './styles';
import { ACTIVITY } from "@/utils/enums/strava";

type ResultsType = { 
  movingTime?: string;
  distance?: number;
  averageSpeed?: string;
  averageTitle?: string;
  type?: ACTIVITY;
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
            <strong>{metersToKilometers(distance)}</strong>km
          </div>
        </div>
      )}
      <div className='content' title="Tempo">
        <span>Tempo</span>
        <strong>{movingTime}</strong>
      </div>
      <div className='content' title={averageTitle}>
        <span>{averageTitle}</span>
        <div className='values'>
          <strong>{averageSpeed}</strong>{type !== ACTIVITY.RIDE ? 'km' : 'km/h'}
        </div>
      </div>
      {total_elevation_gain !== undefined && (
        <div className='content' title="Elevação">
          <span>Elevação</span>
          <div className='values'>
            <strong>{total_elevation_gain.toFixed(0)}</strong>m
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