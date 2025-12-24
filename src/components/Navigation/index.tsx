'use client';

import { useEffect, useState, JSX, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { ListIcon, XIcon } from '@phosphor-icons/react';

import { menuLinks } from '@/utils/content/start';
import { social } from '@/utils/content/about';
import { backdropVariants, drawerVariants } from '@/utils/const/component';

import * as S from './styles';
import { TwoBanksLogo } from '../TwoBanks';
import { Logo } from '../TwoBanks/styles';

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,    
    () => false    
  );
}

export default function Navigation(): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isMounted = useMounted();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const portalContainer = isMounted && typeof document !== 'undefined' ? document.body : null;

  const renderNavItems = () => (
    <>
      {menuLinks.map((item) => {
        const isActive = pathname === item.link;
        const Icon = item.icon; 
        return (
          <S.NavItem key={item.link} onMouseEnter={() => setHoveredPath(item.link)}onMouseLeave={() => setHoveredPath(null)}>
            {hoveredPath === item.link && (
              <S.HoverHighlight layoutId="nav-highlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
            )}
            <S.MenuLink onClick={() => setIsOpen(false)} href={item.link} $isActive={isActive}>
              <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
              <span>{item.name}</span>
            </S.MenuLink>
          </S.NavItem>
        );
      })}
    </>
  );

  const renderSocials = () => (
    <S.SocialGrid>
      {social.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Link key={index} href={item.link} target="_blank" title={item.name}>
             <IconComponent size={18} weight="regular" />
          </Link>
        );
      })}
    </S.SocialGrid>
  );

  return (
    <>
      <S.SidebarContainer>
        <S.SidebarContent>
          <S.SidebarHeader>
            <span>*</span>
            <Logo width={70} />
            <span>*</span>
          </S.SidebarHeader>
          <S.SidebarNav onMouseLeave={() => setHoveredPath(null)}>
            {renderNavItems()}
          </S.SidebarNav>
          <S.SidebarFooter>
            {renderSocials()}
          </S.SidebarFooter>
        </S.SidebarContent>
      </S.SidebarContainer>
      <S.MobileMenuButton onClick={toggleMenu} aria-label="Abrir Menu">
        <ListIcon size={32} weight="bold" />
      </S.MobileMenuButton>
      {portalContainer && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <S.Backdrop key="backdrop" initial="closed" animate="open" exit="closed" variants={backdropVariants} onClick={toggleMenu} />
              <S.DrawerContainer key="drawer" initial="closed" animate="open" exit="closed" variants={drawerVariants}>
                <S.DrawerHeader>
                  <S.MobileMenuButton onClick={toggleMenu}>
                    <XIcon size={32} />
                  </S.MobileMenuButton>
                </S.DrawerHeader>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {renderNavItems()}
                </nav>
                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                  {renderSocials()}
                </div>
              </S.DrawerContainer>
            </>
          )}
        </AnimatePresence>,
        portalContainer
      )}
    </>
  );
}