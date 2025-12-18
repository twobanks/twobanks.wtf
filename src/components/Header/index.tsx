'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import Navigation from '../Navigation';

import { pageNames } from '@/utils/const/component';

import * as S from './styles';

export default function Header(): JSX.Element {
  const pathname = usePathname() || '/';
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