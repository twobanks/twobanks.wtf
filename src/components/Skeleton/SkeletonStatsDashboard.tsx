import { Skeleton } from '@/components/Skeleton';
import * as S from '@/components/Strava/Stats/styles';

export const StatsDashboardSkeleton = () => {
  return (
    <S.Container>
      <S.Header>
        <Skeleton $width="140px" $height="32px" $radius="8px" />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Skeleton $width="80px" $height="36px" $radius="20px" />
          <Skeleton $width="80px" $height="36px" $radius="20px" />
          <Skeleton $width="80px" $height="36px" $radius="20px" />
        </div>
      </S.Header>
      <S.Grid>
        {Array.from({ length: 2 }).map((_, i) => (
          <S.StatRow key={i}>
            <S.Category>
              <Skeleton $width="48px" $height="48px" $radius="12px" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Skeleton $width="90px" $height="16px" $radius="4px" />
                <Skeleton $width="70px" $height="12px" $radius="4px" />
              </div>
            </S.Category>
            <S.Numbers>
              <Skeleton $width="80px" $height="24px" $radius="4px" style={{ marginBottom: '4px' }} />
              <div className="sub-stats" style={{ gap: '1rem' }}>
                 <Skeleton $width="60px" $height="14px" $radius="4px" />
                 <Skeleton $width="60px" $height="14px" $radius="4px" />
              </div>
            </S.Numbers>
          </S.StatRow>
        ))}
      </S.Grid>
      <S.PhysioGrid>
        {Array.from({ length: 3 }).map((_, i) => (
          <S.PhysioItem key={i}>
            <Skeleton $width="60%" $height="12px" $radius="4px" style={{ marginBottom: '8px', opacity: 0.7 }} />
            <Skeleton $width="40%" $height="24px" $radius="4px" style={{ marginBottom: '6px' }} />
            <Skeleton $width="50%" $height="12px" $radius="4px" />
          </S.PhysioItem>
        ))}
      </S.PhysioGrid>
    </S.Container>
  );
};