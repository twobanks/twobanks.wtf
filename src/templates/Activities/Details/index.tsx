import Wrapper from '../../Wrapper'
import * as S from './styled'
import { useRouter } from 'next/router';
import { metersPerSecondTokmPerHour, metersPerSecondToMinPerKm, metersToKilometers } from '../../../utils/functions/conversionStrava';

const ActivityTemplate = ({ activity } : any) => {
  const { back } = useRouter();
  const averageTitle = activity?.type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
  const averageSpeed = activity?.type !== 'Ride' ? metersPerSecondToMinPerKm(activity?.average_speed) : metersPerSecondTokmPerHour(activity?.average_speed);
  return (
    <Wrapper>
      <S.Container>
        <S.Header>
          <button type='button' onClick={() => back()}>{`<<`}</button>
          <span onClick={() => back()}>atividades</span>/
          <strong> {activity?.name}</strong>
        </S.Header>
        <S.Content>
          <S.ActivityData>
            <div><span>Distância</span> <div><strong>{metersToKilometers(activity?.distance)}</strong> km</div></div>
            <div><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></div>
            <div><span>Elevação</span> <div><strong>{activity?.total_elevation_gain?.toFixed(0)} </strong>m</div></div>
            <div><span>Bike</span> <div><strong>{activity?.gear?.name}</strong></div></div>
            <div><span>Relógio</span> <div><strong>{activity?.device_name}</strong></div></div>
            <div><span>Kudos</span> <div><strong>{activity?.kudos_count}</strong></div></div>
            <div><span>Batimento</span> <div><strong>{activity?.average_heartrate?.toFixed(0)}</strong></div></div>
            <div><span>kcal</span> <div><strong>{activity?.calories}</strong></div></div>
          </S.ActivityData>
        </S.Content>
      </S.Container>
    </Wrapper>
  )
}

export default ActivityTemplate
