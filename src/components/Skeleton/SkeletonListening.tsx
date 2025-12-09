import { Duration, TrackCard, TrackInfo, TracksList } from "@/layout/listening/styles";
import { Skeleton } from ".";

export const SkeletonListening = () => (
  <TracksList style={{ width: '100%' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <TrackCard key={i} style={{ pointerEvents: 'none', width: '100%' }}> 
        <div className="img-box">
          <Skeleton $width="64px" $height="64px" $radius="4px" />
        </div>
        <TrackInfo>
          <Skeleton $width="240px" $height="16px" $radius="4px" />
          <Skeleton $width="90px" $height="12px" $radius="4px" $marginTop="8px" />
        </TrackInfo>
        <Duration>
          <Skeleton $width="30px" $height="12px" />
        </Duration>
        <div style={{ marginLeft: 'auto' }}>
          <Skeleton $width="60px" $height="24px" $radius="4px" />
        </div>
      </TrackCard>
    ))}
  </TracksList>
);