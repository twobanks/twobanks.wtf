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
  const OUTDOOR = (type !== ACTIVITY.WORKOUT) && (type !== ACTIVITY.GYM);
  return (
    <S.ActivityData>
      {OUTDOOR && distance && (
        <div className='content'  title="Distância">
          <span>Distância</span>
          <div className='values'>
            <strong>{metersToKilometers(distance)}</strong>km
          </div>
        </div>
      )}
      <div className='content'  title="Tempo">
        <span>Tempo</span>
        <strong>{movingTime}</strong>
      </div>
      {OUTDOOR && (
        <div className='content'>
          <span>{averageTitle}</span>
          <div className='values'  title={averageTitle}>
            <strong>{averageSpeed}</strong>{type !== ACTIVITY.RIDE ? 'km' : 'km/h'}
          </div>
        </div>
      )}
      {OUTDOOR && total_elevation_gain !== undefined && (
        <div className='content'>
          <span>Elevação</span>
          <div className='values' title="Elevação">
            <strong>{total_elevation_gain.toFixed(0)}</strong>m
          </div>
        </div>
      )}
      {OUTDOOR && average !== undefined && (
        <div className='content'  title="Frequência cardiaca média">
          <span>F.C Média</span>
          <div className='values'>
            <S.HeartRate average={average} />
            <strong>{average.toFixed(0)}</strong>bpm
          </div>
        </div>
      )}
    </S.ActivityData>
  )
}

export default Results;