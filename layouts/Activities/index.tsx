import { challenges, completedChallenges } from '@/public/content';
import { Challenges } from '@/components';
import { Activities } from '@/types/strava';
import * as S from './styled'

type ActivitiesProps = {
  activities: Activities[];
}

const ActivitiesTemplate = ({ activities }: ActivitiesProps) => (
  <S.Content>
    {/* <Strava activities={activities} /> */}
    <Challenges challenges={challenges} completedChallenges={completedChallenges} />
  </S.Content>
)

export default ActivitiesTemplate;
