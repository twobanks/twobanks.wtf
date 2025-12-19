'use client';

import { JSX } from 'react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Container from '@/components/Container';
import { data } from '@/utils/content/about';
import { Experience } from '@/utils/types/about';

import * as S from './styles';

export default function About(): JSX.Element {
  const experiences = data.experiences as Experience[];
  const about = data.about as string;
  return (
    <Container name="sobre">
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
                
                {item.description && item.description.length > 0 && (
                  <S.Competencies>
                    <h4>Competências</h4>
                    <ul>
                      {item.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </S.Competencies>
                )}
                
                {item.tech && item.tech.length > 0 && (
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
    </Container>
  );
}