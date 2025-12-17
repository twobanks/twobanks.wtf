/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Container, Content } from '@/components/Container';
import WellnessBar from '@/components/Strava/WellnessBar';
import StatsDashboard from '@/components/Strava/Stats/StatsDashboard';
import Recent from '@/components/Strava/Activity/Recents';

import * as S from './styles';
import { useState, useCallback } from 'react';
import { TABS_ACTIVITIES_PAGE } from '@/utils/const/strava';
import Tabs from '@/components/Tabs';
import { TABS_TYPE_ACTIVITIES } from '@/utils/enums';
import WeeklyWorkouts from '@/components/Strava/Workouts/WorkoutsWeekly';
import fetcher from '@/utils/lib/fetcher';
import { IActivity } from '@/utils/types/strava';
import useSWR from 'swr';

export default function Activities() {
  const { data, isLoading } = useSWR<IActivity[]>('/api/strava', fetcher);

  const [activeTab, setActiveTab] = useState<string>(TABS_TYPE_ACTIVITIES.RECENT);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        opacity: 1
      });
    }
  }, []);

  return (
    <Container size='lg'>
      <Content>
        <S.WrapperTabs>
          <Tabs pillStyle={pillStyle} activeTab={activeTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={TABS_ACTIVITIES_PAGE}/>
        </S.WrapperTabs>
        {activeTab === TABS_TYPE_ACTIVITIES.STATS && (
          <S.StatsContent>
            <WellnessBar />
            <StatsDashboard />
          </S.StatsContent>
        )}
        {activeTab === TABS_TYPE_ACTIVITIES.RECENT && <Recent data={data} isLoading={isLoading} />}
        {activeTab === TABS_TYPE_ACTIVITIES.TRAININGS && <WeeklyWorkouts activities={data} />}
      </Content>
    </Container>
  );
}