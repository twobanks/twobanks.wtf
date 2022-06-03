import { useCallback } from 'react';
import { v4 as uuid} from 'uuid';
import { useActivities } from '../../hooks/useActivities';
import * as S from './styles';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers  } from '../../utils/functions/conversionStrava'

const Strava = () => {
  const activities = useActivities();
  const handleMap = useCallback((polyline: string) => {
    const polylineEncoded = encodeURIComponent(polyline)
    const style = 'ckmi23ula94rm17rxmlpg00as'
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
              <img src={mapUrl} alt={name}  />
              {type} <br/>
              <span>Tempo de movimentação:</span> {boston}<br/>
              <span>Distância:</span> {metersToKilometers(distance)} km<br/>
              <span>{averageTitle}</span> {averageSpeed} km/h<br/>
              <span>Freq. cardíaca média:</span> {average_heartrate.toFixed(0)}<br/>
              <span>Elevação:</span> {total_elevation_gain.toFixed(0)} m<br/>
            </a>
          </li>
        )
      })}
      </ul>
    </S.Wrapper>
  )
}

export default Strava
