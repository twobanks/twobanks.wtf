'use client';

import Image from 'next/image';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Container, Content } from '@/components/Container';
import { data, social } from '@/utils/content/about';
import * as S from './styles';

export default function About() {
  const { experiences, about } = data;

  return (
    <Container size='lg'>
      <Content>
        <S.LayoutGrid>
          <S.ContentColumn>
            <S.BioContainer>
               <MarkdownRenderer content={about} />
            </S.BioContainer>
            <div>
              <S.SectionTitle>Experiências</S.SectionTitle>
              <S.ExperiencesContainer>
                {experiences.map((item, index) => (
                  <S.ExperienceItem key={index}>
                    <S.Role>{item.role}</S.Role>
                    <S.CompanyInfo>
                      <div>
                         {item.url_company ? (
                           <Link href={item.url_company} target="_blank">{item.name_company}</Link>
                         ) : (
                           <span>{item.name_company}</span>
                         )}
                         <em> - {item.city_company}</em>
                      </div>
                      <p>{item.period}</p>
                    </S.CompanyInfo>
                    {item.description?.length > 0 && (
                      <S.Competencies>
                        <h4>Competências</h4>
                        <ul>
                          {item.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </S.Competencies>
                    )}
                    {item.tech?.length > 0 && (
                      <S.TechList>
                        <h4>Tecnologias</h4>
                        <ul>
                          {item.tech.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </S.TechList>
                    )}
                  </S.ExperienceItem>
                ))}
              </S.ExperiencesContainer>
            </div>
          </S.ContentColumn>
          <S.ProfileCard>
            <S.ImageWrapper>
              <Image src="/img/two.jpg" alt='Thiago' fill style={{ objectFit: 'cover' }} priority />
            </S.ImageWrapper>
            <S.SocialWrapper>
                  {social.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <Link key={index} href={item.link} target="_blank" title={item.name}>
                        <IconComponent size={24} weight="regular" />
                      </Link>
                    )
                  })}
                </S.SocialWrapper>
          </S.ProfileCard>
        </S.LayoutGrid>
      </Content>
    </Container>
  );
}