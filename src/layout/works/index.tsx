'use client';

import { Container } from '@/components/Container';
import { v4 as uuidv4 } from 'uuid';
import * as S from './styles';
import { works } from '@/utils/content/works';
import Link from 'next/link';

export default function Works() {
  return (
    <Container size='md'>
      <S.GlassCard>
        <S.PageTitle>trampos</S.PageTitle>
        {works.map((work) => {
          const { name, type, link, tech, company } = work;
          return (
            <S.Work key={uuidv4()}>
              <div className='header_work'>
                <Link href={link} target="_blank" rel="noreferrer" title={name}>
                  <strong>{name}</strong>
                </Link>
                <S.Company>
                  <Link href={company.link} target="_blank" rel="noreferrer" title={company.name}>
                    {company.name}
                  </Link> • <em title={type}>{type}</em>
                </S.Company>
              </div>
              <S.Stack>
                {tech.map(language => <S.Item key={uuidv4()} $stack={language} title={language}>{language}</S.Item>)}
              </S.Stack>
            </S.Work>
          )
        })}
      </S.GlassCard>
    </Container>
  );
}