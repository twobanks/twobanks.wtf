import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Wrapper from '../Wrapper';
import * as S from './styled'
import { works } from './mock';
import { conversionStack } from '../../utils/functions/conversionStack';

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
        <h2>trampos</h2>
        <ul>
          {works?.map((item, index) => {
            return (
              <S.Work key={item.name}>
                <a href={item.link}>
                  <Animation index={String(index)}>
                    <S.WrapperImage>
                      <Image src={item.image} alt={item.name} height={180} width={280} placeholder="blur" blurDataURL={item.image} />
                    </S.WrapperImage>
                    <S.Title>
                      <strong>{item.name}</strong>
                      <ul>
                        {item.language.map(language => <S.Item key={language} stack={language}>{conversionStack(language)}</S.Item>)}
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
