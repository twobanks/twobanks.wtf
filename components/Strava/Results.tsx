import { metersToKilometers } from "@/utils/functions/conversionStrava";
import * as S from './styles';
import { ACTIVITY } from "@/utils/enums/strava";

type ResultsType = { 
  movingTime: string;
  distance: number;
  averageSpeed: string;
  averageTitle: string;
  type: ACTIVITY;
  total_elevation_gain: number;
}

const Results = ({ movingTime, distance, averageTitle, averageSpeed, total_elevation_gain, type } : ResultsType) => {
  const OUTDOOR = (type !== ACTIVITY.WORKOUT) && (type !== ACTIVITY.GYM);
  return (
    <S.ActivityData>
      {OUTDOOR && (
        <div className='content'>
          <span>Distância</span>
          <div className='values'>
            <strong>{metersToKilometers(distance)}</strong>km
          </div>
        </div>
      )}
      <div className='content'>
        <span>Tempo</span>
        <strong>{movingTime}</strong>
      </div>
      {OUTDOOR && (
        <div className='content'>
          <span>{averageTitle}</span>
          <div className='values'>
            <strong>{averageSpeed}</strong>
          </div>
        </div>
      )}
      {OUTDOOR && (
        <div className='content'>
          <span>Elevação</span>
          <div className='values'>
            <strong>{total_elevation_gain.toFixed(0)}</strong>m
          </div>
        </div>
      )}
    </S.ActivityData>
  )
}

export default Results;