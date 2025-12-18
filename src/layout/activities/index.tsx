'use client';

import { useState, useCallback } from 'react';

import { Container, Content } from '@/components/Container';
import WellnessBar from '@/components/Strava/WellnessBar';
import StatsDashboard from '@/components/Strava/Stats/StatsDashboard';
import Recent from '@/components/Strava/Activity/Recents';
import WeeklyWorkouts from '@/components/Strava/Workouts/WorkoutsWeekly';
import Tabs from '@/components/Tabs';

import { TABS_ACTIVITIES_PAGE } from '@/utils/const/strava';
import { TABS_TYPE_ACTIVITIES } from '@/utils/enums';
import { ActivitiesProps, PillStyle } from '@/utils/types/strava';

import * as S from './styles';

export default function Activities({ activities }: ActivitiesProps) {
  const [activeTab, setActiveTab] = useState<TABS_TYPE_ACTIVITIES>(TABS_TYPE_ACTIVITIES.RECENT);
  const [pillStyle, setPillStyle] = useState<PillStyle>({ left: 0, width: 0, opacity: 0 });
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
          <Tabs  pillStyle={pillStyle}  activeTab={activeTab}  activeTabRef={activeTabRef}  setActiveTab={setActiveTab}  dados={TABS_ACTIVITIES_PAGE} />
        </S.WrapperTabs>
        {activeTab === TABS_TYPE_ACTIVITIES.STATS && (
          <S.StatsContent>
            <WellnessBar />
            <StatsDashboard />
          </S.StatsContent>
        )}
        {activeTab === TABS_TYPE_ACTIVITIES.RECENT && <Recent data={activities} isLoading={false} />}
        {activeTab === TABS_TYPE_ACTIVITIES.TRAININGS && <WeeklyWorkouts activities={activities} />}
      </Content>
    </Container>
  );
}