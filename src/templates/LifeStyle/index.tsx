
import { Strava } from '../../components';
import { Activity } from '../../types/strava';
import Wrapper from '../Wrapper';
import * as S from './styled'

const LifeStyle = ({ activities }: { activities: Activity[] }) => (
  <Wrapper>
    <S.Content>
      <h2>atividades</h2>
      <Strava activities={activities}/>
    </S.Content>
  </Wrapper>
)

export default LifeStyle;
