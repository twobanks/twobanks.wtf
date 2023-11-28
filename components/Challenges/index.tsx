import CompletedChallenges from "./CompletedChallenges";
import NextChallenges from "./NextChallenges";
import { Challenges as ChallengesType } from '@/types/banks';

const Challenges = ({ challenges, completedChallenges } : { challenges: ChallengesType[]; completedChallenges: ChallengesType[]; }) => (
  <>
    <NextChallenges data={challenges} />
    <CompletedChallenges data={completedChallenges} />
  </>
)

export default Challenges;