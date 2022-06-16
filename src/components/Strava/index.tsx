/* eslint-disable @next/next/no-img-element */
import { useCallback } from 'react';
import { v4 as uuid} from 'uuid';
import * as S from './styles';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers  } from '../../utils/functions/conversionStrava'
import { Activity } from '../../types/strava';
import { conversionTypeActivities } from '../../utils/functions/conversionTypeActivities';

const Strava = ({ activities }: { activities: Activity[] }) => {
  const handleMap = useCallback((polyline: string) => {
    let polylineEncoded = encodeURIComponent(polyline)
    let style = 'ckmi23ula94rm17rxmlpg00as'
    return `https://api.mapbox.com/styles/v1/twobanks/${style}/static/path+5ddb95(${polylineEncoded})/auto/500x300@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&logo=false&attribution=false`
  },[])

  return(
    <S.Wrapper>
      <ul>
      {activities.map(activity => {
        const { average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id } = activity;
        const mapUrl = handleMap(map.summary_polyline)
        const boston = new Date(moving_time * 1000).toISOString().substring(11, 16);
        const averageTitle = type !== 'Ride' ? 'Pace: ' : 'Velocidade Média: ';
        const averageSpeed = type !== 'Ride' ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);
        return (
          <li key={uuid()}>
            <a href={`https://www.strava.com/activities/${id}`}>
              <S.MapWrapper>
                <img src={mapUrl} alt={name}  />
              </S.MapWrapper>
              <S.TypeActivity>
                <img src={conversionTypeActivities(type)} alt={type} />
              </S.TypeActivity>
              <S.ActivityData>
                <div><span>Tempo de movimentação:</span> {boston}</div>
                <div><span>Distância:</span> {metersToKilometers(distance)} km</div>
                <div><span>{averageTitle}</span> {averageSpeed} km/h</div>
                <div><span>Freq. cardíaca média:</span> {average_heartrate.toFixed(0)}</div>
                <div><span>Elevação:</span> {total_elevation_gain.toFixed(0)} m</div>
              </S.ActivityData>
            </a>
          </li>
        )
      })}
      </ul>
    </S.Wrapper>
  )
}

export default Strava
