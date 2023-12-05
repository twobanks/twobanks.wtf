import { v4 as uuid } from 'uuid';
import { Activities } from '@/types/strava';
import * as S from './styles';
import ListActivities from './ListActivities';

const Strava = ({ activities }: { activities: Activities[] }) => (
  <S.Wrapper>
    {activities?.map(activity => (
      <S.Content key={uuid()}>
        <ListActivities activity={activity} />
      </S.Content>
    ))}
  </S.Wrapper>
)


export default Strava

