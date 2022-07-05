/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Strava } from '../../components';
import { Activities, AthleteStats } from '../../types/strava';
import { metersToKilometers } from '../../utils/functions/conversionStrava';
import Wrapper from '../Wrapper';
import * as S from './styled'
const bike = '/icon/bike.svg';
const trail = '/icon/trail.svg';
type ActivitiesProps = {
  activities: Activities[];
  athleteStats?: AthleteStats;
  loading: boolean;
}

const ActivitiesTemplate = ({ activities, athleteStats, loading }: ActivitiesProps) => {
  const [typeRun, setTypeRun] = useState<string>('all_run_totals')
  const [typeRide, setTypeRide] = useState<string>('all_ride_totals')
  return (
    <Wrapper>
      <S.Content>
        <S.Stats>
          <S.ContainerStats>
            <img src={trail} alt="Ícone Trail" />
            <S.ContentStats>
              <S.Tabs>
                <S.Tab active={typeRun === 'all_run_totals'} onClick={() => setTypeRun('all_run_totals')}>Todas as corridas</S.Tab>
                <S.Tab active={typeRun === 'recent_run_totals'} onClick={() => setTypeRun('recent_run_totals')}>Recentes</S.Tab>
                <S.Tab active={typeRun === 'ytd_run_totals'} onClick={() => setTypeRun('ytd_run_totals')}>2022</S.Tab>
              </S.Tabs>
              <ul>
                {typeRun === 'all_run_totals' && (
                  <>
                    <li>{athleteStats?.all_run_totals.count} atividades</li>
                    <li>Distância: {metersToKilometers(Number(athleteStats?.all_run_totals.distance))}</li>
                    <li>Elevação: {athleteStats?.all_run_totals.elevation_gain.toFixed(0)}m</li>
                  </>
                )}
                {typeRun === 'recent_run_totals' && (
                  <>
                    <li>{athleteStats?.recent_run_totals.count} atividades</li>
                    <li>Distância: {metersToKilometers(Number(athleteStats?.recent_run_totals.distance))}</li>
                    <li>Elevação: {athleteStats?.recent_run_totals.elevation_gain.toFixed(0)}m</li>
                  </>
                )}
                {typeRun === 'ytd_run_totals' && (
                  <>
                    <li>{athleteStats?.ytd_run_totals.count} atividades</li>
                    <li>Distância: {metersToKilometers(Number(athleteStats?.ytd_run_totals.distance))}</li>
                    <li>Elevação: {athleteStats?.ytd_run_totals.elevation_gain.toFixed(0)}m</li>
                  </>
                )}
              </ul>
            </S.ContentStats>
          </S.ContainerStats>
          <S.ContainerStats>
            <img src={bike} alt="Ícone Bike" />
            <S.ContentStats>
              <S.Tabs>
                <S.Tab active={typeRide === 'all_ride_totals'} onClick={() => setTypeRide('all_ride_totals')}>Todas as pedaladas</S.Tab>
                <S.Tab active={typeRide === 'recent_ride_totals'} onClick={() => setTypeRide('recent_ride_totals')}>Recentes</S.Tab>
                <S.Tab active={typeRide === 'ytd_ride_totals'} onClick={() => setTypeRide('ytd_ride_totals')}>2022</S.Tab>
              </S.Tabs>
              <ul>
                {typeRide === 'all_ride_totals' && (
                  <>
                    <li>{athleteStats?.all_ride_totals.count} atividades</li>
                    <li>Distância: {metersToKilometers(Number(athleteStats?.all_ride_totals.distance))}</li>
                    <li>Elevação: {athleteStats?.all_ride_totals.elevation_gain.toFixed(0)}m</li>
                  </>
                )}
                {typeRide === 'recent_ride_totals' && (
                  <>
                    <li>{athleteStats?.recent_ride_totals.count} atividades</li>
                    <li>Distância: {metersToKilometers(Number(athleteStats?.recent_ride_totals.distance))}</li>
                    <li>Elevação: {athleteStats?.recent_ride_totals.elevation_gain.toFixed(0)}m</li>
                  </>
                )}
                {typeRide === 'ytd_ride_totals' && (
                  <>
                    <li>{athleteStats?.ytd_ride_totals.count} atividades</li>
                    <li>Distância: {metersToKilometers(Number(athleteStats?.ytd_ride_totals.distance))}</li>
                    <li>Elevação: {athleteStats?.ytd_ride_totals.elevation_gain.toFixed(0)}m</li>
                  </>
                )}
              </ul>
            </S.ContentStats>
          </S.ContainerStats>
        </S.Stats>
        <h2>últimas atividades</h2>
        {loading ? 'loading' : <Strava activities={activities}/> }
      </S.Content>
    </Wrapper>
  )
}

export default ActivitiesTemplate;
