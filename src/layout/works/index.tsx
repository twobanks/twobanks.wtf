'use client';

import Link from 'next/link';
import { Container, Content } from '@/components/Container';
import { works } from '@/utils/content/works';
import * as S from './styles';

export default function Works() {
  return (
    <Container size='md'>
      <Content>
        <S.ProjectsGrid>
          {works.map((work, index) => {
            const { name, type, link, tech, company } = work;
            return (
              <S.ProjectCard key={index}>
                <S.CardHeader>
                  <Link href={link} target="_blank" rel="noreferrer" title={`Ver projeto ${name}`}>
                    <strong>{name}</strong>
                  </Link>
                  <S.CompanyInfo>
                    <Link href={company.link} target="_blank" rel="noreferrer" title={company.name}>
                      {company.name}
                    </Link>
                    <span>• {type}</span>
                  </S.CompanyInfo>
                </S.CardHeader>
                <S.TechList>
                  {tech.map((language) => (
                    <S.TechItem key={language} $stack={language} title={language}>
                      {language}
                    </S.TechItem>
                  ))}
                </S.TechList>
              </S.ProjectCard>
            )
          })}
        </S.ProjectsGrid>
      </Content>
    </Container>
  );
}