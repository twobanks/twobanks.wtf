/* eslint-disable @next/next/no-img-element */
import { ReactNode, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './styles';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers } from '../../utils/functions/conversionStrava'
import { Activities } from '../../types/strava';
import { conversionTypeActivities } from '../../utils/functions/conversionTypeActivities';
import theme from '../../styles/theme';
const strava = '/icon/strava.svg'
import geocoder from 'city-reverse-geocoder'

const Strava = ({ activities, orientation }: { activities: Activities[], orientation: 'ROW' | 'GRID' }) => {
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

  return (
    <S.Wrapper type={orientation}>
      <ul>
        {activities?.map((activity, index) => {
          const { average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id } = activity;
          const mapUrl = handleMap(map.summary_polyline)
          const movingTime = new Date(moving_time * 1000).toISOString().substring(11, 16);
          const averageTitle = type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
          const averageSpeed = type !== 'Ride' ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);
          const nearestCities = geocoder(activity?.start_latlng[0], activity?.start_latlng[1])
          return (
            <Animation key={uuid()} index={String(index)}>
              <S.Content type={orientation}>
                <S.MapWrapper>
                  <img src={mapUrl} alt={`${name} map`} />
                </S.MapWrapper>
                <S.ContentActivity type={orientation}>
                  <S.HeaderActivity>
                    <div>
                      <h4>{name}</h4>
                      <em>{`${nearestCities[0].city}, ${nearestCities[0].region}`}</em>
                    </div>
                    <div>
                      <S.HeartRate average={Number(average_heartrate?.toFixed(0))} />
                      <S.TypeActivity>
                        <img src={conversionTypeActivities(type)} alt={type} />
                      </S.TypeActivity>
                    </div>
                  </S.HeaderActivity>
                  <S.ActivityData>
                    <div><span>Distância</span> <div><strong>{metersToKilometers(distance)}</strong> km</div></div>
                    <div><span>Duração</span> <strong>{movingTime}</strong></div>
                    <div><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></div>
                    <div><span>Elevação</span> <div><strong>{total_elevation_gain.toFixed(0)} </strong>m</div></div>
                  </S.ActivityData>
                  <S.LinksWrapper>
                    <a href={`https://www.strava.com/activities/${id}`}>visualizar no Strava <img src={strava} alt="Strava" /></a>
                  </S.LinksWrapper>
                </S.ContentActivity>
              </S.Content>
            </Animation>
          )
        })}
      </ul>
    </S.Wrapper>
  )
}

export default Strava
