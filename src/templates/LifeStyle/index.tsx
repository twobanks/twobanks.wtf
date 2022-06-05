
import { Strava } from '../../components';
import { Activity } from '../../types/strava';
import Wrapper from '../Wrapper';

const LifeStyle = ({ activities }: { activities: Activity[] }) => (
  <Wrapper>
    <Strava activities={activities}/>
  </Wrapper>
)

export default LifeStyle;
