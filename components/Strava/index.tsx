import { v4 as uuid } from 'uuid';
import { Activities } from '@/types/strava';
import * as S from './styles';
import ListActivities from './ListActivities';
import { ACTIVITY } from '@/utils/enums/strava';

const Strava = ({ activities, type }: { activities: Activities[]; type: ACTIVITY;  }) => (
  <S.Wrapper $type={type}>
    {activities?.map(activity => (
      <S.Content key={uuid()}>
        <ListActivities activity={activity} />
      </S.Content>
    ))}
  </S.Wrapper>
)


export default Strava

