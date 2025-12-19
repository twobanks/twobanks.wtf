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
import { fetcherStrava } from '@/utils/lib/fetcher';

import * as S from './styles';
import { WellnessDay, PillStyle } from '@/utils/types/component';

const formatDateLabel = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parts[2]}/${parts[1]}`;
};

export default function WellnessBar() {
  const { data, isLoading } = useSWR<WellnessDay[]>('/api/intervals/wellness', fetcherStrava);
  const [activeTab, setActiveTab] = useState<string>('');
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

  if (isLoading || !data) return <>...loading</>;
  const tabsData = data.map((item) => ({
    id: item.fullDate,
    label: formatDateLabel(item.fullDate),
    icon: undefined 
  }));

  const currentTab = activeTab || (data.length > 0 ? data[0].fullDate : '');
  const activeDay = data.find((item) => item.fullDate === currentTab);

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
            <strong>{activeDay.hrv ? `${Math.round(activeDay.hrv)} ms` : '-'}</strong>
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
          {activeDay.steps !== null && activeDay.steps !== undefined && (
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