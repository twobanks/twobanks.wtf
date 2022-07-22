/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Image from 'next/image';
import { Strava } from '../../components';
import { Activities, AthleteStats } from '../../types/strava';
import { metersToKilometers } from '../../utils/functions/conversionStrava';
import Wrapper from '../Wrapper';
import * as S from './styled'

const twobanks = '/img/twobanks.jpg';
const mtb = '/img/mtb.jpg';

type ActivitiesProps = {
  activities: Activities[];
  athleteStats?: AthleteStats;
}

const ActivitiesTemplate = ({ activities, athleteStats }: ActivitiesProps) => {
  const [typeRun, setTypeRun] = useState<string>('all_run_totals')
  const [typeRide, setTypeRide] = useState<string>('all_ride_totals')
  const date = new Date()
  const yearActual = date.getFullYear()
  return (
    <Wrapper>
      <S.Content>
        <h2>atividades</h2>
        <S.Stats>
          <S.ContainerStats>
            <S.ImageWrapper>
              <Image src={twobanks} alt="twobanks" layout='fill' objectFit='cover' />
            </S.ImageWrapper>
            <S.ContentStats>
              <S.Tabs>
                <S.Tab active={typeRun === 'all_run_totals'} onClick={() => setTypeRun('all_run_totals')}>Todas as corridas</S.Tab>
                <S.Tab active={typeRun === 'recent_run_totals'} onClick={() => setTypeRun('recent_run_totals')}>Recentes</S.Tab>
                <S.Tab active={typeRun === 'ytd_run_totals'} onClick={() => setTypeRun('ytd_run_totals')}>{yearActual}</S.Tab>
              </S.Tabs>
              <ul>
                {typeRun === 'all_run_totals' && (
                  <>
                    <li><em><strong>{athleteStats?.all_run_totals.count}</strong> atividades</em></li>
                    <li><span>Distância: </span> <div><strong>{metersToKilometers(Number(athleteStats?.all_run_totals.distance))}</strong> km</div></li>
                    <li><span>Elevação: </span> <div><strong>{athleteStats?.all_run_totals.elevation_gain?.toFixed(0)}</strong> m</div></li>
                  </>
                )}
                {typeRun === 'recent_run_totals' && (
                  <>
                    <li><em><strong>{athleteStats?.recent_run_totals.count}</strong> atividades</em></li>
                    <li><span>Distância:</span> <div><strong>{metersToKilometers(Number(athleteStats?.recent_run_totals.distance))}</strong> km</div></li>
                    <li><span>Elevação:</span> <div><strong>{athleteStats?.recent_run_totals.elevation_gain?.toFixed(0)}</strong> m</div></li>
                  </>
                )}
                {typeRun === 'ytd_run_totals' && (
                  <>
                    <li><em><strong>{athleteStats?.ytd_run_totals.count}</strong> atividades</em></li>
                    <li><span>Distância: </span> <div><strong>{metersToKilometers(Number(athleteStats?.ytd_run_totals.distance))}</strong> km</div></li>
                    <li><span>Elevação: </span> <div><strong>{athleteStats?.ytd_run_totals.elevation_gain?.toFixed(0)}</strong> m</div></li>
                  </>
                )}
              </ul>
            </S.ContentStats>
          </S.ContainerStats>
          <S.ContainerStats>
            <S.ImageWrapper>
              <Image src={mtb} alt="twobanks" layout='fill' objectFit='fill' />
            </S.ImageWrapper>
            <S.ContentStats>
              <S.Tabs>
                <S.Tab active={typeRide === 'all_ride_totals'} onClick={() => setTypeRide('all_ride_totals')}>Todas as pedaladas</S.Tab>
                <S.Tab active={typeRide === 'recent_ride_totals'} onClick={() => setTypeRide('recent_ride_totals')}>Recentes</S.Tab>
                <S.Tab active={typeRide === 'ytd_ride_totals'} onClick={() => setTypeRide('ytd_ride_totals')}>{yearActual}</S.Tab>
              </S.Tabs>
              <ul>
                {typeRide === 'all_ride_totals' && (
                  <>
                    <li><em><strong>{athleteStats?.all_ride_totals.count}</strong> atividades</em></li>
                    <li><span>Distância: </span><div><strong>{metersToKilometers(Number(athleteStats?.all_ride_totals.distance))}</strong> km</div></li>
                    <li><span>Elevação: </span><div><strong>{athleteStats?.all_ride_totals.elevation_gain?.toFixed(0)}</strong> m</div></li>
                  </>
                )}
                {typeRide === 'recent_ride_totals' && (
                  <>
                    <li><em><strong>{athleteStats?.recent_ride_totals.count}</strong> atividades</em></li>
                    <li><span>Distância: </span><div><strong>{metersToKilometers(Number(athleteStats?.recent_ride_totals.distance))}</strong> km</div></li>
                    <li><span>Elevação: </span><div><strong>{athleteStats?.recent_ride_totals.elevation_gain?.toFixed(0)}</strong> m</div></li>
                  </>
                )}
                {typeRide === 'ytd_ride_totals' && (
                  <>
                    <li><em><strong>{athleteStats?.ytd_ride_totals.count}</strong> atividades</em></li>
                    <li><span>Distância: </span><div><strong>{metersToKilometers(Number(athleteStats?.ytd_ride_totals.distance))}</strong> km</div></li>
                    <li><span>Elevação: </span><div><strong>{athleteStats?.ytd_ride_totals.elevation_gain?.toFixed(0)}</strong> m</div></li>
                  </>
                )}
              </ul>
            </S.ContentStats>
          </S.ContainerStats>
        </S.Stats>
        <h3>últimas atividades</h3>
        <Strava activities={activities} />
      </S.Content>
    </Wrapper>
  )
}

export default ActivitiesTemplate;
