'use client';

import { useMemo } from 'react';
import { plan_15_21__12__2025, planoTreinoSemana_2025_12_08 } from '@/utils/content/plan';
import { WorkoutDay } from '@/utils/types/plan';
import { IActivity } from '@/utils/types/strava';
import { WorkoutItem } from './WorkoutItem';
import * as S from './styles';

interface WeeklyWorkoutsProps {
  activities?: IActivity[];
}

interface CombinedWorkout extends WorkoutDay {
  executed?: IActivity;
  status: 'rest' | 'completed' | 'missed' | 'future';
  treino?: boolean | null; 
}

export default function WeeklyWorkouts({ activities = [] }: WeeklyWorkoutsProps) {
  const combinedData = useMemo<CombinedWorkout[]>(() => {
    const treinos = plan_15_21__12__2025.treinos as WorkoutDay[];
    return treinos.map((plannedWorkout) => {
      const matchedActivity = activities.find(activity => 
        activity.date && activity.date.split('T')[0] === plannedWorkout.data
      );

      let status: 'rest' | 'completed' | 'missed' | 'future' = 'future';
      const today = new Date().toISOString().split('T')[0];

      if (plannedWorkout.treino === null) {
        status = 'rest';
      } else if (matchedActivity) {
        status = 'completed';
      } else if (plannedWorkout.data < today) {
        status = 'missed';
      }

      return {
        ...plannedWorkout,
        executed: matchedActivity,
        status
      } as CombinedWorkout;
    });
  }, [activities]);

  return (
    <S.Container>
      <S.Header>
        <div>Volume proposto: <strong>{plan_15_21__12__2025.volumeSemanaKm}km</strong></div>
        <strong>
          {new Date(plan_15_21__12__2025.semana.inicio).toLocaleDateString('pt-BR')} até {new Date(plan_15_21__12__2025.semana.fim).toLocaleDateString('pt-BR')}
        </strong> 
      </S.Header>
      <S.ListContainer>
        {combinedData.map((day) => (
          <WorkoutItem key={day.data} day={day} />
        ))}
      </S.ListContainer>
    </S.Container>
  );
}