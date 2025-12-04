/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useSWR from 'swr';
import styled from 'styled-components';
import { MoonIcon, HeartbeatIcon, ActivityIcon, BatteryChargingIcon, CalendarIcon } from '@phosphor-icons/react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.titleMain};
  }

  .icon-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(0,0,0,0.3)' : '#fff'};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 0.75rem;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  strong {
    font-size: 1.1rem;
    font-family: var(--font-poppins);
  }
`;

export default function WellnessBar() {
  const { data, isLoading } = useSWR('/api/wellness', fetcher);

  if (isLoading || !data) return null; 

  return (
    <Container>
      {data.map((item: any) => (
        <>
          <StatCard>
            <div className="icon-box">
              <CalendarIcon size={24} color="#8B5CF6" weight="fill" />
            </div>
            <Info>
              <span>Data</span>
              <strong>{item.date}</strong>
            </Info>
          </StatCard>
          <StatCard>
            <div className="icon-box">
              <MoonIcon size={24} color="#8B5CF6" weight="fill" />
            </div>
            <Info>
              <span>Sono</span>
              <strong>{item.sleepTime}</strong>
            </Info>
          </StatCard>
          <StatCard>
            <div className="icon-box">
              <ActivityIcon size={24} color="#10B981" weight="bold" />
            </div>
            <Info>
              <span>HRV (VFC)</span>
              <strong>{item.hrv}</strong>
            </Info>
          </StatCard>
          <StatCard>
            <div className="icon-box">
              <HeartbeatIcon size={24} color="#EF4444" weight="fill" />
            </div>
            <Info>
              <span>Repouso</span>
              <strong>{item.restingHR}</strong>
            </Info>
          </StatCard>
          {item.sleepScore !== '-' && (
            <StatCard>
              <div className="icon-box">
                <BatteryChargingIcon size={24} color="#F59E0B" weight="fill" />
              </div>
              <Info>
                <span>Qualidade</span>
                <strong>{item.sleepScore}%</strong>
              </Info>
            </StatCard>
          )}
        </>
      ))}
    </Container>
  );
}