import { ReactNode, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Activities } from '@/types/strava';
import * as S from './styles';
import { getActivity } from '@/utils/lib/strava';
import ListActivities from './ListActivities';
import Activity from './Activity';

const Strava = ({ activities }: { activities: Activities[] }) => {
  const Animation = (props: { index: string; children: ReactNode }) => {
    const [hovered, setHovered] = useState('')
    const isHovered = hovered === props.index
    return (
      <S.AnimContainer
        onHoverStart={() => setHovered(props.index)}
        onHoverEnd={() => setHovered('')}
      >
        {isHovered && (
          <S.AnimHovered
            layoutId="listItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {props.children}
      </S.AnimContainer>
    )
  }

  const [test, setTest] = useState(null);
  console.log("test", test);
  const testMock = async (id: number) => {
    const activities = await getActivity(id);
    setTest(activities);
  }

  return (
    <S.Wrapper>
      {activities?.map((activity, index) => (
        <Animation key={uuid()} index={String(index)}>
          <S.Content onClick={() => testMock(activity.id)}>
            <ListActivities activity={activity} />
            {test !== null && activity.id === test.id && <Activity activity={test} />}
          </S.Content>
        </Animation>
      ))}
    </S.Wrapper>
  )
}


export default Strava

