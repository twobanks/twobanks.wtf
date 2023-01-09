import { Strava } from '../../components';
import { Activities } from '../../types/strava';
import * as S from './styled'

type ActivitiesProps = {
  activities: Activities[];
}

const ActivitiesTemplate = ({ activities }: ActivitiesProps) => (
  <S.Content>
    <Strava activities={activities} />
  </S.Content>
)

export default ActivitiesTemplate;
