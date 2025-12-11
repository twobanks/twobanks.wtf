/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { 
  MoonIcon, 
  HeartbeatIcon, 
  ActivityIcon, 
  CalendarIcon,
} from '@phosphor-icons/react';
import Tabs from '@/components/Tabs';
import { WellnessBarSkeleton } from '@/components/Skeleton/SkeletonWellnessBar';

import * as S from './styles'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  if (isLoading || !data) return <WellnessBarSkeleton />;

  const tabsData = data.map((item: any) => ({
    id: item.fullDate,
    label: formatDateLabel(item.fullDate),
    icon: null 
  }));

  const currentTab = activeTab || (data.length > 0 ? data[0].fullDate : '');
  const activeDay = data.find((item: any) => item.fullDate === currentTab);

  return (
    <S.ListContainer>
      <Tabs pillStyle={pillStyle} activeTab={currentTab} activeTabRef={activeTabRef} setActiveTab={setActiveTab} dados={tabsData} />
      {activeDay && (
        <S.StatsList>
          <S.ListItem>
            <div className="left-content">
              <div className="icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6' }}>
                <MoonIcon size={20} weight="fill" />
              </div>
              <span>Tempo de Sono</span>
            </div>
            <strong>{activeDay.sleepTime || '-'}</strong>
          </S.ListItem>
          <S.ListItem>
            <div className="left-content">
              <div className="icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                <ActivityIcon size={20} weight="bold" />
              </div>
              <span>HRV (VFC)</span>
            </div>
            <strong>{activeDay.hrv ? `${activeDay.hrv} ms` : '-'}</strong>
          </S.ListItem>
          <S.ListItem>
            <div className="left-content">
              <div className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
                <HeartbeatIcon size={20} weight="fill" />
              </div>
              <span>Freq. Repouso</span>
            </div>
            <strong>{activeDay.restingHR ? `${activeDay.restingHR} bpm` : '-'}</strong>
          </S.ListItem>
          {activeDay.steps && (
            <S.ListItem>
              <div className="left-content">
                <div className="icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                  <CalendarIcon size={20} weight="duotone" /> 
                </div>
                <span>Passos</span>
              </div>
              <strong>{activeDay.steps.toLocaleString('pt-BR')}</strong>
            </S.ListItem>
          )}
        </S.StatsList>
      )}
    </S.ListContainer>
  );
}