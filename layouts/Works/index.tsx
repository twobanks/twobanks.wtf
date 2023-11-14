import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { Works } from '@/types/banks';
import * as S from './styled'

const Works = ({ works }: { works: Works[] }) => {

  return (
    <S.Container>
      <ul>
        {works.map((work, index) => {
          const { name, type, link, tech, company } = work;
          return (
            <S.Work key={`work-${index}`}>
              <S.Content>
                <Link href={link} target="_blank" rel="noreferrer">
                  <strong>{name}</strong>
                </Link>
                <div>
                  <Link href={company.link} target="_blank" rel="noreferrer">
                    {company.name}
                  </Link> • <em>{type}</em>
                </div>
                <ul>
                  {tech.map(language => <S.Item key={uuid()} $stack={language}>{language}</S.Item>)}
                </ul>
              </S.Content>
            </S.Work>
          )
        })}
      </ul>
    </S.Container>
  )
}

export default Works;
