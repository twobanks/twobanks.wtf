import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { Works } from '../../types/banks';
import * as S from './styled'

const Works = ({ works }: { works: Works[] }) => {
  const [hovered, setHovered] = useState('')
  const Animation = (props: { index: string; children: ReactNode }) => {
    let isHovered = hovered === props.index
    return (
      <S.AnimContainer
        onHoverStart={() => setHovered(props.index)}
        onHoverEnd={() => setHovered('')}
      >
        {isHovered && (
          <S.AnimHovered
            layoutId="listItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {props.children}
      </S.AnimContainer>
    )
  }

  return (
    <S.Container>
      <ul>
        {works.map((work, index) => {
          const { name, type, link, tech, company } = work;
          return (
            <S.Work key={`work-${index}`}>
              <Animation index={String(index)}>
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
                    {tech.map(language => <S.Item key={uuid()} stack={language}>{language}</S.Item>)}
                  </ul>
                </S.Content>
              </Animation>
            </S.Work>
          )
        })}
      </ul>
    </S.Container>
  )
}

export default Works;
