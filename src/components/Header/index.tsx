'use client';

import { usePathname } from 'next/navigation';

import * as S from './styles'

export default function Header() {
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }
  return (
    <S.HeaderContainer>
      <S.LogoSection href="/">
        <S.MiniLogoText>twobanks</S.MiniLogoText>
      </S.LogoSection>
      <S.NavLinks>
        <S.NavItem href="/sobre" $isActive={pathname === '/sobre'}>
          sobre
        </S.NavItem>
        <S.NavItem href="/atividades" $isActive={pathname === '/atividades'}>
           atividades
        </S.NavItem>
        <S.NavItem href="/ouvindo" $isActive={pathname === '/ouvindo'}>
           ouvindo
        </S.NavItem>
        <S.NavItem href="/trampos" $isActive={pathname === '/trampos'}>
           trampos
        </S.NavItem>
      </S.NavLinks>
    </S.HeaderContainer>
  );
}