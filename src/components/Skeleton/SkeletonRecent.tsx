import { Skeleton } from '@/components/Skeleton';
import * as S from '@/components/Strava/Activity/Recents/styles';

export const SkeletonRecent = () => {
  return (
    <S.ListContainer>
      <S.Header>
        <Skeleton $width="220px" $height="32px" $radius="8px" />
        <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} $width="90px" $height="36px" $radius="20px" />
          ))}
        </div>
      </S.Header>
      <div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <Skeleton $width="36px" $height="36px" $radius="8px" />
              <Skeleton $width="40%" $height="16px" $radius="4px" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Skeleton $width="60px" $height="16px" $radius="4px" />
              <Skeleton $width="60px" $height="16px" $radius="4px" />
              <Skeleton $width="80px" $height="14px" $radius="4px" />
            </div>
          </div>
        ))}
      </div>
    </S.ListContainer>
  );
};