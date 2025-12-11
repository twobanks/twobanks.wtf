import { Skeleton } from '@/components/Skeleton';
import * as S from '@/components/Strava/WellnessBar/styles';

export const WellnessBarSkeleton = () => {
  return (
    <S.ListContainer>
      <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} $width="70px" $height="32px" $radius="20px" />
        ))}
      </div>
      <S.StatsList>
        {Array.from({ length: 4 }).map((_, i) => (
          <S.ListItem key={i}>
            <div className="left-content">
              <Skeleton $width="36px" $height="36px" $radius="8px" />
              <Skeleton $width="100px" $height="14px" $radius="4px" />
            </div>
            <Skeleton $width="50px" $height="18px" $radius="4px" />
          </S.ListItem>
        ))}
      </S.StatsList>
    </S.ListContainer>
  );
};