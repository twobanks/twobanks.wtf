/* eslint-disable @next/next/no-img-element */
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline'
import Wrapper from '../../Wrapper'
import * as S from './styled'
import { useRouter } from 'next/router';
import { metersPerSecondTokmPerHour, metersPerSecondToMinPerKm, metersToKilometers } from '../../../utils/functions/conversionStrava';
import { useEffect, useState } from 'react';
import { conversionTypeActivities } from '../../../utils/functions/conversionTypeActivities';
import geocoder from 'city-reverse-geocoder'

const like = '/icon/like.svg';
const bike = '/icon/iconBike.svg';
const run = '/icon/iconRun.svg';
const conquests = '/icon/conquests.svg';
const backIcon = '/icon/back.svg';
const clock = '/icon/clock.svg';


mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

type Polyline = {
  type: string;
  coordinates: number[][]
}

const mock: Polyline = {
  type: 'LineString',
  coordinates: [
    [-122.483696, 37.833818],
    [-122.483482, 37.833174],
    [-122.483396, 37.8327],
    [-122.483568, 37.832056],
    [-122.48404, 37.831141],
    [-122.48404, 37.830497],
    [-122.483482, 37.82992],
    [-122.483568, 37.829548],
    [-122.48507, 37.829446],
    [-122.4861, 37.828802],
    [-122.486958, 37.82931],
    [-122.487001, 37.830802],
    [-122.487516, 37.831683],
    [-122.488031, 37.832158],
    [-122.488889, 37.832971],
    [-122.489876, 37.832632],
    [-122.490434, 37.832937],
    [-122.49125, 37.832429],
    [-122.491636, 37.832564],
    [-122.492237, 37.833378],
    [-122.493782, 37.833683]
  ]
}

const ActivityTemplate = ({ activity }: any) => {
  const [decodedPolyline, setDecodedPolyline] = useState<Polyline>(mock)
  const [iniLat, setiniLat] = useState<[number, number]>([0,0]);
  useEffect(() => {
    if(activity?.map) {
      setDecodedPolyline(polyline.toGeoJSON(activity?.map?.summary_polyline))
    }
  },[activity])
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: iniLat,
      zoom: 15
    });
    map.on('load', () => {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': decodedPolyline?.coordinates
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });
  }, [])
  const [movingTime, setMovingTime] = useState<string>('');
  const [cities, setCities] = useState([{ city: '', region: '' }]);
  const typeActivity = activity?.type === 'Ride' ? bike : run;
  const { back } = useRouter();
  const averageTitle = activity?.type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
  const averageSpeed = activity?.type !== 'Ride' ? metersPerSecondToMinPerKm(activity?.average_speed) : metersPerSecondTokmPerHour(activity?.average_speed);
  const maxTitle = activity?.type !== 'Ride' ? 'Pace mínimo' : 'Vel. Máxima ';
  const maxSpeed = activity?.type !== 'Ride' ? metersPerSecondToMinPerKm(activity?.max_speed) : metersPerSecondTokmPerHour(activity?.max_speed);
  const date = new Date(activity?.start_date_local);
  const dateFormatted = date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  useEffect(() => {
    if (activity?.moving_time) {
      setMovingTime(new Date(activity?.moving_time * 1000).toISOString().slice(11, 19))
    }
  }, [activity])
  useEffect(() => {
    if (activity?.start_latlng?.length) {
      setCities(geocoder(activity?.start_latlng[0], activity?.start_latlng[1]))
      setiniLat([activity?.start_latlng[0], activity?.start_latlng[1]])
    }
  }, [activity])
  const amountConquests = activity?.segment_efforts?.filter((item: { pr_rank: number; }) => item.pr_rank !== null)
  return (
    <Wrapper>
      <S.Container>
        <S.Content>
          <S.Header>
            <S.Title>
              <button type='button' onClick={() => back()}><img src={backIcon} alt="Ícone referente a voltar"/></button>
              <div>
                <strong> {activity?.name}</strong>
                <p>
                  <em>{`${cities[0].city}, ${cities[0].region}`}</em> •
                  <em>{dateFormatted[0].toUpperCase() + dateFormatted.substring(1)}</em> •
                  <em><img src={like} alt="Ícone de Like" /></em> <em>{activity?.kudos_count}</em>
                </p>
              </div>
            </S.Title>
            <S.WrapperIcons>
              <S.WrapperConquest>
                <img src={conquests} alt="Ícone de troféu" />
                <strong>{amountConquests?.length}</strong>
              </S.WrapperConquest>
              <S.TypeActivity>
                <img src={conversionTypeActivities(activity?.type)} alt={activity?.type} />
              </S.TypeActivity>
            </S.WrapperIcons>
          </S.Header>
          <S.ActivityData>
            <S.ContentActivity>
              <div>
                <S.Activity>
                  <span>Distância</span>
                  <div><strong>{metersToKilometers(activity?.distance)}</strong> km</div>
                </S.Activity>
                <S.Activity><span>Duração</span> <strong>{movingTime}</strong></S.Activity>
                <S.Activity><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></S.Activity>
                <S.Activity><span>{maxTitle}</span> <div><strong>{maxSpeed} </strong>km/h</div></S.Activity>
              </div>
              <div>
                <S.Activity><span>Elevação</span> <div><strong>{activity?.total_elevation_gain?.toFixed(0)} </strong>m</div></S.Activity>
                <S.Activity><span>Freq. Média</span> <div><strong> {activity?.average_heartrate?.toFixed(0)}</strong> bpm </div></S.Activity>
                <S.Activity ><span>Calorias</span> <div><strong>{activity?.calories}</strong> kcal</div></S.Activity>
              </div>
              <div>
                <S.Activity direction="row"><span><img src={clock} alt="Ícone de Bicicleta" /></span>  <div><strong>{activity?.device_name}</strong></div></S.Activity>
                <S.Activity direction="row"><span><img src={typeActivity} alt="Ícone de Bicicleta" /></span> <div><strong>{activity?.gear?.name}</strong></div></S.Activity>
              </div>
            </S.ContentActivity>
            <S.ElevationWrapper>
              <S.ContentElevation />
            </S.ElevationWrapper>
          </S.ActivityData>
          <S.MapWrapper>
            <div id="map" />
          </S.MapWrapper>
        </S.Content>
      </S.Container>
    </Wrapper>
  )
}

export default ActivityTemplate
