import { ReactNode, useState } from 'react';
import * as S from './styled'
import { conversionStack } from '../../utils/functions/conversionStack';
import { Work } from '../../types/strapi';

const Works = ({ works }: Work) => {
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
        {works.map((item, index) => {
          const { name, name_company, stack, type, url_company, url_name } = item;
          return (
            <S.Work key={`work-${index}`}>
              <Animation index={String(index)}>
                <S.Content>
                  <a href={url_name}>
                    <strong>{name}</strong>
                  </a>
                  <div>
                    <a href={url_company}>
                      {name_company}
                    </a> • <em>{type}</em>
                  </div>
                  <ul>
                    {stack.map(language => <S.Item key={language.name} stack={language.name}>{conversionStack(language.name)}</S.Item>)}
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
