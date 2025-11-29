'use client';

import Image from 'next/image';
import { menuLinks } from '@/utils/content/start';

import * as S from './styles'

export default function Start() {
  return (
    <S.MainContainer>
      <S.ImageWrapper>
        <Image src="/img/twobanks.webp" alt="Personagem BERA" width={300} height={300} priority style={{ width: '100%', height: 'auto' }} />
      </S.ImageWrapper>
      <S.Title>twobanks</S.Title>
      <S.NavMenu>
        {menuLinks.map(link => (
          <S.NavItem key={link.name} href={link.link}>
            {link.name}
          </S.NavItem>
        ))}
      </S.NavMenu>
    </S.MainContainer>
  );
}