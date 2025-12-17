'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, XCircleIcon, ClockIcon, SneakerMoveIcon, 
  MoonIcon, TrendUpIcon, TimerIcon, PersonSimpleRunIcon, 
  FireIcon, SnowflakeIcon, CaretDownIcon 
} from '@phosphor-icons/react';
import * as S from './styles';
import { IActivity } from '@/utils/types/strava';
import { IntervalBlock, WorkoutDay } from '@/utils/types/plan';
import { useActivityLaps } from '@/utils/hooks/useActivityLaps';
import Laps from '../Laps';

interface CombinedWorkout extends WorkoutDay {
  executed?: IActivity;
  status: 'rest' | 'completed' | 'missed' | 'future';
  treino?: boolean | null; 
}

export const WorkoutItem = ({ day }: { day: CombinedWorkout }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return {
      day: adjustedDate.getDate(),
      month: adjustedDate.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '')
    };
  };

  const { laps, fetchLaps, hasLoaded } = useActivityLaps(day.executed?.id);

  const handleToggle = () => {
    if (!isOpen && !hasLoaded) {
      fetchLaps(); 
    }
    setIsOpen((prev) => !prev);
  };

  const renderStructure = (blocks?: IntervalBlock[]) => {
    if (!blocks || blocks.length === 0) return null;

    return (
      <S.StructureContainer>
        {blocks.map((block, idx) => {
          let type: 'warmup' | 'main' | 'cooldown' = 'main';
          let icon = <PersonSimpleRunIcon size={16} />;
          let color = '#EF4444'; 

          if (block.tipo === 'Aquecimento') {
            type = 'warmup';
            icon = <FireIcon size={16} />;
            color = '#F59E0B';
          } else if (block.tipo === 'Desaquecimento') {
            type = 'cooldown';
            icon = <SnowflakeIcon size={16} />;
            color = '#3B82F6'; 
          }

          return (
            <S.StructureRow key={idx} $type={type}>
              <S.IconWrapper $color={color}>{icon}</S.IconWrapper>
              <S.StepInfo>
                <div className="header">
                  {block.tipo === 'Intervalos' ? (
                    <span>{block.repeticoes}x {block.corrida?.distanciaKm}km</span>
                  ) : (
                    <span>{block.distanciaKm} km</span>
                  )}
                  <span className="label">{block.tipo}</span>
                </div>
                <div className="details">
                  {block.tipo === 'Intervalos' && block.corrida ? (
                    <>
                      <span>@ {block.corrida.paceMinKm}</span>
                      {block.descanso && <span className="rest">({block.descanso})</span>}
                    </>
                  ) : (
                    <span>Leve / Z2</span>
                  )}
                </div>
              </S.StepInfo>
            </S.StructureRow>
          );
        })}
      </S.StructureContainer>
    );
  };

  const dateObj = formatDate(day.data);

  return (
    <S.WorkoutRowContainer $status={day.status}>
      <S.HeaderRow>
        <div className="left-group">
          <S.DateBox $status={day.status}>
            <span className="day">{dateObj.day}</span>
            <span className="month">{dateObj.month}</span>
          </S.DateBox>

          <S.TopInfo>
            {day.treino === null ? (
               <div className="meta-header">
                 <strong>{day.dia}</strong>
                 <span className="bullet">•</span>
                 <span className="type">Descanso</span>
               </div>
            ) : (
               <>
                 <div className="meta-header">
                    <strong>{day.dia}</strong>
                    <span className="bullet">•</span>
                    <span className="type">{day.modalidade}</span>
                 </div>
                 <h3 className="workout-title">
                    {day.tipo} — {day.distanciaKm}km
                 </h3>
               </>
            )}
          </S.TopInfo>
        </div>

        <S.MetaInfo>
          <S.StatusTag $status={day.status}>
            {day.status === 'completed' && (
                <S.ToggleButton $status={day.status} onClick={handleToggle} $isOpen={isOpen} type="button">
                  {<CheckCircleIcon weight="fill"/>} Feito
                  <CaretDownIcon size={14} weight="bold" className="caret"/>
              </S.ToggleButton>
            )}
            {day.status === 'missed' && <><XCircleIcon weight="fill"/> Perdeu</>}
            {day.status === 'future' && <><ClockIcon weight="fill"/> Planejado</>}
            {day.status === 'rest' && 'Descanso'}
          </S.StatusTag>
        </S.MetaInfo>
      </S.HeaderRow>
      {(day.treino !== null && day.tipo === 'Intervalado') && (
        <S.BodyRow>
          <h4>Treino proposto</h4>
          {day.estrutura ? renderStructure(day.estrutura) : (
            <span className="description">{day.descricao}</span>
          )}
        </S.BodyRow>
      )}
      <S.AccordionContent $isOpen={isOpen}>
         {day.executed && (
          <>
            <h4>Treino executado</h4>
            <Laps laps={laps} />
          </>
         )}
      </S.AccordionContent>
    </S.WorkoutRowContainer>
  );
};