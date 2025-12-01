'use client';

import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import Navigation from '../Navigation';

import * as S from './styles'

const pageNames: Record<string, string> = {
  '/sobre': 'sobre',
  '/atividades': 'atividades',
  '/ouvindo': 'ouvindo',
  '/trampos': 'trampos',
  '/fotos': 'fotos',
  '/leituras': 'leituras',
  '/viagens': 'viagens',
  '/games': 'games',
};

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const pageTitle = pageNames[pathname];
  return (
    <S.HeaderContainer $isHome={isHome}>
      <S.LogoSection href="/" $isHome={isHome}>
        <S.LogoText>twobanks</S.LogoText>
      </S.LogoSection>
      <S.ActionsContainer>
        {!isHome && pageTitle && (
          <>
            <strong>{pageTitle}</strong>
            <span>|</span>
          </>
        )}
        <S.IconsContainer>
          <Navigation />
          <ThemeToggle />
        </S.IconsContainer>
      </S.ActionsContainer>
    </S.HeaderContainer>
  );
}