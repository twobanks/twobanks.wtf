import { v4 as uuid } from 'uuid';
import { Activities } from '@/types/strava';
import * as S from './styles';
import ListActivities from './ListActivities';
import { ACTIVITY } from '@/utils/enums/strava';
import { conversionTypeActivity } from '@/utils/functions/conversionStrava';

const Strava = ({ activities, type }: { activities: Activities[]; type: ACTIVITY;  }) => (
  <S.Wrapper $type={type}>
    {activities.length === 0 ? (
      <S.Empty>
        Ainda não rolou treino de <strong>{conversionTypeActivity(type)}</strong>
      </S.Empty>
    ) : (
      <>
        {activities.map(activity => (
          <S.Content key={uuid()}>
            <ListActivities activity={activity} />
          </S.Content>
        ))}
      </>
    )}
  </S.Wrapper>
)


export default Strava

