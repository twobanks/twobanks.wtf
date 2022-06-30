
import { Strava } from '../../components';
import { Activity } from '../../types/strava';
import Wrapper from '../Wrapper';
import * as S from './styled'

type ActivitiesProps = {
  activities: Activity[];
  loading: boolean;
}

const Activities = ({ activities, loading }: ActivitiesProps) => {
  console.log("loading", loading);
  return (
    <Wrapper>
       <S.Content>
        <h2>atividades</h2>
        {loading ? 'loading' : <Strava activities={activities}/> }
      </S.Content>
    </Wrapper>
  )
}

export default Activities;
