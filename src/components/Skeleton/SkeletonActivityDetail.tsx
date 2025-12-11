'use client';

import { Container } from '@/components/Container';
import { Skeleton } from '@/components/Skeleton';
import * as S from '@/components/Strava/Activity/Details/styles';

export const ActivityDetailSkeleton = () => {
  return (
    <Container size='lg'>
      <S.ContentActivity>
        <S.LayoutGrid>
          <S.LeftColumn>
            <S.Header>
              <Skeleton $width="140px" $height="16px" $radius="4px" style={{ marginBottom: '1rem' }} />
              <Skeleton $width="80%" $height="36px" $radius="8px" style={{ marginBottom: '0.5rem' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Skeleton $width="24px" $height="24px" $radius="50%" />
                <Skeleton $width="120px" $height="14px" $radius="4px" />
              </div>
            </S.Header>
            <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
               <Skeleton $width="90px" $height="36px" $radius="20px" />
               <Skeleton $width="90px" $height="36px" $radius="20px" />
               <Skeleton $width="90px" $height="36px" $radius="20px" />
               <Skeleton $width="90px" $height="36px" $radius="20px" />
            </div>
            <S.TabContent>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1.2rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Skeleton $width="24px" $height="24px" $radius="4px" /> 
                    <Skeleton $width="100px" $height="14px" $radius="4px" />
                  </div>
                  <Skeleton $width="60px" $height="16px" $radius="4px" /> 
                </div>
              ))}
            </S.TabContent>
          </S.LeftColumn>
          <S.MapColumn>
            <Skeleton $width="100%" $height="100%" $radius="0" />
          </S.MapColumn>
        </S.LayoutGrid>
      </S.ContentActivity>
    </Container>
  );
};