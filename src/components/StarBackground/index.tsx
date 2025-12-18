'use client';

import { JSX } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { darkTheme } from '@/styles/themes'; 
import * as S from './styles';

export default function StarBackground(): JSX.Element | null {
  const { isDarkMode } = useTheme();
  const starsTheme = darkTheme?.stars || { small: '', medium: '', big: '' };
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