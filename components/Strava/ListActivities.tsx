import { useCallback } from 'react';
import Image from 'next/image';
import { getIconActivity, metersPerSecondToMinPerKm, metersPerSecondTokmPerHour } from '@/utils/functions/conversionStrava'
import { Activities } from '@/types/strava';
import theme from '@/styles/theme';
import images from '@/public';
import * as S from './styles'
import { ACTIVITY } from '@/utils/enums/strava';
import Results from './Results';

const ListActivities = ({ activity }: { activity: Activities}) => {
  const { start_date, average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id } = activity;
  const handleMap = useCallback((polyline: string) => {
    let polylineEncoded = encodeURIComponent(polyline)
    let style = 'ckmi23ula94rm17rxmlpg00as'
    const pathColor = theme.colors.green.substring(1);
    return `https://api.mapbox.com/styles/v1/twobanks/${style}/static/path+${pathColor}(${polylineEncoded})/auto/400x200@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&logo=false&attribution=false`
  }, [])

  const date = new Date(start_date).toLocaleDateString("pt-BR");
  const mapUrl = handleMap(map.summary_polyline);
  const movingTime = new Date(moving_time * 1000).toISOString().substring(11, 16);
  const averageTitle = type !== ACTIVITY.RIDE ? 'Ritmo ' : 'Vel. Média ';
  const averageSpeed = type !== ACTIVITY.RIDE ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);

  return (
    <S.WrapperActivity>
      <S.ContentActivity>
        <S.HeaderActivity>
          <S.DateAndCity>
            <S.TypeActivity>
              <Image src={images.calendar} alt={type} height={16} width={16} blurDataURL={images.calendar} priority quality={100} title={type}  />
            </S.TypeActivity>
            <span title={date}>{date}</span>
          </S.DateAndCity>
          <div className="rp_type_activity">
            {activity.pr_count > 0 && (
              <div className='rp_wrapper' title='Recorde Pessoal'>
                <Image src={images.rpIcon} alt={type} height={20} width={20} blurDataURL={images.rpIcon} priority quality={100} />
                <strong>{activity.pr_count}</strong>
              </div>
            )}
            <Image src={getIconActivity[type]} alt={type} height={20} width={20} blurDataURL={getIconActivity[type]} priority quality={100} title={type} />
          </div>
        </S.HeaderActivity>
        <Results movingTime={movingTime} averageTitle={averageTitle} averageSpeed={averageSpeed} total_elevation_gain={total_elevation_gain} distance={distance} type={type} average={average_heartrate} />
        <div className='footer'>
          <div className='devices' title='Coros Apex Pro'>
              <Image src={images.clock} alt={type} height={20} width={20} blurDataURL={images.clock} priority quality={100} />
              Coros Apex Pro
          </div>
          <S.StravaLink href={`https://www.strava.com/activities/${id}`} target='_blank' title='Ver mais no Strava'>
            <Image src={images.strava} alt={type} height={20} width={20} blurDataURL={images.strava} priority quality={100} />
          </S.StravaLink>
        </div>
      </S.ContentActivity>
      {(type !== ACTIVITY.GYM && type !== ACTIVITY.WORKOUT) && map.summary_polyline !== '' && (
        <S.MapWrapper>
          <Image src={mapUrl} alt={`${name} map`} fill sizes="100%" blurDataURL={mapUrl} priority quality={100} title={name} />
        </S.MapWrapper>
      )}
    </S.WrapperActivity>
  )
}

export default ListActivities;