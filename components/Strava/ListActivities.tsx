import { useCallback } from 'react';
import Image from 'next/image';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers } from '@/utils/functions/conversionStrava'
import { Activities } from '@/types/strava';
import theme from '@/styles/theme';
import images from '@/public';
import * as S from './styles'
import { ACTIVITY } from '@/utils/enums/strava';

const iconActivity: any = {
  [ACTIVITY.RIDE]: images.bike,
  [ACTIVITY.RUN]: images.trail,
  [ACTIVITY.TRAIL]: images.trail,
  [ACTIVITY.WALK]: images.walking,
  [ACTIVITY.GYM]: images.workout
}

const ListActivities = ({ activity }: { activity: Activities}) => {
  const { start_date, average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id } = activity;
  /* const handleMap = useCallback((polyline: string) => {
    let polylineEncoded = encodeURIComponent(polyline)
    let style = 'ckmi23ula94rm17rxmlpg00as'
    const pathColor = theme.colors.green.substring(1);
    return `https://api.mapbox.com/styles/v1/twobanks/${style}/static/path+${pathColor}(${polylineEncoded})/auto/400x200@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&logo=false&attribution=false`
  }, []) */

  const date = new Date(start_date).toLocaleDateString("pt-BR");
  /* const mapUrl = handleMap(map.summary_polyline); */
  const movingTime = new Date(moving_time * 1000).toISOString().substring(11, 16);
  const averageTitle = type !== ACTIVITY.RIDE ? 'Pace ' : 'Vel. Média ';
  const averageSpeed = type !== ACTIVITY.RIDE ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);

  const renderWeightTraining = () => (
    <S.ActivityData>
      <div><span>Tempo</span> <em>{movingTime}</em></div>
    </S.ActivityData>
  )
  const renderActivity = () => (
    <S.ActivityData>
      <div><span>Distância</span> <div><em>{metersToKilometers(distance)}</em> km</div></div>
      <div><span>Tempo</span> <em>{movingTime}</em></div>
      <div><span>{averageTitle}</span> <div><em>{averageSpeed} </em>km/h</div></div>
      <div><span>Elevação</span> <div><em>{total_elevation_gain.toFixed(0)} </em>m</div></div>
    </S.ActivityData>
  )

  return (
    <S.ContentActivity>
      <S.HeaderActivity>
        <S.DateAndCity>
          <S.TypeActivity>
            <Image src={iconActivity[type]} alt={type} height={20} width={20} blurDataURL={iconActivity[type]} priority quality={100} />
          </S.TypeActivity>
          <strong>{date}</strong>
        </S.DateAndCity>
      </S.HeaderActivity>
      {type !== ACTIVITY.GYM ? renderActivity() : renderWeightTraining()}
    </S.ContentActivity>
  )
}

export default ListActivities;