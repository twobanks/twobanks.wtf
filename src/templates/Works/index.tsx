/* eslint-disable @next/next/no-img-element */
import Wrapper from '../Wrapper';
import * as S from './styled'
import { ReactNode, useState } from 'react';
import { works } from './mock';

const Works = () => {
  const Animation = (props: { index: string; children: ReactNode }) => {
    const [hovered, setHovered] = useState('')
    const isHovered = hovered === props.index

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
    <Wrapper>
      <S.Content>
        <h1>trampos</h1>
        <ul>
          {works?.map((item, index) => {
            return (
              <S.Work key={item.name}>
                <a href={item.link}>
                  <Animation index={String(index)}>
                    <img src={item.image} alt={item.name} />
                    <S.Title>
                      <strong>{item.name}</strong>
                      <ul>
                        {item.language.map(language => <li key={language}>{language}</li>)}
                      </ul>
                    </S.Title>
                  </Animation>
                </a>
              </S.Work>
            )
          })}
        </ul>
      </S.Content>
    </Wrapper>
  )
}

export default Works;
