import CompletedChallenges from "./CompletedChallenges";
import NextChallenges from "./NextChallenges";
import { Challenges as ChallengesType } from '@/types/banks';
import * as S from './styled'

const Challenges = ({ challenges, completedChallenges } : { challenges: ChallengesType[]; completedChallenges: ChallengesType[]; }) => (
  <S.WrapperChallenges>
    <NextChallenges data={challenges} />
    <CompletedChallenges data={completedChallenges} />
  </S.WrapperChallenges>
)

export default Challenges;