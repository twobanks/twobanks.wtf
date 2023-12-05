import { AthleteStats } from '@/types/strava';
import * as S from './styles'
import { metersToKilometers } from '@/utils/functions/conversionStrava';

const StatsRun = ({ statsRun } : { statsRun: AthleteStats }) => {
  return (
    <S.ItemStats>
      <li>
        <strong title='Total'>
          Total
        </strong>
        <div className='data_stats'>
          <div title={`${statsRun.all_run_totals.count} treinos`}>
            <strong>
              {statsRun.all_run_totals.count}
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
                {metersToKilometers(statsRun.all_run_totals.distance)}
              </strong>km
            </div>
          </div>
          <div title='Ganho de elevação'>
            <span>
              Ganho de elevação 
            </span>
            <div className='values'>
              <strong>
                {statsRun.all_run_totals.elevation_gain}
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
          <div title={`${statsRun.ytd_run_totals.count} treinos`}>
            <strong>
              {statsRun.ytd_run_totals.count}
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
                {metersToKilometers(statsRun.ytd_run_totals.distance)}
              </strong>km
            </div>
          </div>
          <div title='Ganho de elevação'>
            <span>
              Ganho de elevação 
            </span>
            <div className='values'>
              <strong>
                {statsRun.ytd_run_totals.elevation_gain}
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
          <div title={`${statsRun.recent_run_totals.count} treinos`}>
            <strong>
              {statsRun.recent_run_totals.count}
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
                {metersToKilometers(statsRun.recent_run_totals.distance)}
              </strong>km
            </div>
          </div>
          <div title='Ganho de elevação'>
            <span>
              Ganho de elevação 
            </span>
            <div className='values'>
              <strong>
                {statsRun.recent_run_totals.elevation_gain}
              </strong>m
            </div>
          </div>
        </div>
      </li>
    </S.ItemStats>
  )
}

export default StatsRun;