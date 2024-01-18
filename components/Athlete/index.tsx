import { AthleteStats, AthleteType } from '@/types/strava';
import * as S from './styles';
import { ACTIVITY, STATISTICS } from '@/utils/enums/strava';
import StatsRide from './StatsRide';
import StatsRun from './StatsRun';
import Image from 'next/image';
import images from '@/public';

const Athlete = ({ athlete, athleteStat, type, statistics } : { athlete: AthleteType; athleteStat: AthleteStats; type: ACTIVITY; statistics: STATISTICS; }) => {
  return (
    <S.Wrapper>
      <S.ContentStats>
        <div className='container_equipment'>
          <strong title='Estatísticas'>Estatísticas</strong>
          <div className='type'>
            {statistics === STATISTICS.CURRENT_YEAR && <span title='Este ano'>Este ano</span>}
            {statistics === STATISTICS.LAST_4_WEEKS && <span title='Últimas 4 semanas'>Últimas 4 semanas</span>}
            {statistics === STATISTICS.ALL && <span title='Total'>Total</span>}
          </div>
        </div>
        <ul>
          {type === ACTIVITY.RUN && <StatsRun statsRun={athleteStat} statistics={statistics} />}
          {type === ACTIVITY.RIDE && <StatsRide statsRide={athleteStat} statistics={statistics} />}
        </ul>
      </S.ContentStats>
      <S.ContentEquipment>
        <div className='container_equipment'>
          <strong title='Equipamentos'>Equipamentos</strong>
          {type === ACTIVITY.RIDE && (
            <div className='type'>
              <span title='Bike'>Bike</span>
              <Image src={images.bike} alt={ACTIVITY.RIDE} height={20} width={20} blurDataURL={images.bike} priority quality={100} />
            </div>
          )}
          {type === ACTIVITY.RUN && (
            <div className='type'>
              <span title='Tênis'>Tênis</span>
              <Image src={images.running} alt={ACTIVITY.RUN} height={20} width={20} blurDataURL={images.running} priority quality={100} />
            </div>
          )}
        </div>
        {type === ACTIVITY.RIDE && (
          <div className="shoes">
            <ul>
              {athlete.bikes.map(item => item.id === 'b7570883' && (
                <li key={item.id} title='Cannondale FSi Carbon 5 2020'>
                  <span>Cannondale FSi Carbon 5 2020</span>
                  <em>{item.converted_distance}km</em>
                </li>
              ))}
            </ul>
          </div>
        )}
        {type === ACTIVITY.RUN && (
          <div className='shoes'>
            <ul>
              {athlete.shoes.map(item => (
                <li key={item.id} title={item.name}>
                  <span>{item.name}</span>
                  <em>{item.converted_distance}km</em>
                </li>
              ))}
            </ul>
          </div>
        )}
      </S.ContentEquipment>
    </S.Wrapper>
  )
}

export default Athlete;