import { ReactNode, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './styled'
import { conversionStack } from '../../utils/functions/conversionStack';
import { Works } from '../../types/banks';

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
                  <a href={link}>
                    <strong>{name}</strong>
                  </a>
                  <div>
                    <a href={company.link}>
                      {company.name}
                    </a> • <em>{type}</em>
                  </div>
                  <ul>
                    {tech.map(language => <S.Item key={uuid()} stack={language}>{conversionStack(language)}</S.Item>)}
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
