import { v4 as uuid} from 'uuid';
import Wrapper from '../../Wrapper'
import * as S from './styled'
import { useRouter } from 'next/router';
import { metersPerSecondTokmPerHour, metersPerSecondToMinPerKm, metersToKilometers } from '../../../utils/functions/conversionStrava';
import { HeartRate } from '../../../components/Strava/styles';

const like = '/icon/like.svg';
const bike = '/icon/iconBike.svg';
const run = '/icon/iconRun.svg';

const ActivityTemplate = ({ activity } : any) => {
  const typeActivity = activity?.type ? bike : run;
  const { back } = useRouter();
  const averageTitle = activity?.type !== 'Ride' ? 'Pace ' : 'Vel. Média ';
  const averageSpeed = activity?.type !== 'Ride' ? metersPerSecondToMinPerKm(activity?.average_speed) : metersPerSecondTokmPerHour(activity?.average_speed);
  return (
    <Wrapper>
      <S.Container>
        {/* <S.Header>
          <button type='button' onClick={() => back()}>{`<<`}</button>
          <span>voltar</span>
          <strong> {activity?.name}</strong>
        </S.Header> */}
        <S.Content>
          <S.Header>
            <button type='button' onClick={() => back()}>{`<`}</button>
            <strong> {activity?.name}</strong>
            <HeartRate average={Number(activity?.average_heartrate?.toFixed(0))}/>
          </S.Header>
          <S.ActivityData>
            <S.ContentActivity>
              <S.Activity>
                <span>Distância</span>
                <div><strong>{metersToKilometers(activity?.distance)}</strong> km</div>
              </S.Activity>
              <S.Activity><span>{averageTitle}</span> <div><strong>{averageSpeed} </strong>km/h</div></S.Activity>
              <S.Activity><span>Elevação</span> <div><strong>{activity?.total_elevation_gain?.toFixed(0)} </strong>m</div></S.Activity>
              <S.Activity ><span>Calorias</span> <div><strong>{activity?.calories}</strong> kcal</div></S.Activity>
              {/* <S.Activity><span>Freq. Média</span> <div><strong>{activity?.average_heartrate?.toFixed(0)}</strong> bpm</div></S.Activity> */}
              <S.Activity direction="row"><span><img src={typeActivity} alt="Ícone de Bicicleta" /></span>  <div><strong>{activity?.device_name}</strong></div></S.Activity>
              <S.Activity direction="row"><span><img src={typeActivity} alt="Ícone de Bicicleta" /></span> <div><strong>{activity?.gear?.name}</strong></div></S.Activity>
              <S.Activity direction="row"><span><img src={like} alt="Ícone de Like" /></span> <strong>{activity?.kudos_count}</strong></S.Activity>
            </S.ContentActivity>
            <S.ElevationWrapper />
          </S.ActivityData>
          <S.MapWrapper />
        </S.Content>
        <S.SegmentsWrapper>
          <h3><strong>{activity?.segment_efforts?.length}</strong> segmentos</h3>
          <S.SegmentContent>
            {activity?.segment_efforts?.map((item: { name: string; }) => {
              return(
                <S.Segment key={uuid()}>
                  {item.name}
                </S.Segment>
              )
            })}
          </S.SegmentContent>
        </S.SegmentsWrapper>
      </S.Container>
    </Wrapper>
  )
}

export default ActivityTemplate
