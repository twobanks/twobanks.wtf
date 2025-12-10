/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { 
  MoonIcon, 
  HeartbeatIcon, 
  ActivityIcon, 
  CalendarIcon,
} from '@phosphor-icons/react';
import Tabs from '../Tabs';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ListContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.colors.text}10;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 2rem;
  font-family: var(--font-poppins);
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: fadeIn 0.4s ease;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}10;
  &:last-child {
    border-bottom: none;
  }
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.title === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    border-radius: 8px;
    border-bottom-color: transparent;
  }
  .left-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.8;
      font-family: var(--font-poppins);
    }
  }

  .icon-box {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  strong {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-poppins);
  }
`;

const formatDateLabel = (dateStr: string) => {
  const parts = dateStr.split('-');
  return `${parts[2]}/${parts[1]}`;
};

export default function WellnessBar() {
  const { data, isLoading } = useSWR('/api/wellness', fetcher);
  const [activeTab, setActiveTab] = useState<string>('');
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

  if (isLoading || !data) return null;

  const tabsData = data.map((item: any) => ({
    id: item.fullDate,
    label: formatDateLabel(item.fullDate),
    icon: null 
  }));

  const currentTab = activeTab || (data.length > 0 ? data[0].fullDate : '');
  const activeDay = data.find((item: any) => item.fullDate === currentTab);

  return (
    <ListContainer>
      <Tabs pillStyle={pillStyle} activeTab={currentTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={tabsData} />
      {activeDay && (
        <StatsList>
          <ListItem>
            <div className="left-content">
              <div className="icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6' }}>
                <MoonIcon size={20} weight="fill" />
              </div>
              <span>Tempo de Sono</span>
            </div>
            <strong>{activeDay.sleepTime || '-'}</strong>
          </ListItem>
          <ListItem>
            <div className="left-content">
              <div className="icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                <ActivityIcon size={20} weight="bold" />
              </div>
              <span>HRV (VFC)</span>
            </div>
            <strong>{activeDay.hrv ? `${activeDay.hrv} ms` : '-'}</strong>
          </ListItem>
          <ListItem>
            <div className="left-content">
              <div className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
                <HeartbeatIcon size={20} weight="fill" />
              </div>
              <span>Freq. Repouso</span>
            </div>
            <strong>{activeDay.restingHR ? `${activeDay.restingHR} bpm` : '-'}</strong>
          </ListItem>
          {activeDay.steps && (
            <ListItem>
              <div className="left-content">
                <div className="icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                  <CalendarIcon size={20} weight="duotone" /> 
                </div>
                <span>Passos</span>
              </div>
              <strong>{activeDay.steps.toLocaleString('pt-BR')}</strong>
            </ListItem>
          )}
        </StatsList>
      )}
    </ListContainer>
  );
}