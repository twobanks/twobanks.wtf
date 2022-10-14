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
  const [orientation, setOrientation] = useState<'ROW' | 'GRID'>('ROW');
  const date = new Date()
  const yearActual = date.getFullYear()
  return (
    <Wrapper>
      <S.Content>
        <h2>atividades</h2>
        <S.Header>
          <h3>últimas atividades</h3>
          <div>
            <button onClick={() => setOrientation('ROW')}>ROW</button>
            <button onClick={() => setOrientation('GRID')}>GRID</button>
          </div>
        </S.Header>
        <Strava activities={activities} orientation={orientation}/>
      </S.Content>
    </Wrapper>
  )
}

export default ActivitiesTemplate;
