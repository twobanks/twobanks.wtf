'use client';

import Link from 'next/link';
import { works } from '@/utils/content/works';
import { WorkItem } from '@/utils/types/works';
import Container from '@/components/Container';

import * as S from './styles';

export default function Works() {
  const worksData = works as WorkItem[];
  return (
    <Container name="trampos">
      <S.ListContainer>
        {worksData.map((work, index) => {
          const { name, type, link, tech, company } = work;
          return (
            <S.ProjectRow key={index}>
              <S.ProjectInfo>
                <Link href={link} target="_blank" rel="noreferrer" title={`Ver projeto ${name}`}>
                  <strong>{name}</strong>
                </Link>
                <S.CompanyDetails>
                  <Link href={company.link} target="_blank" rel="noreferrer" title={company.name}>
                    {company.name}
                  </Link>
                  <span>•</span>
                  <span>{type}</span>
                </S.CompanyDetails>
              </S.ProjectInfo>
              <S.TechList>
                {tech.map((language) => (
                  <S.TechItem key={language} $stack={language} title={language}>
                    {language}
                  </S.TechItem>
                ))}
              </S.TechList>

            </S.ProjectRow>
          )
        })}
      </S.ListContainer>
    </Container>
  );
}