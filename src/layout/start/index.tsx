'use client';

import Image from 'next/image';

import * as S from './styles';

export default function Start() {
  return (
    <S.MainContainer>
      <S.ImageWrapper>
        <Image src="/img/twobanks.webp" alt="Personagem BERA" width={300} height={300} priority style={{ width: '100%', height: 'auto' }} />
      </S.ImageWrapper>
      <S.Title>twobanks</S.Title>
    </S.MainContainer>
  );
}