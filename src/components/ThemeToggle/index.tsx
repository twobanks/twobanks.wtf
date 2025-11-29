'use client';

import { useTheme } from '@/context/ThemeContext';

import * as S from './styles'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <S.Switch onClick={toggleTheme}>
      <S.IconWrapper $active={!isDarkMode}>🌙</S.IconWrapper>
      <S.IconWrapper $active={isDarkMode}>☀️</S.IconWrapper>
    </S.Switch>
  );
}