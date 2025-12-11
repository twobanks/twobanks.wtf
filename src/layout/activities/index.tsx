/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Container, Content } from '@/components/Container';
import WellnessBar from '@/components/Strava/WellnessBar';
import StatsDashboard from '@/components/Strava/Stats/StatsDashboard';
import Recent from '@/components/Strava/Activity/Recents';

import * as S from './styles';

export default function Activities() {
  return (
    <Container size='lg'>
      <Content>
        <S.StatsContent>
          <WellnessBar />
          <StatsDashboard />
        </S.StatsContent>
        <Recent />
      </Content>
    </Container>
  );
}