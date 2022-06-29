/* eslint-disable @next/next/no-img-element */
import { ReactNode, useCallback, useState } from 'react';
import { v4 as uuid} from 'uuid';
import * as S from './styles';
import { metersPerSecondToMinPerKm, metersPerSecondTokmPerHour, metersToKilometers  } from '../../utils/functions/conversionStrava'
import { Activity } from '../../types/strava';
import { conversionTypeActivities } from '../../utils/functions/conversionTypeActivities';
import theme from '../../styles/theme';

const Strava = ({ activities }: { activities: Activity[] }) => {
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
    const pathColor = theme.colors.trainingZone.z1.substring(1);
    return `https://api.mapbox.com/styles/v1/twobanks/${style}/static/path+${pathColor}(${polylineEncoded})/auto/400x200@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&logo=false&attribution=false`
  },[])
  return(
    <S.Wrapper>
      <ul>
        {activities.map((activity, index) => {

          const { average_heartrate, average_speed, distance, moving_time, type, total_elevation_gain, map, name, id, start_date_local } = activity;
          const mapUrl = handleMap(map.summary_polyline)
          const movingTime = new Date(moving_time * 1000).toISOString().substring(11, 16);
          const averageTitle = type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
          const averageSpeed = type !== 'Ride' ? metersPerSecondToMinPerKm(average_speed) : metersPerSecondTokmPerHour(average_speed);
          const date = new Date(start_date_local);
          const dateFormatted = date.toLocaleDateString('pt-BR', {
            month: '2-digit',
            day: '2-digit',
          });
          return (
            <Animation key={uuid()} index={String(index)}>
                <S.Content>
                  <S.MapWrapper>
                    <img src={mapUrl} alt={name} />
                  </S.MapWrapper>
                  <S.ContentActivity>
                    <S.HeaderActivity>
                      <a href={`https://www.strava.com/activities/${id}`}>
                        {dateFormatted}
                      </a>
                      <S.TypeActivity>
                        <S.HeartRate average={Number(average_heartrate.toFixed(0))}/>
                        <img src={conversionTypeActivities(type)} alt={type} />
                      </S.TypeActivity>
                    </S.HeaderActivity>
                    <S.ActivityData>
                      <div><span>Distância</span> <div><strong>{metersToKilometers(distance)}</strong> km</div></div>
                      <div><span>Duração</span> <strong>{movingTime}</strong></div>
                      <div><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></div>
                      <div><span>Elevação</span> <div><strong>{total_elevation_gain.toFixed(0)} </strong>m</div></div>
                    </S.ActivityData>
                    <S.LinksWrapper>
                      <a href={`https://www.strava.com/activities/${id}`}>visualizar no Strava</a>
                      <a href="">+ ver mais</a>
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
