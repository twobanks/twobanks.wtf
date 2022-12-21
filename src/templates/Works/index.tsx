import { ReactNode, useState } from 'react';
import Wrapper from '../Wrapper';
import * as S from './styled'
import { works } from './mock';
import { conversionStack } from '../../utils/functions/conversionStack';

const Works = () => {
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
    <Wrapper page='works' >
      <S.Container>
        <ul>
          {works?.map((item, index) => {
            return (
              <S.Work key={item.id}>
                <Animation index={String(index)}>
                  <S.Content>
                    <a href={item.link}>
                      <strong>{item.name}</strong>
                    </a>
                    <div>
                      <a href={item.company.link}>
                        {item.company.name}
                      </a> • <em>{item.type}</em>
                    </div>
                    <ul>
                      {item.language.map(language => <S.Item key={language} stack={language}>{conversionStack(language)}</S.Item>)}
                    </ul>
                  </S.Content>
                </Animation>
              </S.Work>
            )
          })}
        </ul>
      </S.Container>
    </Wrapper>
  )
}

export default Works;
