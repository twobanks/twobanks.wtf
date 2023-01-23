import { ReactNode, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import geocoder from 'city-reverse-geocoder'
import Link from 'next/link';
import Image from 'next/image';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers } from '@/utils/functions/conversionStrava'
import { Activities } from '@/types/strava';
import theme from '@/styles/theme';
import images from '@/public';
import * as S from './styles';

const Strava = ({ activities }: { activities: Activities[] }) => {
  const Animation = (props: { index: string; children: ReactNode }) => {
    const [hovered, setHovered] = useState('')
    const isHovered = hovered === props.index
    return (
      <S.AnimContainer
        onHoverStart={() => setHovered(props.index)}
        onHoverEnd={() => setHovered('')}
      >
        {isHovered && (
          <S.AnimHovered
            layoutId="listItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {props.children}
      </S.AnimContainer>
    )
  }
  const handleMap = useCallback((polyline: string) => {
    let polylineEncoded = encodeURIComponent(polyline)
    let style = 'ckmi23ula94rm17rxmlpg00as'
    const pathColor = theme.colors.green.substring(1);
    return `https://api.mapbox.com/styles/v1/twobanks/${style}/static/path+${pathColor}(${polylineEncoded})/auto/400x200@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&logo=false&attribution=false`
  }, [])

  const iconActivity = {
    ['Ride']: images.bike,
    ['Run']: images.trail,
    ['Walk']: images.walking
  }

  return (
    <S.Wrapper>
      {activities?.map((activity, index) => {
        const { start_date, average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id } = activity;
        const date = new Date(start_date).toLocaleDateString("pt-BR");
        const mapUrl = handleMap(map.summary_polyline)
        const movingTime = new Date(moving_time * 1000).toISOString().substring(11, 16);
        const averageTitle = type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
        const averageSpeed = type !== 'Ride' ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);
        const nearestCities = geocoder(activity?.start_latlng[0], activity?.start_latlng[1])
        return (
          <Animation key={uuid()} index={String(index)}>
            <S.Content>
              <S.MapWrapper>
                <Image src={mapUrl} alt={`${name} map`} fill sizes="100%" blurDataURL={mapUrl} priority quality={100} />
              </S.MapWrapper>
              <S.ContentActivity>
                <S.HeaderActivity>
                  <S.DateAndCity>
                    <div>
                      <S.HeartRate average={Number(average_heartrate?.toFixed(0))} />
                      <h4>{date}</h4>
                    </div>
                    <em>{`${nearestCities[0].city}, ${nearestCities[0].region}`}</em>
                  </S.DateAndCity>
                  <S.TypeActivity>
                    <Image src={iconActivity[type]} alt={type} height={40} width={40} blurDataURL={iconActivity[type]} priority quality={100} />
                  </S.TypeActivity>
                </S.HeaderActivity>
                <S.ActivityData>
                  <div><span>Distância</span> <div><strong>{metersToKilometers(distance)}</strong> km</div></div>
                  <div><span>Tempo</span> <strong>{movingTime}</strong></div>
                  <div><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></div>
                  <div><span>Elevação</span> <div><strong>{total_elevation_gain.toFixed(0)} </strong>m</div></div>
                </S.ActivityData>
                <S.LinksWrapper>
                  <Link href={`https://www.strava.com/activities/${id}`} target="_blank" rel="noreferrer" passHref>
                    visualizar no Strava <Image src={images.strava} alt="Strava" height={15} width={15} blurDataURL={images.strava} priority quality={100} />
                  </Link>
                </S.LinksWrapper>
              </S.ContentActivity>
            </S.Content>
          </Animation>
        )
      })}
    </S.Wrapper>
  )
}

export default Strava
