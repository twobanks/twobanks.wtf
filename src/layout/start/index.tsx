'use client';

import Image from 'next/image';

import * as S from './styles'

export default function Start() {
  return (
    <S.MainContainer>
      <S.ImageWrapper>
        <Image src="/twobanks.webp" alt="Personagem BERA" width={300} height={300} priority style={{ width: '100%', height: 'auto' }} />
      </S.ImageWrapper>
      <S.Title>twobanks</S.Title>
      <S.NavMenu>
        <S.NavItem href="/sobre">
          sobre
        </S.NavItem>
        <S.NavItem href="/atividades">
          atividades
        </S.NavItem>
        <S.NavItem href="/ouvindo">
          ouvindo
        </S.NavItem>
        <S.NavItem href="/trampos">
          trampos
        </S.NavItem>
      </S.NavMenu>
    </S.MainContainer>
  );
}