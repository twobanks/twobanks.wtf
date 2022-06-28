/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from 'react';
import { v4 as uuid} from 'uuid';
import * as S from './styles';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers  } from '../../utils/functions/conversionStrava'
import { Activity } from '../../types/strava';
import { conversionTypeActivities } from '../../utils/functions/conversionTypeActivities';
import theme from '../../styles/theme';

const Strava = ({ activities }: { activities: Activity[] }) => {
  const handleMap = useCallback((polyline: string) => {
    let polylineEncoded = encodeURIComponent(polyline)
    let style = 'ckmi23ula94rm17rxmlpg00as'
    const pathColor = theme.colors.trainingZone.z1.substring(1);
    return `https://api.mapbox.com/styles/v1/twobanks/${style}/static/path+${pathColor}(${polylineEncoded})/auto/400x200@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&logo=false&attribution=false`
  },[])
  return(
    <S.Wrapper>
      <ul>
        {activities.map(activity => {
          const { average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id } = activity;
          const mapUrl = handleMap(map.summary_polyline)
          const movingTime = new Date(moving_time * 1000).toISOString().substring(11, 16);
          const averageTitle = type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
          const averageSpeed = type !== 'Ride' ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);
          return (
            <li key={uuid()}>
              <S.MapWrapper>
                <img src={mapUrl} alt={name} />
              </S.MapWrapper>
              <S.ContentActivity>
                <S.HeaderActivity>
                  <a href={`https://www.strava.com/activities/${id}`}>
                    {name}
                  </a>
                  <S.TypeActivity>
                    <S.HeartRate average={Number(average_heartrate.toFixed(0))}/>
                    <img src={conversionTypeActivities(type)} alt={type} />
                  </S.TypeActivity>
                </S.HeaderActivity>
                <S.ActivityData>
                  <div><span>Distância</span> <div><strong>{metersToKilometers(distance)}</strong> km</div></div>
                  <div><span>Duração</span> <strong>{movingTime}</strong></div>
                  <div><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></div>
                  <div><span>Elevação</span> <div><strong>{total_elevation_gain.toFixed(0)} </strong>m</div></div>
                </S.ActivityData>
                <S.ButtonWrapper>
                  <div>
                    <a href={`https://www.strava.com/activities/${id}`}>visualizar no Strava</a>
                  </div>
                  <a href="">+ ver mais</a>
                </S.ButtonWrapper>
              </S.ContentActivity>
            </li>
          )
        })}
      </ul>
    </S.Wrapper>
  )
}

export default Strava
