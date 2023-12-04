import { AthleteStats, AthleteType } from '@/types/strava';
import * as S from './styles';
import { ACTIVITY } from '@/utils/enums/strava';
import StatsRide from './StatsRide';
import StatsRun from './StatsRun';

const Athlete = ({ athlete, athleteStat, type } : { athlete: AthleteType; athleteStat: AthleteStats; type: ACTIVITY }) => {
  return (
    <S.Wrapper>
      <S.ContentStats>
        <strong>Estatísticas</strong>
        <ul>
          {(type === ACTIVITY.RUN || type === ACTIVITY.TRAIL) && (
            <StatsRun statsRun={athleteStat} />
          )}
          {type === ACTIVITY.RIDE && (
            <StatsRide statsRide={athleteStat} />
          )}
        </ul>
      </S.ContentStats>
      <S.ContentEquipment>
        <strong>Equipamentos</strong>
        {type === ACTIVITY.RIDE && (
          <div className="bike">
            <strong>Bike</strong>
            <ul>
              {athlete.bikes.map(item => item.id === 'b7570883' && (
                <li key={item.id}>
                  <strong>Cannondale FSi Carbon 5 2020</strong>
                  <div>
                    <span>{item.name}</span>
                    <em>({item.converted_distance}km)</em>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {(type === ACTIVITY.RUN || type === ACTIVITY.TRAIL) && (
          <div className='shoes'>
            <strong>Tênis</strong>
            <ul>
              {athlete.shoes.map(item => (
                <li key={item.id}>
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