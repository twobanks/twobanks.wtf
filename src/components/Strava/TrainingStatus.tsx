'use client';

import useSWR from 'swr';
import styled from 'styled-components';
import { FireIcon, TrendUpIcon, LightningIcon, ActivityIcon } from '@phosphor-icons/react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-bottom: 2rem;
  font-family: var(--font-poppins);
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.titleMain};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  font-family: var(--font-poppins);
  color: ${({ theme }) => theme.colors.titleMain};
  
  small {
    font-size: 0.9rem;
    font-weight: 400;
    opacity: 0.6;
    margin-left: 4px;
  }
`;

const getFormColor = (val: number) => {
  if (val > 5) return '#10B981'; 
  if (val >= -10) return '#9CA3AF';
  if (val < -30) return '#EF4444'; 
  return '#F59E0B'; 
};

export default function TrainingStatus() {
  const { data, isLoading } = useSWR('/api/training-status', fetcher);

  if (isLoading || !data) return null; 

  return (
    <Container>
      <StatusCard>
        <Header>
          <TrendUpIcon size={20} color="#3B82F6" weight="fill" />
          Fitness
        </Header>
        <Value style={{ color: '#3B82F6' }}>
          {Math.round(data.fitness)}
        </Value>
      </StatusCard>
      <StatusCard>
        <Header>
          <LightningIcon size={20} color="#8B5CF6" weight="fill" />
          Fadiga
        </Header>
        <Value style={{ color: '#8B5CF6' }}>
          {Math.round(data.fatigue)}
        </Value>
      </StatusCard>
      <StatusCard style={{ borderColor: getFormColor(data.form) + '40' }}>
        <Header>
          <ActivityIcon size={20} color={getFormColor(data.form)} weight="fill" />
          Forma
        </Header>
        <Value style={{ color: getFormColor(data.form) }}>
          {Math.round(data.form)}
        </Value>
      </StatusCard>
      <StatusCard>
        <Header>
          <FireIcon size={20} color="#F97316" weight="fill" />
          Kcal Hoje
        </Header>
        <Value style={{ color: '#F97316' }}>
          {Math.round(data.caloriesToday)} <small>kcal</small>
        </Value>
      </StatusCard>
    </Container>
  );
}