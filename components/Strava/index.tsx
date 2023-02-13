import { ReactNode, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Activity as ActivityType, Activities } from '@/types/strava';
import * as S from './styles';
import { getActivity } from '@/utils/lib/strava';
import ListActivities from './ListActivities';
import Activity from './Activity';

const Strava = ({ activities }: { activities: Activities[] }) => {
  const [activitySelected, setActivitySelected] = useState<ActivityType | null>(null);
  const [itemClicked, setItemClicked] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleActivity = async (id: number, index: number) => {
    setItemClicked(index);
    setLoading(true);
    const activities = await getActivity(id);
    if(activities !== null) {
      setActivitySelected(activities);
      setLoading(false);
    }
  }

  return (
    <S.Wrapper>
      {activities?.map((activity, index) => (
        <Animation key={uuid()} index={String(index)}>
          <S.Content onClick={() => handleActivity(activity.id, index)}>
            <ListActivities activity={activity} />
            {loading && itemClicked === index ? <>...loading</> : activitySelected !== null && activity.id === activitySelected.id && <Activity activity={activitySelected} />}
          </S.Content>
        </Animation>
      ))}
    </S.Wrapper>
  )
}


export default Strava

