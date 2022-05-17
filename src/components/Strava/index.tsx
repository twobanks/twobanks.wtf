
import { useActivities } from '../../hooks/useActivities';
import { useAthlete } from '../../hooks/useAthlete';
import * as S from './styles';

const Strava = () => {
  const activities = useActivities();
  console.log("activities", activities);
  const athlete = useAthlete();
  return(
    <S.Wrapper>
      {activities.length}
      {athlete?.username}
    </S.Wrapper>
  )
}

export default Strava
