import { AthleteType } from '@/types/strava';
import * as S from './styles';

const Athlete = ({ athlete, athleteStat } : { athlete: AthleteType; athleteStat: any; }) => {
  console.log("athlete", athlete);
  return (
    <S.Content>
      <strong>Equipamentos</strong>
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
    </S.Content>
  )
}

export default Athlete;