'use client';

import { useMemo } from 'react';
import { WorkoutItem } from './WorkoutItem';
import { plan_15_21__12__2025 } from '@/utils/content/plan';
import { CombinedWorkout, TrainingPlan, WeeklyWorkoutsProps } from '@/utils/types/component';

import * as S from './styles';

export default function WeeklyWorkouts({ activities = [] }: WeeklyWorkoutsProps) {
  const combinedData = useMemo<CombinedWorkout[]>(() => {
    const currentPlan = plan_15_21__12__2025 as unknown as TrainingPlan;
    return currentPlan.treinos.map((plannedWorkout) => {
      const matchedActivity = activities.find(activity => activity.date && activity.date.split('T')[0] === plannedWorkout.data);
      let status: CombinedWorkout['status'] = 'future';
      const today = new Date().toISOString().split('T')[0];
      if (plannedWorkout.treino === null || plannedWorkout.treino === false) {
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
      };
    });
  }, [activities]);

  const planInfo = plan_15_21__12__2025 as unknown as TrainingPlan;

  return (
    <S.Container>
      <S.Header>
        <div>Volume proposto: <strong>{planInfo.volumeSemanaKm}km</strong></div>
        <strong>
          {new Date(planInfo.semana.inicio).toLocaleDateString('pt-BR')} até {new Date(planInfo.semana.fim).toLocaleDateString('pt-BR')}
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