'use client';

import { usePathname } from 'next/navigation';

import { menuLinks } from '@/utils/content/start';

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
        {menuLinks.map(link => (
          <S.NavItem key={link.name} href={link.link} $isActive={pathname === link.link}>
            {link.name}
          </S.NavItem>
        ))}
      </S.NavLinks>
    </S.HeaderContainer>
  );
}