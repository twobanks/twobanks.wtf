import { Skeleton } from ".";
import { Container, Content } from "../Container";
import * as S from "@/layout/about/styles";

export const SkeletonAbout = () => {
  return (
    <Container size='lg'>
      <Content>
        <S.LayoutGrid>
          <S.ContentColumn>
            <S.BioContainer>
              <Skeleton $height="16px" $width="100%" $radius="4px" />
              <Skeleton $height="16px" $width="95%" $marginTop="10px" $radius="4px" />
              <Skeleton $height="16px" $width="90%" $marginTop="10px" $radius="4px" />
              <Skeleton $height="16px" $width="98%" $marginTop="10px" $radius="4px" />
              <Skeleton $height="16px" $width="60%" $marginTop="10px" $radius="4px" />
            </S.BioContainer>
            <div>
              <S.SectionTitle>
                <Skeleton $width="200px" $height="32px" $radius="6px" />
              </S.SectionTitle>
              <S.ExperiencesContainer>
                {Array.from({ length: 3 }).map((_, i) => (
                  <S.ExperienceItem key={i}>
                    <Skeleton $width="40%" $height="24px" $radius="4px" />
                    <S.CompanyInfo style={{ marginTop: '0.5rem' }}>
                       <Skeleton $width="30%" $height="18px" $radius="4px" />
                       <Skeleton $width="15%" $height="14px" $marginTop="4px" $radius="4px" />
                    </S.CompanyInfo>
                    <div style={{ marginTop: '1rem' }}>
                      <Skeleton $width="100%" $height="14px" $radius="4px" />
                      <Skeleton $width="90%" $height="14px" $marginTop="6px" $radius="4px" />
                      <Skeleton $width="80%" $height="14px" $marginTop="6px" $radius="4px" />
                    </div>
                  </S.ExperienceItem>
                ))}
              </S.ExperiencesContainer>
            </div>
          </S.ContentColumn>
          <S.ProfileCard>
            <S.ImageWrapper>
              <Skeleton $width="100%" $height="100%" style={{ position: 'absolute', top: 0, left: 0 }} />
            </S.ImageWrapper>
            <S.SocialWrapper>
              <Skeleton $width="24px" $height="24px" $radius="50%" />
              <Skeleton $width="24px" $height="24px" $radius="50%" />
              <Skeleton $width="24px" $height="24px" $radius="50%" />
              <Skeleton $width="24px" $height="24px" $radius="50%" />
            </S.SocialWrapper>
          </S.ProfileCard>
        </S.LayoutGrid>
      </Content>
    </Container>
  );
};