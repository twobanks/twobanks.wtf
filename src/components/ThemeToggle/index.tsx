'use client';

import { JSX } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SunDimIcon, MoonIcon } from '@phosphor-icons/react';

import * as S from './styles';

export default function ThemeToggle(): JSX.Element {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <S.Switch onClick={toggleTheme} type="button" aria-label="Alternar tema">
      <S.IconWrapper $active={!isDarkMode} className="on">
        <SunDimIcon size={22} weight="fill" />
      </S.IconWrapper>
      <S.IconWrapper $active={isDarkMode}>
        <MoonIcon size={22} weight="regular" />
      </S.IconWrapper>
    </S.Switch>
  );
}