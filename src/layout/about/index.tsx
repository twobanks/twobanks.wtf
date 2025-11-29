'use client';

import Link from 'next/link';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Container } from '@/components/Container';
import { data, social } from '@/utils/content/about';
import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

export default function About() {
  const { experiences, academic, about } = data;
  return (
    <Container size='md'>
      <S.GlassCard>
        <S.PageTitle>Salveee 🏹</S.PageTitle>
        <MarkdownRenderer content={about} />
        <S.PicAndSocial>
          <S.ImageWrapper>
            <Image src="/img/thiago.jpg" alt='twobanks' title='o pai!' fill blurDataURL="/img/thiago.jpg" priority quality={100} />
          </S.ImageWrapper>
          <S.SocialWrapper>
            {social.map(item => (
              <Link href={item.link} key={uuidv4()} title={item.name} target="_blank" rel="noreferrer" passHref>
                <Image src={item.icon} alt={item.name} height={20} width={20} blurDataURL={item.icon} priority quality={100}/>
              </Link>
            ))}
          </S.SocialWrapper>
        </S.PicAndSocial>
         <S.Career>
          <h2 title='Experiências'>Experiências</h2>
          <ul>
            {experiences.map(item => {
              const { role, name_company, url_company, city_company, period, tech, description } = item;
              return (
                <S.Experience key={uuidv4()}>
                  <S.Header>
                    <strong title={role}>{role}</strong>
                    <S.Company>
                      <div>
                        <Link href={url_company} target="_blank" rel="noreferrer" title={name_company}>
                          {name_company}
                        </Link><em title={city_company}> - {city_company}</em>
                      </div>
                      <p title={period}>{period}</p>
                    </S.Company>
                  </S.Header>
                  <S.Skills>
                    <h3 title="Competências">Competências</h3>
                    <ul>
                      {description.map(item => <li key={uuidv4()} title={item}>{item}</li>)}
                    </ul>
                  </S.Skills>
                  <S.Stacks>
                    <h3 title='Tecnologias'>Tecnologias</h3>
                    <ul>
                      {tech?.map(item => <li key={uuidv4()} title={item}>{item}</li>)}
                    </ul>
                  </S.Stacks>
                </S.Experience>
              )
            })}
          </ul>
        </S.Career>
        <S.Career>
          <h2 title='Formação acadêmica'>Formação acadêmica</h2>
          <S.AcademicEducation>
            <Link href={academic.url} target="_blank" rel="noreferrer" title={academic.course}>{academic.course}</Link>
            <p title={academic.local}>{academic.local}</p>
            <p title={academic.period}>{academic.period}</p>
          </S.AcademicEducation>
        </S.Career>
      </S.GlassCard>
    </Container>
  );
}