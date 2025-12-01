'use client';

import { useTheme } from '@/context/ThemeContext';
import { SunDimIcon, MoonIcon } from '@phosphor-icons/react';

import * as S from './styles'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <S.Switch onClick={toggleTheme}>
      <S.IconWrapper $active={!isDarkMode} className="on">
        <SunDimIcon size={22} weight="fill"  />
      </S.IconWrapper>
      <S.IconWrapper $active={isDarkMode}>
        <MoonIcon size={22} weight="regular" />
      </S.IconWrapper>
    </S.Switch>
  );
}