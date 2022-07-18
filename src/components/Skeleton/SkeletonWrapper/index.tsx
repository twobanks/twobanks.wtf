import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import * as S from '../styled';
import theme from "../../styles/theme";
import { ReactNode } from "react";

type SkeletonWrapperProps = {
  children?: ReactNode;
}

const SkeletonWrapper = ({ children }: SkeletonWrapperProps) => (
  <SkeletonTheme baseColor={theme.colors.black} highlightColor={theme.colors.background} >
    <S.Wrapper>
      <S.Header>
        <S.Banks>
          <Skeleton height={60} width={60} borderRadius="100%" />
        </S.Banks>
        <nav>
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
          <Skeleton height={30} width={100} />
        </nav>
      </S.Header>
      {children}
    </S.Wrapper>
  </SkeletonTheme>
)

export default SkeletonWrapper;