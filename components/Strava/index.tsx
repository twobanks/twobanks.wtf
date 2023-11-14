import { useState } from 'react';
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
        <S.Content key={uuid()} onClick={() => handleActivity(activity.id, index)}>
          <ListActivities activity={activity} />
          {loading && itemClicked === index ? <>...loading</> : activitySelected !== null && activity.id === activitySelected.id && <Activity activity={activitySelected} />}
        </S.Content>
      ))}
    </S.Wrapper>
  )
}


export default Strava

