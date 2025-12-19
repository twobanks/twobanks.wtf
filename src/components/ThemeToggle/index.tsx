'use client';

import { JSX } from 'react';
import Image from 'next/image' 
import { useTheme } from '@/context/ThemeContext';
import { blurDataURL } from '@/utils/functions/imageShimmer';

import * as S from './styles';

export default function ThemeToggle(): JSX.Element {
  const { toggleTheme } = useTheme();
  return (
    <S.Switch onClick={toggleTheme} type="button" aria-label="Alternar tema">
      <S.IconWrapper $active={true} className="on">
        <Image src="/img/twobanks.webp" alt="twobanks" width={40} height={40} placeholder="blur" blurDataURL={blurDataURL} />
      </S.IconWrapper>
    </S.Switch>
  );
}