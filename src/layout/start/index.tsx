'use client';

import Container from '@/components/Container';
import * as S from './styles';
import { menuLinks } from '@/utils/content/start';
import { useState } from 'react';

export default function Start() {
  const [isOpen, setIsOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const renderNavItems = () => (
      <>
        {menuLinks.map((item) => {
          const Icon = item.icon; 
          return (
            <S.NavItem key={item.link} onMouseEnter={() => setHoveredPath(item.link)} onMouseLeave={() => setHoveredPath(null)}>
              {hoveredPath === item.link && (
                <S.HoverHighlight layoutId="nav-highlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <S.MenuLink onClick={() => setIsOpen(false)} href={item.link}>
                <Icon size={18} weight='regular' />
              </S.MenuLink>
            </S.NavItem>
          );
        })}
      </>
    );
  return (
    <Container name=''>
      <S.MainContainer>
        <S.SidebarHeader>
          <span>*</span>
          <S.Title>2banks</S.Title>
          <span>*</span>
        </S.SidebarHeader>
        <S.NavContainer>
          {renderNavItems()}
        </S.NavContainer>
      </S.MainContainer>
    </Container>
  );
}