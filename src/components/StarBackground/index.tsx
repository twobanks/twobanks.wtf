'use client';

import { useTheme } from '@/context/ThemeContext';

import * as S from './styles'

export default function StarBackground() {
  const { isDarkMode } = useTheme();

  let starsTheme = { small: '', medium: '', big: '' };
  try {
     // eslint-disable-next-line @typescript-eslint/no-require-imports
     const { darkTheme } = require('@/styles/themes');
     starsTheme = darkTheme.stars;
  } catch (e) {}

  if (!isDarkMode) return null;

  return (
    <S.StarWrapper>
      <S.StarLayer size={1} shadow={starsTheme.small} duration={40} delay={0} />
      <S.StarLayer size={1} shadow={starsTheme.small} duration={40} delay={20} />
      <S.StarLayer size={2} shadow={starsTheme.medium} duration={30} delay={0} />
      <S.StarLayer size={2} shadow={starsTheme.medium} duration={30} delay={15} />
      <S.StarLayer size={3} shadow={starsTheme.big} duration={20} delay={0} />
      <S.StarLayer size={3} shadow={starsTheme.big} duration={20} delay={10} />
    </S.StarWrapper>
  );
}