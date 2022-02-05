import { useActivities, useAthlete } from '../../api/strava';
import * as S from './styles';

const Strava = () => {
  const activities = useActivities();
  const athlete = useAthlete();
  return(
    <S.Wrapper>
      {activities.length}
      {athlete?.username}
    </S.Wrapper>
  )
}

export default Strava