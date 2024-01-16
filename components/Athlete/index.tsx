import { AthleteStats, AthleteType } from '@/types/strava';
import * as S from './styles';
import { ACTIVITY, STATISTICS } from '@/utils/enums/strava';
import StatsRide from './StatsRide';
import StatsRun from './StatsRun';

const Athlete = ({ athlete, athleteStat, type, statistics } : { athlete: AthleteType; athleteStat: AthleteStats; type: ACTIVITY; statistics: STATISTICS; }) => {
  return (
    <S.Wrapper>
      <S.ContentStats>
        <strong title='Estatísticas'>Estatísticas</strong>
        <ul>
          {type === ACTIVITY.RUN && <StatsRun statsRun={athleteStat} statistics={statistics} />}
          {type === ACTIVITY.RIDE && <StatsRide statsRide={athleteStat} statistics={statistics} />}
        </ul>
      </S.ContentStats>
      <S.ContentEquipment>
        <strong title='Equipamentos'>Equipamentos</strong>
        {type === ACTIVITY.RIDE && (
          <div className="shoes">
            <strong title='Bike'>Bike</strong>
            <ul>
              {athlete.bikes.map(item => item.id === 'b7570883' && (
                <li key={item.id} title='Cannondale FSi Carbon 5 2020'>
                  <span>Cannondale FSi Carbon 5 2020</span>
                  <em>({item.converted_distance}km)</em>
                </li>
              ))}
            </ul>
          </div>
        )}
        {type === ACTIVITY.RUN && (
          <div className='shoes'>
            <strong title='Tênis'>Tênis</strong>
            <ul>
              {athlete.shoes.map(item => (
                <li key={item.id} title={item.name}>
                  <span>{item.name}</span>
                  <em>({item.converted_distance}km)</em>
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