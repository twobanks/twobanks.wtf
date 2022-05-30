
import { v4 as uuid} from 'uuid';
import { useActivities } from '../../hooks/useActivities';
import { useAthlete } from '../../hooks/useAthlete';
import * as S from './styles';

const Strava = () => {
  const activities = useActivities();
  /* const athlete = useAthlete(); */
  return(
    <S.Wrapper>
      {/* {athlete?.username} */}
      <ul>
      {activities.map(activity => {
        const { average_heartrate, average_speed, distance, elev_high, moving_time, type } = activity;
        return (
          <li key={uuid()}>
            <S.Map> test </S.Map>
            <div>
              {type} <br/>
              <span>Tempo de movimentação:</span> {moving_time}<br/>
              <span>Distância:</span> {Math.round(distance * 10) / 10} km<br/>
              <span>Ritmo:</span> {average_speed}<br/>
              <span>Freq. cardíaca média:</span> {average_heartrate}<br/>
              <span>Elevação:</span> {elev_high}m<br/>
            </div>
          </li>
        )
      })}
      </ul>
    </S.Wrapper>
  )
}

export default Strava
