import { AthleteStats } from '@/types/strava';
import * as S from './styles'
import { metersToKilometers } from '@/utils/functions/conversionStrava';
import { STATISTICS } from '@/utils/enums/strava';
import images from '@/public';
import Image from 'next/image';

const StatsRide = ({ statsRide, statistics } : { statsRide: AthleteStats; statistics: STATISTICS; }) => {
  return (
    <S.ItemStats>
      {statistics === STATISTICS.ALL && (
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
                <Image src={images.loc} alt='Distância' title='Distância' height={16} width={16} blurDataURL={images.loc} priority quality={100}/>
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
                <Image src={images.elevation} alt='Ganho de elevação ' title='Ganho de elevação ' height={16} width={16} blurDataURL={images.elevation} priority quality={100}/>
                <strong>
                  {statsRide.all_ride_totals.elevation_gain}
                </strong>m
              </div>
            </div>
          </div>
        </li>
      )}
      {statistics === STATISTICS.CURRENT_YEAR && (
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
              <Image src={images.loc} alt='Distância' title='Distância' height={16} width={16} blurDataURL={images.loc} priority quality={100}/>
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
                <Image src={images.elevation} alt='Ganho de elevação ' title='Ganho de elevação ' height={16} width={16} blurDataURL={images.elevation} priority quality={100}/>
                <strong>
                  {statsRide.ytd_ride_totals.elevation_gain}
                </strong>m
              </div>
            </div>
          </div>
        </li>
      )}
      {statistics === STATISTICS.LAST_4_WEEKS && (
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
                <Image src={images.loc} alt='Distância' title='Distância' height={16} width={16} blurDataURL={images.loc} priority quality={100}/>
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
                <Image src={images.elevation} alt='Ganho de elevação ' title='Ganho de elevação ' height={16} width={16} blurDataURL={images.elevation} priority quality={100}/>
                <strong>
                  {statsRide.recent_ride_totals.elevation_gain}
                </strong>m
              </div>
            </div>
          </div>
        </li>
      )}
    </S.ItemStats>
  )
}

export default StatsRide;