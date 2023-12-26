import { AthleteStats, AthleteType } from '@/types/strava';
import * as S from './styles';
import { ACTIVITY } from '@/utils/enums/strava';
import StatsRide from './StatsRide';
import StatsRun from './StatsRun';

const Athlete = ({ athlete, athleteStat, type } : { athlete: AthleteType; athleteStat: AthleteStats; type: ACTIVITY }) => {
  return (
    <S.Wrapper>
      <S.ContentStats>
        <strong title='Estatísticas'>Estatísticas</strong>
        <ul>
          <StatsRun statsRun={athleteStat} />
          <StatsRide statsRide={athleteStat} />
        </ul>
      </S.ContentStats>
      <S.ContentEquipment>
        <strong title='Equipamentos'>Equipamentos</strong>
        <div className="bike">
          <strong title='Bike'>Bike</strong>
          <ul>
            {athlete.bikes.map(item => item.id === 'b7570883' && (
              <li key={item.id} title='Cannondale FSi Carbon 5 2020'>
                <strong>Cannondale FSi Carbon 5 2020</strong>
                <div>
                  <span>{item.name}</span>
                  <em>({item.converted_distance}km)</em>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
      </S.ContentEquipment>
    </S.Wrapper>
  )
}

export default Athlete;