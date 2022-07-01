
import { Strava } from '../../components';
import { Activities } from '../../types/strava';
import Wrapper from '../Wrapper';
import * as S from './styled'

type ActivitiesProps = {
  activities: Activities[];
  loading: boolean;
}

const ActivitiesTemplate = ({ activities, loading }: ActivitiesProps) => (
  <Wrapper>
    <S.Content>
      <h2>atividades</h2>
      {loading ? 'loading' : <Strava activities={activities}/> }
    </S.Content>
  </Wrapper>
)

export default ActivitiesTemplate;
