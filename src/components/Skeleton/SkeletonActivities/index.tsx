import * as S from "../styled"
import SkeletonWrapper from "../SkeletonWrapper"
import Skeleton from "react-loading-skeleton"

const SkeletonActivities = () => {
  const acitivitiesItem = () => (
    <S.AcitivitiesItem>
      <S.MapWrapper>
        <Skeleton height={150} width={300} />
      </S.MapWrapper>
      <S.InfoWrapper>
        <S.Title>
          <Skeleton height={25} width={300} />
          <Skeleton height={40} width={40} />
        </S.Title>
        <S.ContentInfo>
          <div>
            <Skeleton height={15} width={45} />
            <Skeleton height={40} width={90} />
          </div>
          <div>
            <Skeleton height={15} width={45} />
            <Skeleton height={40} width={90} />
          </div>
          <div>
            <Skeleton height={15} width={45} />
            <Skeleton height={40} width={90} />
          </div>
          <div>
            <Skeleton height={15} width={45} />
            <Skeleton height={40} width={90} />
          </div>
        </S.ContentInfo>
        <S.ButtonActivity>
          <Skeleton height={20} width={100} />
        </S.ButtonActivity>
      </S.InfoWrapper>
    </S.AcitivitiesItem>
  )
  return (
    <SkeletonWrapper>
      <S.ContainerStats>
        <Skeleton height={40} width={250} />
        <Skeleton height={300} />
      </S.ContainerStats>
      <S.ActivitiesList>
        <Skeleton height={40} width={300} />
        {acitivitiesItem()}
        {acitivitiesItem()}
        {acitivitiesItem()}
      </S.ActivitiesList>
    </SkeletonWrapper>
  )
}

export default SkeletonActivities;
