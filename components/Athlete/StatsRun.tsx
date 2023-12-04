import { AthleteStats } from '@/types/strava';
import * as S from './styles'
import { metersToKilometers } from '@/utils/functions/conversionStrava';

const StatsRun = ({ statsRun } : { statsRun: AthleteStats }) => {
  const movingTime = new Date(statsRun.recent_run_totals.moving_time * 1000).toISOString().substring(11, 16);
  return (
    <>
      <li>
        <span>
          Pedaladas mais recentes (Últimas 4 semanas): 
        </span>
        <div className='data_stats'>
          <div>
            <strong>
              {statsRun.recent_run_totals.count}
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
              {metersToKilometers(statsRun.recent_run_totals.distance)}
            </strong>km
          </div>
          <div>
            <span>
              Ganho de elevação: 
            </span>
            <strong>
              {statsRun.recent_run_totals.elevation_gain}
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

export default StatsRun;