import { AthleteStats } from '@/types/strava';
import * as S from './styles'
import { metersToKilometers } from '@/utils/functions/conversionStrava';

const StatsRide = ({ statsRide } : { statsRide: AthleteStats }) => {
  const movingTime = new Date(statsRide.recent_ride_totals.moving_time * 1000).toISOString().substring(11, 16);
  return (
    <>
      <li>
        <span>
          Maior distância percorrida de bike: 
        </span>
        <strong>
          {statsRide.biggest_ride_distance}
        </strong>
      </li>
      <li>
        <span>
          A subida mais alta percorrida de bike: 
        </span>
        <strong>
          {statsRide.biggest_climb_elevation_gain}
        </strong>
      </li>
      <li>
        <span>
          Pedaladas mais recentes (Últimas 4 semanas): 
        </span>
        <div className='data_stats'>
          <div>
            <strong>
              {statsRide.recent_ride_totals.count}
            </strong>
            <span>
              treinos
            </span>
          </div>
          <div>
            <span>
              Distância: 
            </span>
            <strong>
              {metersToKilometers(statsRide.recent_ride_totals.distance)}
            </strong>km
          </div>
          <div>
            <span>
              Ganho de elevação: 
            </span>
            <strong>
              {statsRide.recent_ride_totals.elevation_gain.toFixed(0)}m
            </strong>
          </div>
          <div>
            <span>
              Tempo de movimentação: 
            </span>
            <strong>
              {movingTime}
            </strong>
          </div>
        </div>
      </li>
    </>
  )
}

export default StatsRide;