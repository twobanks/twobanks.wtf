import { AthleteStats } from '@/types/strava';
import * as S from './styles'
import { metersToKilometers } from '@/utils/functions/conversionStrava';

const StatsRide = ({ statsRide } : { statsRide: AthleteStats }) => {
  return (
    <S.ItemStats>
      <li>
        <strong title='Total'>
          Total
        </strong>
        <div className='data_stats'>
          <div title={`${statsRide.all_ride_totals.count} treinos`}>
            <strong>
              {statsRide.all_ride_totals.count}
            </strong>
            <span>
              treinos
            </span>
          </div>
          <div title='Distância'>
            <span>
              Distância 
            </span>
            <div className='values'>
              <strong>
                {metersToKilometers(statsRide.all_ride_totals.distance)}
              </strong>km
            </div>
          </div>
          <div title='Ganho de elevação'>
            <span>
              Ganho de elevação 
            </span>
            <div className='values'>
              <strong>
                {statsRide.all_ride_totals.elevation_gain}
              </strong>m
            </div>
          </div>
        </div>
      </li>
      <li>
        <strong title='Este ano'>
          Este ano
        </strong>
        <div className='data_stats'>
          <div title={`${statsRide.ytd_ride_totals.count} treinos`}>
            <strong>
              {statsRide.ytd_ride_totals.count}
            </strong>
            <span>
              treinos
            </span>
          </div>
          <div title='Distância'>
            <span>
              Distância 
            </span>
            <div className='values'>
              <strong>
                {metersToKilometers(statsRide.ytd_ride_totals.distance)}
              </strong>km
            </div>
          </div>
          <div title='Ganho de elevação'>
            <span>
              Ganho de elevação 
            </span>
            <div className='values'>
              <strong>
                {statsRide.ytd_ride_totals.elevation_gain}
              </strong>m
            </div>
          </div>
        </div>
      </li>
      <li>
        <strong title='Últimas 4 semanas'>
          Últimas 4 semanas 
        </strong>
        <div className='data_stats'>
          <div title={`${statsRide.recent_ride_totals.count} treinos`}>
            <strong>
              {statsRide.recent_ride_totals.count}
            </strong>
            <span>
              treinos
            </span>
          </div>
          <div title='Distância'>
            <span>
              Distância 
            </span>
            <div className='values'>
              <strong>
                {metersToKilometers(statsRide.recent_ride_totals.distance)}
              </strong>km
            </div>
          </div>
          <div title='Ganho de elevação'>
            <span>
              Ganho de elevação 
            </span>
            <div className='values'>
              <strong>
                {statsRide.recent_ride_totals.elevation_gain}
              </strong>m
            </div>
          </div>
        </div>
      </li>
    </S.ItemStats>
  )
}

export default StatsRide;